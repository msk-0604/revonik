"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { DesignDetails } from "@/components/products/DesignDetails";
import { experience } from "@/data/experience";
import { products } from "@/data/products";

const slugs = ["dot-six", "zenda", "shekiller-78", "mogot", "volbeat"];

/** TECHNOLOGY：製品ごとの確認済みの設計上の特徴 */
export function Engineering({ link = true }: { link?: boolean }) {
  const items = slugs.map((s) => products.find((p) => p.slug === s)).filter((p) => p !== undefined);
  const [active, setActive] = useState(0);
  const p = items[active];
  return (
    <section id="technology" aria-labelledby="eng-title" className="section-y bg-bg-alt">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Technology</p>
          <h2 id="eng-title" className="headline mt-2 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">
            動きは、設計から生まれる。
          </h2>
          {link && (
            <Link href="/technology" className="mt-5 inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">
              テクノロジーを詳しく ›
            </Link>
          )}
        </div>
        <div className="mt-10 flex justify-center">
          <div role="tablist" aria-label="製品を選択" className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-panel p-1 [scrollbar-width:none]">
            {items.map((it, i) => (
              <button
                key={it.slug}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`min-h-10 shrink-0 rounded-full px-4 text-[0.8125rem] whitespace-nowrap transition-colors duration-300 ${
                  i === active ? "bg-fg text-on-fg" : "text-muted hover:text-fg"
                }`}
              >
                {it.name}
              </button>
            ))}
          </div>
        </div>
        <div role="tabpanel" className="mx-auto mt-10 max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div key={p.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <DesignDetails details={experience[p.slug].details} />
              <p className="mt-6 text-center">
                <Link href={`/products/${p.slug}`} className="inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">
                  {p.name} を見る ›
                </Link>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
