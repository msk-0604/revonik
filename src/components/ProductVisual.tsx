import Image from "next/image";
import type { Product } from "@/types";

type Props = {
  product: Product;
  /** 表示する写真。未指定・null なら撮影台（プレースホルダー）を表示 */
  src?: string | null;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  size?: "hero" | "large" | "card" | "thumb";
  className?: string;
};

/**
 * 製品ビジュアル。許諾済みの公式写真があれば大きく中央に、なければ「撮影台」を表示する。
 * 撮影台は、写真が届くまでの枠であることがひと目で分かるようにし、実物と異なる画像は出さない。
 */
export function ProductVisual({ product, src, alt, sizes = "100vw", priority, size = "card", className = "" }: Props) {
  if (src) {
    return (
      <div className={`relative ${className}`}>
        <Image src={src} alt={alt ?? product.name} fill sizes={sizes} preload={priority} className="object-contain" />
      </div>
    );
  }
  const nameSize = {
    hero: "text-[11vw] sm:text-[7.5rem] lg:text-[10rem]",
    large: "text-[10vw] sm:text-[5.5rem] lg:text-[7.5rem]",
    card: "text-[2.5rem] sm:text-[3rem]",
    thumb: "text-[1rem]",
  }[size];
  return (
    <div
      role="img"
      aria-label={`${product.name}：公式写真を掲載予定`}
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_60%_40%_at_50%_58%,#ffffff,#eeeef1_70%)] ${className}`}
    >
      {/* 撮影台の床と影 */}
      <span aria-hidden className="absolute inset-x-[18%] bottom-[22%] h-[10%] rounded-[50%] bg-black/[0.06] blur-xl" />
      <span aria-hidden className={`display relative max-w-[92%] select-none text-center leading-none break-words text-black/[0.07] ${nameSize}`}>
        {product.name}
      </span>
      {size !== "thumb" && (
        <span className="absolute bottom-[8%] text-[0.625rem] font-medium tracking-[0.24em] text-muted uppercase">
          Official photo — coming soon
        </span>
      )}
    </div>
  );
}
