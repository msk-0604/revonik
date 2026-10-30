import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button";
import { VerificationBadge } from "@/components/DemoBadge";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { approach, brandFacts, craftsmanship, history } from "@/data/about";
import { siteImages } from "@/data/images";

export const metadata: Metadata = {
  title: "ABOUT",
  description: "REVONIK のブランド概要と、ものづくりへの考え方（提案用デモ）。",
};

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline decoration-line-strong underline-offset-4 hover:text-fg">
      {children}
      <ArrowUpRight aria-hidden className="size-3" />
      <span className="sr-only">（外部サイト）</span>
    </a>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About REVONIK"
        title="Built for the water."
        lead="ブランドの概要と、ものづくりへの考え方。公開情報で確認できた内容と、提案用の仮文章を区別して掲載しています。"
      />

      {/* ブランド概要 */}
      <section aria-labelledby="overview" className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="font-display text-[0.7rem] font-semibold tracking-[0.24em] text-muted">01</p>
          <h2 id="overview" className="display mt-3 text-3xl md:text-4xl">Overview</h2>
          <p className="mt-2 font-jp text-xs tracking-[0.2em] text-muted">ブランド概要</p>
        </div>
        <Reveal>
          <dl className="border-t border-line">
            {brandFacts.map((f) => (
              <div key={f.label} className="grid gap-2 border-b border-line py-5 md:grid-cols-[12rem_1fr] md:gap-8">
                <dt className="font-jp text-[0.8rem] text-muted">{f.label}</dt>
                <dd className="font-jp text-[0.95rem] leading-relaxed">
                  {f.value}
                  {f.source && (
                    <span className="mt-2 block font-jp text-[0.72rem] text-muted">
                      出典：<ExtLink href={f.source.url}>{f.source.label}</ExtLink>
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <VerificationBadge status="retailer" />
            <span className="font-jp text-[0.72rem] text-muted">公式情報の受領後に、正式な会社情報・ブランド紹介へ差し替えます。</span>
          </div>
        </Reveal>
      </section>

      {/* 開発に対する考え方 */}
      <section aria-labelledby="approach" className="border-y border-line bg-panel">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[40rem]">
            <Image src={siteImages.blueprint.src} alt={siteImages.blueprint.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-5 py-20 md:px-10 md:py-28 lg:px-16 xl:px-24">
            <Reveal>
              <p className="font-display text-[0.7rem] font-semibold tracking-[0.24em] text-muted">02</p>
              <h2 id="approach" className="display mt-3 text-[2.6rem] sm:text-6xl">Approach</h2>
              <p className="mt-2 font-jp text-xs tracking-[0.2em] text-muted">開発に対する考え方</p>
              <div className="mt-8">
                <VerificationBadge status={approach.status} />
              </div>
              {approach.paragraphs.map((p) => (
                <p key={p} className="prose-jp mt-6 text-[0.95rem]">{p}</p>
              ))}
              <p className="mt-6 font-jp text-[0.72rem] leading-relaxed text-muted">
                ※ 営業提案用に作成した仮の文章です。REVONIK の公式な理念・発言ではありません。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 製品づくりのこだわり */}
      <section aria-labelledby="craft" className="container-x py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="font-display text-[0.7rem] font-semibold tracking-[0.24em] text-muted">03</p>
            <h2 id="craft" className="display mt-3 text-3xl md:text-4xl">Craft</h2>
            <p className="mt-2 font-jp text-xs tracking-[0.2em] text-muted">製品づくりのこだわり</p>
          </div>
          <div>
            <p className="prose-jp max-w-2xl text-[0.95rem]">公開されている製品情報から読み取れる、REVONIK のルアーに共通する特徴です。</p>
            <ul className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
              {craftsmanship.map((c, i) => (
                <Reveal as="li" key={c.en} delay={i * 0.06} className="flex flex-col bg-ink p-6 md:p-8">
                  <p className="font-display text-[0.7rem] font-semibold tracking-[0.24em] text-muted">{c.en}</p>
                  <h3 className="mt-4 font-jp text-lg font-bold">{c.title}</h3>
                  <p className="mt-4 font-jp text-[0.85rem] leading-[1.9] text-fg/75">{c.text}</p>
                  <VerificationBadge status={c.status} className="mt-6 self-start" />
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ブランドの歩み */}
      <section aria-labelledby="history" className="border-t border-line">
        <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="font-display text-[0.7rem] font-semibold tracking-[0.24em] text-muted">04</p>
            <h2 id="history" className="display mt-3 text-3xl md:text-4xl">History</h2>
            <p className="mt-2 font-jp text-xs tracking-[0.2em] text-muted">ブランドの歩み</p>
          </div>
          <div>
            <ol className="relative border-l border-line-strong">
              {history.map((h, i) => (
                <Reveal as="li" key={h.title} delay={i * 0.04} className="relative pb-10 pl-8 last:pb-0 md:pl-12">
                  <span aria-hidden className="absolute top-1.5 -left-[5px] size-[9px] rounded-full bg-fg" />
                  <p className="font-display text-sm font-bold tracking-[0.18em] text-muted">{h.period === "—" ? "時期 未確認" : h.period}</p>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-wide md:text-2xl">{h.title}</h3>
                  <p className="mt-2 font-jp text-[0.85rem] leading-relaxed text-fg/75">{h.text}</p>
                  {h.source && (
                    <p className="mt-2 font-jp text-[0.72rem] text-muted">
                      出典：<ExtLink href={h.source.url}>{h.source.label}</ExtLink>
                    </p>
                  )}
                </Reveal>
              ))}
            </ol>
            <p className="mt-10 font-jp text-[0.72rem] leading-relaxed text-muted">
              ※ 第三者の公開情報をもとにした年表です。正式公開前に REVONIK にて内容をご確認いただく前提です。
            </p>
            <div className="mt-10">
              <Button href="/products" variant="outline">Products</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
