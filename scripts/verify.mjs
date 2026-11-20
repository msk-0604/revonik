/**
 * 動作検証（Playwright）
 *
 *   npm run build && npx next start -p 3100 &
 *   BASE_URL=http://localhost:3100 npm run verify
 *
 * 全ページの表示・横スクロール・画像読み込み・noindex・デモ表示・主要な操作を確認し、
 * screenshots/ に PC / スマートフォンのスクリーンショットを保存する。
 */
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require("playwright");
} catch {
  playwright = await import("playwright");
}
const { chromium } = playwright;

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const pages = [
  "/",
  "/products",
  "/products/volbeat",
  "/products/shindy-110",
  "/products/saramoa",
  "/products/dot-six",
  "/products/ramzy",
  "/products/zenda",
  "/products/pop-up-jig",
  "/products/shekiller-78",
  "/technology",
  "/dealers",
  "/proposal",
  "/about",
  "/media",
  "/news",
  "/news/dispa-118sf",
  "/contact",
];
const mobile = { isMobile: true, hasTouch: true, deviceScaleFactor: 2 };
/** full: 全ページを検証しフルページのスクリーンショットを保存／それ以外は主要3ページ */
const viewports = {
  pc: { width: 1440, height: 900, full: true },
  sp: { width: 390, height: 844, ...mobile, full: true },
  w320: { width: 320, height: 640, ...mobile },
  w375: { width: 375, height: 812, ...mobile },
  w430: { width: 430, height: 932, ...mobile },
  w768: { width: 768, height: 1024, ...mobile },
  // 黒基調（第二案）も主要ページで確認
  pcDark: { width: 1440, height: 900, theme: "dark" },
  spDark: { width: 390, height: 844, ...mobile, theme: "dark" },
};
const keyPages = ["/", "/products", "/products/volbeat", "/technology", "/proposal"];

const failures = [];
const ok = (cond, msg) => {
  if (cond) console.log("  ✓", msg);
  else {
    console.log("  ✗", msg);
    failures.push(msg);
  }
};

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
}

await mkdir("screenshots", { recursive: true });
const browser = await chromium.launch();

