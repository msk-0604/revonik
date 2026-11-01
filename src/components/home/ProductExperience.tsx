import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/data/experience";
import { site } from "@/data/site";
import { featuredProducts, getCategory, mainImage, storeLink } from "@/lib/products";

/** SECTION 02 — PRODUCT EXPERIENCE：1製品につき1つの大きなセクション */
export function ProductExperience() {
  const items = featuredProducts();
  return (
    <div id="products">
      {items.map((p, i) => {
        const x = experience[p.slug];
        const category = getCategory(p.category);
        const facts = [
          { label: "釣り", text: x.fishing },
          { label: "動き", text: x.action },
          { label: "使う場面", text: x.situation },
          { label: "使い分け", text: x.versus },
        ];
        return (
          <section
            key={p.slug}
            aria-labelledby={`exp-${p.slug}`}
            className={`overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 ${i % 2 === 0 ? "bg-bg-alt" : "bg-bg"}`}
          >
            <Reveal className="container-x text-center">
              <p className="index-label">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden className="h-px w-6 bg-muted/40" />
                <span>{category.label}</span>
              </p>
              <h2 id={`exp-${p.slug}`} className="headline mt-3 text-[3rem] sm:text-7xl lg:text-[5.5rem]">
                {p.name}
              </h2>
              <p className="statement mt-3 text-[1.125rem] text-fg/80 md:text-[1.5rem]">{x.tagline}</p>
            </Reveal>
            <Reveal delay={0.1} y={32} className="mx-auto max-w-[1080px] px-1">
              <Link href={`/products/${p.slug}`} data-track="select_item" data-track-item={p.slug} data-track-list="home_experience" className="relative block aspect-[4/3]">
                <Image src={mainImage(p)} alt={`${p.name}（コンセプトビジュアル）`} fill sizes="(min-width: 1080px) 1080px, 100vw" className="object-contain" />
              </Link>
            </Reveal>
            <div className="container-x">
              <Reveal>
                <dl className="mx-auto grid max-w-5xl gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
                  {facts.map((f) => (
                    <div key={f.label}>
                      <dt className="text-[0.75rem] font-semibold text-muted">{f.label}</dt>
                      <dd className="mt-1.5 font-jp text-[0.9375rem] leading-[1.75]">{f.text}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                <Link
                  href={`/products/${p.slug}`}
                  data-track="select_item"
                  data-track-item={p.slug}
                  data-track-list="home_experience"
                  className="inline-flex min-h-11 items-center rounded-full bg-fg px-6 text-[0.9375rem] text-white hover:bg-fg/80"
                >
                  詳しく見る
                  <ChevronRight aria-hidden className="ml-0.5 size-4" />
                </Link>
                <a
                  href={storeLink(p, site.links.store)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="store_click"
                  data-track-item={p.slug}
                  data-track-placement="home_experience"
                  className="inline-flex min-h-11 items-center gap-0.5 text-[1rem] text-link hover:underline underline-offset-4"
                >
                  ストアで見る
                  <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only">（外部サイト）</span>
                </a>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
