import { categories } from "@/data/categories";
import { products } from "@/data/products";
import type { CategoryId, Product, ProductColor, ProductSpecs, ProductVariant } from "@/types";

export const UNREGISTERED = "情報未登録";

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id) ?? categories[categories.length - 1];
}

export const featuredProducts = () => products.filter((p) => p.featured);

/** 許諾済み画像があればそれを、なければ自動生成の仮画像を返す */
export function colorImage(product: Product, color: ProductColor): string {
  return color.image ?? `/placeholders/products/${product.slug}/${color.id}.webp`;
}

export function mainImage(product: Product): string {
  if (product.gallery?.[0]) return product.gallery[0].src;
  return colorImage(product, product.colors[0]);
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
      value = `${verifiedColors}色を確認（販売店掲載・全色ではない可能性あり）`;
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
