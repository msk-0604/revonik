import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredProducts } from "@/lib/products";

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function FeaturedProducts() {
  const items = featuredProducts();
  return (
    <section id="featured" aria-labelledby="featured-title" className="container-x py-24 md:py-36">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Featured Products"
          title={<span id="featured-title">Featured<br />Products</span>}
          lead="一つひとつのルアーを、写真が主役になるレイアウトで。商品情報は販売店掲載値をもとにした仮データです。"
        />
        <Reveal>
          <Button href="/products" variant="outline">
            All Products
          </Button>
        </Reveal>
      </div>
      <ul className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        {items.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 2) * 0.08} className={spans[i % spans.length]}>
            <ProductCard
              product={p}
              index={i}
              size={i % 3 === 0 ? "lg" : "md"}
              sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
            />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
