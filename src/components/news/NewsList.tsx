"use client";

import { useEffect, useState } from "react";
import { NewsCard } from "@/components/NewsCard";
import { newsCategoryLabel, sortedNews } from "@/data/news";
import type { NewsCategory } from "@/types";

const order: NewsCategory[] = ["PRODUCT", "RELEASE", "EVENT", "MEDIA", "OTHER"];

/** カテゴリー別フィルター（?category= で共有可能） */
export function NewsList() {
  const [cat, setCat] = useState<NewsCategory | "ALL">("ALL");

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("category");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- マウント時に URL から一度だけ復元
    if (c && (order as string[]).includes(c)) setCat(c as NewsCategory);
  }, []);

  const select = (c: NewsCategory | "ALL") => {
    setCat(c);
    window.history.replaceState(null, "", c === "ALL" ? window.location.pathname : `?category=${c}`);
  };

  const list = sortedNews.filter((a) => cat === "ALL" || a.category === cat);

  return (
    <div>
      <div role="group" aria-label="カテゴリーで絞り込む" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        {(["ALL", ...order] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => select(c)}
            className={`min-h-10 shrink-0 rounded-full px-4 font-jp text-[0.8125rem] transition-colors ${
              cat === c ? "bg-fg text-on-fg" : "bg-panel text-fg/80 hover:text-fg"
            }`}
          >
            {c === "ALL" ? "すべて" : newsCategoryLabel[c]}
          </button>
        ))}
      </div>
      <p role="status" aria-live="polite" className="mt-6 text-[0.8125rem] text-muted">
        {list.length} 件
      </p>
      {list.length > 0 ? (
        <ul className="mt-6 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {list.map((a) => (
            <li key={a.slug}>
              <NewsCard article={a} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-[1.25rem] bg-panel px-6 py-14 text-center font-jp text-[0.9375rem] text-muted">このカテゴリーのお知らせはまだありません。</div>
      )}
    </div>
  );
}
