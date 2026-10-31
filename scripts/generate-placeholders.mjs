/**
 * 背景・図版系の仮画像（DEMO IMAGE）を SVG から生成する。
 * ルアーの画像（商品・ヒーロー・ニュース・OGP）は scripts/render-lures.mjs が3Dレンダリングで生成する。
 * REVONIK の写真・ロゴは一切使用していない。SVG で描いたイラストを sharp で WebP / PNG に変換する。
 *
 *   npm run images
 *
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

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

const demoMark = (W, H, text = "DEMO IMAGE") => label(W / 2, H - 40, text, { size: 18, anchor: "middle", opacity: 0.9, spacing: 5 });

/* ---------- site images ---------- */
function rings(cx, cy, count, rx0, step, color = "#1D1D1F", max = 0.14) {
  return Array.from({ length: count }, (_, i) => {
    const r = rx0 + i * step;
    return `<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.7}" ry="${r * 0.42}" fill="none" stroke="${color}" stroke-opacity="${(max - (i * max) / (count + 1)).toFixed(3)}" stroke-width="2"/>`;
  }).join("");
}

async function siteImages() {
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
}

console.log("Generating DEMO placeholder images…");
await siteImages();
console.log("Done.");
