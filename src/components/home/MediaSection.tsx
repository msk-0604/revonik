import { Button } from "@/components/Button";
import { MediaCard } from "@/components/MediaCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { media } from "@/data/media";
import { site } from "@/data/site";

export function MediaSection() {
  return (
    <section aria-labelledby="media-title" className="container-x py-24 md:py-36">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Media"
          title={<span id="media-title">Media</span>}
          lead="Instagram・動画・メディア掲載への導線。公式に埋め込みが許可されたコンテンツのみ埋め込み、それ以外は外部リンクでご案内します。"
        />
        <Reveal>
          <Button href={site.links.instagram} external variant="outline">
            Instagram
          </Button>
        </Reveal>
      </div>
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {media.slice(0, 3).map((m, i) => (
          <Reveal as="li" key={m.id} delay={i * 0.08}>
            <MediaCard item={m} />
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-10">
        <Button href="/media" variant="ghost">
          View all media
        </Button>
      </Reveal>
    </section>
  );
}
