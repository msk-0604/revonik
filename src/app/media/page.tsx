import type { Metadata } from "next";
import { MediaCard } from "@/components/MediaCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { media } from "@/data/media";
import type { MediaItem } from "@/types";

export const metadata: Metadata = {
  title: "MEDIA",
  description: "加藤誠司氏が語る動画・インタビュー記事・公式SNSへの導線（提案用デモ）。",
};

function Group({ id, title, lead, items, tone }: { id: string; title: string; lead?: string; items: MediaItem[]; tone: "white" | "gray" }) {
  return (
    <section aria-labelledby={id} className={`section-y ${tone === "gray" ? "bg-bg-alt" : "bg-bg"}`}>
      <div className="container-x">
        <h2 id={id} className="headline text-[1.75rem] sm:text-[2.25rem]">
          {title}
        </h2>
        {lead && <p className="mt-3 max-w-2xl font-jp text-[0.875rem] leading-relaxed text-muted">{lead}</p>}
        <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 0.06}>
              <MediaCard item={m} surface={tone === "gray" ? "white" : "gray"} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Movies & Articles"
        title="Media"
        lead="加藤誠司氏が語る動画やインタビュー記事、公式SNSへの導線です。埋め込みは公式の許諾が確認できたコンテンツのみとし、現時点ではすべて外部リンクでご案内します。"
      />
      <Group
        id="media-videos"
        tone="gray"
        title="動画"
        lead="YouTube に公開されている動画へのリンクです（外部サイト）。"
        items={media.filter((m) => m.kind === "youtube")}
      />
      <Group
        id="media-articles"
        tone="white"
        title="記事・インタビュー"
        lead="釣りメディアの記事へのリンクです。REVONIK 公式のコンテンツではありません。"
        items={media.filter((m) => m.kind === "article")}
      />
      <Group id="media-social" tone="gray" title="公式SNS" items={media.filter((m) => m.kind === "instagram")} />
    </>
  );
}
