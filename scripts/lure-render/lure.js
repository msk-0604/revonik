/**
 * オリジナルのルアー3Dモデルを手続き的に生成して描画する（ブラウザ側・Three.js）。
 * REVONIK の実物の形状・写真を再現したものではなく、カテゴリーごとの一般的な形状をもとにした仮モデル。
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const L = 100; // 全長（モデル単位）

/* ---------------- 形状定義 ----------------
 * top / bot / w：最大の高さ（上・下）と半幅。tmTop / tmBot / tmW：最大になる位置（0=鼻先, 1=尾）。
 * 鼻先側は楕円で丸め、尾側は (1 - u^tp)^tq で丸く閉じる（tail は最小の太さの比率）。
 */
const SHAPES = {
  minnow: {
    top: 9.4, bot: 8.6, w: 6.0, tmTop: 0.34, tmBot: 0.28, tmW: 0.3, tail: 0.08, nose: 0.55, tp: 1.7, tq: 0.75,
    n: 2.3,
    eye: { t: 0.085, v: 0.62, r: 2.9 },
    gill: 0.175,
    lip: { t: 0.03, len: 19, width: 10, angle: 32, square: 0.25 },
    tie: "lip",
    hooks: [{ t: 0.36 }, { t: 0.72 }],
    hookScale: 0.85,
  },
  shad: {
    top: 20, bot: 17.5, w: 6.8, tmTop: 0.38, tmBot: 0.34, tmW: 0.32, tail: 0.12, nose: 0.6, tp: 2.2, tq: 0.6,
    n: 3.6,
    eye: { t: 0.11, v: 0.62, r: 4.2 },
    gill: 0.215,
    lip: { t: 0.035, len: 21, width: 13, angle: 40, square: 0.35 },
    tie: "lip",
    hooks: [{ t: 0.44 }, { t: 1 }],
    hookScale: 1.15,
  },
  crankbait: {
    top: 28.5, bot: 26, w: 20.5, tmTop: 0.42, tmBot: 0.4, tmW: 0.38, tail: 0.14, nose: 0.7, tp: 2.4, tq: 0.55,
    n: 2.15,
    eye: { t: 0.14, v: 0.64, r: 5.4 },
    gill: 0.26,
    lip: { t: 0.04, len: 22, width: 20, angle: 36, square: 0.8 },
    tie: "lip",
    hooks: [{ t: 0.47 }, { t: 1 }],
    hookScale: 1.4,
  },
  vibration: {
    top: 26.5, bot: 20, w: 5.8, tmTop: 0.44, tmBot: 0.5, tmW: 0.4, tail: 0.1, nose: 0.75, tp: 2.0, tq: 0.65,
    n: 3.2,
    eye: { t: 0.13, v: 0.66, r: 4.4 },
    gill: 0.24,
    wire: true,
    tie: "back",
    hooks: [{ t: 0.42 }, { t: 1 }],
    hookScale: 1.25,
  },
};

/** 鼻先は楕円、尾は余弦カーブで細くなるプロファイル（0〜1） */
function envelope(t, tm, s) {
  if (t <= tm) {
    const u = (tm - t) / tm;
    return Math.pow(Math.max(0, 1 - u * u), s.nose);
  }
  const u = (t - tm) / (1 - tm);
  return s.tail + (1 - s.tail) * Math.pow(Math.max(0, 1 - Math.pow(u, s.tp)), s.tq);
}

function profileFns(shape) {
  return {
    top: (t) => shape.top * envelope(t, shape.tmTop, shape),
    bot: (t) => -shape.bot * envelope(t, shape.tmBot, shape),
    w: (t) => shape.w * envelope(t, shape.tmW, shape),
  };
}

const sgnPow = (v, e) => Math.sign(v) * Math.pow(Math.abs(v), e);
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ---------------- テクスチャ ---------------- */
function scaleTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const g = c.getContext("2d");
  g.fillStyle = "#808080";
  g.fillRect(0, 0, c.width, c.height);
  const sx = 22;
  const sy = 14;
  g.lineWidth = 2.2;
  for (let row = -1; row < c.height / sy + 1; row++) {
    for (let col = -1; col < c.width / sx + 1; col++) {
      const x = col * sx + (row % 2 ? sx / 2 : 0);
      const y = row * sy;
      const grd = g.createRadialGradient(x, y, 1, x, y, sx * 0.75);
      grd.addColorStop(0, "#9a9a9a");
      grd.addColorStop(1, "#7a7a7a");
      g.fillStyle = grd;
      g.beginPath();
      g.arc(x, y, sx * 0.62, 0, Math.PI);
      g.fill();
      g.strokeStyle = "#5c5c5c";
      g.beginPath();
      g.arc(x, y, sx * 0.62, 0.15, Math.PI - 0.15);
      g.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 2);
  return t;
}

function eyeTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const r = 128;
  g.fillStyle = "#e9e4d6";
  g.beginPath();
  g.arc(r, r, r, 0, Math.PI * 2);
  g.fill();
  const iris = g.createRadialGradient(r - 10, r - 10, 10, r, r, r * 0.9);
  iris.addColorStop(0, "#f6d77a");
  iris.addColorStop(0.55, "#d29a22");
  iris.addColorStop(1, "#7a4d08");
  g.fillStyle = iris;
  g.beginPath();
  g.arc(r, r, r * 0.88, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#0b0b0c";
  g.beginPath();
  g.arc(r + 4, r + 2, r * 0.46, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "rgba(255,255,255,0.95)";
  g.beginPath();
  g.arc(r - 26, r - 30, r * 0.13, 0, Math.PI * 2);
  g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ---------------- 部品 ---------------- */
function buildBody(shape, palette, mats) {
  const f = profileFns(shape);
  const NS = 240;
  const NA = 120;
  const pos = [];
  const col = [];
  const uv = [];
  const back = new THREE.Color(palette.back);
  const body = new THREE.Color(palette.body);
  const belly = new THREE.Color(palette.belly);
  const accent = new THREE.Color(palette.accent ?? palette.body);
  const tmp = new THREE.Color();
  for (let i = 0; i <= NS; i++) {
    const t = (1 - Math.cos((Math.PI * i) / NS)) / 2;
    const cap = i === NS ? 0 : 1; // 尾の端を閉じる
    const top = f.top(t);
    const bot = f.bot(t);
    const w = f.w(t) * cap;
    const yc = (top + bot) / 2;
    const ry = ((top - bot) / 2) * cap;
    for (let j = 0; j <= NA; j++) {
      const th = (Math.PI * 2 * j) / NA;
      const cx = sgnPow(Math.cos(th), 2 / shape.n);
      const sy = sgnPow(Math.sin(th), 2 / shape.n);
      const y = yc + ry * sy;
      pos.push(t * L, y, w * cx);
      uv.push(t, j / NA);
      // 縦方向のグラデーション（腹 → 体側 → 背）＋ 側線のアクセント
      const v = (sy + 1) / 2;
      tmp.copy(belly).lerp(body, smooth(0.18, 0.5, v)).lerp(back, smooth(0.6, 0.86, v));
      const stripe = Math.exp(-Math.pow((v - 0.56) / 0.045, 2)) * 0.55 * smooth(0.05, 0.25, t) * (1 - smooth(0.85, 1, t));
      tmp.lerp(accent, stripe);
      // エラ蓋のライン
      const gill = Math.exp(-Math.pow((t - shape.gill) / 0.0045, 2)) * 0.28;
      tmp.multiplyScalar(1 - gill);
      col.push(tmp.r, tmp.g, tmp.b);
    }
  }
  const idx = [];
  for (let i = 0; i < NS; i++) {
    for (let j = 0; j < NA; j++) {
      const a = i * (NA + 1) + j;
      const b = a + NA + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, palette.clear ? mats.clearBody : mats.body);
  mesh.castShadow = true;
  return { mesh, f };
}

function surfaceZ(shape, f, t, v) {
  const top = f.top(t);
  const bot = f.bot(t);
  const yc = (top + bot) / 2;
  const ry = (top - bot) / 2;
  const sy = v * 2 - 1;
  const s = sgnPow(sy, shape.n / 2);
  const c = Math.sqrt(Math.max(0, 1 - s * s));
  return { y: yc + ry * sy, z: f.w(t) * Math.pow(c, 2 / shape.n) };
}

function buildEyes(shape, f, mats) {
  const g = new THREE.Group();
  const { t, v, r } = shape.eye;
  const p = surfaceZ(shape, f, t, v);
  const x = t * L;
  for (const side of [1, -1]) {
    const disc = new THREE.Mesh(new THREE.CircleGeometry(r, 48), mats.eye);
    disc.position.set(x, p.y, side * (p.z + 0.12));
    if (side < 0) disc.rotation.y = Math.PI;
    disc.rotation.x = -0.08 * side;
    const dome = new THREE.Mesh(new THREE.SphereGeometry(r * 1.02, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), mats.eyeDome);
    dome.rotation.x = side * Math.PI / 2;
    dome.scale.set(1, 0.38, 1);
    dome.position.set(x, p.y, side * (p.z + 0.1));
    g.add(disc, dome);
  }
  return g;
}

function buildLip(shape, f, mats) {
  const { t, len, width, angle, square } = shape.lip;
  const s = new THREE.Shape();
  const hw = width / 2;
  const tipW = hw * (0.55 + square * 0.4);
  const rr = Math.min(tipW, 5) * (1 - square * 0.6);
  s.moveTo(0, -hw * 0.82);
  s.lineTo(len - rr, -tipW);
  s.quadraticCurveTo(len, -tipW, len, -tipW + rr);
  s.lineTo(len, tipW - rr);
  s.quadraticCurveTo(len, tipW, len - rr, tipW);
  s.lineTo(0, hw * 0.82);
  s.lineTo(0, -hw * 0.82);
  const geo = new THREE.ExtrudeGeometry(s, { depth: 0.9, bevelEnabled: true, bevelThickness: 0.25, bevelSize: 0.25, bevelSegments: 3, curveSegments: 16 });
  geo.translate(0, 0, -0.45);
  const lip = new THREE.Mesh(geo, mats.lip);
  // 形状の x（長さ）を前方下向き、y（幅）を z 方向へ
  lip.rotation.x = Math.PI / 2;
  const pivot = new THREE.Group();
  pivot.add(lip);
  pivot.rotation.z = Math.PI + (angle * Math.PI) / 180;
  const x = t * L + 2;
  pivot.position.set(x, f.bot(t) * 0.55 + f.top(t) * 0.0, 0);
  pivot.children[0].castShadow = true;
  // ラインアイ（リップ上）
  const tipDir = new THREE.Vector3(-Math.cos((angle * Math.PI) / 180), -Math.sin((angle * Math.PI) / 180), 0);
  const tiePos = pivot.position.clone().add(tipDir.clone().multiplyScalar(len * 0.55)).add(new THREE.Vector3(0, 1.4, 0));
  return { pivot, tiePos };
}

function buildWire(f, mats) {
  const y0 = f.bot(0.06) * 0.4;
  const a = new THREE.Vector3(7, y0, 2.6);
  const pts = [
    a,
    new THREE.Vector3(-2, y0 - 5, 2.8),
    new THREE.Vector3(-13, y0 - 12, 3),
    new THREE.Vector3(-16.5, y0 - 15.5, 0),
    new THREE.Vector3(-13, y0 - 12, -3),
    new THREE.Vector3(-2, y0 - 5, -2.8),
    new THREE.Vector3(7, y0, -2.6),
  ];
  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.62, 12, false), mats.wire);
  mesh.castShadow = true;
  return mesh;
}

function torus(r, tube, mat) {
  const m = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 12, 48), mat);
  m.castShadow = true;
  return m;
}

