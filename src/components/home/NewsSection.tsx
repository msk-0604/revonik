import { Button } from "@/components/Button";
import { NewsCard } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { sortedNews } from "@/data/news";

export function NewsSection({ tone = "white" }: { tone?: "white" | "gray" }) {
  return (
    <section aria-labelledby="news-title" className={`section-y ${tone === "gray" ? "bg-bg-alt" : "bg-bg"}`}>
      <div className="container-x">
        <SectionHeading
          id="news-title"
          eyebrow="News"
          title="最新情報。"
          lead="現在の記事はすべてデモ用のサンプルで、REVONIK の実際の発表ではありません。"
        />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {sortedNews.slice(0, 3).map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.06}>
              <NewsCard article={a} surface={tone === "gray" ? "white" : "gray"} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Button href="/news" variant="link">
            すべてのニュース
          </Button>
        </div>
      </div>
    </section>
  );
}
