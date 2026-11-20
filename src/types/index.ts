/**
 * 情報の確認状況。
 * - official  : REVONIK 公式（ストア・公式SNS・提供資料）で確認済み
 * - retailer  : 複数の販売店・釣りメディアの掲載値で照合（公式未照合）
 * - unverified: 名称のみ確認、または未確認
 * - draft     : 営業提案用に Stark Lab が作成した仮テキスト
 */
export type VerificationStatus = "official" | "retailer" | "unverified" | "draft";

export type CategoryId = "vibration" | "crankbait" | "shad" | "minnow" | "topwater" | "chain" | "metal-jig" | "other";

/** 釣りのジャンル */
export type Segment = "bass" | "salt";

/** 販売状況。released：販売店での取扱いを確認／announced：発表済み・発売前または発売時期未確認 */
export type ReleaseStatus = "released" | "announced";

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
  /** 公式のカラー番号（例：#04）。販売店の表記で確認できたもの */
  code?: string;
  /** このカラーがあるモデル（例：60F, 70S）。販売店の取扱表記で確認できたもの */
  models?: string[];
  /** 旧・仮画像生成用の近似色（実物の色味ではない。表示には使わない） */
  palette?: ColorPalette;
  /** 許諾済みの公式写真のパス。未許諾の間は指定しない */
  image?: string;
  /** false の場合はデモ用の仮カラー名 */
  verified: boolean;
}

export type LureShape = "vibration" | "minnow" | "shad" | "crankbait" | "pencil" | "popper" | "jig";

export interface SourceLink {
  label: string;
  url: string;
}

export interface Product {
  /** 一意のID（slug と同じ値で運用） */
  id: string;
  slug: string;
  segment: Segment;
  /** 代表モデルの主要スペック（詳細はバリエーションごとの variants） */
  length: string | null;
  weight: string | null;
  depth: string | null;
  /** 浮力タイプ（フローティング／シンキングなど） */
  buoyancy: string | null;
  /** 発表日（YYYY / YYYY-MM / YYYY-MM-DD）。確認できない場合は null */
  announcementDate: string | null;
  /** 発売日。発表日と区別し、確認できた場合のみ入力 */
  releaseDate: string | null;
  /** 発売予定（報道ベース）。確定した発売日ではない */
  plannedRelease?: string | null;
  status: ReleaseStatus;
  /** 主な出典URL（その他の出典は sources） */
  sourceUrl: string;
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
  /** 個別商品ページURL。未確認の間は null（ストアTOPへ誘導） */
  storeUrl: string | null;
  featured: boolean;
  shape: LureShape;
  verification: VerificationStatus;
  sources: SourceLink[];
  keywords?: string[];
}

/** PRODUCT：新製品／RELEASE：発売情報／EVENT：イベント／MEDIA：メディア／OTHER：その他 */
export type NewsCategory = "PRODUCT" | "RELEASE" | "EVENT" | "MEDIA" | "OTHER";

export interface NewsArticle {
  slug: string;
  date: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  body: string[];
  image?: string;
  /** 関連製品（slug） */
  related?: string;
  /** 出典（非表示・データ管理用） */
  source?: SourceLink;
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
  /** 関連が確認できた製品（slug） */
  related?: string[];
  /** 関連するカテゴリー（製品一覧の絞り込みへ誘導） */
  relatedCategory?: CategoryId;
  date?: string;
}
