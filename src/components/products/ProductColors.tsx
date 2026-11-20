"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { OfficialFilm } from "@/components/OfficialFilm";
import { ProductVisual } from "@/components/ProductVisual";
import type { OfficialVideo } from "@/data/videos";
import { colorImage, displayColors, mainImage } from "@/lib/products";
import type { Product, ProductColor } from "@/types";

/**
 * 商品画像とカラー。選択中のカラーを Context で共有し、上部の画像とカラー一覧のどちらから選んでも連動する。
 * 画像は許諾済みの公式写真のみ。写真がある場合は拡大表示できる。
 * 写真が1枚もない製品は、REVONIK 公式 YouTube の動画（埋め込み）を大きく表示し、動画もなければ撮影台を表示する。
 */

type Ctx = { product: Product; colors: ProductColor[]; index: number; direction: number; select: (i: number) => void };
const ColorContext = createContext<Ctx | null>(null);

const useColor = () => {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error("ProductColorProvider が必要です");
  return ctx;
};

export function ProductColorProvider({ product, children }: { product: Product; children: React.ReactNode }) {
  const colors = displayColors(product);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const select = (next: number) => {
    if (colors.length === 0) return;
    const n = (next + colors.length) % colors.length;
    setDirection(next > index ? 1 : -1);
    setIndex(n);
  };
  return <ColorContext.Provider value={{ product, colors, index, direction, select }}>{children}</ColorContext.Provider>;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

/** 拡大表示（写真がある場合のみ）。タップで 2 倍に拡大し、スクロールで細部を確認できる */
function Zoom({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label={`${alt}（拡大表示）`} className="fixed inset-0 z-[60] overflow-auto bg-bg">
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="拡大表示を閉じる"
        className="fixed top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-bg-alt text-fg hover:bg-line"
      >
        <X aria-hidden className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => setZoomed((z) => !z)}
        aria-label={zoomed ? "縮小する" : "さらに拡大する"}
        className={`block ${zoomed ? "w-[200%] max-w-none cursor-zoom-out" : "mx-auto w-full max-w-[1600px] cursor-zoom-in"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- 拡大表示は元画像をそのまま表示 */}
        <img src={src} alt={alt} className="h-auto w-full" />
      </button>
    </div>
  );
}

/** 大きな商品写真（カラー切り替え・スワイプ・拡大表示）。写真がなければ公式動画、なければ撮影台 */
export function ProductStage({ film }: { film?: OfficialVideo }) {
  const { product, colors, index, direction, select } = useColor();
  const color = colors[index];
  const src = color ? colorImage(product, color) : mainImage(product);
  const multiple = colors.length > 1;
  // 写真が1枚もない間は、画像を送る矢印は出さない（カラー名の選択だけ）
  const hasPhotos = colors.some((c) => colorImage(product, c));
  const [zoom, setZoom] = useState(false);
  const alt = color ? `${product.name}（${color.name}）` : product.name;

  if (!hasPhotos && film) {
    return (
      <div id="product-stage" className="scroll-mt-28">
        <OfficialFilm video={film} size="hero" priority placement="product_stage" className="mx-auto max-w-[1200px]" />
      </div>
    );
  }

  return (
    <div id="product-stage" className="scroll-mt-28">
      <div className="relative mx-auto max-w-[1200px]" aria-roledescription="カルーセル" aria-label={`${product.name} の画像`}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={color?.id ?? "main"}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.45, ease }}
          >
            {src ? (
              <button type="button" onClick={() => setZoom(true)} aria-label={`${alt}を拡大表示`} className="group relative block w-full cursor-zoom-in">
                <ProductVisual product={product} src={src} alt={alt} size="hero" priority sizes="(min-width: 1200px) 1200px, 100vw" className="aspect-[4/3] w-full rounded-[2rem] bg-bg-alt md:aspect-[16/10]" />
                <span className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-panel/90 text-fg shadow-sm">
                  <Maximize2 aria-hidden className="size-4" />
                </span>
              </button>
            ) : (
              <ProductVisual product={product} size="hero" className="aspect-[4/3] w-full rounded-[2rem] md:aspect-[16/10]" />
            )}
          </motion.div>
        </AnimatePresence>

        {multiple && hasPhotos && (
          <>
            <button
              type="button"
              onClick={() => select(index - 1)}
              aria-label="前のカラー"
              className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-panel/90 text-fg/70 shadow-sm hover:text-fg"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => select(index + 1)}
              aria-label="次のカラー"
              className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-panel/90 text-fg/70 shadow-sm hover:text-fg"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </>
        )}
      </div>

      {color && hasPhotos && (
        <div className="mt-5 text-center">
          <p className="font-jp text-[0.9375rem]" aria-live="polite">
            {color.name}
            <span className="sr-only">
              （{index + 1} / {colors.length}）
            </span>
          </p>
          {multiple && (
            <p data-counter className="mt-1 text-[0.75rem] text-muted tabular-nums">
              {index + 1} / {colors.length}
            </p>
          )}
        </div>
      )}

      {multiple && hasPhotos && (
        <div role="radiogroup" aria-label="カラーを選択" className="mt-5 flex flex-wrap justify-center gap-2 px-2">
          {colors.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={i === index}
              aria-label={c.name}
              onClick={() => select(i)}
              className={`min-h-10 rounded-full border px-4 font-jp text-[0.8125rem] transition-colors ${
                i === index ? "border-fg bg-fg text-on-fg" : "border-line text-fg/80 hover:border-fg/40"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {zoom && src && <Zoom src={src} alt={alt} onClose={() => setZoom(false)} />}
    </div>
  );
}

/** カラーバリエーション一覧。選ぶと上の商品写真に反映してスクロールする */
export function ColorGallery() {
  const { product, colors, index, select } = useColor();
  const hasPhotos = colors.some((c) => colorImage(product, c));
  if (colors.length === 0) {
    return <p className="text-center font-jp text-[0.9375rem] text-muted">カラーの情報は確認中です。</p>;
  }
  // 写真が届くまでは、空の枠を並べずに「番号・カラー名・対応モデル」の一覧で見せる
  if (!hasPhotos) {
    const models = [...new Set(colors.flatMap((c) => c.models ?? []))];
    return (
      <div>
        <p className="text-center font-jp text-[0.9375rem] text-fg/80">
          全 <span className="font-semibold tabular-nums">{colors.length}</span> 色
          {models.length > 0 && <span className="text-muted">（{models.join(" / ")}）</span>}
        </p>
        <ul aria-label={`${product.name} のカラー一覧`} className="mt-8 grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
          {colors.map((c) => (
            <li key={c.id} className="flex items-baseline gap-4 border-b border-line py-3.5">
              <span className="w-8 shrink-0 text-[0.75rem] text-muted tabular-nums">{c.code ?? "—"}</span>
              <span className="flex-1 font-jp text-[0.9375rem]">{c.name}</span>
              {c.models && c.models.length > 0 && models.length > 1 && (
                <span className="shrink-0 text-right text-[0.6875rem] tracking-[0.04em] text-muted">{c.models.join(" · ")}</span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center font-jp text-[0.75rem] text-muted">
          カラー名・番号は販売店の掲載表記で確認したものです。カラーごとの写真は、許諾後にこの一覧へ掲載し、選ぶと写真が切り替わります。
        </p>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 min-[600px]:grid-cols-3 lg:grid-cols-4">
      {colors.map((c, i) => {
        const src = colorImage(product, c);
        return (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => {
                select(i);
                if (hasPhotos) document.getElementById("product-stage")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              aria-label={`${c.name} を表示`}
              aria-pressed={i === index}
              className="group block w-full text-center"
            >
              <span className={`relative block overflow-hidden rounded-[1rem] ${i === index ? "ring-2 ring-fg" : ""}`}>
                {src ? (
                  <span className="relative block aspect-[4/3] bg-bg-alt">
                    <Image src={src} alt="" fill sizes="(min-width: 1024px) 260px, 50vw" className="object-contain p-2" />
                  </span>
                ) : (
                  <span className="flex aspect-[4/3] items-center justify-center bg-bg-alt px-3 font-jp text-[0.75rem] text-muted">写真を掲載予定</span>
                )}
              </span>
              <span className="mt-3 block font-jp text-[0.8125rem]">{c.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