for (const [vpName, vp] of Object.entries(viewports)) {
  const { isMobile, hasTouch, deviceScaleFactor, full, theme, ...size } = vp;
  const context = await browser.newContext({ viewport: size, isMobile, hasTouch, deviceScaleFactor });
  const page = await context.newPage();
  const consoleErrors = [];
  // YouTube の埋め込みプレーヤー内のエラーは対象外（サイトのコードではない）
  page.on("console", (m) => m.type() === "error" && !/youtube|ytimg|googlevideo|google\.com/.test(m.location().url + m.text()) && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push(e.message));

  for (const path of full ? pages : keyPages) {
    console.log(`\n[${vpName}] ${path}`);
    const res = await page.goto(BASE + path + (theme ? `?theme=${theme}` : ""), { waitUntil: "networkidle" });
    if (theme) ok((await page.locator("html").getAttribute("data-theme")) === theme, `テーマ ${theme}`);
    ok(res?.status() === 200, `HTTP 200 (${res?.status()})`);
    ok((res?.headers()["x-robots-tag"] ?? "").includes("noindex"), "X-Robots-Tag: noindex");
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    ok(robots?.includes("noindex") && robots.includes("nofollow"), `meta robots: ${robots}`);
    ok(await page.getByText("非公式・営業提案用デモ／制作：Stark Lab").first().isVisible(), "非公式デモ表示");
    await scrollThrough(page);

    const info = await page.evaluate(() => {
      const imgs = [...document.images];
      return {
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        broken: imgs.filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== "lazy").map((i) => i.currentSrc || i.src),
        noAlt: imgs.filter((i) => !i.hasAttribute("alt")).length,
        h1: document.querySelectorAll("h1").length,
        lang: document.documentElement.lang,
        unnamedButtons: [...document.querySelectorAll("button")].filter(
          (b) => !(b.getAttribute("aria-label") || b.textContent?.trim()),
        ).length,
        // 文字切れ：横スクロール領域の外で、画面右端をはみ出すテキスト要素
        clipped: [...document.querySelectorAll("h1,h2,h3,p,a,button,li,dt,dd,th,td,label")]
          .filter((el) => {
            for (let a = el.parentElement; a; a = a.parentElement) {
              const ox = getComputedStyle(a).overflowX;
              if (ox === "auto" || ox === "scroll" || ox === "hidden" || ox === "clip") {
                if (a !== document.body && a !== document.documentElement) return false;
              }
            }
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1);
          })
          .map((el) => (el.textContent || "").trim().slice(0, 30)),
        badExternal: [...document.querySelectorAll('a[href^="http"]')].filter(
          (a) => a.getAttribute("target") !== "_blank" || !a.getAttribute("rel")?.includes("noopener"),
        ).length,
      };
    });
    ok(info.overflow <= 0, `横スクロールなし (overflow ${info.overflow}px)`);
    ok(info.clipped.length === 0, `文字のはみ出しなし ${info.clipped.slice(0, 3).join(" | ")}`);
    ok(info.broken.length === 0, `画像の読み込み (${info.broken.join(", ") || "OK"})`);
    ok(info.noAlt === 0, "全画像に alt 属性");
    ok(info.h1 === 1, `h1 が1つ (${info.h1})`);
    ok(info.lang === "ja", "html lang=ja");
    ok(info.unnamedButtons === 0, "ボタンにアクセシブルな名前");
    ok(info.badExternal === 0, "外部リンクは新しいタブ + noopener");

    const name = path === "/" ? "home" : path.slice(1).replace(/\//g, "_");
    await page.screenshot({ path: `screenshots/${vpName}_${name}.png`, fullPage: true });
  }
  if (!full) {
    ok(consoleErrors.length === 0, `コンソールエラーなし ${consoleErrors.slice(0, 3).join(" | ")}`);
    await context.close();
    continue;
  }

  // ---- インタラクション ----
  console.log(`\n[${vpName}] interactions`);
  await page.goto(BASE + "/products", { waitUntil: "networkidle" });
  const cards = () => page.locator('main a[data-track="select_item"][href^="/products/"]').count();
  const total = await cards();
  await page.getByRole("button", { name: /^Shad/ }).click();
  await page.waitForTimeout(700);
  ok((await cards()) < total && (await cards()) > 0, `カテゴリー絞り込み (${total} → ${await cards()})`);
  ok(page.url().includes("category=shad"), "絞り込みが URL に反映");
  await page.getByRole("button", { name: /^All/ }).click();
  await page.getByLabel("商品名で検索").fill("サラモア");
  await page.waitForTimeout(700);
  ok((await cards()) === 1, `商品名検索（カナ）: ${await cards()} 件`);
  await page.getByLabel("商品名で検索").fill("zzz");
  await page.waitForTimeout(500);
  ok(await page.getByText("該当する商品が見つかりませんでした").isVisible(), "0件表示");
  await page.getByRole("button", { name: "条件をリセット" }).click();
  await page.waitForTimeout(500);
  ok((await cards()) === total, "条件リセット");
  await page.locator('main a[href="/products/volbeat"]').first().click();
  await page.waitForURL("**/products/volbeat");
  ok(true, "商品詳細へ遷移");

  // 写真が未掲載の製品：公式動画をステージに表示 → クリックで YouTube の公式プレーヤーを読み込む
  const play = page.locator("#product-stage").getByRole("button", { name: /^動画を再生：/ });
  ok((await play.count()) === 1, "写真未掲載の製品は公式動画をステージに表示");
  ok((await page.locator('iframe[src*="youtube-nocookie.com"]').count()) === 0, "再生前は iframe を読み込まない");
  await play.click();
  await page.waitForTimeout(500);
  ok((await page.locator('#product-stage iframe[src*="youtube-nocookie.com/embed/"]').count()) === 1, "再生ボタンで公式プレーヤーを読み込む");
  // カラー：写真が届くまでは番号・名称・対応モデルの一覧
  const colorList = page.getByRole("list", { name: "VOLBEAT のカラー一覧" });
  ok(await colorList.getByText("オーロラグリーン").isVisible(), "カラー一覧（名称）");
  ok((await colorList.locator("li").count()) === 24, `カラー一覧 24色 (${await colorList.locator("li").count()})`);
  ok(await colorList.getByText("60S · 70S").first().isVisible(), "カラーの対応モデル表示");
  await page.getByRole("tab", { name: "70S" }).click();
  ok(await page.getByRole("cell", { name: "69mm" }).isVisible(), "スペックのモデル切り替え（70S → 69mm）");
  ok(await page.getByText("「—」の項目は確認中です。").first().isVisible(), "不明スペックは「—」＋説明");
  const storeLinks = page.locator('a[data-track="store_click"][href^="https://revonik.stores.jp"]');
  ok((await storeLinks.count()) >= 2, `商品詳細のストア導線 (${await storeLinks.count()} 件)`);
  await page.screenshot({ path: `screenshots/${vpName}_interaction_volbeat.png` });

  // 写真も動画もない製品は撮影台
  await page.goto(BASE + "/products/pop-up-jig", { waitUntil: "networkidle" });
  ok((await page.locator("[aria-label$='公式写真を掲載予定']").count()) > 0, "写真・動画がない製品は撮影台を表示");

  // 表示テーマ（White 標準／Black 第二案）
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  ok((await page.locator("html").getAttribute("data-theme")) === null, "標準はホワイト");
  await page.getByRole("group", { name: "表示テーマ" }).getByRole("button", { name: "Black" }).click();
  ok((await page.locator("html").getAttribute("data-theme")) === "dark", "Black に切り替え");
  await page.reload({ waitUntil: "networkidle" });
  ok((await page.locator("html").getAttribute("data-theme")) === "dark", "テーマの選択を保持");
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  ok(bg === "rgb(10, 10, 11)", `Black の背景色 (${bg})`);
  await page.getByRole("group", { name: "表示テーマ" }).getByRole("button", { name: "White" }).click();
  ok((await page.locator("html").getAttribute("data-theme")) === null, "White に戻す");

  if (vpName === "sp") {
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "メニューを開く" }).click();
    await page.waitForTimeout(600);
    ok(await page.locator("#mobile-menu").isVisible(), "モバイルメニューを開く");
    await page.screenshot({ path: `screenshots/sp_menu_open.png` });
    await page.locator("#mobile-menu").getByRole("link", { name: /^About$/ }).click();
    await page.waitForURL("**/about");
    await page.waitForTimeout(500);
    ok(!(await page.locator("#mobile-menu").isVisible()), "遷移でメニューが閉じる");
  }

  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  let requests = 0;
  page.on("request", (r) => r.method() === "POST" && requests++);
  await page.getByRole("button", { name: /送信する/ }).click();
  ok(await page.getByText("お名前を入力してください。").isVisible(), "フォームのバリデーション表示");
  await page.locator("#c-topic").selectOption({ index: 1 });
  await page.locator("#c-name").fill("テスト");
  await page.locator("#c-email").fill("demo@example.com");
  await page.locator("#c-message").fill("デモ");
  await page.locator("#c-agree").check();
  await page.getByRole("button", { name: /送信する/ }).click();
  await page.waitForTimeout(600);
  ok(await page.getByText("実際には送信されていません").isVisible(), "送信は無効（完了イメージのみ）");
  ok(requests === 0, `POST リクエストなし (${requests})`);
  ok((await page.locator("#c-name").inputValue()) === "", "入力内容を破棄");

  ok(consoleErrors.length === 0, `コンソールエラーなし ${consoleErrors.slice(0, 3).join(" | ")}`);
  await context.close();
}

// robots.txt / 404
const ctx = await browser.newContext();
const p = await ctx.newPage();
const robotsTxt = await (await p.goto(BASE + "/robots.txt")).text();
ok(robotsTxt.includes("Disallow: /"), "robots.txt: Disallow: /");
const nf = await p.goto(BASE + "/products/unknown");
ok(nf?.status() === 404, "存在しない商品は 404");
await browser.close();

console.log(failures.length ? `\n${failures.length} 件の失敗` : "\nすべての確認に合格しました");
process.exit(failures.length ? 1 : 0);
