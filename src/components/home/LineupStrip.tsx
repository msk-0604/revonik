import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/products";
import { getCategory, mainImage } from "@/lib/products";

/** 全製品を横スクロールで一覧（スマホはスワイプ） */
export function LineupStrip() {
  return (
    <section aria-labelledby="lineup-title" className="section-y overflow-hidden bg-bg">
      <div className="container-x">
        <Reveal className="flex flex-col items-center gap-2 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="eyebrow">Lineup</p>
            <h2 id="lineup-title" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              すべての製品。
            </h2>
          </div>
          <Button href="/products" variant="link">
            製品一覧へ
          </Button>
        </Reveal>
      </div>
      <Reveal className="mt-10">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:px-[max(2.5rem,calc((100vw_-_1200px)/2_+_2.5rem))]">
          {products.map((p) => (
            <li key={p.slug} className="w-[68vw] max-w-[300px] shrink-0 snap-start sm:w-[280px]">
              <Link href={`/products/${p.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-bg-alt">
                  <Image
                    src={mainImage(p)}
                    alt={`${p.name} の仮画像`}
                    fill
                    sizes="300px"
                    className="scale-110 object-contain transition-transform duration-700 ease-out-soft group-hover:scale-[1.15]"
                  />
                </div>
                <p className="mt-3 text-[0.6875rem] font-medium tracking-[0.06em] text-muted">{getCategory(p.category).label}</p>
                <p className="mt-0.5 text-[1.0625rem] font-semibold tracking-tight">{p.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
