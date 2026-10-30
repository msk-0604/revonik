/**
 * サイト共通の画像パス（一元管理）
 *
 * 現在はすべて scripts/generate-placeholders.mjs が生成したオリジナルの仮画像（DEMO IMAGE）。
 * REVONIK から許諾済みの写真を受領したら public/images/ に配置し、ここのパスを書き換えるだけで
 * サイト全体に反映される。商品画像は src/data/products.ts の各カラーの image で差し替える。
 */
export const siteImages = {
  hero: { src: "/placeholders/hero.webp", alt: "黒い背景に浮かぶルアーのイメージ（DEMO IMAGE）" },
  heroMobile: { src: "/placeholders/hero-mobile.webp", alt: "黒い背景に浮かぶルアーのイメージ（DEMO IMAGE）" },
  philosophy: { src: "/placeholders/philosophy.webp", alt: "夜明け前の水面のイメージ（DEMO IMAGE）" },
  blueprint: { src: "/placeholders/blueprint.webp", alt: "ルアーの設計図のイメージ（DEMO IMAGE）" },
  water: { src: "/placeholders/water.webp", alt: "水面の波紋のイメージ（DEMO IMAGE）" },
  video: { src: "/placeholders/video.webp", alt: "動画サムネイルの仮画像（DEMO IMAGE）" },
} as const;

export const newsImages: Record<string, string> = {
  PRODUCT: "/placeholders/news-product.webp",
  EVENT: "/placeholders/news-event.webp",
  BRAND: "/placeholders/news-brand.webp",
  MEDIA: "/placeholders/news-media.webp",
};

export const mediaImages: Record<string, string> = {
  instagram: "/placeholders/media-instagram.webp",
  youtube: "/placeholders/media-youtube.webp",
  store: "/placeholders/media-store.webp",
  article: "/placeholders/media-article.webp",
};
