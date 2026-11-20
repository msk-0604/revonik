import { categories } from "@/data/categories";
import { products } from "@/data/products";
import type { CategoryId, Product, ProductColor, ProductSpecs, ProductVariant } from "@/types";

/** 確認できていないスペック項目の表示 */
export const UNREGISTERED = "—";

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id) ?? categories[categories.length - 1];
}

export const featuredProducts = () => products.filter((p) => p.featured);

/**
 * 製品写真（許諾済みの公式写真のみ）。未登録なら null。
 * 自作の3D／CG は実物と形・色が一致しないため、製品画像としては使わない（README「画像の方針」）。
 */
export function colorImage(_product: Product, color: ProductColor): string | null {
  return color.image ?? null;
}

export function mainImage(product: Product): string | null {
  if (product.gallery?.[0]) return product.gallery[0].src;
  for (const c of product.colors) if (c.image) return c.image;
  return null;
}

/** 画面に表示するカラー（名称を確認できたもののみ。仮のカラー名は出さない） */
export function displayColors(product: Product): ProductColor[] {
  return product.colors.filter((c) => c.verified);
}

export const specLabels: { key: keyof ProductSpecs; label: string; en: string }[] = [
  { key: "length", label: "全長", en: "LENGTH" },
  { key: "weight", label: "重量", en: "WEIGHT" },
  { key: "type", label: "タイプ", en: "TYPE" },
  { key: "depth", label: "潜行深度", en: "DEPTH" },
  { key: "line", label: "推奨ライン", en: "LINE" },
  { key: "hook", label: "フックサイズ", en: "HOOK" },
  { key: "colors", label: "カラー", en: "COLORS" },
];

export function specRows(product: Product, variant: ProductVariant) {
  const verifiedColors = product.colors.filter((c) => c.verified).length;
  return specLabels.map(({ key, label, en }) => {
    let value = variant.specs[key];
    if (key === "colors" && !value && verifiedColors > 0) {
      value = `${verifiedColors}色`;
    }
    return { key, label, en, value: value ?? UNREGISTERED, missing: !value };
  });
}

export function relatedProducts(product: Product, limit = 3): Product[] {
  const same = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const others = products.filter((p) => p.slug !== product.slug && p.category !== product.category);
  return [...same, ...others.sort((a, b) => Number(b.featured) - Number(a.featured))].slice(0, limit);
}

const normalize = (s: string) => s.normalize("NFKC").toLowerCase().replace(/[\s\-_.]/g, "");

export function matchesQuery(product: Product, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  const haystack = [product.name, product.nameKana ?? "", ...(product.keywords ?? []), ...product.variants.map((v) => v.label)]
    .map(normalize)
    .join("|");
  return haystack.includes(q);
}

/** 一覧・TOPで見せる主要スペック（確認できた値のみ、最大3項目） */
export function keySpecs(product: Product, max = 3) {
  const v = product.variants[0];
  const items = [
    { label: "全長", value: v.specs.length },
    { label: "重量", value: v.specs.weight },
    { label: "タイプ", value: v.specs.type },
    { label: "潜行深度", value: v.specs.depth },
  ];
  return items
    .filter((i): i is { label: string; value: string } => Boolean(i.value))
    .map((i) => ({ ...i, value: i.value.replace(/（.*?）/g, "") }))
    .slice(0, max);
}

/** 公式ストアの個別商品ページ。未確認の場合はストアトップ */
export function storeLink(product: Product, fallback: string) {
  return product.storeUrl ?? fallback;
}
