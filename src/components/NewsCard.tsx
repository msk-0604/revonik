import Image from "next/image";
import Link from "next/link";
import { newsImages } from "@/data/images";
import { formatDate } from "@/lib/format";
import type { NewsArticle } from "@/types";
import { SampleBadge } from "./DemoBadge";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden border border-line bg-panel">
        <Image
          src={article.image ?? newsImages[article.category]}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
        />
        {article.sample && <SampleBadge className="absolute top-3 right-3" />}
      </div>
      <div className="mt-5 flex items-center gap-4 font-display text-[0.7rem] font-semibold tracking-[0.2em] text-muted">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span aria-hidden className="h-px w-6 bg-line-strong" />
        <span>{article.category}</span>
      </div>
      <h3 className="mt-3 font-jp text-[1.02rem] font-bold leading-relaxed transition-colors group-hover:text-accent">
        {article.title}
      </h3>
      <p className="mt-2 font-jp text-[0.82rem] leading-relaxed text-muted line-clamp-2">{article.excerpt}</p>
    </Link>
  );
}
