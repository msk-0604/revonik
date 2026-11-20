import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

/**
 * INSTAGRAM：公式アカウントへの導線。投稿画像は複製せず、
 * 正式導入時に公式の埋め込み（または許諾済み素材）で投稿を並べる。
 */
export function Instagram() {
  return (
    <section aria-labelledby="ig-title" className="section-y bg-bg-alt text-center">
      <Reveal className="container-x">
        <p className="eyebrow">Instagram</p>
        <h2 id="ig-title" className="headline mt-2 text-[2.25rem] sm:text-5xl">
          新色も、釣果も、最初に。
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-jp text-[0.9375rem] leading-relaxed text-muted md:text-[1.0625rem]">
          新製品・新色・フィールドからの最新情報は、公式 Instagram で。
        </p>
        <a
          href={site.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          data-track="social_click"
          data-track-network="instagram"
          data-track-placement="home"
          className="mt-8 inline-flex min-h-12 items-center gap-1 rounded-full bg-fg px-8 text-[1rem] text-on-fg hover:bg-fg/85"
        >
          {site.links.instagramHandle} をフォロー <ArrowUpRight aria-hidden className="size-4" />
          <span className="sr-only">（外部サイト・Instagram）</span>
        </a>
      </Reveal>
    </section>
  );
}
