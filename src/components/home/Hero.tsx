import Link from "next/link";
import { getImageProps } from "next/image";
import { siteImages } from "@/data/images";

function HeroPicture() {
  const common = { alt: siteImages.hero.alt, sizes: "(min-width: 1200px) 1200px, 100vw", quality: 85, fetchPriority: "high" as const, loading: "eager" as const };
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

/** SECTION 01 — HERO：白背景・中央の大きなルアー。情報は最小限 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-bg pt-[92px] md:pt-[120px]">
      <div className="container-x text-center">
        <p className="animate-fade-up text-[0.9375rem] font-semibold tracking-[0.32em] md:text-[1.0625rem]">REVONIK</p>
        <h1
          id="hero-title"
          className="headline mt-3 animate-fade-up text-[2.5rem] [animation-delay:80ms] min-[375px]:text-[2.75rem] sm:text-6xl lg:text-[5.25rem]"
        >
          Precision in Every Cast.
        </h1>
        <p className="statement mt-4 animate-fade-up text-[1.125rem] text-fg/85 [animation-delay:160ms] md:text-[1.5rem]">その一投に、理由がある。</p>
        <div className="mt-8 animate-fade-up [animation-delay:240ms]">
          <Link
            href="/products"
            data-track="select_item"
            data-track-list="hero"
            className="inline-flex min-h-12 items-center rounded-full bg-fg px-8 text-[1rem] text-white transition-colors hover:bg-fg/80"
          >
            製品を見る
          </Link>
        </div>
      </div>
      {/* 最大要素（LCP）のため、画像はアニメーションで隠さずに表示 */}
      <div className="mx-auto mt-2 max-w-[1200px] px-1 md:-mt-2">
        <HeroPicture />
      </div>
    </section>
  );
}
