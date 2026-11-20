import type { NewsArticle } from "@/types";

/**
 * ニュース
 * 釣りメディアで報じられた出来事をもとにした記事（本文は Stark Lab による要約）。出典は source に記録（画面には表示しない）。
 * 日付は報道ベースの年月。正式運用時は REVONIK の発表にもとづく記事に置き換える。
 */
export const news: NewsArticle[] = [
  {
    slug: "muren-118",
    date: "2026-10",
    category: "PRODUCT",
    title: "チェーンベイト MUREN（群連）発表",
    excerpt: "3つのルアーが連なり、ひとつの群れを形づくるハードルアーのチェーンベイト。",
    body: [
      "異なる3つのルアーがひとつの集団としてルアーを形成する、チェーンベイト「MUREN（群連）118」が紹介されました。",
      "118mm・18.7g のフローティングで、潜行深度は約1.0m。2026年10月下旬の発売予定と報じられています。",
    ],
    related: "muren",
    source: { label: "釣りまとめアンテナ", url: "https://fishing.nanj-antenna.net/1001643/" },
    sample: false,
  },
  {
    slug: "zenda-85",
    date: "2026-06",
    category: "PRODUCT",
    title: "ZENDA 85 LOUD 発表",
    excerpt: "ペンシルベイト ZENDA のダウンサイジングモデル。",
    body: ["ZENDA 100 に続く、ダウンサイジングモデル「ZENDA 85 LOUD」が発表され、デビューセットの予約受付が行われました。"],
    related: "zenda",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/435317" },
    sample: false,
  },
  {
    slug: "zenda-100",
    date: "2025-08",
    category: "RELEASE",
    title: "ペンシルベイト ZENDA 発売",
    excerpt: "ラトルインの LOUD と、ノンラトルの SILENT。",
    body: ["トップウォーターのペンシルベイト「ZENDA」が登場しました。ラトルインの LOUD とノンラトルの SILENT を展開しています。"],
    related: "zenda",
    source: { label: "吉や", url: "https://www.kitiya.jp/apps/note/archives/20458" },
    sample: false,
  },
  {
    slug: "luremaga-dot-six",
    date: "2024-10-09",
    category: "MEDIA",
    title: "ルアマガプラスに Dot SIX の開発秘話が掲載",
    excerpt: "「自分だけが釣れるルアーを作らない」——加藤誠司氏のルアーデザイナーとしての特異点。",
    body: ["ルアマガプラスで、加藤誠司氏のインタビューと Dot SIX の開発背景が紹介されました。"],
    related: "dot-six",
    source: { label: "ルアマガプラス", url: "https://plus.luremaga.jp/2024/10/09/381965/" },
    sample: false,
  },
  {
    slug: "pop-up-jig",
    date: "2024-03",
    category: "RELEASE",
    title: "ソルトルアー第一弾 POP UP JIG 発売",
    excerpt: "表層付近の回遊魚を狙う、急速浮上のキャスティングジグ。",
    body: ["REVONIK のソルトルアー第一弾として、キャスティングジグ「POP UP JIG」（30g・40g）が登場しました。"],
    related: "pop-up-jig",
    source: { label: "フィッシングサンイン", url: "https://item.rakuten.co.jp/fishingsanin/popupjig/" },
    sample: false,
  },
  {
    slug: "dispa-118sf",
    date: "2026-09",
    category: "RELEASE",
    title: "Dispa 118SF 発売",
    excerpt: "3〜5mレンジを攻略する、食わせ系ジャークベイト。",
    body: [
      "3〜5mのレンジを自在に攻められるジャークベイト「Dispa 118SF」が登場しました。",
      "足かけ2年の開発期間を経て完成したモデルです。",
    ],
    related: "dispa-118",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/448387" },
    sample: false,
  },
  {
    slug: "shindy-110sf-m-drybone",
    date: "2026-09",
    category: "PRODUCT",
    title: "SHINDY 110SF-M ドライボーン 登場",
    excerpt: "硬質素材「ドライボーン」とガラスラトルを採用。",
    body: [
      "SHINDY 110SF-M に、独自の硬質素材「ドライボーン」を採用したモデルが登場しました。",
      "軽いガラスラトルが硬いボディ壁に当たり、高い音を生むのが特長です。",
    ],
    related: "shindy-110",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/448811" },
    sample: false,
  },
  {
    slug: "shekiller-78",
    date: "2026-01",
    category: "RELEASE",
    title: "Shekiller78 発売",
    excerpt: "日本のベイトフィッシュに合わせた、巻きで使うクランキングミノー。",
    body: [
      "巻きの釣りにこだわったクランキングミノー「Shekiller78」が登場しました。",
      "日本の主要なベイトフィッシュに合うサイズとシルエット。樹脂タングステン球の重心移動で、飛距離とアクションバランスを両立しています。",
    ],
    related: "shekiller-78",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/414368/" },
    sample: false,
  },
  {
    slug: "ramzy",
    date: "2026",
    category: "PRODUCT",
    title: "Ramzy 登場",
    excerpt: "SaraMoa をベースに、障害物の回避性能を高めたシャロークランク。",
    body: [
      "障害物に当たっても弾かれすぎず、吸いつくようにかわしていくシャロークランク「Ramzy」が登場しました。",
      "肉厚0.75mmの薄肉ボディ。ドライボーンモデルも展開されています。",
    ],
    related: "ramzy",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/414411/" },
    sample: false,
  },
  {
    slug: "saramoa",
    date: "2025-02",
    category: "RELEASE",
    title: "SaraMoa 発売",
    excerpt: "フラットサイドクランクとシャッドの中間を狙った、フラットサイドシャッド。",
    body: [
      "薄肉設計によるハイピッチでタイトなアクションと、低音ラトルを備えたフラットサイドシャッド「SaraMoa」が登場しました。",
      "あわせて、SHINDY シリーズに新サイズの 94SF-S も加わりました。",
    ],
    related: "saramoa",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/354587/" },
    sample: false,
  },
  {
    slug: "studio-otsu",
    date: "2023-12",
    category: "OTHER",
    title: "大津市に工房をオープン",
    excerpt: "工房のグランドオープンにあわせ、新作の先行販売も行われました。",
    body: ["滋賀県大津市に REVONIK の工房がグランドオープンしました。オープンにあわせて新作ルアーの先行販売も行われました。"],
    source: { label: "ルアマガプラス", url: "https://plus.luremaga.jp/2023/12/21/315724/" },
    sample: false,
  },
];

export const sortedNews = [...news].sort((a, b) => b.date.localeCompare(a.date));

export const newsCategoryLabel: Record<NewsArticle["category"], string> = {
  PRODUCT: "新製品",
  RELEASE: "発売情報",
  EVENT: "イベント",
  MEDIA: "メディア",
  OTHER: "その他",
};
