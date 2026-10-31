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
  if (only === "scenes") break;
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

/* ---------- 水中シーン（CG）：写真の代わりに雰囲気を伝えるビジュアル ---------- */
if (!only || only === "scenes") {
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);

  /** 水中の背景（SVG）：上から差し込む光、光の筋、浮遊する粒子、ぼんやりした水底 */
  const waterBg = (W, H, { light = 0.5, deep = "#0a2730", mid = "#1d5d6b", top = "#6fb2bf" } = {}) => {
    const rays = Array.from({ length: 9 }, () => {
      const x = W * (0.15 + rnd() * 0.7);
      const w = W * (0.02 + rnd() * 0.05);
      const spread = W * (0.1 + rnd() * 0.25) * (rnd() > 0.5 ? 1 : -1);
      return `<polygon points="${x - w},0 ${x + w},0 ${x + w + spread},${H} ${x - w + spread},${H}" fill="#ffffff" opacity="${(0.04 + rnd() * 0.07).toFixed(3)}"/>`;
    }).join("");
    const motes = Array.from({ length: 140 }, () => {
      const r = (0.6 + rnd() * 2.4) * (W / 1600);
      return `<circle cx="${(rnd() * W).toFixed(1)}" cy="${(rnd() * H).toFixed(1)}" r="${r.toFixed(2)}" fill="#e8fbff" opacity="${(0.1 + rnd() * 0.35).toFixed(2)}"/>`;
    }).join("");
    return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="w" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${top}"/><stop offset="0.45" stop-color="${mid}"/><stop offset="1" stop-color="${deep}"/>
        </linearGradient>
        <radialGradient id="sun" cx="0.5" cy="-0.1" r="0.8">
          <stop offset="0" stop-color="#f2feff" stop-opacity="${light}"/><stop offset="1" stop-color="#f2feff" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${deep}" stop-opacity="0"/><stop offset="1" stop-color="#06181d" stop-opacity="0.85"/>
        </linearGradient>
        <filter id="b"><feGaussianBlur stdDeviation="${W / 120}"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#w)"/>
      <rect width="${W}" height="${H}" fill="url(#sun)"/>
      <g filter="url(#b)">${rays}</g>
      <rect y="${H * 0.62}" width="${W}" height="${H * 0.38}" fill="url(#floor)"/>
      ${motes}
    </svg>`);
  };

  const bubbles = (W, H, x0, y0, n) =>
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${Array.from({ length: n }, () => {
      const r = (2 + rnd() * 7) * (W / 1600);
      const x = x0 + (rnd() - 0.5) * W * 0.06;
      const y = y0 - rnd() * H * 0.35;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.55" stroke-width="${(r / 4).toFixed(2)}"/>`;
    }).join("")}</svg>`);

  /** 水中シーンを合成：背景 → 水の色をのせたルアー → 泡 → ラベル */
  /** area：ルアーを配置する範囲（画面に対する比率）。文字を載せる余白を空けるために使う */
  async function waterScene(file, W, H, lureSpec, { fill = 0.6, bx = 0.25, by = 0.48, bg = {}, area = { x: 0, y: 0, w: 1, h: 1 } } = {}) {
    const back = await sharp(waterBg(W, H, bg)).blur(1.2).png().toBuffer();
    const lw = Math.round(W * area.w);
    const lh = Math.round(H * area.h);
    const png = await renderPng({ width: lw, height: lh, fill, shadow: false, ...lureSpec });
    // 水中の色かぶり（青緑）と、わずかなコントラスト低下
    const tinted = await sharp(png)
      .composite([{ input: { create: { width: lw, height: lh, channels: 4, background: { r: 30, g: 110, b: 125, alpha: 0.22 } } }, blend: "atop" }])
      .png()
      .toBuffer();
    const label = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><text x="${W - 36}" y="${H - 30}" font-family="Inter, sans-serif" font-size="${Math.round(W / 110)}" font-weight="500" letter-spacing="4" fill="#ffffff" fill-opacity="0.7" text-anchor="end">DEMO IMAGE — CG</text></svg>`,
    );
    const outBuf = await sharp(back)
      .composite([
        { input: tinted, left: Math.round(W * area.x), top: Math.round(H * area.y) },
        { input: bubbles(W, H, W * bx, H * by, 22) },
        { input: label },
      ])
      .webp({ quality: 86 })
      .toBuffer();
    await mkdir(path.dirname(out(file)), { recursive: true });
    await writeFile(out(file), outBuf);
    console.log("  ✓", file);
  }

  const sexyShad = { back: "#1c2128", body: "#8d98aa", belly: "#f1f3f5", accent: "#c9d36a" };
  const ghost = { back: "#2B2F36", body: "#9AA3AE", belly: "#F3F4F6", accent: "#C9D1D9" };
  const chart = { back: "#4f7a16", body: "#c8e33b", belly: "#f4f7c9", accent: "#7fa51f" };
  const tiger = { back: "#5a1a14", body: "#c0472e", belly: "#e8b45a", accent: "#2a1612" };

  await waterScene("scene-hero.webp", 2400, 1350, { shape: "minnow", palette: ghost, rotZ: -8, yaw: 28, elev: 4 }, { fill: 0.66, bx: 0.36, by: 0.8, area: { x: 0.15, y: 0.6, w: 0.7, h: 0.38 } });
  await waterScene("scene-hero-mobile.webp", 1200, 2400, { shape: "minnow", palette: ghost, rotZ: -10, yaw: 28, elev: 4 }, { fill: 0.86, bx: 0.18, by: 0.8, area: { x: 0.02, y: 0.71, w: 0.96, h: 0.26 } });
  await waterScene("scene-tech.webp", 2400, 1000, { shape: "crankbait", palette: chart, rotZ: -12, yaw: 30, elev: 6 }, { fill: 0.62, bx: 0.6, by: 0.45, bg: { light: 0.35 }, area: { x: 0.42, y: 0.05, w: 0.56, h: 0.9 } });
  await waterScene("scene-movie-1.webp", 1600, 900, { shape: "vibration", palette: sexyShad, rotZ: -6, yaw: 26 }, { fill: 0.55, bx: 0.3 });
  await waterScene("scene-movie-2.webp", 1600, 900, { shape: "crankbait", palette: tiger, rotZ: -14, yaw: 32 }, { fill: 0.55, bx: 0.32, bg: { mid: "#2b5d4f", top: "#86b9a8", deep: "#0d2620" } });
  await waterScene("scene-designer.webp", 2400, 1100, { shape: "shad", palette: sexyShad, rotZ: -6, yaw: 24 }, { fill: 0.5, bx: 0.3, bg: { light: 0.3, mid: "#1a4b58", deep: "#071c22" } });
}

await browser.close();
server.close();
console.log("Done.");
