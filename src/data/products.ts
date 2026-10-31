import type { Product, ProductSpecs } from "@/types";

/**
 * 商品データ（一元管理）
 *
 * - 値は 2026年10月時点で、販売店・釣りメディアの公開情報を照合したもの。
 *   REVONIK 公式ストア／公式SNSとの照合は未実施のため verification は "retailer"。
 * - 不明な項目は null → 画面上は「情報未登録」と表示される。
 * - 商品説明は掲載情報を Stark Lab が要約した文章で、公式の文言ではない。
 * - palette はプレースホルダー画像生成用の近似色。実物の色味とは異なる。
 * - 許諾済みの写真を受領したら、各カラーの image に "/images/products/..." を設定する。
 */

const empty: ProductSpecs = {
  length: null,
  weight: null,
  type: null,
  depth: null,
  line: null,
  hook: null,
  colors: null,
};

const spec = (s: Partial<ProductSpecs>): ProductSpecs => ({ ...empty, ...s });

export const products: Product[] = [
  {
    slug: "volbeat",
    name: "VOLBEAT",
    nameKana: "ヴォルビート",
    category: "vibration",
    summary: "ワイヤーリップを備えたバイブレーション。シャローで使えるフローティングを軸に展開。",
    concept:
      "リップレスクランクベイトならではのハイピッチなアクションを、シャローレンジでストレスなく使うことを狙ったモデル。フローティングを基本とし、シンキングはその派生モデルという位置づけで紹介されています。",
    conceptStatus: "retailer",
    features: [
      "付属のワイヤーリップを装着するとアクションがタイトになり、潜行レンジを浅く調整できる",
      "フローティング（F）とシンキング（S）、60・70の2サイズ展開",
      "F と S は目の縁の色で見分けられる（販売店の記載により表記に差あり）",
    ],
    featuresStatus: "retailer",
    variants: [
      {
        id: "60f",
        label: "60F",
        specs: spec({ length: "63mm", weight: "8g（ワイヤーリップ 0.5g 別）", type: "フローティング", hook: "#6（前後）" }),
        note: "全長を60mmと記載する販売店もあります。ワイヤーリップ重量は0.4g／0.5gの表記が混在。",
      },
      {
        id: "60s",
        label: "60S",
        specs: spec({ weight: "12g", type: "シンキング" }),
      },
      {
        id: "70f",
        label: "70F",
        specs: spec({ type: "フローティング" }),
      },
      {
        id: "70s",
        label: "70S",
        specs: spec({ length: "69mm", weight: "17.0g（ワイヤーリップ 0.5g 別）", type: "シンキング" }),
      },
    ],
    colors: [
      { id: "skin-pale-blue", name: "スキンペールブルー", verified: true, palette: { back: "#5d7d93", body: "#b9cbd6", belly: "#eef2f4", accent: "#e7c9b8" } },
      { id: "aurora-green", name: "オーロラグリーン", verified: true, palette: { back: "#1f4a37", body: "#5f9f7c", belly: "#dfeee2", accent: "#a6d9c0" } },
      { id: "dark-knight-pearl", name: "ダークナイトパール", verified: true, palette: { back: "#15181d", body: "#4b5260", belly: "#d9dde4", accent: "#8b93a6" } },
      { id: "bluegill", name: "ブルーギル", verified: true, palette: { back: "#33402a", body: "#7f8a4e", belly: "#e7b65a", accent: "#2b3b3f" } },
      { id: "sexy-shad", name: "セクシーシャッド", verified: true, palette: { back: "#1c2128", body: "#8d98aa", belly: "#f1f3f5", accent: "#c9d36a" } },
      { id: "lime-chart", name: "ライムチャート", verified: true, palette: { back: "#4f7a16", body: "#c8e33b", belly: "#f4f7c9", accent: "#7fa51f" } },
      { id: "kinkuro", name: "キンクロ", verified: true, palette: { back: "#111214", body: "#b28a2c", belly: "#e5c46a", accent: "#f0dc9a" } },
      { id: "bb-melon", name: "BBメロン", verified: true, palette: { back: "#6f8f3a", body: "#b6cf8a", belly: "#eef3d9", accent: "#d9e8b0", clear: true } },
    ],
    youtubeId: null,
    storeUrl: null,
    featured: true,
    shape: "vibration",
    verification: "retailer",
    sources: [
      { label: "ポパイ（VOLBEAT 60F/60S）", url: "https://www.popeyeweb.jp/SHOP/vb60.html" },
      { label: "ポパイ（VOLBEAT 70F/70S）", url: "https://www.popeyeweb.jp/SHOP/vb70.html" },
      { label: "バス釣り速報", url: "https://www.basssoku.com/entry/VOLBEAT" },
    ],
    keywords: ["ヴォルビート", "ボルビート", "バイブ", "ワイヤー"],
  },
  {
    slug: "shindy-110",
    name: "SHINDY 110",
    nameKana: "シンディ110",
    category: "minnow",
    summary: "110mmの肉薄ボディを持つジャークベイト。潜行深度の異なるモデルを展開。",
    concept:
      "110mmクラスのジャークベイト。リップ形状の異なるモデルが用意されており、超シャロー対応の「SuperShallow」は一定速度のリトリーブやジャーキングでも潜りすぎずにレンジをキープできると紹介されています。",
    conceptStatus: "retailer",
    features: [
      "SF-M は Mリップ仕様で潜行深度 約1.5m",
      "SuperShallow（SS）は超シャロー対応のスローフローティング",
      "独自の硬質素材を使ったドライボーンモデル（SF-M）を2026年9月下旬に発売と紹介",
    ],
    featuresStatus: "retailer",
    variants: [
      {
        id: "110sf-m",
        label: "110SF-M",
        specs: spec({ length: "110mm", weight: "15g", type: "スローフローティング", depth: "約1.5m" }),
      },
      {
        id: "110ss",
        label: "110SS",
        specs: spec({ length: "110mm", weight: "14g", type: "スローフローティング", depth: "約30〜50cm" }),
        note: "潜行深度は販売店により約30cm／約50cmと表記が分かれています。",
      },
      {
        id: "94sf-s",
        label: "94SF-S",
        specs: spec({ length: "94mm" }),
        note: "2025年2月発売の新サイズとしてメディアで紹介。詳細スペックは公式情報の受領待ち。",
      },
      {
        id: "110sp-m",
        label: "110SP-M",
        specs: spec({ length: "110mm" }),
        note: "販売店で品名を確認。スペックは公式情報の受領待ち。",
      },
    ],
    colors: [
      { id: "demo-01", name: "DEMO COLOR 01", verified: false, palette: { back: "#1b2a3a", body: "#9fb3c4", belly: "#f2f4f6", accent: "#d5dde4" } },
      { id: "demo-02", name: "DEMO COLOR 02", verified: false, palette: { back: "#3a3f22", body: "#a2a36a", belly: "#efe6c8", accent: "#c6b874" } },
      { id: "demo-03", name: "DEMO COLOR 03", verified: false, palette: { back: "#0f1012", body: "#5b5f66", belly: "#c9ccd1", accent: "#e6e8eb" } },
    ],
    youtubeId: null,
    storeUrl: null,
    featured: true,
    shape: "minnow",
    verification: "retailer",
    sources: [
      { label: "フィッシングジャンプ（SHINDY 110SF）", url: "https://www.fishing-jump.com/?pid=189296283" },
      { label: "Knoxville（SHINDY 110SP-M）", url: "https://knoxville2018.shop-pro.jp/?pid=185953833" },
      { label: "ルアーニュースR（110SS）", url: "https://www.lurenewsr.com/354555/" },
      { label: "ルアーニュースR（ドライボーン）", url: "https://www.lurenewsr.com/448811" },
      { label: "ルアーニュースR（94SF-S）", url: "https://www.lurenewsr.com/354576/" },
    ],
    keywords: ["シンディ", "シンディー", "ミノー", "ジャークベイト"],
  },
  {
    slug: "saramoa",
    name: "SaraMoa",
    nameKana: "サラモア",
    category: "shad",
    summary: "フラットサイドクランクとシャッドの中間を狙った、薄肉ボディのフラットサイドシャッド。",
    concept:
      "フラットサイドクランクベイトとは一線を画す「ちょうどいいアピール」を狙ったフラットサイドシャッド。ボディの肉厚を削ぎ落とす薄肉設計で、アクションのレスポンスを高めていると紹介されています。",
    conceptStatus: "retailer",
    features: [
      "薄肉設計によるハイピッチでタイトなアクション",
      "低音ラトルを搭載",
      "小型版「SaraMoa PORO」（50mm）もラインナップ",
    ],
    featuresStatus: "retailer",
    variants: [
      {
        id: "58f",
        label: "SaraMoa",
        specs: spec({ length: "58mm", weight: "8.5g", type: "フローティング", depth: "約1.5m" }),
      },
      {
        id: "poro",
        label: "SaraMoa PORO",
        specs: spec({ length: "50mm", weight: "約5.5g" }),
        note: "肉厚0.75mmと紹介されています。",
      },
    ],
    colors: [
      { id: "sexy-shad", name: "セクシーシャッド", verified: true, palette: { back: "#1c2128", body: "#8d98aa", belly: "#f1f3f5", accent: "#c9d36a" } },
      { id: "clear-bb-melon", name: "クリアーBBメロン", verified: true, palette: { back: "#6f8f3a", body: "#c4d99c", belly: "#f1f5e3", accent: "#d9e8b0", clear: true } },
      { id: "lime-chart", name: "ライムチャート", verified: true, palette: { back: "#4f7a16", body: "#c8e33b", belly: "#f4f7c9", accent: "#7fa51f" } },
      { id: "red-gold-tiger", name: "レッドゴールドタイガー", verified: true, palette: { back: "#5a1a14", body: "#c0472e", belly: "#e8b45a", accent: "#2a1612" } },
    ],
    youtubeId: null,
    storeUrl: null,
    featured: true,
    shape: "shad",
    verification: "retailer",
    sources: [
      { label: "ルアーニュースR", url: "https://www.lurenewsr.com/354587/" },
      { label: "B-FARM", url: "https://bfarm.buyshop.jp/items/117178013" },
      { label: "フィッシングジャンプ", url: "https://fishing-jump.com/?pid=188746390" },
    ],
    keywords: ["サラモア", "シャッド", "フラットサイド", "PORO", "ポロ"],
  },
  {
    slug: "dot-six",
    name: "Dot SIX",
    nameKana: "ドットシックス",
    category: "crankbait",
    summary: "肉厚約0.6mmの薄肉ボディが名前の由来。高浮力でキレのあるシャロークランク。",
    concept:
      "ボディを本体と下部に分割して成形し、大部分の肉厚を約0.6mmに抑えたシャロークランク。ラインアイやフックアイなど強度が必要な部分だけを厚くする構造で、名前はこの肉厚に由来すると紹介されています。現行は生産工程を見直した「ver1.5」。",
    conceptStatus: "retailer",
    features: [
      "肉厚約0.6mmの薄肉構造による高浮力とキレのあるアクション",
      "ver1.5 は薄肉コンセプトを継承しつつ生産性を改善",
      "初代はハイフローティング（HF）とフローティング（F）を展開",
    ],
    featuresStatus: "retailer",
    variants: [
      {
        id: "v15-7plus",
        label: "ver1.5 7+",
        specs: spec({ length: "59mm", weight: "約9.5g" }),
      },
    ],
    colors: [
      { id: "clear-bb-melon", name: "クリアーBBメロン", verified: true, palette: { back: "#6f8f3a", body: "#c4d99c", belly: "#f1f5e3", accent: "#d9e8b0", clear: true } },
      { id: "sexy-shad", name: "セクシーシャッド", verified: true, palette: { back: "#1c2128", body: "#8d98aa", belly: "#f1f3f5", accent: "#c9d36a" } },
      { id: "champagne-black", name: "シャンパンブラック", verified: true, palette: { back: "#0c0c0d", body: "#3a352c", belly: "#d8c79a", accent: "#efe2bd" } },
      { id: "bb-hot-chart", name: "BBホットチャート", verified: true, palette: { back: "#2c6a2a", body: "#e3ef3a", belly: "#ff8a3d", accent: "#f8f6a0" } },
    ],
    youtubeId: null,
    storeUrl: null,
    featured: true,
    shape: "crankbait",
    verification: "retailer",
    sources: [
      { label: "ルアーショップB.B（Yahoo!ショッピング）", url: "https://store.shopping.yahoo.co.jp/lure-shop-bb/revonik.html" },
      { label: "フィッシュタックルショップ ブログ", url: "https://ameblo.jp/fishtackleshop/entry-12863209660.html" },
    ],
    keywords: ["ドットシックス", "ドット6", "クランク", "シャロークランク"],
  },
  {
    slug: "ramzy",
    name: "Ramzy",
    nameKana: "ラムジー",
    category: "crankbait",
    summary: "SaraMoa をベースに、障害物の回避性能を高めたシャロークランク。",
    concept:
      "人気モデル SaraMoa をベースに、岩や立木などの障害物に当たっても弾かれすぎず、吸いつくようにかわしていく回避性能を高めたシャロークランクとして紹介されています。2026年春の新作。",
    conceptStatus: "retailer",
    features: [
      "障害物に当たっても弾かれすぎずに回避する設計",
      "肉厚0.75mmの薄肉ボディ",
      "独自の硬質素材を使った「ドライボーン」モデルも展開",
    ],
    featuresStatus: "retailer",
    variants: [
      { id: "default", label: "Ramzy", specs: spec({ length: "58mm", weight: "約9.3g" }) },
    ],
    colors: [
      { id: "demo-01", name: "DEMO COLOR 01", verified: false, palette: { back: "#2a3a2c", body: "#8a9a7a", belly: "#ecebd8", accent: "#c9c58f" } },
      { id: "demo-02", name: "DEMO COLOR 02", verified: false, palette: { back: "#4a2a1c", body: "#b9703a", belly: "#f0d29a", accent: "#e09a4a" } },
    ],
    youtubeId: null,
    storeUrl: null,
    featured: false,
    shape: "crankbait",
    verification: "retailer",
    sources: [
      { label: "ルアーニュースR", url: "https://www.lurenewsr.com/414411/" },
      { label: "バス釣り速報（ドライボーン）", url: "https://www.basssoku.com/entry/Ramzydrybone" },
    ],
    keywords: ["ラムジー", "シャロークランク", "クランク"],
  },
  {
    slug: "shekiller-78",
    name: "Shekiller78",
    nameKana: "シェキラー78",
    category: "minnow",
    summary: "日本のベイトフィッシュに合わせた、巻いて使うクランキングミノー。",
    concept:
      "日本の主要なベイトフィッシュにマッチするサイズ設定の「巻きで使うクランキングミノー」。ただ巻きで気持ちよく使えることをコンセプトに、高速リトリーブでも安定したアクションを狙ったモデルとして紹介されています。2026年1月発売。",
    conceptStatus: "retailer",
    features: [
      "空気抵抗を抑えて水流をコントロールする AIR VENT & FLOW HOLE システム",
      "樹脂タングステン球の重心移動で、飛距離とアクションバランスを両立",
      "肉厚0.8mmのボディ",
    ],
    featuresStatus: "retailer",
    variants: [
      {
        id: "78sf",
        label: "78SF",
        specs: spec({ length: "78mm", weight: "約8.3g", type: "スローフローティング", depth: "約2.5〜3m（リトリーブ時）" }),
        note: "潜行レンジを1〜3mと記載する販売店もあります。",
      },
    ],
    colors: [
      { id: "ghost-shrimp", name: "ゴーストシュリンプ", verified: true, palette: { back: "#c9b8a6", body: "#e6d9cc", belly: "#f6efe8", accent: "#f0a888", clear: true } },
      { id: "magma-hl-champagne", name: "マグマHLシャンパン", verified: true, palette: { back: "#3a2a1a", body: "#c8a46a", belly: "#f2e2bc", accent: "#e8c27a" } },
      { id: "demo-01", name: "DEMO COLOR 01", verified: false, palette: { back: "#1b2a3a", body: "#9fb3c4", belly: "#f2f4f6", accent: "#d5dde4" } },
    ],
    youtubeId: null,
    storeUrl: null,
    featured: false,
    shape: "minnow",
    verification: "retailer",
    sources: [
      { label: "ルアーニュースR", url: "https://www.lurenewsr.com/414368/" },
      { label: "BackLash", url: "https://www.backlash.co.jp/sp/item/4582737963309/" },
    ],
    keywords: ["シェキラー", "クランキングミノー", "ミノー"],
  },
  {
    slug: "dispa-118",
    name: "Dispa 118SF",
    nameKana: "ディスパ118SF",
    category: "minnow",
    summary: "3〜5mレンジを攻略する、食わせ系のジャークベイト。2026年秋の新作。",
    concept:
      "3〜5mのレンジを自在に攻められる食わせ系ジャークベイトとして紹介されています。足かけ2年の開発期間を経て、2026年9月にリリースされました。",
    conceptStatus: "retailer",
    features: ["3〜5mレンジに対応するジャークベイト", "約2年の開発期間を経て完成"],
    featuresStatus: "retailer",
    variants: [{ id: "118sf", label: "118SF", specs: spec({ depth: "3〜5mレンジ" }) }],
    colors: [
      { id: "demo-01", name: "DEMO COLOR 01", verified: false, palette: { back: "#203040", body: "#a8b8c6", belly: "#f3f5f7", accent: "#d9c7a0" } },
      { id: "demo-02", name: "DEMO COLOR 02", verified: false, palette: { back: "#2e3324", body: "#9aa070", belly: "#f1ead0", accent: "#c8bb7a" } },
    ],
    youtubeId: null,
    storeUrl: null,
    featured: false,
    shape: "minnow",
    verification: "retailer",
    sources: [{ label: "ルアーニュースR", url: "https://www.lurenewsr.com/448387" }],
    keywords: ["ディスパ", "ジャークベイト", "ミノー"],
  },
];
