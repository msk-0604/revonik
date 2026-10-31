import type { MediaItem } from "@/types";
import { site } from "./site";

/**
 * メディア導線
 * 公式アカウントへのリンクと、第三者メディアの紹介記事への外部リンク。
 * 埋め込みは公式の許諾が確認できたコンテンツのみ（現時点では embeddable: false）。
 */
export const media: MediaItem[] = [
  {
    id: "instagram",
    kind: "instagram",
    title: "REVONIK Official Instagram",
    description: "新製品・カラー・釣果の最新情報はInstagramで。",
    url: site.links.instagram,
    source: site.links.instagramHandle,
    embeddable: false,
    thirdParty: false,
  },
  {
    id: "video-vibration",
    kind: "youtube",
    title: "加藤誠司が語る、ルアー振動のルール",
    description: "ルアーの振動について加藤誠司氏が解説する動画。",
    url: "https://www.youtube.com/watch?v=_Vfp1mSm3Sw",
    source: "YouTube",
    image: "/placeholders/scene-movie-1.webp",
    embeddable: false,
    thirdParty: true,
  },
  {
    id: "video-crank",
    kind: "youtube",
    title: "これからのクランクベイト論",
    description: "「クランクベイト オブジェクトスタイル2024」で加藤誠司氏が語るクランクベイト論。",
    url: "https://www.youtube.com/watch?v=eYOcawp51_o",
    source: "YouTube",
    image: "/placeholders/scene-movie-2.webp",
    embeddable: false,
    thirdParty: true,
  },
  {
    id: "article-dotsix",
    kind: "article",
    title: "「自分だけが釣れるルアーを作らない」Dot SIX 誕生秘話",
    description: "加藤誠司氏のルアーデザイナーとしての特異点と、Dot SIX の開発背景。",
    url: "https://plus.luremaga.jp/2024/10/09/381965/",
    source: "ルアマガプラス",
    embeddable: false,
    thirdParty: true,
  },
  {
    id: "article-lineup",
    kind: "article",
    title: "レヴォニックのルアーを全解説",
    description: "加藤誠司氏が各ルアーの開発秘話と使い方を語るインタビュー。",
    url: "https://news.yahoo.co.jp/articles/3c388605392d04907b0fdae88c59bdf01105083d",
    source: "Yahoo!ニュース（ルアマガプラス）",
    embeddable: false,
    thirdParty: true,
  },
  {
    id: "article-drybone",
    kind: "article",
    title: "「ドライボーン化」を推し進める理由",
    description: "独自の硬質素材と「音」へのこだわりを紹介する記事。",
    url: "https://www.lurenewsr.com/450340",
    source: "ルアーニュースR",
    embeddable: false,
    thirdParty: true,
  },
  {
    id: "article-studio",
    kind: "article",
    title: "大津市に工房がオープン",
    description: "工房のグランドオープンと新作の先行販売を伝える記事。",
    url: "https://plus.luremaga.jp/2023/12/21/315724/",
    source: "ルアマガプラス",
    embeddable: false,
    thirdParty: true,
  },
];