/** トレブルフック（スプリットリング付き）。anchor はワールド座標、常に鉛直に吊り下げる */
function buildTreble(anchor, k, mats, yaw = 0.5) {
  const g = new THREE.Group();
  const tube = 0.33 * k;
  const hanger = torus(0.95 * k, 0.26 * k, mats.metal);
  hanger.position.set(0, -0.6 * k, 0);
  g.add(hanger);
  const ringR = 2.2 * k;
  for (const dz of [-0.18 * k, 0.18 * k]) {
    const ring = torus(ringR, 0.24 * k, mats.metal);
    ring.rotation.y = Math.PI / 2.4;
    ring.position.set(0, -1.2 * k - ringR, dz);
    g.add(ring);
  }
  const eyeY = -1.2 * k - ringR * 2 + 0.2 * k;
  const eye = torus(0.85 * k, 0.28 * k, mats.metal);
  eye.position.set(0, eyeY - 0.6 * k, 0);
  g.add(eye);
  const S = 10.5 * k;
  const rb = 3.1 * k;
  const P = 5.6 * k;
  const top = eyeY - 1.4 * k;
  for (let i = 0; i < 3; i++) {
    const a = yaw + (i * Math.PI * 2) / 3;
    const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const pts = [];
    pts.push(new THREE.Vector3(0, top, 0));
    pts.push(new THREE.Vector3(0, top - S * 0.5, 0));
    pts.push(new THREE.Vector3(0, top - S, 0));
    for (let s = 1; s <= 10; s++) {
      const ang = Math.PI + (Math.PI * s) / 10;
      const r = rb;
      const off = rb + r * Math.cos(ang);
      pts.push(dir.clone().multiplyScalar(off).add(new THREE.Vector3(0, top - S + r * Math.sin(ang), 0)));
    }
    pts.push(dir.clone().multiplyScalar(2 * rb - 0.15 * k).add(new THREE.Vector3(0, top - S + P * 0.6, 0)));
    pts.push(dir.clone().multiplyScalar(2 * rb - 0.55 * k).add(new THREE.Vector3(0, top - S + P, 0)));
    const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
    const geo = new THREE.TubeGeometry(curve, 80, tube, 10, false);
    // 先端を細く
    const p = geo.attributes.position;
    const center = new THREE.Vector3();
    for (let v = 0; v < p.count; v++) {
      const seg = Math.floor(v / 11) / 80;
      if (seg > 0.88) {
        const tt = curve.getPointAt(Math.min(seg, 1));
        center.copy(tt);
        const q = new THREE.Vector3(p.getX(v), p.getY(v), p.getZ(v));
        q.sub(center).multiplyScalar(Math.max(0.15, 1 - (seg - 0.88) / 0.12)).add(center);
        p.setXYZ(v, q.x, q.y, q.z);
      }
    }
    geo.computeVertexNormals();
    const hook = new THREE.Mesh(geo, mats.metal);
    hook.castShadow = true;
    g.add(hook);
    // バーブ
    const barbBase = dir.clone().multiplyScalar(2 * rb - 0.4 * k).add(new THREE.Vector3(0, top - S + P * 0.72, 0));
    const barb = new THREE.Mesh(new THREE.ConeGeometry(0.42 * k, 1.6 * k, 10), mats.metal);
    barb.position.copy(barbBase).add(dir.clone().multiplyScalar(-0.5 * k));
    barb.lookAt(barbBase.clone().add(dir.clone().multiplyScalar(-3)).add(new THREE.Vector3(0, -2, 0)));
    barb.rotateX(Math.PI / 2);
    g.add(barb);
  }
  g.position.copy(anchor);
  return g;
}

