import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { mediaImages } from "@/data/images";
import type { MediaItem } from "@/types";

const kindLabel = { instagram: "Instagram", youtube: "YouTube", store: "Online Store", article: "Article" };

export function MediaCard({ item, surface = "gray" }: { item: MediaItem; surface?: "gray" | "white" }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-track={item.kind === "youtube" ? "video_click" : item.kind === "instagram" ? "social_click" : undefined}
      data-track-video={item.kind === "youtube" ? item.id : undefined}
      className="group flex flex-col"
    >
      <div className={`relative aspect-[16/10] overflow-hidden rounded-[1.25rem] ${surface === "white" ? "bg-white" : "bg-bg-alt"}`}>
        <Image
          src={item.image ?? mediaImages[item.kind]}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className={`${item.image ? "object-cover" : "object-contain"} transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]`}
        />
        {item.kind === "youtube" && (
          <span aria-hidden className="absolute inset-0 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full bg-white/90 text-fg shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Play className="ml-0.5 size-5 fill-current" />
            </span>
          </span>
        )}
      </div>
      <p className="mt-4 text-[0.75rem] font-medium tracking-[0.04em] text-muted">
        {kindLabel[item.kind]} · {item.source}
      </p>
      <h3 className="mt-1 font-jp text-[1.0625rem] font-bold leading-snug">{item.title}</h3>
      <p className="mt-1.5 font-jp text-[0.8125rem] leading-relaxed text-muted">{item.description}</p>
      <span className="mt-2 inline-flex items-center gap-0.5 text-[0.9375rem] text-link group-hover:underline underline-offset-4">
        開く
        <ArrowUpRight aria-hidden className="size-4" />
        <span className="sr-only">（新しいタブで開きます）</span>
      </span>
    </a>
  );
}
