/**
 * オリジナルの仮画像（DEMO IMAGE）を生成する。ホワイト基調のデザインに合わせ、商品画像は透明背景。
 * REVONIK の写真・ロゴは一切使用していない。SVG で描いたイラストを sharp で WebP / PNG に変換する。
 *
 *   npm run images
 *
 * 商品画像は src/data/products.ts の shape / palette から、カラーごとに生成される。
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { products } from "../src/data/products.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = (p) => path.join(root, "public", "placeholders", p);

const FONT = "Inter, DejaVu Sans, sans-serif";
const GRAY = "#86868B";

/* ---------- lure shapes (body units: head x=0 → tail x=1000) ---------- */
const shapes = {
  minnow: {
    body: "M0,0 C30,-70 190,-104 450,-104 C750,-98 930,-48 1000,-14 C1008,-4 1008,6 1000,14 C930,48 750,86 450,94 C190,94 30,62 0,0 Z",
    lip: "M34,40 L-160,178 C-170,186 -150,214 -128,206 L72,74 Z",
    eye: [118, -18, 30],
    gill: "M215,-82 C190,-30 190,30 215,78",
    hooks: [[330, 92, 0.95], [700, 80, 0.95]],
    top: -104,
    bottom: 94,
    tie: [-120, 196],
  },
  shad: {
    body: "M0,0 C18,-150 200,-232 450,-232 C760,-222 925,-120 1000,-30 L1000,30 C925,122 760,212 450,222 C200,222 18,150 0,0 Z",
    lip: "M44,86 L-150,254 C-162,268 -136,300 -112,288 L104,128 Z",
    eye: [130, -60, 42],
    gill: "M250,-178 C205,-60 205,60 250,172",
    hooks: [[430, 220, 1.7], [1000, 0, 1.7]],
    top: -232,
    bottom: 222,
    tie: [-128, 282],
  },
  crankbait: {
    body: "M0,0 C0,-232 200,-330 470,-330 C784,-320 962,-170 1000,-40 L1000,40 C962,172 784,322 470,332 C200,332 0,232 0,0 Z",
    lip: "M58,130 L-150,290 C-170,312 -126,352 -96,330 L150,182 Z",
    eye: [150, -110, 56],
    gill: "M300,-268 C230,-90 230,90 300,270",
    hooks: [[470, 332, 2.0], [1000, 0, 2.0]],
    top: -330,
    bottom: 332,
    tie: [-120, 322],
  },
  vibration: {
    body: "M0,30 C6,-110 130,-262 410,-270 C724,-272 924,-142 1000,-40 L1000,40 C904,172 704,252 420,252 C162,252 0,168 0,30 Z",
    wire: "M70,150 L-118,262 C-140,276 -120,312 -94,300 L120,188",
    eye: [120, -40, 44],
    gill: "M270,-220 C220,-70 220,80 270,222",
    hooks: [[420, 252, 1.8], [1000, 0, 1.8]],
    top: -272,
    bottom: 252,
    tie: [360, -270],
  },
};

let uid = 0;

