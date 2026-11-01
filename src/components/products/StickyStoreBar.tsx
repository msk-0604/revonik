"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/** スマホ用：スクロール後に画面下へ固定表示するストア導線 */
export function StickyStoreBar({ name, href, slug }: { name: string; href: string; slug: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-[0.9375rem] font-semibold tracking-tight">{name}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          data-track="store_click"
          data-track-item={slug}
          data-track-placement="sticky_bar"
          className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-full bg-fg px-5 text-[0.875rem] text-white"
        >
          ストアで見る
          <ArrowUpRight aria-hidden className="size-4" />
          <span className="sr-only">（外部サイト）</span>
        </a>
      </div>
    </div>
  );
}
