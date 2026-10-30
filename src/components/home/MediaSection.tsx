import { Button } from "@/components/Button";
import { MediaCard } from "@/components/MediaCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { media } from "@/data/media";

export function MediaSection() {
  return (
    <section aria-labelledby="media-title" className="section-y bg-bg-alt">
      <div className="container-x">
        <SectionHeading
          id="media-title"
          eyebrow="Media"
          title="SNS と動画。"
          lead="Instagram・動画・メディア掲載への導線です。公式に埋め込みが許可されたコンテンツのみ埋め込み、それ以外は外部リンクでご案内します。"
        />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {media.slice(0, 3).map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 0.06}>
              <MediaCard item={m} surface="white" />
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
