import type { Metadata } from "next";
import Link from "next/link";
import { Engineering } from "@/components/home/Engineering";
import { RangeChart } from "@/components/home/RangeChart";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { designAspects } from "@/data/engineering";
import { technologies } from "@/data/technology";
import { getProduct } from "@/lib/products";
import { OfficialFilm } from "@/components/OfficialFilm";
import { getVideo } from "@/data/videos";

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

      {/* 搭載技術：構造の説明と、採用製品の公式動画 */}
      <section aria-labelledby="tech-index" className="section-y">
        <div className="container-x">
          <Reveal className="text-center">
            <p className="eyebrow">Inside the lure</p>
            <h2 id="tech-index" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              構造を、映像で。
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-jp text-[0.9375rem] leading-relaxed text-muted">
              搭載技術ごとに、採用製品の公式解説動画（REVONIK 公式 YouTube）を並べています。
            </p>
          </Reveal>
          <ol className="mx-auto mt-14 max-w-6xl divide-y divide-line border-y border-line">
            {technologies.map((t, i) => {
              const film = t.film ? getVideo(t.film) : undefined;
              return (
                <Reveal as="li" key={t.id} className="grid gap-8 py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-14 md:py-16">
                  <div className={!film ? "md:col-span-2 md:max-w-2xl" : i % 2 === 1 ? "md:order-2" : ""}>
                    <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")} — {t.en}
                    </p>
                    <h3 className="headline mt-3 text-[1.75rem] sm:text-[2.25rem]">{t.title}</h3>
                    <p className="mt-3 font-jp text-[1rem] leading-[1.85] text-fg/80">{t.text}</p>
                    <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[0.875rem]">
                      <span className="text-muted">採用製品</span>
                      {t.products.map((slug) => {
                        const p = getProduct(slug);
                        return p ? (
                          <Link key={slug} href={`/products/${slug}`} data-track="select_item" data-track-item={slug} data-track-list="technology" className="text-link hover:underline">
                            {p.name}
                          </Link>
                        ) : null;
                      })}
                    </p>
                    <p className="mt-3 text-[0.75rem] text-muted">
                      出典：
                      <a href={t.source.url} target="_blank" rel="noopener noreferrer" className="hover:text-fg hover:underline">
                        {t.source.label}
                        <span className="sr-only">（外部サイト）</span>
                      </a>
                    </p>
                  </div>
                  {film && (
                    <OfficialFilm
                      video={film}
                      size="large"
                      label={`採用製品の公式解説：${getProduct(film.products[0])?.name ?? ""}`}
                      placement="technology"
                      className={i % 2 === 1 ? "md:order-1" : ""}
                    />
                  )}
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 開発の現場（公式ショート動画） */}
      {(() => {
        const short = getVideo("IckW2YdUmU8");
        return short ? (
          <section aria-labelledby="lab-title" className="section-y bg-bg-alt">
            <div className="container-x grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 lg:max-w-5xl lg:mx-auto">
              <Reveal>
                <p className="eyebrow">From the field</p>
                <h2 id="lab-title" className="headline mt-2 text-[2.25rem] sm:text-5xl">
                  開発の現場から。
                </h2>
                <p className="mt-4 max-w-md font-jp text-[1rem] leading-[1.85] text-fg/80">
                  設計図の上だけでは終わらせない。2026 年の新製品の開発テストの様子を、REVONIK 公式のショート動画で。
                </p>
              </Reveal>
              <Reveal delay={0.08} className="w-full">
                <OfficialFilm video={short} size="large" label="2026 新製品 開発現場から（ショート動画）" placement="technology_short" />
              </Reveal>
            </div>
          </section>
        ) : null;
      })()}
    </>
  );
}
