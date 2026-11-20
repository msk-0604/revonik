import type { Metadata } from "next";
import Link from "next/link";
import { Engineering } from "@/components/home/Engineering";
import { RangeChart } from "@/components/home/RangeChart";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { designAspects } from "@/data/engineering";
import { technologies } from "@/data/technology";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "TECHNOLOGY",
  description: "ボディ構造・ウェイト配置・アクション・素材・浮力・潜行深度・サウンド。REVONIK のルアーを形づくる設計。",
  alternates: { canonical: "/technology" },
};

export default function TechnologyPage() {
  return (
    <>
      <PageHeader eyebrow="Technology" title="Engineered, not decorated." lead="形、素材、重心、音。すべての要素に、設計上の理由がある。" />

      {/* 設計観点の目次 */}
      <nav aria-label="設計の観点" className="container-x pb-12">
        <ul className="flex flex-wrap justify-center gap-2">
          {designAspects.map((a) => (
            <li key={a.id}>
              <a href={`#${a.id}`} className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-[0.8125rem] text-fg/80 hover:border-fg/40 hover:text-fg">
                {a.en}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 技術資料のような一覧 */}
      <section aria-label="設計の観点と製品の実例" className="container-x pb-24">
        <ol className="border-t border-line">
          {designAspects.map((a, i) => (
            <Reveal as="li" key={a.id} className="scroll-mt-24 border-b border-line py-12 md:py-16">
              <div id={a.id} className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                <div>
                  <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")} — {a.en.toUpperCase()}
                  </p>
                  <h2 className="headline mt-4 text-[2rem] sm:text-[2.75rem]">{a.title}</h2>
                  <p className="mt-3 font-jp text-[1rem] leading-relaxed text-fg/75">{a.lead}</p>
                </div>
                <ul className="divide-y divide-line">
                  {a.examples.map((e) => {
                    const p = getProduct(e.slug);
                    return p ? (
                      <li key={e.slug + e.text} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                        <Link href={`/products/${p.slug}`} className="text-[1rem] font-semibold tracking-tight hover:text-link">
                          {p.name}
                        </Link>
                        <p className="font-jp text-[0.9375rem] leading-[1.8] text-fg/80">{e.text}</p>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <Engineering />
      <RangeChart />

      <section aria-labelledby="tech-index" className="section-y">
        <div className="container-x">
          <h2 id="tech-index" className="headline text-center text-[2.25rem] sm:text-5xl">
            搭載技術
          </h2>
          <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((t) => (
              <li key={t.id} className="rounded-[1.25rem] bg-panel p-7">
                <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-accent">{t.en}</p>
                <p className="mt-2 font-jp text-[1.125rem] font-bold">{t.title}</p>
                <p className="mt-2 font-jp text-[0.875rem] leading-relaxed text-fg/75">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
