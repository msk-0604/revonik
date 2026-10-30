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
      <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-bg-alt">
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
            <span className="absolute top-1/2 left-1/2 grid size-16 -translate-1/2 place-items-center rounded-full bg-white/90 text-fg transition-transform group-hover:scale-105">
              <Play aria-hidden className="ml-1 size-7 fill-current" />
            </span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-bg-alt">
      <Image src={siteImages.video.src} alt={siteImages.video.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/55 px-6 text-center">
        <span aria-hidden className="grid size-14 place-items-center rounded-full bg-white text-fg/50 md:size-16">
          <Play className="ml-0.5 size-5 md:size-6" />
        </span>
        <p className="max-w-md font-jp text-[0.8125rem] leading-relaxed text-fg/80 md:text-[0.9375rem]">
          アクション動画は、REVONIK 公式動画の掲載許諾を確認後に埋め込みます。
        </p>
        <a
          href={site.links.youtubeSearch}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-0.5 text-[0.9375rem] text-link hover:underline underline-offset-4"
        >
          YouTube で探す <ArrowUpRight aria-hidden className="size-4" />
          <span className="sr-only">（外部サイト）</span>
        </a>
      </div>
    </div>
  );
}
