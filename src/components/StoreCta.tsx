import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { siteImages } from "@/data/images";
import { site } from "@/data/site";

export function StoreCta() {
  return (
    <section aria-labelledby="store-cta-title" className="relative overflow-hidden border-t border-line">
      <Image src={siteImages.water.src} alt="" fill sizes="100vw" className="object-cover opacity-70" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />
      <div className="container-x relative py-28 text-center md:py-40">
        <Reveal>
          <p className="eyebrow">Online Store</p>
          <h2 id="store-cta-title" className="display mx-auto mt-6 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-7xl">
            Find your next cast.
          </h2>
          <p className="prose-jp mx-auto mt-6 max-w-xl text-[0.95rem]">REVONIK の製品は公式オンラインストアでご購入いただけます。</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={site.links.store} external>
              Online Store
            </Button>
            <Button href="/products" variant="outline">
              Products
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
