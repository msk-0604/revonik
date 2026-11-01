import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

/** SECTION 07 — SHOP：理解が深まった流れで、自然にストアへ */
export function Shop() {
  return (
    <section id="shop" aria-labelledby="shop-title" className="section-y bg-bg-alt text-center">
      <Reveal className="container-x">
        <p className="eyebrow">Shop</p>
        <h2 id="shop-title" className="headline mt-2 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">
          次の一投を、手に。
        </h2>
        <p className="prose-jp mx-auto mt-4 max-w-xl text-[0.9375rem] text-muted md:text-[1.0625rem]">REVONIK の製品は、公式オンラインストアでお求めいただけます。</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 min-[420px]:flex-row min-[420px]:gap-6">
          <a
            href={site.links.store}
            target="_blank"
            rel="noopener noreferrer"
            data-track="store_click"
            data-track-placement="home_shop"
            className="inline-flex min-h-12 items-center gap-1 rounded-full bg-fg px-8 text-[1rem] text-white transition-colors hover:bg-fg/80"
          >
            オンラインストアへ
            <ArrowUpRight aria-hidden className="size-4" />
            <span className="sr-only">（外部サイト）</span>
          </a>
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-track="social_click"
            data-track-network="instagram"
            data-track-placement="home_shop"
            className="inline-flex min-h-12 items-center gap-1 text-[1rem] text-link hover:underline underline-offset-4"
          >
            Instagram で最新情報
            <ArrowUpRight aria-hidden className="size-4" />
            <span className="sr-only">（外部サイト）</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
