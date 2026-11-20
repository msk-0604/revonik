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
    value: "ルアーデザイナー・加藤誠司",
    status: "retailer",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/354587/" },
  },
  {
    label: "設立",
    value: "2023年（株式会社レヴォニック）",
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
    text: "工房のグランドオープンにあわせ、新作の先行販売。",
    status: "retailer",
    source: { label: "ルアマガプラス", url: "https://plus.luremaga.jp/2023/12/21/315724/" },
  },
  {
    period: "初期",
    title: "VOLBEAT／Dot SIX／SHINDY 110SF",
    text: "初期のラインナップ（Dot SIX はブランド第2弾、SHINDY 110SF は第3弾と紹介）。",
    status: "retailer",
    source: { label: "フィッシュタックルショップ", url: "https://ameblo.jp/fishtackleshop/entry-12863209660.html" },
  },
  {
    period: "2024.03",
    title: "POP UP JIG",
    text: "ソルトルアー第一弾。表層の回遊魚を狙うキャスティングジグ。",
    status: "retailer",
    source: { label: "フィッシングサンイン", url: "https://item.rakuten.co.jp/fishingsanin/popupjig/" },
  },
  {
    period: "2025.02",
    title: "SaraMoa／SHINDY 94SF-S",
    text: "フラットサイドシャッドと、SHINDY シリーズの新サイズ。",
    status: "retailer",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/354587/" },
  },
  {
    period: "2025.08",
    title: "ZENDA",
    text: "LOUD と SILENT を展開するペンシルベイト。",
    status: "retailer",
    source: { label: "吉や", url: "https://www.kitiya.jp/apps/note/archives/20458" },
  },
  {
    period: "2026",
    title: "Shekiller78／Ramzy／SaraMoa PORO／ZENDA 85",
    text: "巻きのクランキングミノー、障害物回避型シャロークランク、小型クランクシャッド、ZENDA の小型モデル。",
    status: "retailer",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/409351/" },
  },
  {
    period: "2026.09",
    title: "Dispa 118SF／SHINDY 110SF-M DryBone",
    text: "3〜5mレンジのジャークベイトと、ドライボーン素材のジャークベイト。",
    status: "retailer",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/448387" },
  },
  {
    period: "2026.10",
    title: "MUREN（群連）発売予定",
    text: "3つのルアーが連なるチェーンベイト（10月下旬の発売予定と報道）。",
    status: "retailer",
    source: { label: "釣りまとめアンテナ", url: "https://fishing.nanj-antenna.net/1001643/" },
  },
];