/* ---------------- シーン ---------------- */
let renderer;
let pmrem;
let envTex;
const mats = {};
let texturesReady = false;

function setup(w, h) {
  if (!renderer) {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    document.body.appendChild(renderer.domElement);
    pmrem = new THREE.PMREMGenerator(renderer);
    envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  }
  renderer.setSize(w, h, false);
  if (!texturesReady) {
    const scales = scaleTexture();
    mats.body = new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      roughness: 0.3,
      metalness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      bumpMap: scales,
      bumpScale: 0.9,
      iridescence: 0.35,
      iridescenceIOR: 1.25,
      iridescenceThicknessRange: [200, 500],
      envMapIntensity: 1.1,
    });
    mats.clearBody = new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      roughness: 0.12,
      metalness: 0,
      transmission: 0.45,
      thickness: 8,
      ior: 1.45,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      bumpMap: scales,
      bumpScale: 0.2,
    });
    mats.eye = new THREE.MeshPhysicalMaterial({ map: eyeTexture(), roughness: 0.35, clearcoat: 1 });
    mats.eyeDome = new THREE.MeshPhysicalMaterial({ transmission: 1, roughness: 0, thickness: 0.6, ior: 1.5, transparent: true, clearcoat: 1 });
    mats.lip = new THREE.MeshPhysicalMaterial({
      color: 0xdfe8ee,
      transmission: 0.78,
      roughness: 0.08,
      thickness: 2.5,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      attenuationColor: new THREE.Color(0x9fb3c2),
      attenuationDistance: 3,
      envMapIntensity: 1.6,
    });
    mats.metal = new THREE.MeshStandardMaterial({ color: 0x8a9096, metalness: 1, roughness: 0.24 });
    mats.wire = new THREE.MeshStandardMaterial({ color: 0xc9ced3, metalness: 1, roughness: 0.15 });
    texturesReady = true;
  }
}

