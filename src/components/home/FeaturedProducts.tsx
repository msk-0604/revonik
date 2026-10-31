import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { featuredProducts, getCategory, keySpecs, mainImage } from "@/lib/products";

/** 1製品ずつ大きく見せるセクション。背景はライトグレーとホワイトを交互に */
export function FeaturedProducts() {
  const items = featuredProducts();
  return (
    <div id="featured">
      {items.map((p, i) => {
        const category = getCategory(p.category);
        const specs = keySpecs(p);
        return (
          <section
            key={p.slug}
            aria-labelledby={`featured-${p.slug}`}
            className={`overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20 ${i % 2 === 0 ? "bg-bg-alt" : "bg-bg"}`}
          >
            <Reveal className="container-x text-center">
              <p className="index-label">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden className="h-px w-6 bg-muted/40" />
                <span>{category.label}</span>
              </p>
              <h2 id={`featured-${p.slug}`} className="headline mt-3 text-[2.75rem] sm:text-6xl lg:text-[4.5rem]">
                {p.name}
              </h2>
              <p className="prose-jp mx-auto mt-4 max-w-[30em] text-[0.9375rem] text-fg/80 md:text-[1.1875rem]">{p.summary}</p>
              <div className="mt-4">
                <Button href={`/products/${p.slug}`} variant="link">
                  詳しく見る
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} y={32} className="mx-auto max-w-[1000px] px-2">
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
            {specs.length > 0 && (
              <Reveal className="container-x">
                <dl className="mx-auto grid max-w-2xl grid-cols-3 divide-x divide-line">
                  {specs.map((s) => (
                    <div key={s.label} className="px-2 text-center">
                      <dt className="font-jp text-[0.6875rem] text-muted sm:text-[0.75rem]">{s.label}</dt>
                      <dd className="mt-1 font-jp text-[1rem] font-semibold tracking-tight sm:text-[1.375rem]">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-center font-jp text-[0.6875rem] text-muted">販売店掲載値（公式未照合）</p>
              </Reveal>
            )}
          </section>
        );
      })}
    </div>
  );
}
