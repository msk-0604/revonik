import type { SourceLink } from "@/types";

/**
 * REVONIK のルアーに使われている技術・構造（釣りメディア・販売店の公開情報にもとづく）
 * 説明文は掲載内容を Stark Lab が要約したもの。
 */
export const technologies: { id: string; en: string; title: string; text: string; products: string[]; source: SourceLink }[] = [
  {
    id: "dry-bone",
    en: "DRY BONE",
    title: "ドライボーン",
    text: "独自の硬質ボーン素材。こだわりの一つである「音」を引き出すため、採用モデルが増えています。",
    products: ["shindy-110", "ramzy"],
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/450340" },
  },
  {
    id: "thin-wall",
    en: "THIN WALL",
    title: "薄肉設計",
    text: "ボディの肉厚を詰めてアクションのレスポンスを高める設計。Dot SIX は約0.6mm、Ramzy は0.75mm、Shekiller78 は0.8mm と紹介されています。",
    products: ["dot-six", "saramoa", "ramzy", "shekiller-78"],
    source: { label: "ルアマガプラス", url: "https://plus.luremaga.jp/2024/10/09/381965/" },
  },
  {
    id: "air-vent",
    en: "AIR VENT & FLOW HOLE",
    title: "エアベント＆フローホール",
    text: "空気抵抗を抑え、水流をコントロールするシステム。樹脂タングステン球の重心移動と組み合わせ、飛距離とアクションを両立。",
    products: ["shekiller-78"],
    source: { label: "BackLash", url: "https://www.backlash.co.jp/sp/item/4582737963309/" },
  },
  {
    id: "glass-rattle",
    en: "GLASS RATTLE",
    title: "ガラスラトル",
    text: "軽いガラスラトルが硬いボディ壁に当たり、高い音を生む。SHINDY 110SF-M ドライボーンに採用。",
    products: ["shindy-110"],
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/448811" },
  },
  {
    id: "wire-lip",
    en: "WIRE LIP",
    title: "ワイヤーリップ",
    text: "付属のワイヤーリップを装着するとアクションがタイトになり、レンジを浅く調整できる。",
    products: ["volbeat"],
    source: { label: "ポパイ", url: "https://www.popeyeweb.jp/SHOP/vb60.html" },
  },
];

export const technologiesFor = (slug: string) => technologies.filter((t) => t.products.includes(slug));
