import type { Metadata } from "next";
import { NewsCard } from "@/components/NewsCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { sortedNews } from "@/data/news";

export const metadata: Metadata = {
  title: "NEWS",
  description: "新製品・イベント・ブランドニュースの掲載イメージ（提案用デモ・サンプル記事）。",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Information"
        title="News"
        lead="新製品情報・イベント・ブランドニュースを掲載するページです。現在の記事はすべてデモ用のサンプルで、REVONIK の実際の発表ではありません。"
      />
      <section aria-label="記事一覧" className="container-x py-20 md:py-28">
        <ul className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {sortedNews.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={(i % 3) * 0.06}>
              <NewsCard article={a} />
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
