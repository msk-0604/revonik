import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { categories } from "@/data/categories";
import { siteImages } from "@/data/images";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { getProduct } from "@/lib/products";

/** SECTION 04 — ON THE WATER：実釣の映像から製品へ */
export function OnTheWater() {
  const videos = media.filter((m) => m.kind === "youtube").slice(0, 3);
  return (
    <section id="on-the-water" aria-labelledby="water-title" className="bg-[#0d2a33] text-white">
      <div className="relative">
        <div className="relative aspect-[1/2] max-h-[760px] w-full sm:hidden">
          <Image src={siteImages.sceneHeroMobile.src} alt={siteImages.sceneHeroMobile.alt} fill sizes="100vw" className="object-cover object-bottom" />
        </div>
        <div className="relative hidden aspect-[16/9] sm:block">
          <Image src={siteImages.sceneHero.src} alt={siteImages.sceneHero.alt} fill sizes="100vw" className="object-cover object-bottom" />
        </div>
        <Reveal className="absolute inset-x-0 top-0 container-x pt-14 text-center md:pt-20">
          <p className="text-[0.8125rem] font-semibold text-white/70">On the Water</p>
          <h2 id="water-title" className="headline mt-2 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">
            水の中で、確かめる。
          </h2>
          <p className="mx-auto mt-4 max-w-md font-jp text-[0.9375rem] leading-relaxed text-white/80">ルアーの動きと、実釣の様子は動画で。</p>
        </Reveal>
      </div>
      <div className="container-x py-14 md:py-20">
        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {videos.map((v, i) => {
            const related = (v.related ?? []).map((s) => getProduct(s)).filter((p) => p !== undefined);
            const cat = v.relatedCategory ? categories.find((c) => c.id === v.relatedCategory) : undefined;
            return (
              <Reveal as="li" key={v.id} delay={i * 0.06}>
                <a href={v.url} target="_blank" rel="noopener noreferrer" data-track="video_click" data-track-video={v.id} className="group block">
                  <span className="relative block aspect-video overflow-hidden rounded-[1.25rem]">
                    <Image src={v.image ?? siteImages.video.src} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <span aria-hidden className="absolute inset-0 grid place-items-center">
                      <span className="grid size-14 place-items-center rounded-full bg-white/90 text-fg transition-transform group-hover:scale-105">
                        <Play className="ml-0.5 size-5 fill-current" />
                      </span>
                    </span>
                  </span>
                  <span className="mt-4 block text-[0.75rem] text-white/60">{v.source}</span>
                  <span className="mt-1 block font-jp text-[1.0625rem] font-bold group-hover:underline underline-offset-4">{v.title}</span>
                  <span className="sr-only">（YouTube・外部サイト）</span>
                </a>
                <p className="mt-1.5 font-jp text-[0.8125rem] leading-relaxed text-white/70">{v.description}</p>
                {(related.length > 0 || cat) && (
                  <p className="mt-3 flex flex-wrap gap-x-4 text-[0.875rem]">
                    {related.map((p) => (
                      <Link key={p.slug} href={`/products/${p.slug}`} data-track="select_item" data-track-item={p.slug} data-track-list="video" className="text-[#7cc4ff] hover:underline">
                        {p.name} を見る ›
                      </Link>
                    ))}
                    {cat && (
                      <Link href={`/products?category=${cat.id}`} className="text-[#7cc4ff] hover:underline">
                        {cat.label} を見る ›
                      </Link>
                    )}
                  </p>
                )}
              </Reveal>
            );
          })}
        </ul>
        <div className="mt-12 text-center">
          <a
            href={site.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            data-track="video_click"
            data-track-video="channel"
            className="inline-flex min-h-11 items-center gap-1 rounded-full border border-white/30 px-6 text-[0.9375rem] hover:border-white"
          >
            公式 YouTube チャンネル
            <ArrowUpRight aria-hidden className="size-4" />
            <span className="sr-only">（外部サイト）</span>
          </a>
        </div>
      </div>
    </section>
  );
}
