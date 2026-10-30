import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";
import { featuredProducts, getCategory, mainImage, storeLink } from "@/lib/products";

/** 1製品ずつ大きく見せるセクション。背景はライトグレーとホワイトを交互に */
export function FeaturedProducts() {
  const items = featuredProducts();
  return (
    <div id="featured">
      {items.map((p, i) => {
        const category = getCategory(p.category);
        return (
          <section
            key={p.slug}
            aria-labelledby={`featured-${p.slug}`}
            className={`overflow-hidden pt-16 pb-10 md:pt-24 md:pb-14 ${i % 2 === 0 ? "bg-bg-alt" : "bg-bg"}`}
          >
            <Reveal className="container-x text-center">
              <p className="eyebrow">{category.label}</p>
              <h2 id={`featured-${p.slug}`} className="headline mt-1 text-[2.75rem] sm:text-6xl lg:text-[4.5rem]">
                {p.name}
              </h2>
              <p className="prose-jp mx-auto mt-4 max-w-[30em] text-[0.9375rem] text-fg/80 md:text-[1.1875rem]">{p.summary}</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-1">
                <Button href={`/products/${p.slug}`} variant="link">
                  詳しく見る
                </Button>
                <Button href={storeLink(p, site.links.store)} variant="link" external>
                  購入する
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} y={32} className="mx-auto mt-4 max-w-[1000px] px-2 md:mt-6">
              <div className="relative aspect-[4/3]">
                <Image
                  src={mainImage(p)}
                  alt={`${p.name} の仮画像（DEMO IMAGE）`}
                  fill
                  sizes="(min-width: 1000px) 1000px, 100vw"
                  className="object-contain"
                />
              </div>
            </Reveal>
          </section>
        );
      })}
    </div>
  );
}
