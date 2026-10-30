import Image from "next/image";
import { ArrowUpRight, AtSign, Newspaper, PlayCircle, ShoppingBag } from "lucide-react";
import { mediaImages } from "@/data/images";
import type { MediaItem } from "@/types";

const icons = { instagram: AtSign, youtube: PlayCircle, store: ShoppingBag, article: Newspaper };
const kindLabel = { instagram: "INSTAGRAM", youtube: "YOUTUBE", store: "ONLINE STORE", article: "ARTICLE" };

export function MediaCard({ item }: { item: MediaItem }) {
  const Icon = icons[item.kind];
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col border border-line bg-panel transition-colors duration-500 hover:border-line-strong"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        <Image
          src={item.image ?? mediaImages[item.kind]}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
        />
        <span className="absolute top-4 left-4 inline-flex items-center gap-2 border border-line-strong bg-ink/70 px-2.5 py-1 font-display text-[0.62rem] font-semibold tracking-[0.2em] backdrop-blur">
          <Icon aria-hidden className="size-3.5" />
          {kindLabel[item.kind]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <p className="font-jp text-[0.7rem] tracking-wider text-muted">
          {item.source}
          {item.thirdParty && "（外部サイト・第三者）"}
        </p>
        <h3 className="font-jp text-base font-bold leading-snug">{item.title}</h3>
        <p className="font-jp text-[0.82rem] leading-relaxed text-muted">{item.description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-display text-[0.7rem] font-semibold tracking-[0.22em]">
          OPEN
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="sr-only">（新しいタブで開きます）</span>
        </span>
      </div>
    </a>
  );
}
