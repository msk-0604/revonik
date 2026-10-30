/**
 * オリジナルの仮画像（DEMO IMAGE）を生成する。
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
const NOTICE = "ORIGINAL PLACEHOLDER — NOT AN OFFICIAL PRODUCT PHOTO";

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
    <circle cx="${ax}" cy="${ringY}" r="${s(18)}" stroke="#aab1ba" stroke-width="${s(5)}"/>
    <path d="M${ax + dx},${top} L${ax + dx},${end}" stroke="#c8ced5" stroke-width="${s(6)}"/>
    <path d="M${ax + dx},${end} C${ax + dx},${ay + 200 * k} ${ax + dx - 56 * k},${ay + 200 * k} ${ax + dx - 60 * k},${end} L${ax + dx - 60 * k},${ay + 122 * k}" stroke="#8d949d" stroke-width="${s(5.5)}"/>
    <path d="M${ax + dx},${end} C${ax + dx},${ay + 200 * k} ${ax + dx + 56 * k},${ay + 200 * k} ${ax + dx + 60 * k},${end} L${ax + dx + 60 * k},${ay + 122 * k}" stroke="#d7dce2" stroke-width="${s(5.5)}"/>
    <path d="M${ax + dx + 60 * k},${ay + 124 * k} L${ax + dx + 48 * k},${ay + 140 * k}" stroke="#d7dce2" stroke-width="${s(4)}"/>
    <path d="M${ax + dx},${end} C${ax + dx + 4 * k},${ay + 186 * k} ${ax + dx + 18 * k},${ay + 194 * k} ${ax + dx + 24 * k},${ay + 172 * k}" stroke="#b3bac2" stroke-width="${s(5)}" opacity="0.8"/>
    <path d="M${ax + dx + 1.5 * k},${top + 6 * k} L${ax + dx + 1.5 * k},${end - 8 * k}" stroke="#ffffff" stroke-width="${s(1.6)}" opacity="0.55"/>
  </g>`;
}

/** ルアー1体を <g> として返す */
function lure({ shape, palette, x, y, scale, rotate = 0, glow = true }) {
  const sh = shapes[shape];
  const id = `l${uid++}`;
  const { back, body, belly, accent = body, clear = false } = palette;
  const h = sh.bottom - sh.top;
  const [ex, ey, er] = sh.eye;
  const bodyOpacity = clear ? 0.78 : 1;

  const lip = sh.lip
    ? `<path d="${sh.lip}" fill="url(#${id}-lip)" stroke="rgba(255,255,255,0.45)" stroke-width="3"/>`
    : "";
  const wire = sh.wire
    ? `<path d="${sh.wire}" fill="none" stroke="#c9cfd6" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="${sh.wire}" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.6" stroke-linecap="round"/>`
    : "";
  const tie = sh.tie
    ? `<circle cx="${sh.tie[0]}" cy="${sh.tie[1]}" r="${h * 0.035 + 6}" fill="none" stroke="#c9cfd6" stroke-width="5"/>`
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
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.32"/>
        <stop offset="1" stop-color="#9fb0c0" stop-opacity="0.12"/>
      </linearGradient>
      <radialGradient id="${id}-hl" cx="0.45" cy="0.18" r="0.6">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="${id}-sh" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#000" stop-opacity="0"/>
        <stop offset="0.7" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity="0.45"/>
      </linearGradient>
      <pattern id="${id}-sc" width="44" height="30" patternUnits="userSpaceOnUse">
        <path d="M0,30 C10,10 34,10 44,30 M-22,15 C-12,-5 12,-5 22,15 M22,15 C32,-5 56,-5 66,15" fill="none" stroke="#ffffff" stroke-width="1.6"/>
      </pattern>
      <clipPath id="${id}-c"><path d="${sh.body}"/></clipPath>
      <filter id="${id}-b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${h * 0.06}"/></filter>
    </defs>
    ${glow ? `<ellipse cx="500" cy="${sh.bottom + h * 0.55}" rx="560" ry="${h * 0.12}" fill="#000" opacity="0.55" filter="url(#${id}-b)"/>` : ""}
    ${sh.hooks.map(([hx, hy, k], i) => hook(hx, hy, k, i === sh.hooks.length - 1 && hx >= 1000)).join("")}
    ${wire}
    ${lip}
    <path d="${sh.body}" fill="url(#${id}-g)" opacity="${bodyOpacity}"/>
    <g clip-path="url(#${id}-c)">
      <rect x="-50" y="${sh.top}" width="1100" height="${h}" fill="url(#${id}-sc)" opacity="0.16"/>
      <ellipse cx="560" cy="${sh.top + h * 0.5}" rx="520" ry="${h * 0.07}" fill="${accent}" opacity="0.42"/>
      <ellipse cx="470" cy="${sh.top + h * 0.2}" rx="420" ry="${h * 0.2}" fill="url(#${id}-hl)"/>
      <rect x="-50" y="${sh.top}" width="1100" height="${h}" fill="url(#${id}-sh)"/>
      <ellipse cx="520" cy="${sh.bottom}" rx="560" ry="${h * 0.16}" fill="#000" opacity="0.18"/>
      <path d="${sh.gill}" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="5"/>
      <path d="${sh.gill}" transform="translate(6 0)" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    </g>
    <path d="${sh.body}" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="2.5"/>
    <circle cx="${ex}" cy="${ey}" r="${er}" fill="#e9ecef"/>
    <circle cx="${ex}" cy="${ey}" r="${er * 0.86}" fill="#c9a43a"/>
    <circle cx="${ex - er * 0.08}" cy="${ey}" r="${er * 0.5}" fill="#0b0c0e"/>
    <circle cx="${ex - er * 0.3}" cy="${ey - er * 0.32}" r="${er * 0.2}" fill="#ffffff" opacity="0.9"/>
    ${tie}
  </g>`;
}

const label = (x, y, text, { size = 22, anchor = "start", opacity = 0.75, weight = 600, spacing = 4 } = {}) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" fill="#F5F5F5" fill-opacity="${opacity}" text-anchor="${anchor}">${text}</text>`;

function stage(w, h, { spotX = 0.5, spotY = 0.48, grid = true } = {}) {
  const gridLines = [];
  if (grid) {
    const step = Math.round(Math.min(w, h) / 12);
    for (let gx = step; gx < w; gx += step) gridLines.push(`<line x1="${gx}" y1="0" x2="${gx}" y2="${h}"/>`);
    for (let gy = step; gy < h; gy += step) gridLines.push(`<line x1="0" y1="${gy}" x2="${w}" y2="${gy}"/>`);
  }
  return `
  <defs>
    <radialGradient id="spot" cx="${spotX}" cy="${spotY}" r="0.62">
      <stop offset="0" stop-color="#2a2e34"/>
      <stop offset="0.45" stop-color="#15171A"/>
      <stop offset="1" stop-color="#08090B"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#08090B"/>
  <rect width="${w}" height="${h}" fill="url(#spot)"/>
  <g stroke="#DCE1E5" stroke-opacity="0.035" stroke-width="1">${gridLines.join("")}</g>`;
}

const svg = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`;

async function render(file, w, h, inner, { format = "webp", quality = 86 } = {}) {
  const target = out(file);
  await mkdir(path.dirname(target), { recursive: true });
  let img = sharp(Buffer.from(svg(w, h, inner)));
  img = format === "png" ? img.png() : img.webp({ quality });
  await writeFile(target, await img.toBuffer());
  console.log("  ✓", file);
}

/** ルアーが描画範囲 maxW × maxH に収まるスケール */
function fitScale(shape, maxW, maxH) {
  const sh = shapes[shape];
  const h = sh.bottom - sh.top;
  const lureW = 1000 + 170 + 80;
  const lureH = h + 200 * sh.hooks[0][2];
  return Math.min(maxW / lureW, maxH / lureH);
}

/* ---------- product images ---------- */
async function productImages() {
  const W = 1600;
  const H = 1200;
  for (const p of products) {
    for (const c of p.colors) {
      const scale = fitScale(p.shape, 1080, 720);
      const sh = shapes[p.shape];
      const cy = H * 0.5 - ((sh.bottom + sh.top) / 2) * scale - 60 * scale;
      const inner = `
        ${stage(W, H)}
        ${lure({ shape: p.shape, palette: c.palette, x: W / 2 + 60 * scale, y: cy, scale, rotate: -6 })}
        <line x1="64" y1="64" x2="64" y2="110" stroke="#DCE1E5" stroke-opacity="0.6" stroke-width="2"/>
        ${label(84, 84, "DEMO IMAGE", { size: 22 })}
        ${label(84, 112, NOTICE, { size: 13, opacity: 0.45, weight: 500, spacing: 2 })}
        ${label(W - 64, 96, p.name, { size: 28, anchor: "end", opacity: 0.55, weight: 800, spacing: 6 })}
        ${label(64, H - 64, "STARK LAB / PROPOSAL", { size: 14, opacity: 0.35, weight: 500 })}`;
      await render(`products/${p.slug}/${c.id}.webp`, W, H, inner);
    }
  }
}

/* ---------- site images ---------- */
const heroPalette = { back: "#111316", body: "#7c8591", belly: "#e6e9ec", accent: "#DCE1E5" };

function caustics(w, h, count, seed = 1) {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const lines = [];
  for (let i = 0; i < count; i++) {
    const y = rnd() * h;
    const amp = 10 + rnd() * 40;
    const len = w * (0.3 + rnd() * 0.7);
    const x0 = rnd() * w * 0.6 - w * 0.1;
    lines.push(
      `<path d="M${x0},${y} C${x0 + len * 0.3},${y - amp} ${x0 + len * 0.6},${y + amp} ${x0 + len},${y}" stroke="#DCE1E5" stroke-opacity="${(0.02 + rnd() * 0.06).toFixed(3)}" stroke-width="${(1 + rnd() * 2).toFixed(1)}" fill="none"/>`,
    );
  }
  return lines.join("");
}

async function siteImages() {
  // HERO (desktop)
  {
    const W = 2560;
    const H = 1440;
    const inner = `
      ${stage(W, H, { spotX: 0.62, spotY: 0.5, grid: false })}
      ${caustics(W, H, 70, 7)}
      ${lure({ shape: "minnow", palette: heroPalette, x: W * 0.62, y: H * 0.5, scale: 1.45, rotate: -10 })}
      `;
    await render("hero.webp", W, H, inner, { quality: 82 });
  }
  // HERO (mobile)
  {
    const W = 1080;
    const H = 1920;
    const inner = `
      ${stage(W, H, { spotX: 0.5, spotY: 0.62, grid: false })}
      ${caustics(W, H, 50, 3)}
      ${lure({ shape: "minnow", palette: heroPalette, x: W * 0.54, y: H * 0.3, scale: 0.8, rotate: -14 })}
      `;
    await render("hero-mobile.webp", W, H, inner, { quality: 82 });
  }
  // PHILOSOPHY — 水面
  {
    const W = 1800;
    const H = 1200;
    const bands = Array.from({ length: 46 }, (_, i) => {
      const y = H * 0.38 + Math.pow(i / 46, 1.6) * H * 0.62;
      const op = 0.03 + (i / 46) * 0.12;
      return `<path d="M0,${y} C${W * 0.25},${y - 6 - i * 0.3} ${W * 0.5},${y + 8 + i * 0.4} ${W},${y - 4}" stroke="#DCE1E5" stroke-opacity="${op.toFixed(3)}" stroke-width="${1 + i * 0.05}" fill="none"/>`;
    }).join("");
    const inner = `
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#08090B"/><stop offset="0.36" stop-color="#1b1e22"/><stop offset="0.4" stop-color="#2b2f35"/><stop offset="1" stop-color="#08090B"/>
      </linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#sky)"/>
      ${bands}
      <rect x="0" y="${H * 0.385}" width="${W}" height="2" fill="#DCE1E5" fill-opacity="0.25"/>
      ${label(64, H - 64, "DEMO IMAGE", { size: 18, opacity: 0.4 })}`;
    await render("philosophy.webp", W, H, inner);
  }
  // WATER — 波紋
  {
    const W = 1800;
    const H = 1200;
    const rings = Array.from({ length: 14 }, (_, i) => {
      const r = 40 + i * 70;
      return `<ellipse cx="${W * 0.55}" cy="${H * 0.55}" rx="${r * 1.6}" ry="${r * 0.5}" fill="none" stroke="#DCE1E5" stroke-opacity="${(0.22 - i * 0.014).toFixed(3)}" stroke-width="${2.5 - i * 0.12}"/>`;
    }).join("");
    const inner = `${stage(W, H, { spotX: 0.55, spotY: 0.55, grid: false })}${rings}${label(64, H - 64, "DEMO IMAGE", { size: 18, opacity: 0.4 })}`;
    await render("water.webp", W, H, inner);
  }
  // BLUEPRINT — 設計図
  {
    const W = 1800;
    const H = 1200;
    const sh = shapes.minnow;
    const sc = 1.05;
    const ox = 360;
    const oy = 560;
    const tr = `translate(${ox} ${oy}) scale(${sc})`;
    const dim = (x1, x2, y, text) => `
      <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#DCE1E5" stroke-opacity="0.5" stroke-width="1.5"/>
      <line x1="${x1}" y1="${y - 14}" x2="${x1}" y2="${y + 14}" stroke="#DCE1E5" stroke-opacity="0.5" stroke-width="1.5"/>
      <line x1="${x2}" y1="${y - 14}" x2="${x2}" y2="${y + 14}" stroke="#DCE1E5" stroke-opacity="0.5" stroke-width="1.5"/>
      ${label((x1 + x2) / 2, y - 18, text, { size: 16, anchor: "middle", opacity: 0.6, weight: 500, spacing: 3 })}`;
    const inner = `
      ${stage(W, H, { spotX: 0.5, spotY: 0.5 })}
      <g transform="${tr}" fill="none" stroke="#DCE1E5" stroke-width="${2 / sc}">
        <path d="${sh.body}" stroke-opacity="0.85"/>
        <path d="${sh.lip}" stroke-opacity="0.55"/>
        <path d="${sh.gill}" stroke-opacity="0.45"/>
        <circle cx="${sh.eye[0]}" cy="${sh.eye[1]}" r="${sh.eye[2]}" stroke-opacity="0.6"/>
        <line x1="-200" y1="0" x2="1100" y2="0" stroke-opacity="0.25" stroke-dasharray="12 10"/>
        <line x1="450" y1="-180" x2="450" y2="180" stroke-opacity="0.25" stroke-dasharray="12 10"/>
        <circle cx="330" cy="92" r="10" stroke-opacity="0.6"/><circle cx="700" cy="80" r="10" stroke-opacity="0.6"/>
        <ellipse cx="560" cy="0" rx="90" ry="34" stroke-opacity="0.35"/>
      </g>
      ${dim(ox, ox + 1000 * sc, oy - 210, "L  ———  mm (DEMO)")}
      ${dim(ox + 330 * sc, ox + 700 * sc, oy + 200, "HOOK PITCH (DEMO)")}
      ${label(ox + 560 * sc, oy - 60, "WEIGHT CHAMBER", { size: 13, anchor: "middle", opacity: 0.45, weight: 500, spacing: 3 })}
      <line x1="64" y1="64" x2="64" y2="110" stroke="#DCE1E5" stroke-opacity="0.6" stroke-width="2"/>
      ${label(84, 84, "DEMO IMAGE", { size: 22 })}
      ${label(84, 112, "CONCEPT DRAWING — NOT AN ACTUAL DESIGN DOCUMENT", { size: 13, opacity: 0.45, weight: 500, spacing: 2 })}`;
    await render("blueprint.webp", W, H, inner);
  }
  // VIDEO
  {
    const W = 1920;
    const H = 1080;
    const inner = `
      ${stage(W, H, { spotX: 0.5, spotY: 0.5, grid: false })}
      ${caustics(W, H, 40, 11)}
      ${lure({ shape: "shad", palette: { back: "#1c2128", body: "#8d98aa", belly: "#f1f3f5", accent: "#c9d36a" }, x: W * 0.5, y: H * 0.5, scale: 0.72, rotate: -4 })}
      <rect width="${W}" height="${H}" fill="#08090B" fill-opacity="0.35"/>
      ${label(64, H - 64, "DEMO IMAGE — VIDEO THUMBNAIL", { size: 18, opacity: 0.45 })}`;
    await render("video.webp", W, H, inner);
  }
  // NEWS thumbnails
  const newsShapes = { PRODUCT: "crankbait", EVENT: "vibration", BRAND: "shad", MEDIA: "minnow" };
  for (const [cat, shape] of Object.entries(newsShapes)) {
    const W = 1600;
    const H = 1000;
    const inner = `
      ${stage(W, H, { spotX: 0.66, spotY: 0.5 })}
      ${label(72, H * 0.58, cat, { size: 190, opacity: 0.06, weight: 900, spacing: 0 })}
      ${lure({ shape, palette: heroPalette, x: W * 0.62, y: H * 0.46, scale: fitScale(shape, 900, 620), rotate: -8 })}
      ${label(72, 96, "DEMO IMAGE", { size: 22 })}
      ${label(72, 124, "SAMPLE ARTICLE THUMBNAIL", { size: 13, opacity: 0.45, weight: 500, spacing: 2 })}`;
    await render(`news-${cat.toLowerCase()}.webp`, W, H, inner);
  }
  // MEDIA thumbnails
  const mediaArt = {
    instagram: `<rect x="650" y="350" width="300" height="300" rx="80" fill="none" stroke="#DCE1E5" stroke-opacity="0.7" stroke-width="16"/><circle cx="800" cy="500" r="72" fill="none" stroke="#DCE1E5" stroke-opacity="0.7" stroke-width="16"/><circle cx="890" cy="410" r="14" fill="#DCE1E5" fill-opacity="0.7"/>`,
    youtube: `<rect x="620" y="380" width="360" height="240" rx="60" fill="none" stroke="#DCE1E5" stroke-opacity="0.7" stroke-width="16"/><path d="M760,440 L870,500 L760,560 Z" fill="#DCE1E5" fill-opacity="0.75"/>`,
    store: `<path d="M640,420 L960,420 L930,640 L670,640 Z" fill="none" stroke="#DCE1E5" stroke-opacity="0.7" stroke-width="16" stroke-linejoin="round"/><path d="M720,420 C720,330 880,330 880,420" fill="none" stroke="#DCE1E5" stroke-opacity="0.7" stroke-width="16"/>`,
    article: `<rect x="650" y="330" width="300" height="360" rx="20" fill="none" stroke="#DCE1E5" stroke-opacity="0.7" stroke-width="16"/>${[420, 480, 540, 600].map((y) => `<line x1="700" y1="${y}" x2="${y === 600 ? 820 : 900}" y2="${y}" stroke="#DCE1E5" stroke-opacity="0.5" stroke-width="12" stroke-linecap="round"/>`).join("")}`,
  };
  for (const [kind, art] of Object.entries(mediaArt)) {
    const W = 1600;
    const H = 1000;
    const inner = `${stage(W, H)}${caustics(W, H, 30, kind.length)}${art}${label(72, 96, "DEMO IMAGE", { size: 22 })}`;
    await render(`media-${kind}.webp`, W, H, inner);
  }
  // OGP
  {
    const W = 1200;
    const H = 630;
    const inner = `
      ${stage(W, H, { spotX: 0.68, spotY: 0.5, grid: false })}
      ${caustics(W, H, 30, 5)}
      ${lure({ shape: "minnow", palette: heroPalette, x: W * 0.7, y: H * 0.5, scale: 0.56, rotate: -10 })}
      ${label(72, 290, "REVONIK", { size: 92, opacity: 1, weight: 900, spacing: 10 })}
      ${label(76, 340, "ENGINEERED TO PERFORM.", { size: 26, opacity: 0.8, weight: 600, spacing: 6 })}
      ${label(76, H - 56, "UNOFFICIAL PROPOSAL DEMO — STARK LAB", { size: 16, opacity: 0.55, weight: 500, spacing: 3 })}`;
    await render("og.png", W, H, inner, { format: "png" });
  }
}

console.log("Generating DEMO placeholder images…");
await productImages();
await siteImages();
console.log("Done.");
