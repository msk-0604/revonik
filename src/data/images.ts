/**
 * サイト共通の画像パス（一元管理）
 *
 * 現在はすべて scripts/generate-placeholders.mjs が生成したオリジナル（コンセプトビジュアル）。
 * REVONIK から許諾済みの写真を受領したら public/images/ に配置し、ここのパスを書き換えるだけで
 * サイト全体に反映される。商品画像は src/data/products.ts の各カラーの image で差し替える。
 */
export const siteImages = {
  hero: { src: "/placeholders/hero.webp", alt: "黒い背景に浮かぶルアーのイメージ（コンセプトビジュアル）" },
  heroMobile: { src: "/placeholders/hero-mobile.webp", alt: "黒い背景に浮かぶルアーのイメージ（コンセプトビジュアル）" },
  philosophy: { src: "/placeholders/philosophy.webp", alt: "夜明け前の水面のイメージ（コンセプトビジュアル）" },
  blueprint: { src: "/placeholders/blueprint.webp", alt: "ルアーの設計図のイメージ（コンセプトビジュアル）" },
  water: { src: "/placeholders/water.webp", alt: "水面の波紋のイメージ（コンセプトビジュアル）" },
  video: { src: "/placeholders/video.webp", alt: "動画サムネイル（コンセプトビジュアル）" },
  // 水中シーン（3DCG）。許諾済みのフィールド写真を受領したら差し替える
  sceneHero: { src: "/placeholders/scene-hero.webp", alt: "水中を泳ぐルアーのイメージ（コンセプトビジュアル）" },
  sceneHeroMobile: { src: "/placeholders/scene-hero-mobile.webp", alt: "水中を泳ぐルアーのイメージ（コンセプトビジュアル）" },
  sceneTech: { src: "/placeholders/scene-tech.webp", alt: "水中のクランクベイトのイメージ（コンセプトビジュアル）" },
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
