import type { NewsArticle } from "@/types";

/**
 * ニュース
 * 釣りメディアで報じられた出来事をもとにした記事（本文は Stark Lab による要約）。出典は source に記録（画面には表示しない）。
 * 日付は報道ベースの年月。正式運用時は REVONIK の発表にもとづく記事に置き換える。
 */
export const news: NewsArticle[] = [
  {
    slug: "dispa-118sf",
    date: "2026-09",
    category: "PRODUCT",
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
    category: "PRODUCT",
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
    category: "PRODUCT",
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
    category: "BRAND",
    title: "大津市に工房をオープン",
    excerpt: "工房のグランドオープンにあわせ、新作の先行販売も行われました。",
    body: ["滋賀県大津市に REVONIK の工房がグランドオープンしました。オープンにあわせて新作ルアーの先行販売も行われました。"],
    source: { label: "ルアマガプラス", url: "https://plus.luremaga.jp/2023/12/21/315724/" },
    sample: false,
  },
];

export const sortedNews = [...news].sort((a, b) => b.date.localeCompare(a.date));
