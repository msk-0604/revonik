/**
 * 情報の確認状況。
 * - official  : REVONIK 公式（ストア・公式SNS・提供資料）で確認済み
 * - retailer  : 複数の販売店・釣りメディアの掲載値で照合（公式未照合）
 * - unverified: 名称のみ確認、または未確認
 * - draft     : 営業提案用に Stark Lab が作成した仮テキスト
 */
export type VerificationStatus = "official" | "retailer" | "unverified" | "draft";

export type CategoryId = "vibration" | "crankbait" | "shad" | "minnow" | "other";

export interface Category {
  id: CategoryId;
  label: string;
  labelJa: string;
}

/** 不明な項目は null（画面上は「情報未登録」と表示される） */
export interface ProductSpecs {
  length: string | null;
  weight: string | null;
  type: string | null;
  depth: string | null;
  line: string | null;
  hook: string | null;
  colors: string | null;
}

export interface ProductVariant {
  id: string;
  label: string;
  specs: ProductSpecs;
  note?: string;
}

export interface ColorPalette {
  back: string;
  body: string;
  belly: string;
  accent?: string;
  /** クリア系ボディ */
  clear?: boolean;
}

export interface ProductColor {
  id: string;
  name: string;
  /** プレースホルダー画像生成用の近似色（実物の色味ではない） */
  palette: ColorPalette;
  /** 許諾済みの正式画像パス。指定すると自動生成の仮画像より優先される */
  image?: string;
  /** false の場合はデモ用の仮カラー名 */
  verified: boolean;
}

export type LureShape = "vibration" | "minnow" | "shad" | "crankbait";

export interface SourceLink {
  label: string;
  url: string;
}

export interface Product {
  slug: string;
  name: string;
  nameKana?: string;
  category: CategoryId;
  /** カード・一覧用の短い説明 */
  summary: string;
  concept: string | null;
  conceptStatus: VerificationStatus;
  features: string[];
  featuresStatus: VerificationStatus;
  variants: ProductVariant[];
  colors: ProductColor[];
  /** 正式素材のギャラリー画像（任意）。未指定時はカラー画像で代替 */
  gallery?: { src: string; alt: string }[];
  /** 公式に埋め込み可能な YouTube 動画 ID。未確認の間は null */
  youtubeId: string | null;
  /** 個別商品ページURL。未確認の間は null（ストアTOPへ誘導） */
  storeUrl: string | null;
  featured: boolean;
  shape: LureShape;
  verification: VerificationStatus;
  sources: SourceLink[];
  keywords?: string[];
}

export type NewsCategory = "PRODUCT" | "EVENT" | "BRAND" | "MEDIA";

export interface NewsArticle {
  slug: string;
  date: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  body: string[];
  image?: string;
  /** true の場合はデモ用サンプル記事 */
  sample: boolean;
}

export type MediaKind = "instagram" | "youtube" | "store" | "article";

export interface MediaItem {
  id: string;
  kind: MediaKind;
  title: string;
  description: string;
  url: string;
  source: string;
  image?: string;
  /** 公式に埋め込みが許可されたコンテンツのみ true */
  embeddable: boolean;
  /** 第三者メディア（REVONIK 公式ではない） */
  thirdParty: boolean;
  date?: string;
}
