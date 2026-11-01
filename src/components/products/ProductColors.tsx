"use client";

import Image from "next/image";
import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { colorImage } from "@/lib/products";
import type { Product } from "@/types";

/**
 * 商品画像とカラーバリエーションの表示。選択中のカラーを Context で共有し、
 * 「大きな商品写真」と「カラーバリエーション」のどちらから選んでも連動する。
 */

type Ctx = { product: Product; index: number; direction: number; select: (i: number) => void };
const ColorContext = createContext<Ctx | null>(null);

const useColor = () => {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error("ProductColorProvider が必要です");
  return ctx;
};

export function ProductColorProvider({ product, children }: { product: Product; children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const select = (next: number) => {
    const n = (next + product.colors.length) % product.colors.length;
    setDirection(next > index ? 1 : -1);
    setIndex(n);
  };
  return <ColorContext.Provider value={{ product, index, direction, select }}>{children}</ColorContext.Provider>;
}

const SWIPE = 50;
const ease = [0.25, 0.1, 0.25, 1] as const;

/** 大きな商品写真（スワイプ・前後ボタン）＋ 小さなサムネイルのカラー選択 */
export function ProductStage() {
  const { product, index, direction, select } = useColor();
  const colors = product.colors;
  const color = colors[index];
  const multiple = colors.length > 1;

  return (
    <div id="product-stage" className="scroll-mt-28">
      <div
        className="relative mx-auto aspect-[4/3] max-w-[1100px] touch-pan-y overflow-hidden md:aspect-[16/10]"
        aria-roledescription="カルーセル"
        aria-label={`${product.name} のカラー画像`}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={color.id}
            className="absolute inset-0"
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.5, ease }}
            drag={multiple ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE) select(index + 1);
              else if (info.offset.x > SWIPE) select(index - 1);
            }}
          >
            <Image
              src={colorImage(product, color)}
              alt={`${product.name}（${color.name}）（コンセプトビジュアル）`}
              fill
              preload={index === 0}
              draggable={false}
              sizes="(min-width: 1100px) 1100px, 100vw"
              className="pointer-events-none object-contain select-none"
            />
          </motion.div>
        </AnimatePresence>

        {multiple && (
          <>
            <button
              type="button"
              onClick={() => select(index - 1)}
              aria-label="前のカラー"
              className="absolute top-1/2 left-1 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-bg-alt/90 text-fg/70 transition-colors hover:bg-line hover:text-fg md:left-2"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => select(index + 1)}
              aria-label="次のカラー"
              className="absolute top-1/2 right-1 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-bg-alt/90 text-fg/70 transition-colors hover:bg-line hover:text-fg md:right-2"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="font-jp text-[0.9375rem]" aria-live="polite">
          {color.name}
          <span className="sr-only">
            （{index + 1} / {colors.length}）
          </span>
        </p>
        <p data-counter className="mt-1 text-[0.75rem] text-muted tabular-nums">
          {index + 1} / {colors.length}
        </p>
      </div>

      {multiple && (
        <div role="radiogroup" aria-label="カラーを選択" className="mt-5 flex flex-wrap justify-center gap-2 px-2">
          {colors.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={i === index}
              aria-label={c.name}
              title={c.name}
              onClick={() => select(i)}
              className={`relative size-14 overflow-hidden rounded-xl bg-bg-alt transition-shadow duration-300 sm:size-16 ${
                i === index ? "ring-2 ring-fg ring-offset-2" : "hover:ring-1 hover:ring-line hover:ring-offset-2"
              }`}
            >
              <Image src={colorImage(product, c)} alt="" fill sizes="64px" className="scale-125 object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** カラーバリエーション一覧。選ぶと上の商品写真に反映してスクロールする */
export function ColorGallery() {
  const { product, index, select } = useColor();
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 min-[600px]:grid-cols-3 lg:grid-cols-4">
      {product.colors.map((c, i) => (
        <li key={c.id}>
          <button
            type="button"
            onClick={() => {
              select(i);
              document.getElementById("product-stage")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            aria-label={`${c.name} を表示`}
            className="group block w-full text-center"
          >
            <span
              className={`relative block aspect-[4/3] overflow-hidden rounded-[1rem] bg-white transition-shadow duration-300 ${
                i === index ? "ring-2 ring-fg" : ""
              }`}
            >
              <Image
                src={colorImage(product, c)}
                alt=""
                fill
                sizes="(min-width: 1024px) 260px, (min-width: 600px) 30vw, 50vw"
                className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </span>
            <span className="mt-3 block font-jp text-[0.8125rem]">
              {c.name}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
