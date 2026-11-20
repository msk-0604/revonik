import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductVisual } from "@/components/ProductVisual";
import { experience } from "@/data/experience";
import { newSlugs } from "@/data/releases";
import { formatDate } from "@/lib/format";
import { getCategory, mainImage } from "@/lib/products";
import type { Product } from "@/types";

type Props = {
  product: Product;
  sizes?: string;
};

/** 商品カード：影なし・統一サイズの画像を中央に、商品名を明確に */
export function ProductCard({ product, sizes = "(min-width: 1024px) 380px, (min-width: 480px) 50vw, 100vw" }: Props) {
  const category = getCategory(product.category);
  return (
    <Link href={`/products/${product.slug}`} data-track="select_item" data-track-item={product.slug} className="group flex h-full flex-col text-center">
      <div className="relative overflow-hidden rounded-[1.25rem]">
        <ProductVisual
          product={product}
          src={mainImage(product)}
          size="card"
          sizes={sizes}
          className="aspect-[4/3] transition-transform duration-700 ease-out-soft group-hover:scale-[1.02]"
        />
        {newSlugs.has(product.slug) && (
          <span className="absolute top-3 left-3 rounded-full bg-panel px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide">NEW</span>
        )}
      </div>
      <p className="mt-5 text-[0.75rem] font-medium tracking-[0.06em] text-muted">{category.label}</p>
      <h3 className="headline mt-1 text-[1.5rem] sm:text-[1.75rem]">{product.name}</h3>
      <p className="mx-auto mt-2 max-w-xs font-jp text-[0.8125rem] leading-relaxed text-muted line-clamp-2">{experience[product.slug]?.keyFeature ?? product.summary}</p>
      <dl className="mx-auto mt-4 grid w-full max-w-xs grid-cols-3 border-y border-line py-2.5 font-jp text-[0.75rem]">
        {[
          { k: "全長", v: product.length },
          { k: "重量", v: product.weight },
          { k: "タイプ", v: product.buoyancy },
        ].map((s) => (
          <div key={s.k} className="px-1">
            <dt className="text-muted">{s.k}</dt>
            <dd className="mt-0.5 truncate text-fg/90">{s.v ?? "—"}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 font-jp text-[0.75rem] text-muted">
        {product.status === "announced"
          ? `発売予定${product.plannedRelease ? `：${formatDate(product.plannedRelease)}` : ""}`
          : product.releaseDate
            ? `発売：${formatDate(product.releaseDate)}`
            : "発売中"}
      </p>
      <span className="mt-3 inline-flex items-center justify-center gap-0.5 text-[0.9375rem] text-link group-hover:underline underline-offset-4">
        詳しく見る
        <ChevronRight aria-hidden className="size-4" />
      </span>
    </Link>
  );
}
