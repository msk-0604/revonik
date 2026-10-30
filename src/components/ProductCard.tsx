import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategory, mainImage } from "@/lib/products";
import type { Product } from "@/types";

type Props = {
  product: Product;
  index?: number;
  size?: "lg" | "md";
  sizes?: string;
};

export function ProductCard({ product, index, size = "md", sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" }: Props) {
  const category = getCategory(product.category);
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex h-full flex-col border border-line bg-panel transition-colors duration-500 hover:border-line-strong"
    >
      <div className={`relative overflow-hidden bg-ink ${size === "lg" ? "aspect-[4/3] lg:aspect-[16/11]" : "aspect-[4/3]"}`}>
        <Image
          src={mainImage(product)}
          alt={`${product.name} の仮画像（DEMO IMAGE）`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-80"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow !tracking-[0.24em]">
            {index !== undefined && <span className="mr-3 text-fg">{String(index + 1).padStart(2, "0")}</span>}
            {category.label}
          </p>
          {product.verification === "unverified" && (
            <span className="font-jp text-[0.66rem] text-muted">詳細未登録</span>
          )}
        </div>
        <h3 className={`display normal-case ${size === "lg" ? "text-4xl md:text-5xl" : "text-3xl md:text-[2.2rem]"}`}>{product.name}</h3>
        <p className="font-jp text-[0.82rem] leading-relaxed text-muted line-clamp-2">{product.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 font-display text-[0.72rem] font-semibold tracking-[0.24em] text-fg">
          詳細を見る
          <ArrowRight aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
