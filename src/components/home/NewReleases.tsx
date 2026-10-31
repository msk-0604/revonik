import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { releases } from "@/data/releases";
import { getProduct, mainImage } from "@/lib/products";

export function NewReleases() {
  return (
    <section aria-labelledby="new-title" className="section-y overflow-hidden bg-bg">
      <div className="container-x">
        <Reveal className="flex flex-col items-center gap-2 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="eyebrow">New Release</p>
            <h2 id="new-title" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              新製品。
            </h2>
          </div>
          <Button href="/products" variant="link">
            すべての製品
          </Button>
        </Reveal>
      </div>
      <Reveal className="mt-10">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:px-[max(2.5rem,calc((100vw_-_1200px)/2_+_2.5rem))]">
          {releases.map((r) => {
            const p = getProduct(r.slug);
            if (!p) return null;
            return (
              <li key={r.name} className="w-[78vw] max-w-[360px] shrink-0 snap-start sm:w-[340px]">
                <Link href={`/products/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-bg-alt">
                    <Image
                      src={mainImage(p)}
                      alt={`${r.name} の仮画像`}
                      fill
                      sizes="360px"
                      className="object-contain p-3 transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide">
                      NEW · {r.date}
                    </span>
                  </div>
                  <p className="mt-4 text-[1.1875rem] font-semibold tracking-tight">{r.name}</p>
                  <p className="mt-1 font-jp text-[0.8125rem] leading-relaxed text-muted">{r.text}</p>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="container-x mt-2 font-jp text-[0.6875rem] text-muted">※ 発売時期は釣りメディアの掲載情報によるもので、公式未照合です。</p>
      </Reveal>
    </section>
  );
}
