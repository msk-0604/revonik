"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/Button";
import { VerificationBadge } from "@/components/DemoBadge";
import { colorImage } from "@/lib/products";
import type { Category, Product } from "@/types";
import { ColorSwatch } from "./ColorSwatch";

type Props = { product: Product; category: Category; storeHref: string };

const SWIPE = 60;

export function ProductShowcase({ product, category, storeHref }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const colors = product.colors;
  const color = colors[index];
  const multiple = colors.length > 1;

  const go = (next: number) => {
    const n = (next + colors.length) % colors.length;
    setDirection(next > index ? 1 : -1);
    setIndex(n);
  };

  return (
    <section aria-label={`${product.name} の概要`} className="container-x pt-32 md:pt-40">
      <nav aria-label="パンくずリスト" className="font-display text-[0.68rem] font-semibold tracking-[0.2em] text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-fg">HOME</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/products" className="hover:text-fg">PRODUCTS</Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-fg">{product.name}</li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        {/* ギャラリー */}
        <div>
          <div
            className="relative aspect-[4/3] touch-pan-y overflow-hidden border border-line bg-panel"
            aria-roledescription="カルーセル"
            aria-label={`${product.name} のカラー画像`}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={color.id}
                custom={direction}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                drag={multiple ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE) go(index + 1);
                  else if (info.offset.x > SWIPE) go(index - 1);
                }}
              >
                <Image
                  src={colorImage(product, color)}
                  alt={`${product.name}（${color.name}）の仮画像（DEMO IMAGE）`}
                  fill
                  preload={index === 0}
                  draggable={false}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="pointer-events-none object-cover select-none"
                />
              </motion.div>
            </AnimatePresence>

            {multiple && (
              <>
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="前のカラー"
                  className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center border border-line-strong bg-ink/60 backdrop-blur transition-colors hover:bg-fg hover:text-ink"
                >
                  <ChevronLeft aria-hidden className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="次のカラー"
                  className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center border border-line-strong bg-ink/60 backdrop-blur transition-colors hover:bg-fg hover:text-ink"
                >
                  <ChevronRight aria-hidden className="size-5" />
                </button>
              </>
            )}
            <p className="absolute right-4 bottom-4 font-display text-[0.68rem] font-semibold tracking-[0.2em] text-fg/70" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(colors.length).padStart(2, "0")}
            </p>
          </div>

          {multiple && (
            <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8" aria-label="カラーのサムネイル">
              {colors.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`${c.name} を表示`}
                    aria-current={i === index}
                    className={`relative block aspect-[4/3] w-full overflow-hidden border transition-colors ${
                      i === index ? "border-fg" : "border-line hover:border-line-strong"
                    }`}
                  >
                    <Image src={colorImage(product, c)} alt="" fill sizes="120px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 情報 */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">{category.label}<span className="ml-3 font-jp tracking-wider normal-case">{category.labelJa}</span></p>
          <h1 className="display mt-4 normal-case text-[3.2rem] break-words sm:text-7xl xl:text-8xl">{product.name}</h1>
          {product.nameKana && <p className="mt-3 font-jp text-sm tracking-[0.2em] text-muted">{product.nameKana}</p>}
          <div className="mt-6">
            <VerificationBadge status={product.verification} />
          </div>
          <p className="prose-jp mt-6 text-[0.95rem]">{product.summary}</p>

          <div className="mt-8 border-t border-line pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="eyebrow">Color</p>
              <p className="font-jp text-sm" aria-live="polite">
                {color.name}
                {!color.verified && <span className="ml-2 text-xs text-muted">（仮）</span>}
              </p>
            </div>
            <div role="radiogroup" aria-label="カラーを選択" className="mt-4 flex flex-wrap gap-2.5">
              {colors.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={i === index}
                  aria-label={c.name}
                  title={c.name}
                  onClick={() => go(i)}
                  className={`grid size-11 place-items-center rounded-full border transition-colors ${
                    i === index ? "border-fg" : "border-transparent hover:border-line-strong"
                  }`}
                >
                  <ColorSwatch palette={c.palette} className="size-8" />
                </button>
              ))}
            </div>
            <p className="mt-3 font-jp text-[0.7rem] leading-relaxed text-muted">
              ※ 色見本・画像は仮のイラストで、実物の色味とは異なります。
            </p>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <p className="eyebrow">Lineup</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <li key={v.id}>
                  <a href="#specs" className="inline-flex min-h-9 items-center border border-line-strong px-3 font-display text-[0.72rem] font-semibold tracking-[0.12em] hover:border-fg">
                    {v.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href={storeHref} external className="flex-1">
              Online Store
            </Button>
            <Button href="#specs" variant="outline" className="flex-1">
              Specs
            </Button>
          </div>
          {!product.storeUrl && (
            <p className="mt-3 font-jp text-[0.7rem] leading-relaxed text-muted">
              ※ 個別の商品ページURLは未確認のため、オンラインストアのトップへご案内します。
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