function hook(ax, ay, k, tail) {
  const s = (n) => (n * k).toFixed(1);
  const ringY = ay + 22 * k;
  const top = ay + 40 * k;
  const end = ay + 150 * k;
  const dx = tail ? 18 * k : 0;
  return `
  <g stroke-linecap="round" fill="none">
    <circle cx="${ax}" cy="${ringY}" r="${s(18)}" stroke="#8E949B" stroke-width="${s(5)}"/>
    <path d="M${ax + dx},${top} L${ax + dx},${end}" stroke="#7C828A" stroke-width="${s(6)}"/>
    <path d="M${ax + dx},${end} C${ax + dx},${ay + 200 * k} ${ax + dx - 56 * k},${ay + 200 * k} ${ax + dx - 60 * k},${end} L${ax + dx - 60 * k},${ay + 122 * k}" stroke="#A3A9B0" stroke-width="${s(5.5)}"/>
    <path d="M${ax + dx},${end} C${ax + dx},${ay + 200 * k} ${ax + dx + 56 * k},${ay + 200 * k} ${ax + dx + 60 * k},${end} L${ax + dx + 60 * k},${ay + 122 * k}" stroke="#6E747C" stroke-width="${s(5.5)}"/>
    <path d="M${ax + dx + 60 * k},${ay + 124 * k} L${ax + dx + 48 * k},${ay + 140 * k}" stroke="#6E747C" stroke-width="${s(4)}"/>
    <path d="M${ax + dx},${end} C${ax + dx + 4 * k},${ay + 186 * k} ${ax + dx + 18 * k},${ay + 194 * k} ${ax + dx + 24 * k},${ay + 172 * k}" stroke="#8E949B" stroke-width="${s(5)}" opacity="0.8"/>
    <path d="M${ax + dx + 1.5 * k},${top + 6 * k} L${ax + dx + 1.5 * k},${end - 8 * k}" stroke="#ffffff" stroke-width="${s(1.6)}" opacity="0.7"/>
  </g>`;
}

/** ルアー1体を <g> として返す（明るい背景用：柔らかい接地影） */
function lure({ shape, palette, x, y, scale, rotate = 0, shadow = true }) {
  const sh = shapes[shape];
  const id = `l${uid++}`;
  const { back, body, belly, accent = body, clear = false } = palette;
  const h = sh.bottom - sh.top;
  const [ex, ey, er] = sh.eye;
  const bodyOpacity = clear ? 0.82 : 1;

  const lip = sh.lip
    ? `<path d="${sh.lip}" fill="url(#${id}-lip)" stroke="rgba(29,29,31,0.22)" stroke-width="2.5"/>`
    : "";
  const wire = sh.wire
    ? `<path d="${sh.wire}" fill="none" stroke="#7C828A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="${sh.wire}" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.7" stroke-linecap="round"/>`
    : "";
  const tie = sh.tie
    ? `<circle cx="${sh.tie[0]}" cy="${sh.tie[1]}" r="${h * 0.035 + 6}" fill="none" stroke="#7C828A" stroke-width="5"/>`
    : "";

  return `
  <g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale}) translate(-500 0)">
    <defs>
      <linearGradient id="${id}-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${back}"/>
        <stop offset="0.22" stop-color="${back}"/>
        <stop offset="0.48" stop-color="${body}"/>
        <stop offset="0.78" stop-color="${belly}"/>
        <stop offset="1" stop-color="${belly}"/>
      </linearGradient>
      <linearGradient id="${id}-lip" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#C9D3DC" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#E9EEF2" stop-opacity="0.35"/>
      </linearGradient>
      <radialGradient id="${id}-hl" cx="0.45" cy="0.18" r="0.6">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.65"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="${id}-sh" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#000" stop-opacity="0"/>
        <stop offset="0.72" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity="0.22"/>
      </linearGradient>
      <pattern id="${id}-sc" width="44" height="30" patternUnits="userSpaceOnUse">
        <path d="M0,30 C10,10 34,10 44,30 M-22,15 C-12,-5 12,-5 22,15 M22,15 C32,-5 56,-5 66,15" fill="none" stroke="#ffffff" stroke-width="1.6"/>
      </pattern>
      <clipPath id="${id}-c"><path d="${sh.body}"/></clipPath>
      <filter id="${id}-b" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="${h * 0.07}"/></filter>
    </defs>
    ${shadow ? `<ellipse cx="520" cy="${sh.bottom + h * 0.62}" rx="520" ry="${h * 0.07}" fill="#1D1D1F" opacity="0.16" filter="url(#${id}-b)"/>` : ""}
    ${sh.hooks.map(([hx, hy, k], i) => hook(hx, hy, k, i === sh.hooks.length - 1 && hx >= 1000)).join("")}
    ${wire}
    ${lip}
    <path d="${sh.body}" fill="url(#${id}-g)" opacity="${bodyOpacity}"/>
    <g clip-path="url(#${id}-c)">
      <rect x="-50" y="${sh.top}" width="1100" height="${h}" fill="url(#${id}-sc)" opacity="0.14"/>
      <ellipse cx="560" cy="${sh.top + h * 0.5}" rx="520" ry="${h * 0.07}" fill="${accent}" opacity="0.42"/>
      <ellipse cx="470" cy="${sh.top + h * 0.2}" rx="420" ry="${h * 0.2}" fill="url(#${id}-hl)"/>
      <rect x="-50" y="${sh.top}" width="1100" height="${h}" fill="url(#${id}-sh)"/>
      <ellipse cx="520" cy="${sh.bottom}" rx="560" ry="${h * 0.16}" fill="#000" opacity="0.1"/>
      <path d="${sh.gill}" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="4"/>
      <path d="${sh.gill}" transform="translate(6 0)" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
    </g>
    <path d="${sh.body}" fill="none" stroke="rgba(29,29,31,0.12)" stroke-width="2.5"/>
    <circle cx="${ex}" cy="${ey}" r="${er}" fill="#F2F2F2" stroke="rgba(0,0,0,0.12)" stroke-width="2"/>
    <circle cx="${ex}" cy="${ey}" r="${er * 0.86}" fill="#C9A43A"/>
    <circle cx="${ex - er * 0.08}" cy="${ey}" r="${er * 0.5}" fill="#111214"/>
    <circle cx="${ex - er * 0.3}" cy="${ey - er * 0.32}" r="${er * 0.2}" fill="#ffffff" opacity="0.95"/>
    ${tie}
  </g>`;
}