/**
 * spec: { shape, palette, width, height, fill, rotZ, yaw, elev }
 * 返り値：透明背景の PNG（data URL）
 */
window.renderLure = function renderLure(spec) {
  const { width, height, fill = 0.78, rotZ = 4, yaw = 18, elev = 7 } = spec;
  setup(width, height);
  const shape = SHAPES[spec.shape];
  const scene = new THREE.Scene();
  scene.environment = envTex;

  const lure = new THREE.Group();
  const { mesh, f } = buildBody(shape, spec.palette, mats);
  lure.add(mesh);
  lure.add(buildEyes(shape, f, mats));
  let tiePos = null;
  if (shape.lip) {
    const lip = buildLip(shape, f, mats);
    lure.add(lip.pivot);
    tiePos = lip.tiePos;
  }
  if (shape.wire) lure.add(buildWire(f, mats));
  const tie = torus(1.1, 0.32, mats.metal);
  if (shape.tie === "back") {
    tie.position.set(0.3 * L, f.top(0.3) + 0.9, 0);
  } else if (tiePos) {
    tie.position.copy(tiePos);
    tie.rotation.y = Math.PI / 2;
  }
  lure.add(tie);

  // 鼻先を少し上げ、こちらへ向ける
  lure.position.set(-L / 2, 0, 0);
  const root = new THREE.Group();
  root.add(lure);
  root.rotation.z = (rotZ * Math.PI) / 180;
  root.rotation.y = (yaw * Math.PI) / 180;
  scene.add(root);
  root.updateMatrixWorld(true);

  // フックは本体の回転に関係なく鉛直に吊るす
  const k = shape.hookScale;
  shape.hooks.forEach((h, i) => {
    const local = h.t >= 1 ? new THREE.Vector3(L + 0.6, (f.top(1) + f.bot(1)) / 2, 0) : new THREE.Vector3(h.t * L, f.bot(h.t) + 0.3, 0);
    const world = lure.localToWorld(local.clone());
    scene.add(buildTreble(world, k, mats, 0.35 + i * 0.6));
  });

  // 外接ボックスから構図を決定
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // 接地影（水中シーン用は shadow: false で省略）
  const ground = new THREE.Mesh(new THREE.CircleGeometry(220, 64), new THREE.ShadowMaterial({ opacity: 0.16 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = box.min.y - size.y * 0.12;
  ground.receiveShadow = true;
  if (spec.shadow !== false) scene.add(ground);

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(center.x - 30, center.y + 220, center.z + 60);
  key.target.position.copy(center);
  key.castShadow = true;
  key.shadow.mapSize.set(4096, 4096);
  key.shadow.radius = 22;
  key.shadow.blurSamples = 25;
  const sc = key.shadow.camera;
  sc.left = -400;
  sc.right = 400;
  sc.top = 400;
  sc.bottom = -400;
  sc.near = 1;
  sc.far = 600;
  scene.add(key, key.target);
  const rim = new THREE.DirectionalLight(0xffffff, 0.6);
  rim.position.set(center.x + 150, center.y + 60, center.z - 120);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xe8e8ea, 0.5));

  const fov = 16;
  const camera = new THREE.PerspectiveCamera(fov, width / height, 1, 4000);
  const aspect = width / height;
  const visH = Math.max(size.y * 1.12, size.x / aspect) / fill;
  const dist = visH / 2 / Math.tan(((fov / 2) * Math.PI) / 180);
  const el = (elev * Math.PI) / 180;
  camera.position.set(center.x, center.y + Math.sin(el) * dist, center.z + Math.cos(el) * dist);
  camera.lookAt(center.x, center.y - size.y * 0.04, center.z);

  renderer.setClearColor(0x000000, 0);
  renderer.render(scene, camera);
  const url = renderer.domElement.toDataURL("image/png");
  scene.traverse((o) => o.geometry?.dispose?.());
  return url;
};

window.lureReady = true;
