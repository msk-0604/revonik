import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { releaseKindLabel, releases } from "@/data/releases";
import { formatDate } from "@/lib/format";
import { getProduct, mainImage } from "@/lib/products";

/** NEW RELEASES：新製品を時系列で。発売・発表・発売予定を区別して表示 */
export function NewReleases({ limit = 6 }: { limit?: number }) {
  const items = releases.slice(0, limit);
  return (
    <section id="new" aria-labelledby="new-title" className="section-y bg-bg">
      <div className="container-x">
        <Reveal className="flex flex-col items-center gap-3 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="eyebrow">New Releases</p>
            <h2 id="new-title" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              新製品
            </h2>
          </div>
          <Link href="/news?category=PRODUCT" className="inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">
            新製品のニュース ›
          </Link>
        </Reveal>
        <ol className="relative mt-12 border-l border-line pl-6 md:pl-10">
          {items.map((r, i) => {
            const p = getProduct(r.slug);
            if (!p) return null;
            return (
              <Reveal as="li" key={r.name + r.date} delay={i * 0.04} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute top-2 -left-[calc(1.5rem+5px)] size-[9px] rounded-full md:-left-[calc(2.5rem+5px)] ${r.kind === "released" ? "bg-fg" : "border border-accent bg-bg"}`}
                />
                <Link
                  href={`/products/${p.slug}`}
                  data-track="select_item"
                  data-track-item={p.slug}
                  data-track-list="new_releases"
                  className="group grid items-center gap-4 sm:grid-cols-[1fr_12rem] md:grid-cols-[1fr_16rem] md:gap-10"
                >
                  <div>
                    <p className="flex flex-wrap items-center gap-3 text-[0.8125rem] text-muted tabular-nums">
                      <time dateTime={r.date}>{formatDate(r.date)}</time>
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-jp text-[0.6875rem] font-medium ${
                          r.kind === "released" ? "bg-fg text-on-fg" : "border border-accent/60 text-accent"
                        }`}
                      >
                        {releaseKindLabel[r.kind]}
                      </span>
                    </p>
                    <h3 className="mt-2 text-[1.5rem] font-semibold tracking-tight group-hover:underline underline-offset-4 md:text-[1.75rem]">{r.name}</h3>
                    <p className="mt-1 font-jp text-[0.9375rem] text-fg/75">{r.text}</p>
                  </div>
                  <span className="relative hidden aspect-[4/3] rounded-2xl bg-panel sm:block">
                    <Image src={mainImage(p)} alt="" fill sizes="256px" className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.04]" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
