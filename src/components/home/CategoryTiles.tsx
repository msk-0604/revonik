import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { mainImage } from "@/lib/products";

/** タイプから探す：カテゴリーごとの入口（代表製品の画像） */
export function CategoryTiles() {
  const tiles = categories
    .map((c) => ({ c, items: products.filter((p) => p.category === c.id) }))
    .filter((t) => t.items.length > 0);
  return (
    <section aria-labelledby="types-title" className="section-y bg-bg-alt">
      <div className="container-x">
        <SectionHeading id="types-title" eyebrow="Find by Type" title="タイプから探す。" />
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {tiles.map(({ c, items }, i) => (
            <Reveal as="li" key={c.id} delay={i * 0.05}>
              <Link href={`/products?category=${c.id}`} className="group block rounded-[1.25rem] bg-white p-4 text-center md:p-5">
                <div className="relative aspect-square">
                  <Image
                    src={mainImage(items[0])}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="scale-110 object-contain transition-transform duration-700 ease-out-soft group-hover:scale-[1.16]"
                  />
                </div>
                <p className="mt-2 text-[1rem] font-semibold tracking-tight md:text-[1.125rem]">{c.label}</p>
                <p className="mt-0.5 font-jp text-[0.75rem] text-muted">
                  {c.labelJa}・{items.length}製品
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
