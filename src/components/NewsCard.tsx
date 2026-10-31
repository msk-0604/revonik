import Image from "next/image";
import Link from "next/link";
import { newsImages } from "@/data/images";
import { formatDate } from "@/lib/format";
import type { NewsArticle } from "@/types";
import { SampleBadge } from "./DemoBadge";

export function NewsCard({ article, surface = "gray" }: { article: NewsArticle; surface?: "gray" | "white" }) {
  return (
    <Link href={`/news/${article.slug}`} className="group flex h-full flex-col">
      <div className={`relative aspect-[16/10] overflow-hidden rounded-[1.25rem] ${surface === "white" ? "bg-white" : "bg-bg-alt"}`}>
        <Image
          src={article.image ?? newsImages[article.category]}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
        />
        {article.sample && <SampleBadge className="absolute top-3 right-3" />}
      </div>
      <p className="mt-4 text-[0.75rem] font-medium tracking-[0.04em] text-muted">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span className="mx-2">·</span>
        {article.category}
      </p>
      <h3 className="mt-1 font-jp text-[1.0625rem] font-bold leading-relaxed group-hover:underline underline-offset-4">{article.title}</h3>
      <p className="mt-1 font-jp text-[0.8125rem] leading-relaxed text-muted line-clamp-2">{article.excerpt}</p>
    </Link>
  );
}
