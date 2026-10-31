"use client";

import Link from "next/link";
import { getImageProps } from "next/image";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { siteImages } from "@/data/images";

const ease = [0.25, 0.1, 0.25, 1] as const;

/** 水中シーン（CG）を全面に。ルアーは画像の下側に配置されているため、上部の文字とは重ならない */
function HeroPicture() {
  const common = { alt: siteImages.sceneHero.alt, sizes: "100vw", quality: 85, fetchPriority: "high" as const, loading: "eager" as const };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: siteImages.sceneHero.src, width: 2400, height: 1350 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: siteImages.sceneHeroMobile.src, width: 1200, height: 2400 });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt は rest に含まれる */}
      <img {...rest} className="absolute inset-0 h-full w-full object-cover object-bottom" />
    </picture>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[860px] flex-col overflow-hidden bg-[#0d2a33] text-white md:aspect-[16/9] md:min-h-[680px] md:max-h-[920px]"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, ease }} className="absolute inset-0">
        <HeroPicture />
      </motion.div>
      <div className="container-x relative pt-[124px] text-center md:pt-[150px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-[1rem] font-semibold tracking-[0.3em] md:text-[1.125rem]"
        >
          REVONIK
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="headline mt-3 text-[2.5rem] min-[375px]:text-[2.75rem] sm:text-6xl lg:text-[5rem]"
        >
          The Art of Precision.
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease }}>
          <p className="prose-jp mx-auto mt-5 max-w-[22em] text-[1.0625rem] text-white/85 md:text-[1.3125rem]">
            <span className="inline-block">精密な設計から生まれる、</span>
            <span className="inline-block">新たな釣りの可能性。</span>
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 min-[400px]:flex-row min-[400px]:gap-5">
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-[0.9375rem] text-fg transition-colors hover:bg-white/85"
            >
              製品を見る
            </Link>
            <Link href="/about" className="group inline-flex min-h-11 items-center gap-0.5 text-[1.0625rem] text-white hover:underline underline-offset-4">
              ブランドについて
              <ChevronRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="mt-5 font-jp text-[0.6875rem] text-white/60">※ キャッチコピーは営業デモ用の仮文章です（REVONIK の公式コピーではありません）</p>
        </motion.div>
      </div>
    </section>
  );
}
