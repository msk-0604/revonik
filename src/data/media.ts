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
    id: "store",
    kind: "store",
    title: "REVONIK Online Store",
    description: "REVONIKの製品は公式オンラインストアで。",
    url: site.links.store,
    source: "revonik.stores.jp",
    embeddable: false,
    thirdParty: false,
  },
  {
    id: "youtube",
    kind: "youtube",
    title: "YouTube で REVONIK を見る",
    description: "公式チャンネルは未確認のため、YouTubeの検索結果へご案内します。",
    url: site.links.youtubeSearch,
    source: "YouTube 検索",
    embeddable: false,
    thirdParty: true,
  },
  {
    id: "article-saramoa",
    kind: "article",
    title: "SaraMoa 発売の紹介記事",
    description: "フラットサイドシャッド「SaraMoa」を紹介する釣りメディアの記事。",
    url: "https://www.lurenewsr.com/354587/",
    source: "ルアーニュースR",
    embeddable: false,
    thirdParty: true,
  },
  {
    id: "article-shindy-ss",
    kind: "article",
    title: "SHINDY 110SS の紹介記事",
    description: "超シャロー対応ミノー「SHINDY 110SS」を紹介する釣りメディアの記事。",
    url: "https://www.lurenewsr.com/354555/",
    source: "ルアーニュースR",
    embeddable: false,
    thirdParty: true,
  },
  {
    id: "article-volbeat",
    kind: "article",
    title: "VOLBEAT 発売の紹介記事",
    description: "ワイヤーリップ付きバイブレーション「VOLBEAT」の紹介記事。",
    url: "https://www.basssoku.com/entry/VOLBEAT",
    source: "バス釣り速報",
    embeddable: false,
    thirdParty: true,
  },
];
