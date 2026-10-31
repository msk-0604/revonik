/**
 * ルアーの仮画像（DEMO IMAGE）を Three.js で3Dレンダリングして書き出す。
 * REVONIK の写真・形状データは使用していない（カテゴリーごとの一般的な形状をもとにしたオリジナルモデル）。
 *
 *   npm run images        # SVG の仮画像 → 3D ルアー画像 の順に生成
 *   node scripts/render-lures.mjs [slug]   # 特定の商品だけ再生成
 *
 * ヘッドレス Chromium（Playwright）の WebGL で描画し、sharp で WebP / PNG に変換する。
 */
import { createReadStream } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { products } from "../src/data/products.ts";

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require("playwright");
} catch {
  playwright = await import("playwright");
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = (p) => path.join(root, "public", "placeholders", p);
const only = process.argv[2];

/* ---------- three.js とレンダラーを配信する簡易サーバー ---------- */
const types = { ".js": "text/javascript", ".html": "text/html" };
const server = createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file;
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(
      '<!doctype html><html><head><script type="importmap">{"imports":{"three":"/three/build/three.module.js","three/addons/":"/three/examples/jsm/"}}</script></head>' +
        '<body style="margin:0"><script type="module" src="/lure.js"></script></body></html>',
    );
    return;
  }
  if (url.startsWith("/three/")) file = path.join(root, "node_modules", "three", url.slice(7));
  else file = path.join(root, "scripts", "lure-render", url.slice(1));
  try {
    await stat(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}/`;

const browser = await playwright.chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.error("page error:", e.message));
await page.goto(base);
await page.waitForFunction(() => window.lureReady === true, null, { timeout: 60000 });

async function renderPng(spec) {
  const url = await page.evaluate((s) => window.renderLure(s), spec);
  return Buffer.from(url.split(",")[1], "base64");
}

const GRAY = "#86868B";
const label = (W, H, text, y = H - 40) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><text x="${W / 2}" y="${y}" font-family="Inter, DejaVu Sans, sans-serif" font-size="18" font-weight="500" letter-spacing="5" fill="${GRAY}" text-anchor="middle">${text}</text></svg>`,
  );

async function save(file, buf, { format = "webp", quality = 90 } = {}) {
  const target = out(file);
  await mkdir(path.dirname(target), { recursive: true });
  const img = sharp(buf);
  await writeFile(target, format === "png" ? await img.png().toBuffer() : await img.webp({ quality, alphaQuality: 95 }).toBuffer());
  console.log("  ✓", file);
}

async function withLabel(png, W, H, text, background) {
  const layers = [{ input: png }, { input: label(W, H, text) }];
  const canvas = background
    ? sharp({ create: { width: W, height: H, channels: 4, background } })
    : sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } });
  return canvas.composite(layers).png().toBuffer();
}

console.log("Rendering 3D lure placeholders…");

/* ---------- 商品画像（透明背景・1600×1200・全商品で構図を統一） ---------- */
for (const p of products) {
  if (only && p.slug !== only) continue;
  for (const c of p.colors) {
    const W = 1600;
    const H = 1200;
    const png = await renderPng({ shape: p.shape, palette: c.palette, width: W, height: H, fill: 0.74 });
    await save(`products/${p.slug}/${c.id}.webp`, await withLabel(png, W, H, "DEMO IMAGE — ORIGINAL 3D PLACEHOLDER"));
  }
}

if (!only) {
  const heroPalette = { back: "#2B2F36", body: "#9AA3AE", belly: "#F3F4F6", accent: "#C9D1D9" };

  /* ---------- ヒーロー ---------- */
  {
    const W = 2400;
    const H = 1200;
    const png = await renderPng({ shape: "minnow", palette: heroPalette, width: W, height: H, fill: 0.8, rotZ: 6, yaw: 22, elev: 8 });
    await save("hero.webp", await withLabel(png, W, H, "DEMO IMAGE"));
  }
  {
    const W = 1200;
    const H = 900;
    const png = await renderPng({ shape: "minnow", palette: heroPalette, width: W, height: H, fill: 0.86, rotZ: 6, yaw: 22, elev: 8 });
    await save("hero-mobile.webp", await withLabel(png, W, H, "DEMO IMAGE"));
  }

  /* ---------- ニュースのサムネイル（ライトグレー背景） ---------- */
  const newsShapes = { product: "crankbait", event: "vibration", brand: "shad", media: "minnow" };
  for (const [cat, shape] of Object.entries(newsShapes)) {
    const W = 1600;
    const H = 1000;
    const png = await renderPng({ shape, palette: heroPalette, width: W, height: H, fill: 0.62 });
    await save(`news-${cat}.webp`, await withLabel(png, W, H, "DEMO IMAGE — SAMPLE", "#F5F5F7"));
  }

  /* ---------- OGP ---------- */
  {
    const W = 1200;
    const H = 630;
    const png = await renderPng({ shape: "minnow", palette: heroPalette, width: 900, height: 330, fill: 0.9, rotZ: 6, yaw: 22 });
    const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <text x="${W / 2}" y="140" font-family="Inter, sans-serif" font-size="28" font-weight="600" letter-spacing="10" fill="#1D1D1F" text-anchor="middle">REVONIK</text>
      <text x="${W / 2}" y="212" font-family="Inter, sans-serif" font-size="56" font-weight="600" letter-spacing="-1" fill="#1D1D1F" text-anchor="middle">The Art of Precision.</text>
      <text x="${W / 2}" y="${H - 28}" font-family="Inter, sans-serif" font-size="14" letter-spacing="3" fill="${GRAY}" text-anchor="middle">UNOFFICIAL PROPOSAL DEMO — STARK LAB</text>
    </svg>`);
    const og = await sharp({ create: { width: W, height: H, channels: 4, background: "#FFFFFF" } })
      .composite([{ input: text }, { input: png, left: 150, top: 250 }])
      .png()
      .toBuffer();
    await save("og.png", og, { format: "png" });
  }
}

await browser.close();
server.close();
console.log("Done.");
