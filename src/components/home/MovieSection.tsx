import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button";
import { MediaCard } from "@/components/MediaCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { media } from "@/data/media";

/** 動画（YouTube への外部リンク）と記事の一覧 */
export function MovieSection() {
  const videos = media.filter((m) => m.kind === "youtube");
  const articles = media.filter((m) => m.kind === "article").slice(0, 4);
  return (
    <section aria-labelledby="movie-title" className="section-y bg-bg">
      <div className="container-x">
        <SectionHeading
          id="movie-title"
          eyebrow="Movie & Articles"
          title="ルアーを、語る。"
          lead="加藤誠司氏が語る動画とインタビュー記事。外部サイトへのリンクとしてご案内します。"
        />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-8">
          {videos.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 0.06}>
              <MediaCard item={m} />
            </Reveal>
          ))}
        </ul>
        <Reveal className="mx-auto mt-14 max-w-3xl">
          <ul className="border-t border-line">
            {articles.map((a) => (
              <li key={a.id} className="border-b border-line">
                <a href={a.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4">
                  <span>
                    <span className="block text-[0.75rem] text-muted">{a.source}</span>
                    <span className="mt-0.5 block font-jp text-[0.9375rem] font-medium group-hover:underline underline-offset-4">{a.title}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-4 shrink-0 text-link" />
                  <span className="sr-only">（外部サイト）</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="mt-10 text-center">
          <Button href="/media" variant="link">
            すべてのメディア
          </Button>
        </div>
      </div>
    </section>
  );
}
