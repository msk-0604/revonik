import { Button } from "@/components/Button";
import { MediaCard } from "@/components/MediaCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { media } from "@/data/media";

export function MediaSection({ tone = "gray" }: { tone?: "white" | "gray" }) {
  return (
    <section aria-labelledby="media-title" className={`section-y ${tone === "gray" ? "bg-bg-alt" : "bg-bg"}`}>
      <div className="container-x">
        <SectionHeading
          id="media-title"
          eyebrow="Media"
          title="動画と記事。"
          lead="加藤誠司氏が語る動画やインタビュー記事、公式 Instagram への導線です。外部サイトへのリンクとしてご案内します。"
        />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {media.slice(0, 3).map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 0.06}>
              <MediaCard item={m} surface={tone === "gray" ? "white" : "gray"} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Button href="/media" variant="link">
            すべてのメディア
          </Button>
        </div>
      </div>
    </section>
  );
}
