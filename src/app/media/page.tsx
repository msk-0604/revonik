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
        lead="公式SNS・オンラインストア・メディア掲載への導線をまとめています。埋め込みは公式の許諾が確認できたコンテンツのみとし、現時点ではすべて外部リンクでご案内します。"
      />
      <section aria-labelledby="official-media" className="container-x py-20 md:py-28">
        <h2 id="official-media" className="eyebrow">Official</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {official.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 0.06}>
              <MediaCard item={m} />
            </Reveal>
          ))}
        </ul>
      </section>
      <section aria-labelledby="external-media" className="border-t border-line">
        <div className="container-x py-20 md:py-28">
          <h2 id="external-media" className="eyebrow">Videos & Articles（外部サイト）</h2>
          <p className="mt-4 max-w-2xl font-jp text-[0.82rem] leading-relaxed text-muted">
            第三者のメディア・動画サービスへのリンクです。REVONIK 公式のコンテンツではありません。
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {external.map((m, i) => (
              <Reveal as="li" key={m.id} delay={i * 0.06}>
                <MediaCard item={m} />
              </Reveal>
            ))}
          </ul>
          <div className="mt-14 border border-line bg-panel p-6 md:p-10">
            <p className="eyebrow">Embed policy</p>
            <p className="mt-4 max-w-3xl font-jp text-[0.88rem] leading-[1.9] text-fg/80">
              正式公開時は、REVONIK 公式 YouTube の動画や Instagram 投稿を、許諾を確認した上でこのページと各商品ページに埋め込めます（YouTube は読み込みの軽いクリック再生方式に対応済み）。
            </p>
            <div className="mt-8">
              <Button href={site.links.instagram} external variant="outline">Instagram</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
