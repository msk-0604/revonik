"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { matchesQuery } from "@/lib/products";
import type { CategoryId } from "@/types";

type Filter = CategoryId | "all";

export function ProductExplorer() {
  const [category, setCategory] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);

  // URL（?category= & ?q=）から初期状態を復元（共有・戻る操作に対応）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("category");
    /* eslint-disable react-hooks/set-state-in-effect -- マウント時に一度だけ URL から復元する */
    if (c && categories.some((x) => x.id === c)) setCategory(c as CategoryId);
    setQuery(params.get("q") ?? "");
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [category, query, ready]);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["all", products.length]]);
    for (const p of products) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  const visibleCategories = categories.filter((c) => counts.get(c.id));
  const filtered = products.filter((p) => (category === "all" || p.category === category) && matchesQuery(p, query));

  const reset = () => {
    setCategory("all");
    setQuery("");
  };

  return (
    <div>
      <div className="sticky top-[5.75rem] z-20 -mx-5 border-y border-line bg-ink/85 px-5 py-4 backdrop-blur-xl md:top-[6.75rem] md:-mx-10 md:px-10 xl:-mx-16 xl:px-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="カテゴリーで絞り込む" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0 lg:pb-0">
            {[{ id: "all" as const, label: "ALL" }, ...visibleCategories].map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  aria-pressed={active}
                  className={`flex min-h-10 shrink-0 items-center gap-2 border px-4 font-display text-[0.7rem] font-semibold tracking-[0.18em] whitespace-nowrap transition-colors duration-300 ${
                    active ? "border-fg bg-fg text-ink" : "border-line-strong text-fg/80 hover:border-fg hover:text-fg"
                  }`}
                >
                  {c.label}
                  <span className={active ? "text-ink/60" : "text-muted"}>{counts.get(c.id)}</span>
                </button>
              );
            })}
          </div>
          <div className="relative lg:w-80">
            <label htmlFor="product-search" className="sr-only">
              商品名で検索
            </label>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="商品名で検索（例：SHINDY、サラモア）"
              autoComplete="off"
              className="h-11 w-full border border-line-strong bg-panel pr-10 pl-11 font-jp text-base text-fg placeholder:text-[0.8rem] placeholder:text-muted focus:border-fg focus:outline-none sm:text-sm [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="検索語をクリア"
                className="absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center text-muted hover:text-fg"
              >
                <X aria-hidden className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-8 font-display text-[0.72rem] font-semibold tracking-[0.2em] text-muted">
        {filtered.length} PRODUCTS
        {category !== "all" && <span className="ml-3 font-jp tracking-wider">／ {categories.find((c) => c.id === category)?.labelJa}</span>}
        {query.trim() && <span className="ml-3 font-jp tracking-wider">／「{query.trim()}」</span>}
      </p>

      {filtered.length > 0 ? (
        <motion.ul layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-6 border border-line bg-panel px-6 py-20 text-center">
          <p className="font-jp text-base">該当する商品が見つかりませんでした。</p>
          <p className="mt-2 font-jp text-sm text-muted">別のキーワードをお試しいただくか、条件をリセットしてください。</p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 inline-flex min-h-11 items-center border border-line-strong px-6 font-display text-[0.72rem] font-semibold tracking-[0.22em] hover:border-fg hover:bg-fg hover:text-ink"
          >
            RESET
          </button>
        </div>
      )}
    </div>
  );
}