const label = (x, y, text, { size = 22, anchor = "start", opacity = 1, weight = 500, spacing = 3, color = GRAY } = {}) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" fill="${color}" fill-opacity="${opacity}" text-anchor="${anchor}">${text}</text>`;

const svg = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`;

async function render(file, w, h, inner, { format = "webp", quality = 88 } = {}) {
  const target = out(file);
  await mkdir(path.dirname(target), { recursive: true });
  let img = sharp(Buffer.from(svg(w, h, inner)));
  img = format === "png" ? img.png() : img.webp({ quality, alphaQuality: 90 });
  await writeFile(target, await img.toBuffer());
  console.log("  ✓", file);
}

/** ルアーが描画範囲 maxW × maxH に収まるスケール */
function fitScale(shape, maxW, maxH) {
  const sh = shapes[shape];
  const h = sh.bottom - sh.top;
  const lureW = 1000 + 170 + 80;
  const lureH = Math.max(h + 200 * sh.hooks[0][2], h * 1.7);
  return Math.min(maxW / lureW, maxH / lureH);
}

/** ルアーを中央に配置（全商品で大きさ・位置を統一）。フックと接地影まで含めた見た目の範囲で中央揃え */
function centered(shape, palette, W, H, maxW, maxH, rotate = -4, dy = 0) {
  const sh = shapes[shape];
  const scale = fitScale(shape, maxW, maxH);
  const h = sh.bottom - sh.top;
  const visualTop = sh.top - 30;
  const visualBottom = Math.max(sh.bottom + 200 * sh.hooks[0][2], sh.bottom + h * 0.7);
  const cy = H / 2 - ((visualTop + visualBottom) / 2) * scale + dy;
  return lure({ shape, palette, x: W / 2 + 40 * scale, y: cy, scale, rotate });
}

const demoMark = (W, H, text = "DEMO IMAGE") => label(W / 2, H - 40, text, { size: 18, anchor: "middle", opacity: 0.9, spacing: 5 });

/* ---------- product images（透明背景・統一サイズ） ---------- */
async function productImages() {
  const W = 1600;
  const H = 1200;
  for (const p of products) {
    for (const c of p.colors) {
      const inner = `${centered(p.shape, c.palette, W, H, 1320, 860, -4, -30)}${demoMark(W, H, "DEMO IMAGE — ORIGINAL PLACEHOLDER")}`;
      await render(`products/${p.slug}/${c.id}.webp`, W, H, inner);
    }
  }
}

/* ---------- site images ---------- */
const heroPalette = { back: "#2B2F36", body: "#9AA3AE", belly: "#F1F3F5", accent: "#C9D1D9" };

function rings(cx, cy, count, rx0, step, color = "#1D1D1F", max = 0.14) {
  return Array.from({ length: count }, (_, i) => {
    const r = rx0 + i * step;
    return `<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.7}" ry="${r * 0.42}" fill="none" stroke="${color}" stroke-opacity="${(max - (i * max) / (count + 1)).toFixed(3)}" stroke-width="2"/>`;
  }).join("");
}

