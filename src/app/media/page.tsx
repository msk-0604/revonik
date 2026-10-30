import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { MediaCard } from "@/components/MediaCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { media } from "@/data/media";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "MEDIA",
  description: "REVONIK の動画・SNS・メディア掲載への導線（提案用デモ）。",
};

export default function MediaPage() {
  const official = media.filter((m) => !m.thirdParty);
  const external = media.filter((m) => m.thirdParty);
  return (
    <>
      <PageHeader
        eyebrow="Movies & Social"
        title="Media"
        lead="公式SNS・オンラインストア・メディア掲載への導線です。埋め込みは公式の許諾が確認できたコンテンツのみとし、現時点ではすべて外部リンクでご案内します。"
      />
      <section aria-labelledby="official-media" className="container-x pb-20 md:pb-28">
        <h2 id="official-media" className="headline text-[1.75rem]">
          公式
        </h2>
        <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:gap-8">
          {official.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 0.06}>
              <MediaCard item={m} />
            </Reveal>
          ))}
        </ul>
      </section>
      <section aria-labelledby="external-media" className="section-y bg-bg-alt">
        <div className="container-x">
          <h2 id="external-media" className="headline text-[1.75rem]">
            動画・記事（外部サイト）
          </h2>
          <p className="mt-3 max-w-2xl font-jp text-[0.875rem] leading-relaxed text-muted">
            第三者のメディア・動画サービスへのリンクです。REVONIK 公式のコンテンツではありません。
          </p>
          <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {external.map((m, i) => (
              <Reveal as="li" key={m.id} delay={i * 0.06}>
                <MediaCard item={m} surface="white" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="container-x section-y text-center">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="headline text-[1.75rem] sm:text-[2.25rem]">埋め込みの方針</h2>
          <p className="prose-jp mt-4 text-[0.9375rem] text-muted">
            正式公開時は、REVONIK 公式 YouTube の動画や Instagram 投稿を、許諾を確認したうえで商品ページなどに埋め込めます（YouTube は読み込みの軽いクリック再生方式に対応済み）。
          </p>
          <div className="mt-6">
            <Button href={site.links.instagram} external variant="link">
              Instagram を見る
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
