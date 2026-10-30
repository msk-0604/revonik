"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { siteImages } from "@/data/images";
import { site } from "@/data/site";

/**
 * アクション動画。youtubeId がある場合のみ、クリック後に youtube-nocookie の iframe を読み込む（軽量）。
 * 公式動画の掲載許諾が確認できるまでは仮表示。
 */
export function ActionVideo({ youtubeId, title }: { youtubeId: string | null; title: string }) {
  const [play, setPlay] = useState(false);

  if (youtubeId) {
    return (
      <div className="relative aspect-video overflow-hidden border border-line bg-panel">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={`${title} アクション動画`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" aria-label={`${title} のアクション動画を再生`}>
            <Image src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`} alt="" fill sizes="100vw" unoptimized className="object-cover" />
            <span className="absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-full bg-fg text-ink transition-transform group-hover:scale-110">
              <Play aria-hidden className="ml-1 size-7 fill-current" />
            </span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden border border-line bg-panel">
      <Image src={siteImages.video.src} alt={siteImages.video.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-ink/40 px-6 text-center">
        <span aria-hidden className="grid size-16 place-items-center rounded-full border border-line-strong bg-ink/60 text-fg/60 md:size-20">
          <Play className="ml-1 size-6 md:size-7" />
        </span>
        <p className="max-w-md font-jp text-[0.82rem] leading-relaxed text-fg/85 md:text-sm">
          アクション動画は、REVONIK 公式動画の掲載許諾を確認後に埋め込みます。
        </p>
        <a
          href={site.links.youtubeSearch}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-display text-[0.7rem] font-semibold tracking-[0.2em] text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg"
        >
          YOUTUBE で探す <ArrowUpRight aria-hidden className="size-3.5" />
          <span className="sr-only">（外部サイト）</span>
        </a>
      </div>
    </div>
  );
}
