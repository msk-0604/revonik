import Link from "next/link";
import { newsCategoryLabel } from "@/data/news";
import { formatDate } from "@/lib/format";
import type { NewsArticle } from "@/types";
import { ProductVisual } from "@/components/ProductVisual";
import { getProduct, mainImage } from "@/lib/products";

/** 記事のビジュアル：関連製品があれば製品ビジュアル、なければカテゴリー名の面 */
export function NewsVisual({ article, surface = "gray", className = "aspect-[16/10]" }: { article: NewsArticle; surface?: "gray" | "white"; className?: string }) {
  const p = article.related ? getProduct(article.related) : undefined;
  if (p) {
    return <ProductVisual product={p} src={mainImage(p)} size="card" sizes="(min-width: 1024px) 380px, 50vw" className={`${className} rounded-[1.25rem]`} />;
  }
  return (
    <div className={`flex items-center justify-center rounded-[1.25rem] ${surface === "white" ? "bg-panel" : "bg-bg-alt"} ${className}`}>
      <span className="display text-[2.5rem] text-black/[0.07]">{newsCategoryLabel[article.category] ? article.category : "NEWS"}</span>
    </div>
  );
}

export function NewsCard({ article, surface = "gray" }: { article: NewsArticle; surface?: "gray" | "white" }) {
  return (
    <Link href={`/news/${article.slug}`} className="group flex h-full flex-col">
      <NewsVisual article={article} surface={surface} />
      <p className="mt-4 text-[0.75rem] font-medium tracking-[0.04em] text-muted">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span className="mx-2">·</span>
        <span className="font-jp">{newsCategoryLabel[article.category]}</span>
      </p>
      <h3 className="mt-1 font-jp text-[1.0625rem] font-bold leading-relaxed group-hover:underline underline-offset-4">{article.title}</h3>
      <p className="mt-1 font-jp text-[0.8125rem] leading-relaxed text-muted line-clamp-2">{article.excerpt}</p>
    </Link>
  );
}
