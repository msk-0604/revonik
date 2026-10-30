import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SampleBadge } from "@/components/DemoBadge";
import { NewsCard } from "@/components/NewsCard";
import { newsImages } from "@/data/images";
import { news, sortedNews } from "@/data/news";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = news.find((a) => a.slug === slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function NewsDetailPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = news.find((a) => a.slug === slug);
  if (!article) notFound();
  const others = sortedNews.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="container-x pt-36 pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <Link href="/news" className="inline-flex items-center gap-2 font-display text-[0.7rem] font-semibold tracking-[0.22em] text-muted hover:text-fg">
            <ArrowLeft aria-hidden className="size-4" /> NEWS
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-4 font-display text-[0.72rem] font-semibold tracking-[0.2em] text-muted">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <span>{article.category}</span>
            {article.sample && <SampleBadge />}
          </div>
          <h1 className="mt-6 font-jp text-2xl leading-relaxed font-bold md:text-[2.1rem] md:leading-[1.6]">{article.title}</h1>
          {article.sample && (
            <p className="mt-6 border-l-2 border-line-strong pl-4 font-jp text-[0.8rem] leading-relaxed text-muted">
              この記事はデモ用のサンプルです。REVONIK の実際のニュース・発表ではありません。
            </p>
          )}
        </div>
        <div className="relative mx-auto mt-12 aspect-[16/9] max-w-5xl overflow-hidden border border-line bg-panel">
          <Image src={article.image ?? newsImages[article.category]} alt="記事の仮画像（DEMO IMAGE）" fill preload sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          {article.body.map((p) => (
            <p key={p} className="prose-jp mt-6 text-[0.98rem] first:mt-0">{p}</p>
          ))}
        </div>
      </article>
      <section aria-labelledby="other-news" className="border-t border-line">
        <div className="container-x py-20 md:py-28">
          <h2 id="other-news" className="display text-3xl md:text-5xl">Other News</h2>
          <ul className="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {others.map((a) => (
              <li key={a.slug}>
                <NewsCard article={a} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
