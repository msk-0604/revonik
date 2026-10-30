import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
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
      <article className="container-x pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <Link href="/news" className="inline-flex min-h-11 items-center gap-1 text-[0.9375rem] text-link hover:underline underline-offset-4">
            <ChevronLeft aria-hidden className="size-4" /> News 一覧
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.8125rem] text-muted">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden>·</span>
            <span>{article.category}</span>
            {article.sample && <SampleBadge />}
          </div>
          <h1 className="mt-4 font-jp text-[1.75rem] leading-[1.5] font-bold md:text-[2.5rem] md:leading-[1.4]">{article.title}</h1>
          {article.sample && (
            <p className="mt-6 rounded-xl bg-bg-alt px-4 py-3 font-jp text-[0.8125rem] leading-relaxed text-muted">
              この記事はデモ用のサンプルです。REVONIK の実際のニュース・発表ではありません。
            </p>
          )}
        </div>
        <div className="relative mx-auto mt-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-[1.5rem] bg-bg-alt">
          <Image src={article.image ?? newsImages[article.category]} alt="記事の仮画像（DEMO IMAGE）" fill preload sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          {article.body.map((p) => (
            <p key={p} className="prose-jp mt-6 text-[1.0625rem] first:mt-0">{p}</p>
          ))}
        </div>
      </article>
      <section aria-labelledby="other-news" className="section-y bg-bg-alt">
        <div className="container-x">
          <h2 id="other-news" className="headline text-center text-[2.25rem] sm:text-5xl">
            ほかのニュース
          </h2>
          <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
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
