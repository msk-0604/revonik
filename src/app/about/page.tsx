import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button";
import { VerificationBadge } from "@/components/DemoBadge";
import { Reveal } from "@/components/Reveal";
import { approach, brandFacts, craftsmanship, history } from "@/data/about";
import { siteImages } from "@/data/images";

export const metadata: Metadata = {
  title: "ABOUT",
  description: "REVONIK のブランド概要と、ものづくりへの考え方（提案用デモ）。",
};

function Source({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-muted hover:text-fg hover:underline">
      出典：{label}
      <ArrowUpRight aria-hidden className="size-3" />
      <span className="sr-only">（外部サイト）</span>
    </a>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* イントロ */}
      <section className="container-x pt-40 pb-16 text-center md:pt-52 md:pb-24">
        <Reveal>
          <p className="eyebrow">About REVONIK</p>
          <h1 className="headline mt-3 text-[3rem] min-[375px]:text-[3.25rem] sm:text-7xl lg:text-[6rem]">
            Built for
            <br />
            the water.
          </h1>
          <p className="prose-jp mx-auto mt-8 max-w-[24em] text-[1.0625rem] text-fg/80 md:text-[1.3125rem]">
            水の中で起きていることに、まっすぐ向き合う。
          </p>
          <p className="mt-4 font-jp text-[0.75rem] text-muted">※ 見出し・本文は営業提案用の仮文章です。</p>
        </Reveal>
      </section>

      {/* 大きなビジュアル */}
      <Reveal y={32} className="mx-auto max-w-[1200px] px-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-bg-alt md:aspect-[16/9]">
          <Image src={siteImages.blueprint.src} alt={siteImages.blueprint.alt} fill sizes="(min-width: 1200px) 1200px, 100vw" className="object-cover" />
        </div>
      </Reveal>

      {/* 開発に対する考え方 */}
      <section aria-labelledby="approach" className="container-x section-y">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">Approach</p>
            <h2 id="approach" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              見えない部分まで、
              <br />
              設計する。
            </h2>
          </Reveal>
          {approach.paragraphs.map((p, i) => (
            <Reveal key={p} delay={0.05 * i}>
              <p className="prose-jp mx-auto mt-8 max-w-[34em] text-[1rem] text-fg/80 md:text-[1.0625rem]">{p}</p>
            </Reveal>
          ))}
          <Reveal className="mt-8">
            <VerificationBadge status={approach.status} />
            <p className="mt-2 font-jp text-[0.75rem] text-muted">REVONIK の公式な理念・発言ではありません。</p>
          </Reveal>
        </div>
      </section>

      {/* 製品づくりのこだわり */}
      <section aria-labelledby="craft" className="section-y bg-bg-alt">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Craft</p>
            <h2 id="craft" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              製品に共通するこだわり。
            </h2>
            <p className="prose-jp mx-auto mt-5 max-w-[30em] text-[0.9375rem] text-muted">
              公開されている製品情報から読み取れる特徴です。
            </p>
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
            {craftsmanship.map((c, i) => (
              <Reveal as="li" key={c.en} delay={i * 0.06} className="flex flex-col rounded-[1.25rem] bg-white p-7 md:p-8">
                <p className="text-[0.8125rem] font-semibold text-muted">{c.en.charAt(0) + c.en.slice(1).toLowerCase()}</p>
                <h3 className="mt-2 font-jp text-[1.25rem] font-bold">{c.title}</h3>
                <p className="mt-3 font-jp text-[0.875rem] leading-[1.85] text-fg/75">{c.text}</p>
                <VerificationBadge status={c.status} className="mt-5 self-start" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ブランド概要 */}
      <section aria-labelledby="overview" className="container-x section-y">
        <Reveal className="text-center">
          <p className="eyebrow">Overview</p>
          <h2 id="overview" className="headline mt-2 text-[2.25rem] sm:text-5xl">
            ブランド概要
          </h2>
        </Reveal>
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <dl className="border-t border-line">
            {brandFacts.map((f) => (
              <div key={f.label} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="font-jp text-[0.875rem] text-muted">{f.label}</dt>
                <dd className="font-jp text-[0.9375rem] leading-relaxed">
                  {f.value}
                  {f.source && (
                    <span className="mt-1 block text-[0.75rem]">
                      <Source href={f.source.url} label={f.source.label} />
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 font-jp text-[0.75rem] text-muted">
            ※ 販売店・釣りメディアの公開情報によるもので、公式未照合です。正式公開時は REVONIK 監修の内容に差し替えます。
          </p>
        </Reveal>
      </section>

      {/* ブランドの歩み */}
      <section aria-labelledby="history" className="section-y bg-bg-alt">
        <div className="container-x">
          <Reveal className="text-center">
            <p className="eyebrow">History</p>
            <h2 id="history" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              ブランドの歩み
            </h2>
          </Reveal>
          <ol className="mx-auto mt-12 max-w-3xl">
            {history.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 0.04} className="grid gap-1 border-b border-line py-6 first:border-t sm:grid-cols-[8rem_1fr] sm:gap-6">
                <p className="text-[0.875rem] font-semibold tabular-nums text-muted">{h.period === "—" ? "時期未確認" : h.period}</p>
                <div>
                  <h3 className="text-[1.1875rem] font-semibold tracking-tight">{h.title}</h3>
                  <p className="mt-1 font-jp text-[0.875rem] leading-relaxed text-fg/75">{h.text}</p>
                  {h.source && (
                    <p className="mt-1 text-[0.75rem]">
                      <Source href={h.source.url} label={h.source.label} />
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mx-auto mt-6 max-w-3xl font-jp text-[0.75rem] text-muted">
            ※ 第三者の公開情報をもとにした年表です。正式公開前に REVONIK にて内容をご確認いただく前提です。
          </p>
          <div className="mt-12 text-center">
            <Button href="/products" variant="link">
              製品を見る
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
