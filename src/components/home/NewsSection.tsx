import { Button } from "@/components/Button";
import { NewsCard } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { sortedNews } from "@/data/news";

export function NewsSection() {
  return (
    <section aria-labelledby="news-title" className="border-t border-line">
      <div className="container-x py-24 md:py-36">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="News"
            title={<span id="news-title">News</span>}
            lead="新製品・イベント・ブランドニュースの掲載イメージです。現在の記事はすべてデモ用のサンプルで、REVONIK の実際の発表ではありません。"
          />
          <Reveal>
            <Button href="/news" variant="outline">
              All News
            </Button>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {sortedNews.slice(0, 3).map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.08}>
              <NewsCard article={a} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
