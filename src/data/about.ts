import type { SourceLink, VerificationStatus } from "@/types";

/**
 * ABOUT ページのデータ（ブランド概要・あゆみ）。デザイナーの経歴と開発思想は designer.ts。
 * すべて公開情報で確認できた内容で、出典を併記する。創業ストーリーや本人のコメントは創作しない。
 */

export const brandFacts: { label: string; value: string; status: VerificationStatus; source?: SourceLink }[] = [
  { label: "ブランド名", value: "REVONIK（レヴォニック）", status: "retailer" },
  { label: "主なカテゴリー", value: "バス用ハードルアー（バイブレーション／クランクベイト／シャッド／ミノー）", status: "retailer" },
  {
    label: "ルアーデザイン",
    value: "ルアーデザイナー加藤誠司氏が手がけるブランドとして、釣りメディアで紹介されています。",
    status: "retailer",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/354587/" },
  },
  {
    label: "設立",
    value: "2023年（株式会社レヴォニック）と紹介されています。",
    status: "retailer",
    source: { label: "ルアーショップB.B（Yahoo!ショッピング）", url: "https://store.shopping.yahoo.co.jp/lure-shop-bb/revonik.html" },
  },
];

export const history: { period: string; title: string; text: string; status: VerificationStatus; source?: SourceLink }[] = [
  {
    period: "2023",
    title: "株式会社レヴォニック設立",
    text: "ルアーデザイナー加藤誠司氏がブランドを立ち上げ。",
    status: "retailer",
    source: { label: "ルアマガプラス", url: "https://plus.luremaga.jp/2024/10/09/381965/" },
  },
  {
    period: "2023.12",
    title: "大津市に工房をオープン",
    text: "工房のグランドオープンと新作の先行販売が紹介されました。",
    status: "retailer",
    source: { label: "ルアマガプラス", url: "https://plus.luremaga.jp/2023/12/21/315724/" },
  },
  {
    period: "—",
    title: "VOLBEAT／Dot SIX／SHINDY 110SF",
    text: "初期のラインナップとして順次発売（Dot SIX はブランド第2弾、SHINDY 110SF は第3弾と紹介）。",
    status: "retailer",
    source: { label: "フィッシュタックルショップ", url: "https://ameblo.jp/fishtackleshop/entry-12863209660.html" },
  },
  {
    period: "2025.02",
    title: "SaraMoa／SHINDY 94SF-S",
    text: "フラットサイドシャッドと、SHINDY シリーズの新サイズが登場。",
    status: "retailer",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/354587/" },
  },
  {
    period: "2026",
    title: "Shekiller78／Ramzy／SaraMoa PORO",
    text: "巻きのクランキングミノー、障害物回避型シャロークランク、小型クランクシャッドが登場。",
    status: "retailer",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/409351/" },
  },
  {
    period: "2026.09",
    title: "Dispa 118SF／SHINDY 110SF-M ドライボーン",
    text: "3〜5mレンジのジャークベイトと、ドライボーン素材のジャークベイトが登場。",
    status: "retailer",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/448387" },
  },
];
