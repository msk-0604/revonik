import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { Reveal } from "@/components/Reveal";
import { releaseKindLabel, releases } from "@/data/releases";
import { formatDate } from "@/lib/format";
import { getProduct, mainImage } from "@/lib/products";

/** NEW RELEASES：最新の4件だけ。年表は ABOUT に */
export function NewReleases() {
  const items = releases.slice(0, 4);
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
          <Link href="/news" className="inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">
            すべてのニュース ›
          </Link>
        </Reveal>
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((r, i) => {
            const p = getProduct(r.slug);
            if (!p) return null;
            return (
              <Reveal as="li" key={r.name + r.date} delay={i * 0.05}>
                <Link href={`/products/${p.slug}`} data-track="select_item" data-track-item={p.slug} data-track-list="new_releases" className="group block">
                  <ProductVisual product={p} src={mainImage(p)} size="card" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square rounded-[1.25rem]" />
                  <p className="mt-4 flex items-center gap-2 text-[0.75rem] text-muted tabular-nums">
                    <time dateTime={r.date}>{formatDate(r.date)}</time>
                    <span
                      className={`rounded-full px-2 py-0.5 font-jp text-[0.6875rem] ${
                        r.kind === "released" ? "bg-fg text-on-fg" : "border border-accent/60 text-accent"
                      }`}
                    >
                      {releaseKindLabel[r.kind]}
                    </span>
                  </p>
                  <p className="mt-1.5 text-[1.125rem] font-semibold tracking-tight group-hover:underline underline-offset-4">{r.name}</p>
                  <p className="mt-1 font-jp text-[0.8125rem] leading-relaxed text-muted">{r.text}</p>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
