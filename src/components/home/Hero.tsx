import Link from "next/link";
import { OfficialFilm } from "@/components/OfficialFilm";
import { experience } from "@/data/experience";
import { getVideo } from "@/data/videos";
import { getCategory, getProduct } from "@/lib/products";

/**
 * HERO：代表製品を1点だけ大きく。
 * 製品写真の許諾が得られるまでは、REVONIK 公式 YouTube の製品解説動画（埋め込み）を主役にする。
 */
export function Hero({ slug = "shindy-110", film = "DjC-qzHz_NQ" }: { slug?: string; film?: string }) {
  const p = getProduct(slug)!;
  const video = getVideo(film)!;
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-bg pt-[92px] md:pt-[116px]">
      <div className="container-x text-center">
        <p className="animate-fade-up text-[0.8125rem] font-semibold tracking-[0.42em] text-muted">REVONIK</p>
        <h1 id="hero-title" className="headline mt-4 animate-fade-up text-[2.6rem] [animation-delay:80ms] min-[375px]:text-[2.9rem] sm:text-6xl lg:text-[5rem]">
          Engineered to provoke.
        </h1>
        <p className="statement mx-auto mt-4 max-w-[22em] animate-fade-up text-[1.0625rem] text-fg/80 [animation-delay:160ms] md:text-[1.25rem]">
          設計し、確かめ、魚を動かす。
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-[1200px] animate-fade-up px-3 [animation-delay:200ms] md:mt-14 md:px-6">
        <OfficialFilm video={video} size="hero" priority label="SHINDY 110SF-M DRYBONE — 公式解説" placement="hero" />
      </div>
      <div className="container-x pt-10 pb-20 text-center md:pt-12 md:pb-28">
        <p className="eyebrow">2026 New · {getCategory(p.category).label}</p>
        <p className="mt-1 text-[1.75rem] font-semibold tracking-tight md:text-[2.25rem]">{p.name}</p>
        <p className="mt-1 font-jp text-[0.9375rem] text-fg/75">{experience[p.slug].tagline}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 min-[420px]:flex-row min-[420px]:gap-6">
          <Link
            href={`/products/${p.slug}`}
            data-track="select_item"
            data-track-item={p.slug}
            data-track-list="hero"
            className="inline-flex min-h-12 items-center rounded-full bg-fg px-8 text-[1rem] text-on-fg transition-colors hover:bg-fg/85"
          >
            {p.name} を見る
          </Link>
          <Link href="/products" className="inline-flex min-h-12 items-center text-[1rem] text-link hover:underline underline-offset-4">
            すべての製品 ›
          </Link>
        </div>
      </div>
    </section>
  );
}
