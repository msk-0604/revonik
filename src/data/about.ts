import type { SourceLink, VerificationStatus } from "@/types";

/**
 * ABOUT ページのデータ
 * 公開情報で確認できた事実（retailer）と、提案用の仮文章（draft）を区別して管理する。
 * 創業ストーリー・代表者コメント・実績などは、公式情報を受領するまで作成しない。
 */

export const brandFacts: { label: string; value: string; status: VerificationStatus; source?: SourceLink }[] = [
  { label: "ブランド名", value: "REVONIK（レヴォニック）", status: "retailer" },
  { label: "主なカテゴリー", value: "バス用ハードルアー（バイブレーション／クランクベイト／シャッド／ミノー）", status: "retailer" },
  {
    label: "ルアーデザイン",
    value: "釣りメディア・販売店では、ルアーデザイナー加藤誠司氏が手がけるブランドとして紹介されています。",
    status: "retailer",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/354587/" },
  },
  {
    label: "ブランド始動",
    value: "2023年と紹介されています。",
    status: "retailer",
    source: { label: "ルアーショップB.B（Yahoo!ショッピング）", url: "https://store.shopping.yahoo.co.jp/lure-shop-bb/revonik.html" },
  },
  { label: "販売チャネル", value: "公式オンラインストア（revonik.stores.jp）・取扱販売店", status: "retailer" },
];

export const approach = {
  status: "draft" as VerificationStatus,
  paragraphs: [
    "ルアーの動きは、ボディの形と、その内側の設計で決まる。外から見えない肉厚や重心の位置まで突き詰めることが、水中での一つひとつのアクションの差になる。",
    "求めるのは、釣り人が意図した通りに動き、信頼して投げ続けられる道具であること。そのために、形状・構造・生産方法まで含めて、一つのルアーに向き合う。",
  ],
};

/** 公開されている製品情報から読み取れる共通点（各製品ページの出典に基づく） */
export const craftsmanship: { title: string; en: string; text: string; status: VerificationStatus }[] = [
  {
    en: "THIN-WALL",
    title: "薄肉設計",
    text: "Dot SIX は大部分の肉厚を約0.6mmに抑え、SaraMoa も「薄肉コンセプト」で紹介されるなど、ボディの肉厚を詰めてアクションのレスポンスを高める設計が複数の製品に共通しています。",
    status: "retailer",
  },
  {
    en: "STRUCTURE",
    title: "構造からのアプローチ",
    text: "Dot SIX はボディを本体と下部に分けて成形し、強度が必要なアイ周りだけを厚くする構造と紹介されています。",
    status: "retailer",
  },
  {
    en: "TUNING",
    title: "使い分けられるバリエーション",
    text: "VOLBEAT の付属ワイヤーリップや、SHINDY 110 のリップ違いのモデルなど、レンジやアクションを状況に合わせて選べる展開がされています。",
    status: "retailer",
  },
];

export const history: { period: string; title: string; text: string; status: VerificationStatus; source?: SourceLink }[] = [
  {
    period: "2023",
    title: "ブランド始動",
    text: "販売店の紹介による。正確な時期は公式情報で確認が必要です。",
    status: "retailer",
    source: { label: "ルアーショップB.B", url: "https://store.shopping.yahoo.co.jp/lure-shop-bb/revonik.html" },
  },
  {
    period: "—",
    title: "VOLBEAT 発売",
    text: "新ブランドのルアーとして釣りメディアで紹介。",
    status: "retailer",
    source: { label: "バス釣り速報", url: "https://www.basssoku.com/entry/VOLBEAT" },
  },
  {
    period: "—",
    title: "Dot SIX 発売",
    text: "ブランドの第2弾製品として販売店で紹介。現行は ver1.5。",
    status: "retailer",
    source: { label: "フィッシュタックルショップ", url: "https://ameblo.jp/fishtackleshop/entry-12863209660.html" },
  },
  {
    period: "—",
    title: "SHINDY 110SF 登場",
    text: "バスルアー第3弾として販売店ブログで紹介。",
    status: "retailer",
    source: { label: "販売店ブログ（Ameba）", url: "https://ameblo.jp/bassdamasii/entry-12870700666.html" },
  },
  {
    period: "2025.02",
    title: "SaraMoa 発売",
    text: "2025年2月上旬の発売と販売店・メディアで紹介。",
    status: "retailer",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/354587/" },
  },
  {
    period: "2026.09",
    title: "SHINDY 110SF-M ドライボーン",
    text: "2026年9月下旬の発売予定と釣りメディアで紹介。",
    status: "retailer",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/448811" },
  },
];
