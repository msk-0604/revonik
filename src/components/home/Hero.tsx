"use client";

import { getImageProps } from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { siteImages } from "@/data/images";

const ease = [0.25, 0.1, 0.25, 1] as const;

/** 横長（PC）と横長コンパクト（スマホ）の画像を出し分け。文字とは重ねない */
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

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-bg pt-[118px] md:pt-[148px]">
      <div className="container-x text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="text-[1rem] font-semibold tracking-[0.3em] text-fg md:text-[1.125rem]"
        >
          REVONIK
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
          className="headline mt-3 text-[2.5rem] min-[375px]:text-[2.75rem] sm:text-6xl lg:text-[5rem]"
        >
          The Art of Precision.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.16, ease }}
        >
          <p className="prose-jp mx-auto mt-5 max-w-[22em] text-[1.0625rem] text-fg/80 md:text-[1.3125rem]">
            <span className="inline-block">精密な設計から生まれる、</span>
            <span className="inline-block">新たな釣りの可能性。</span>
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 min-[400px]:flex-row min-[400px]:gap-5">
            <Button href="/products">製品を見る</Button>
            <Button href="/about" variant="link">
              ブランドについて
            </Button>
          </div>
          <p className="mt-6 font-jp text-[0.6875rem] text-muted">※ キャッチコピーは営業デモ用の仮文章です（REVONIK の公式コピーではありません）</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease }}
        className="mx-auto mt-6 max-w-[1200px] px-2 md:mt-2"
      >
        <HeroPicture />
      </motion.div>
    </section>
  );
}
