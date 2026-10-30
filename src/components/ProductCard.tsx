import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
    <Link href={`/products/${product.slug}`} className="group flex h-full flex-col text-center">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-bg-alt">
        <Image
          src={mainImage(product)}
          alt={`${product.name} の仮画像（DEMO IMAGE）`}
          fill
          sizes={sizes}
          className="object-contain p-4 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-5 text-[0.75rem] font-medium tracking-[0.06em] text-muted">{category.label}</p>
      <h3 className="headline mt-1 text-[1.5rem] sm:text-[1.75rem]">{product.name}</h3>
      <p className="mx-auto mt-2 max-w-xs font-jp text-[0.8125rem] leading-relaxed text-muted line-clamp-2">{product.summary}</p>
      <span className="mt-3 inline-flex items-center justify-center gap-0.5 text-[0.9375rem] text-link group-hover:underline underline-offset-4">
        詳しく見る
        <ChevronRight aria-hidden className="size-4" />
      </span>
      {product.verification === "unverified" && <span className="mt-1 font-jp text-[0.6875rem] text-muted">詳細未登録</span>}
    </Link>
  );
}
