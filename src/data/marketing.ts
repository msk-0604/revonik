import type { SourceLink } from "@/types";
import { products } from "./products";

/**
 * マーケティング用の数値・比較データ
 * すべて公開情報で確認できた値のみ。出典を併記する。
 */

export const proofNumbers: { value: string; unit?: string; label: string; detail: string; source?: SourceLink }[] = [
  {
    value: "0.6",
    unit: "mm",
    label: "極限まで薄く",
    detail: "Dot SIX のボディ肉厚",
    source: { label: "ルアマガプラス", url: "https://plus.luremaga.jp/2024/10/09/381965/" },
  },
  {
    value: "約2",
    unit: "年",
    label: "妥協しない開発",
    detail: "Dispa 118SF の開発期間",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/448387" },
  },
  {
    value: "2023",
    label: "ブランド設立",
    detail: "株式会社レヴォニック",
    source: { label: "ルアマガプラス", url: "https://plus.luremaga.jp/2024/10/09/381965/" },
  },
  {
    value: String(products.length),
    label: "ラインナップ",
    detail: "本デモに掲載の製品数",
  },
];

/** 潜行レンジ（m）。メディア・販売店に数値が掲載されている製品のみ */
export const ranges: { slug: string; model: string; min: number; max: number; note: string }[] = [
  { slug: "shindy-110", model: "SHINDY 110SS", min: 0.3, max: 0.5, note: "約30〜50cm" },
  { slug: "shindy-110", model: "SHINDY 110SF-M", min: 0, max: 1.5, note: "約1.5m" },
  { slug: "saramoa", model: "SaraMoa", min: 0, max: 1.5, note: "約1.5m" },
  { slug: "shekiller-78", model: "Shekiller78", min: 2.5, max: 3, note: "約2.5〜3m（リトリーブ時）" },
  { slug: "dispa-118", model: "Dispa 118SF", min: 3, max: 5, note: "3〜5mレンジ" },
];

/** 製品・デザイナーを紹介した釣りメディア（ロゴは使わず媒体名のみ） */
export const coverage: SourceLink[] = [
  { label: "ルアマガプラス", url: "https://plus.luremaga.jp/2024/10/09/381965/" },
  { label: "ルアーニュースR", url: "https://www.lurenewsr.com/409351/" },
  { label: "Yahoo!ニュース", url: "https://news.yahoo.co.jp/articles/3c388605392d04907b0fdae88c59bdf01105083d" },
  { label: "バス釣り速報", url: "https://www.basssoku.com/entry/VOLBEAT" },
];
