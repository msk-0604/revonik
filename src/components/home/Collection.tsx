import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { experience, sceneLabels } from "@/data/experience";
import { products } from "@/data/products";
import { newSlugs } from "@/data/releases";
import { getCategory, mainImage } from "@/lib/products";

/** SECTION 06 — DISCOVER THE COLLECTION：比較しやすい一覧 */
export function Collection() {
  return (
    <section id="collection" aria-labelledby="collection-title" className="section-y bg-bg">
      <div className="container-x">
        <Reveal className="flex flex-col items-center gap-3 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="eyebrow">Collection</p>
            <h2 id="collection-title" className="headline mt-2 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">
              すべての製品を、比べる。
            </h2>
          </div>
          <Link href="/products" className="inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">
            製品一覧へ <ChevronRight aria-hidden className="size-4" />
          </Link>
        </Reveal>
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {products.map((p) => {
            const x = experience[p.slug];
            const v = p.variants[0];
            return (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  data-track="select_item"
                  data-track-item={p.slug}
                  data-track-list="home_collection"
                  className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[8rem_1.1fr_1.4fr_auto] md:gap-8"
                >
                  <span className="relative block aspect-[4/3] rounded-xl bg-bg-alt">
                    <Image src={mainImage(p)} alt="" fill sizes="128px" className="scale-110 object-contain" />
                  </span>
                  <span>
                    <span className="flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.06em] text-muted">
                      {getCategory(p.category).label}
                      {newSlugs.has(p.slug) && <span className="rounded-full bg-fg px-1.5 py-px text-[0.5625rem] text-white">NEW</span>}
                    </span>
                    <span className="mt-0.5 block text-[1.1875rem] font-semibold tracking-tight md:text-[1.375rem]">{p.name}</span>
                    <span className="mt-1 block font-jp text-[0.8125rem] text-fg/75 sm:hidden">{x.keyFeature}</span>
                  </span>
                  <span className="hidden sm:block">
                    <span className="block font-jp text-[0.9375rem]">{x.keyFeature}</span>
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      {x.scenes.map((s) => (
                        <span key={s} className="rounded-full bg-bg-alt px-2.5 py-0.5 font-jp text-[0.6875rem] text-fg/75">
                          {sceneLabels[s].label}
                        </span>
                      ))}
                      {v.specs.depth && <span className="rounded-full bg-bg-alt px-2.5 py-0.5 font-jp text-[0.6875rem] text-fg/75">{v.specs.depth.replace(/（.*?）/g, "")}</span>}
                    </span>
                  </span>
                  <ChevronRight aria-hidden className="size-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
