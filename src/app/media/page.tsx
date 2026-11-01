import type { Metadata } from "next";
import { MediaCard } from "@/components/MediaCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";
import { categories } from "@/data/categories";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { getProduct } from "@/lib/products";
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
              <RelatedLinks item={m} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RelatedLinks({ item }: { item: MediaItem }) {
  const products = (item.related ?? []).map((s) => getProduct(s)).filter((p) => p !== undefined);
  const cat = item.relatedCategory ? categories.find((c) => c.id === item.relatedCategory) : undefined;
  if (products.length === 0 && !cat) return null;
  return (
    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3 text-[0.875rem]">
      {products.map((p) => (
        <Link key={p.slug} href={`/products/${p.slug}`} data-track="select_item" data-track-item={p.slug} data-track-list="media" className="text-link hover:underline">
          {p.name} を見る ›
        </Link>
      ))}
      {cat && (
        <Link href={`/products?category=${cat.id}`} className="text-link hover:underline">
          {cat.label} を見る ›
        </Link>
      )}
    </p>
  );
}

export default function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Movies & Articles"
        title="Media"
        lead="動画と記事で、ルアーの動きと考え方を。"
      />
      <Group
        id="media-videos"
        tone="gray"
        title="動画"
        lead="公式チャンネルと、加藤誠司氏が語る動画。"
        items={media.filter((m) => m.kind === "youtube")}
      />
      <Group
        id="media-articles"
        tone="white"
        title="記事・インタビュー"
        lead="釣りメディアに掲載されたインタビュー・記事。"
        items={media.filter((m) => m.kind === "article")}
      />
      <Group id="media-social" tone="gray" title="公式SNS" items={media.filter((m) => m.kind === "instagram")} />
      <section className="section-y text-center">
        <a
          href={site.links.youtube}
          target="_blank"
          rel="noopener noreferrer"
          data-track="video_click"
          data-track-video="channel"
          className="inline-flex min-h-12 items-center rounded-full bg-fg px-7 text-[1rem] text-white hover:bg-fg/80"
        >
          公式 YouTube チャンネルへ ↗<span className="sr-only">（外部サイト）</span>
        </a>
      </section>
    </>
  );
}
