import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { brandFacts, history } from "@/data/about";
import { designer, principles } from "@/data/designer";
import { siteImages } from "@/data/images";

export const metadata: Metadata = {
  title: "ABOUT",
  description: "ルアーデザイナー加藤誠司氏のルアー開発への考え方と、REVONIK のあゆみ（提案用デモ）。",
};

export default function AboutPage() {
  return (
    <>
      {/* イントロ：デザイナーと言葉 */}
      <section aria-labelledby="about-title" className="container-x pt-40 pb-16 text-center md:pt-52 md:pb-24">
        <Reveal>
          <p className="index-label">
            <span>About</span>
            <span aria-hidden className="h-px w-6 bg-muted/40" />
            <span>Designer</span>
          </p>
          <h1 id="about-title" className="headline mt-4 text-[3rem] min-[375px]:text-[3.5rem] sm:text-7xl lg:text-[6rem]">
            {designer.nameEn}
          </h1>
          <p className="mt-3 font-jp text-[1rem] tracking-[0.3em]">{designer.name}</p>
          <p className="mt-1 text-[0.8125rem] text-muted">{designer.role}</p>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-14 max-w-4xl md:mt-20">
          <figure>
            <blockquote>
              <p className="statement text-[1.75rem] min-[375px]:text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem]">「{designer.quote.text}」</p>
            </blockquote>
            <figcaption className="mt-6 text-[0.75rem] text-muted">— {designer.name}（ルアマガプラス掲載記事より）</figcaption>
          </figure>
        </Reveal>
      </section>

      <Reveal y={32} className="mx-auto max-w-[1200px] px-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-bg-alt md:aspect-[16/9]">
          <Image src={siteImages.blueprint.src} alt={siteImages.blueprint.alt} fill sizes="(min-width: 1200px) 1200px, 100vw" className="object-cover" />
        </div>
      </Reveal>

      {/* 経歴 */}
      <section aria-labelledby="career" className="container-x section-y">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Career</p>
          <h2 id="career" className="headline mt-2 text-[2.25rem] sm:text-5xl">
            数々のルアーを生んだ手から。
          </h2>
          <p className="prose-jp mx-auto mt-8 max-w-[34em] text-[1rem] text-fg/80 md:text-[1.0625rem]">{designer.career.text}</p>
        </Reveal>
      </section>

      {/* ルアー開発への考え方 */}
      <section aria-labelledby="principles" className="section-y bg-bg-alt">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Philosophy</p>
            <h2 id="principles" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              ルアー開発への考え方。
            </h2>
            <p className="prose-jp mx-auto mt-5 max-w-[32em] text-[0.875rem] text-muted">インタビューや記事で紹介されてきた、ものづくりの考え方。</p>
          </Reveal>
          <ol className="mx-auto mt-14 max-w-5xl md:mt-20">
            {principles.map((p) => (
              <Reveal
                as="li"
                key={p.no}
                className="grid gap-4 border-t border-line py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:py-14"
              >
                <div>
                  <p className="index-label">
                    <span>{p.no}</span>
                    <span aria-hidden className="h-px w-6 bg-muted/40" />
                    <span>{p.en}</span>
                  </p>
                  <h3 className="statement mt-4 text-[1.625rem] sm:text-[2rem]">{p.title}</h3>
                </div>
                <div className="md:pt-8">
                  <p className="prose-jp text-[0.9375rem] text-fg/80 md:text-[1rem]">{p.text}</p>
                  <p className="mt-4 rounded-xl bg-white px-4 py-3 font-jp text-[0.8125rem] leading-relaxed text-fg/75">{p.example}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ブランドの歩み */}
      <section aria-labelledby="history" className="container-x section-y">
        <Reveal className="text-center">
          <p className="eyebrow">History</p>
          <h2 id="history" className="headline mt-2 text-[2.25rem] sm:text-5xl">
            REVONIK のあゆみ
          </h2>
        </Reveal>
        <ol className="mx-auto mt-12 max-w-3xl">
          {history.map((h, i) => (
            <Reveal as="li" key={h.title} delay={i * 0.03} className="grid gap-1 border-b border-line py-6 first:border-t sm:grid-cols-[8rem_1fr] sm:gap-6">
              <p className="text-[0.875rem] font-semibold tabular-nums text-muted">{h.period === "—" ? "時期未確認" : h.period}</p>
              <div>
                <h3 className="text-[1.1875rem] font-semibold tracking-tight">{h.title}</h3>
                <p className="mt-1 font-jp text-[0.875rem] leading-relaxed text-fg/75">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ブランド概要 */}
      <section aria-labelledby="overview" className="section-y bg-bg-alt">
        <div className="container-x">
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
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 text-center">
              <Button href="/products" variant="link">
                製品を見る
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
