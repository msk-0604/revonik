"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { officialChannel, videoLabel, type OfficialVideo } from "@/data/videos";

type Props = {
  video: OfficialVideo;
  /** 一覧用の小さい表示 */
  size?: "hero" | "large" | "card";
  /** 表示上の見出し（省略時は動画タイトル） */
  label?: string;
  /** ファーストビューで使う場合 */
  priority?: boolean;
  className?: string;
  /** 計測用：表示場所 */
  placement?: string;
};

/**
 * REVONIK 公式 YouTube 動画の埋め込み。
 * 再生ボタンを押すまでは YouTube が配信するサムネイルだけを表示し（軽量・Cookie なし）、
 * 押すと youtube-nocookie の公式プレーヤーに切り替える。
 * サムネイルは YouTube から直接読み込み、サイト側で複製・加工・保存はしない（next/image の最適化も通さない）。
 */
export function OfficialFilm({ video, size = "large", label, priority, className = "", placement }: Props) {
  const [play, setPlay] = useState(false);
  const title = label ?? videoLabel(video);
  // ショート動画も、公式のサムネイルは横長（16:9）で作られているため横長で表示する
  const ratio = "aspect-video";
  const radius = size === "card" ? "rounded-[1rem]" : "rounded-[1.25rem] md:rounded-[1.75rem]";
  const playSize = size === "card" ? "size-12" : "size-16 md:size-20";

  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-[#0b0b0c] ${ratio} ${radius}`}>
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
            title={`${title}（REVONIK 公式 YouTube）`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            data-track="video_click"
            data-track-video={video.id}
            data-track-placement={placement}
            data-track-item={video.products[0]}
            aria-label={`動画を再生：${title}（REVONIK 公式 YouTube）`}
            className="group absolute inset-0 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- YouTube のサムネイルを YouTube から直接表示（複製・最適化しない） */}
            <img
              src={`https://i.ytimg.com/vi/${video.id}/${size === "card" ? "mqdefault" : "hq720"}.jpg`}
              srcSet={
                size === "card"
                  ? `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg 320w, https://i.ytimg.com/vi/${video.id}/hq720.jpg 1280w`
                  : `https://i.ytimg.com/vi/${video.id}/hq720.jpg 1280w, https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg 1920w`
              }
              sizes={size === "hero" ? "(min-width: 1200px) 1200px, 100vw" : size === "large" ? "(min-width: 1100px) 1100px, 100vw" : "(min-width: 1024px) 360px, 50vw"}
              alt=""
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
            <span
              aria-hidden
              className={`absolute top-1/2 left-1/2 grid -translate-1/2 place-items-center rounded-full bg-white/92 text-[#1d1d1f] shadow-lg backdrop-blur transition-transform group-hover:scale-105 ${playSize}`}
            >
              <Play className="ml-1 size-[38%] fill-current" />
            </span>
            {size === "hero" && (
              <span aria-hidden className="absolute top-6 right-6 hidden rounded-full bg-black/55 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-white backdrop-blur md:block">
                OFFICIAL FILM · YOUTUBE
              </span>
            )}
          </button>
        )}
      </div>
      <figcaption className={size === "card" ? "mt-3" : "mt-4 text-center"}>
        <span className={`block font-jp ${size === "card" ? "text-[0.875rem] leading-snug font-bold" : "text-[0.9375rem] font-medium"}`}>{title}</span>
        <span className="mt-0.5 block text-[0.75rem] text-muted">
          {officialChannel.name}（REVONIK 公式 YouTube）
        </span>
      </figcaption>
    </figure>
  );
}
