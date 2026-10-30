"use client";

import { getImageProps } from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { siteImages } from "@/data/images";

const ease = [0.16, 1, 0.3, 1] as const;

function HeroPicture() {
  const common = { alt: "", sizes: "100vw", quality: 85, fetchPriority: "high" as const, loading: "eager" as const };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: siteImages.hero.src, width: 2560, height: 1440 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: siteImages.heroMobile.src, width: 1080, height: 1920 });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- 装飾画像（alt="" は rest に含まれる） */}
      <img {...rest} className="absolute inset-0 h-full w-full object-cover object-center md:object-[65%_50%]" />
    </picture>
  );
}

export function Hero() {
  return (
    <section aria-label="メインビジュアル" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
      {/* 背景：ゆっくりとしたズーム（CSS アニメーション／reduced-motion で停止） */}
      <div aria-hidden className="absolute inset-0 animate-hero-zoom">
        <HeroPicture />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40 md:bg-gradient-to-r md:from-ink/90 md:via-ink/25 md:to-transparent"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-x relative pt-40 pb-32 md:pb-36">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="eyebrow"
        >
          Precision × Innovation × Performance
        </motion.p>
        <h1 className="display mt-6 text-[clamp(2.2rem,10.2vw,10.5rem)] leading-[0.88]">
          {["ENGINEERED", "TO PERFORM."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.35 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease }}
          className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="font-jp text-lg font-medium tracking-[0.12em] text-fg/90 md:text-xl">一投に、さらなる可能性を。</p>
            <p className="mt-2 font-jp text-[0.68rem] tracking-wider text-muted">
              ※ デモ用の仮コピーです（REVONIK の公式スローガンではありません）
            </p>
          </div>
          <Button href="/products" className="self-start md:self-auto">
            Explore Products
          </Button>
        </motion.div>
      </div>

      <p className="absolute top-36 right-5 font-display text-[0.6rem] font-semibold tracking-[0.3em] text-fg/40 md:top-auto md:right-10 md:bottom-8 xl:right-16">
        DEMO IMAGE
      </p>

      {/* スクロール誘導 */}
      <a
        href="#featured"
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-muted transition-colors hover:text-fg"
      >
        <span className="font-display text-[0.62rem] font-semibold tracking-[0.36em]">SCROLL</span>
        <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-line">
          <span className="absolute inset-0 block animate-scroll-cue bg-fg" />
        </span>
      </a>
    </section>
  );
}
