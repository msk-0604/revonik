import Link from "next/link";
import { getImageProps } from "next/image";
import { siteImages } from "@/data/images";

function HeroPicture() {
  const common = { alt: siteImages.hero.alt, sizes: "(min-width: 1280px) 1280px, 100vw", quality: 85, fetchPriority: "high" as const, loading: "eager" as const };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: siteImages.hero.src, width: 2400, height: 1200 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: siteImages.heroMobile.src, width: 1200, height: 900 });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt は rest に含まれる */}
      <img {...rest} className="aspect-[4/3] h-auto w-full object-contain md:aspect-[2/1]" />
    </picture>
  );
}

/**
 * HERO：静止画でも成立する構図。英字の大見出し → 日本語のステートメント → 製品ビジュアル。
 * 背景は水面の波紋を思わせる同心円のごく薄いグラデーション（画像を使わず CSS で描画）。
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-bg pt-[96px] md:pt-[120px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(ellipse_70%_55%_at_50%_72%,var(--hero-glow),transparent_70%),repeating-radial-gradient(ellipse_at_50%_78%,var(--hero-ring)_0,var(--hero-ring)_1px,transparent_1px,transparent_42px)]"
      />
      <div className="container-x relative text-center">
        <p className="animate-fade-up text-[0.8125rem] font-semibold tracking-[0.42em] text-muted md:text-[0.9375rem]">REVONIK</p>
        <h1 id="hero-title" className="display mt-5 animate-fade-up text-[10.6vw] [animation-delay:80ms] sm:text-[5.5rem] lg:text-[8.5rem]">
          Engineered
          <br />
          to provoke.
        </h1>
        <p className="statement mx-auto mt-6 max-w-[22em] animate-fade-up text-[1.0625rem] text-fg/85 [animation-delay:160ms] md:text-[1.375rem]">
          設計し、確かめ、魚を動かす。
        </p>
        <div className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:240ms] min-[420px]:flex-row min-[420px]:gap-6">
          <Link
            href="/products"
            data-track="select_item"
            data-track-list="hero"
            className="inline-flex min-h-12 items-center rounded-full bg-fg px-8 text-[1rem] text-on-fg transition-colors hover:bg-fg/85"
          >
            製品を見る
          </Link>
          <Link href="/technology" className="inline-flex min-h-12 items-center text-[1rem] text-link hover:underline underline-offset-4">
            テクノロジー ›
          </Link>
        </div>
      </div>
      {/* 最大要素（LCP）のため、画像はアニメーションで隠さずに表示 */}
      <div className="relative mx-auto mt-4 max-w-[1280px] px-1 md:-mt-6">
        <HeroPicture />
      </div>
      <a href="#philosophy" className="relative mx-auto flex w-max flex-col items-center gap-2 pb-8 text-muted transition-colors hover:text-fg">
        <span className="text-[0.625rem] font-semibold tracking-[0.36em]">SCROLL</span>
        <span aria-hidden className="block h-10 w-px bg-gradient-to-b from-fg/60 to-transparent motion-safe:animate-pulse" />
      </a>
    </section>
  );
}
