import Link from "next/link";
import { ArrowUpRight, AtSign, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

/** INSTAGRAM と DEALERS：ファンとの接点と、購入先への送客 */
export function InstagramDealers() {
  return (
    <section aria-label="Instagram と取扱店" className="section-y bg-bg-alt">
      <div className="container-x grid gap-4 md:grid-cols-2">
        <Reveal className="flex flex-col rounded-[1.5rem] bg-panel p-8 md:p-12">
          <AtSign aria-hidden className="size-6 text-accent" />
          <p className="eyebrow mt-6">Instagram</p>
          <h2 className="headline mt-2 text-[2rem] sm:text-[2.5rem]">新色も、釣果も、最初に。</h2>
          <p className="mt-4 font-jp text-[0.9375rem] leading-relaxed text-fg/75">
            新製品・新色・フィールドからの最新情報は、公式 Instagram で。
          </p>
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-track="social_click"
            data-track-network="instagram"
            data-track-placement="home"
            className="mt-8 inline-flex min-h-12 w-fit items-center gap-1 rounded-full bg-fg px-7 text-[1rem] text-on-fg hover:bg-fg/85"
          >
            {site.links.instagramHandle} <ArrowUpRight aria-hidden className="size-4" />
            <span className="sr-only">（外部サイト）</span>
          </a>
        </Reveal>
        <Reveal delay={0.06} className="flex flex-col rounded-[1.5rem] bg-panel p-8 md:p-12">
          <MapPin aria-hidden className="size-6 text-accent" />
          <p className="eyebrow mt-6">Dealers</p>
          <h2 className="headline mt-2 text-[2rem] sm:text-[2.5rem]">手に取れる場所へ。</h2>
          <p className="mt-4 font-jp text-[0.9375rem] leading-relaxed text-fg/75">
            公式オンラインストアと、取扱店の情報。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/dealers"
              data-track="dealer_search"
              data-track-placement="home"
              className="inline-flex min-h-12 items-center rounded-full bg-fg px-7 text-[1rem] text-on-fg hover:bg-fg/85"
            >
              取扱店を探す
            </Link>
            <a
              href={site.links.store}
              target="_blank"
              rel="noopener noreferrer"
              data-track="store_click"
              data-track-placement="home_dealers"
              className="inline-flex min-h-11 items-center gap-0.5 text-[1rem] text-link hover:underline underline-offset-4"
            >
              オンラインストア <ArrowUpRight aria-hidden className="size-4" />
              <span className="sr-only">（外部サイト）</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