async function siteImages() {
  // HERO — 透明背景の大きなルアー（文字とは重ねずに配置）
  {
    const W = 2400;
    const H = 1200;
    await render("hero.webp", W, H, `${centered("minnow", heroPalette, W, H, 2100, 900, -6, -20)}${demoMark(W, H)}`, { quality: 90 });
  }
  {
    const W = 1200;
    const H = 900;
    await render("hero-mobile.webp", W, H, `${centered("minnow", heroPalette, W, H, 1120, 640, -8, -10)}${demoMark(W, H)}`, { quality: 90 });
  }
  // PHILOSOPHY — 水面の波紋（ライトグレー）
  {
    const W = 1800;
    const H = 1200;
    const inner = `<rect width="${W}" height="${H}" fill="#F5F5F7"/>${rings(W * 0.5, H * 0.56, 12, 50, 72)}${demoMark(W, H)}`;
    await render("philosophy.webp", W, H, inner);
  }
  {
    const W = 1800;
    const H = 1200;
    const inner = `<rect width="${W}" height="${H}" fill="#FFFFFF"/>${rings(W * 0.5, H * 0.5, 10, 60, 80, "#1D1D1F", 0.1)}${demoMark(W, H)}`;
    await render("water.webp", W, H, inner);
  }
  // BLUEPRINT — 設計図風の線画
  {
    const W = 1800;
    const H = 1000;
    const sh = shapes.minnow;
    const sc = 1.08;
    const ox = 330;
    const oy = 500;
    const ln = (o = 0.5) => `stroke="#1D1D1F" stroke-opacity="${o}"`;
    const dim = (x1, x2, y, text) => `
      <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" ${ln(0.35)} stroke-width="1.5"/>
      <line x1="${x1}" y1="${y - 12}" x2="${x1}" y2="${y + 12}" ${ln(0.35)} stroke-width="1.5"/>
      <line x1="${x2}" y1="${y - 12}" x2="${x2}" y2="${y + 12}" ${ln(0.35)} stroke-width="1.5"/>
      ${label((x1 + x2) / 2, y - 16, text, { size: 16, anchor: "middle" })}`;
    const inner = `
      <rect width="${W}" height="${H}" fill="#F5F5F7"/>
      <g transform="translate(${ox} ${oy}) scale(${sc})" fill="none" stroke-width="${2 / sc}">
        <path d="${sh.body}" ${ln(0.75)}/>
        <path d="${sh.lip}" ${ln(0.45)}/>
        <path d="${sh.gill}" ${ln(0.35)}/>
        <circle cx="${sh.eye[0]}" cy="${sh.eye[1]}" r="${sh.eye[2]}" ${ln(0.5)}/>
        <line x1="-200" y1="0" x2="1100" y2="0" ${ln(0.18)} stroke-dasharray="12 10"/>
        <line x1="450" y1="-180" x2="450" y2="180" ${ln(0.18)} stroke-dasharray="12 10"/>
        <circle cx="330" cy="92" r="10" ${ln(0.5)}/><circle cx="700" cy="80" r="10" ${ln(0.5)}/>
        <ellipse cx="560" cy="0" rx="90" ry="34" ${ln(0.3)}/>
      </g>
      ${dim(ox, ox + 1000 * sc, oy - 200, "LENGTH (DEMO)")}
      ${dim(ox + 330 * sc, ox + 700 * sc, oy + 190, "HOOK PITCH (DEMO)")}
      ${demoMark(W, H, "DEMO IMAGE — CONCEPT DRAWING, NOT AN ACTUAL DESIGN DOCUMENT")}`;
    await render("blueprint.webp", W, H, inner);
  }
  // VIDEO — 文字を重ねるため、ルアーは描かず波紋のみ
  {
    const W = 1920;
    const H = 1080;
    await render("video.webp", W, H, `<rect width="${W}" height="${H}" fill="#F5F5F7"/>${rings(W * 0.5, H * 0.5, 9, 60, 80, "#1D1D1F", 0.08)}${demoMark(W, H, "DEMO IMAGE — VIDEO THUMBNAIL")}`);
  }
  // NEWS
  const newsShapes = { PRODUCT: "crankbait", EVENT: "vibration", BRAND: "shad", MEDIA: "minnow" };
  for (const [cat, shape] of Object.entries(newsShapes)) {
    const W = 1600;
    const H = 1000;
    await render(`news-${cat.toLowerCase()}.webp`, W, H, `<rect width="${W}" height="${H}" fill="#F5F5F7"/>${centered(shape, heroPalette, W, H, 900, 560)}${demoMark(W, H, "DEMO IMAGE — SAMPLE")}`);
  }
  // MEDIA（透明背景：カード側の地色で表示）
  const st = `fill="none" stroke="#1D1D1F" stroke-opacity="0.8" stroke-width="14"`;
  const mediaArt = {
    instagram: `<rect x="650" y="350" width="300" height="300" rx="80" ${st}/><circle cx="800" cy="500" r="72" ${st}/><circle cx="890" cy="410" r="14" fill="#1D1D1F" fill-opacity="0.8"/>`,
    youtube: `<rect x="620" y="380" width="360" height="240" rx="60" ${st}/><path d="M760,440 L870,500 L760,560 Z" fill="#1D1D1F" fill-opacity="0.8"/>`,
    store: `<path d="M640,420 L960,420 L930,640 L670,640 Z" ${st} stroke-linejoin="round"/><path d="M720,420 C720,330 880,330 880,420" ${st}/>`,
    article: `<rect x="650" y="330" width="300" height="360" rx="20" ${st}/>${[420, 480, 540, 600].map((y) => `<line x1="700" y1="${y}" x2="${y === 600 ? 820 : 900}" y2="${y}" stroke="#1D1D1F" stroke-opacity="0.5" stroke-width="12" stroke-linecap="round"/>`).join("")}`,
  };
  for (const [kind, art] of Object.entries(mediaArt)) {
    const W = 1600;
    const H = 1000;
    await render(`media-${kind}.webp`, W, H, `${art}${demoMark(W, H)}`);
  }
  // OGP
  {
    const W = 1200;
    const H = 630;
    const inner = `
      <rect width="${W}" height="${H}" fill="#FFFFFF"/>
      ${label(W / 2, 150, "REVONIK", { size: 30, anchor: "middle", color: "#1D1D1F", weight: 600, spacing: 10 })}
      ${label(W / 2, 222, "The Art of Precision.", { size: 58, anchor: "middle", color: "#1D1D1F", weight: 600, spacing: -1 })}
      ${centered("minnow", heroPalette, W, H, 760, 300, -6, 120)}
      ${label(W / 2, H - 28, "UNOFFICIAL PROPOSAL DEMO — STARK LAB", { size: 14, anchor: "middle", spacing: 3 })}`;
    await render("og.png", W, H, inner, { format: "png" });
  }
}

console.log("Generating DEMO placeholder images…");
await productImages();
await siteImages();
console.log("Done.");
