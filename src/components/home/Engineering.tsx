"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { LureDiagram } from "@/components/products/LureDiagram";
import { experience } from "@/data/experience";
import { products } from "@/data/products";
import { technologies } from "@/data/technology";
import { mainImage } from "@/lib/products";

const slugs = ["dot-six", "volbeat", "shekiller-78", "ramzy"];

/** SECTION 03 — PRODUCT ENGINEERING：製品ごとの確認済みの設計上の特徴を図解 */
export function Engineering() {
  const items = slugs.map((s) => products.find((p) => p.slug === s)!).filter(Boolean);
  const [active, setActive] = useState(0);
  const p = items[active];
  return (
    <section id="engineering" aria-labelledby="eng-title" className="section-y bg-bg">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Engineering</p>
          <h2 id="eng-title" className="headline mt-2 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">
            動きは、設計から生まれる。
          </h2>
        </div>
        <div className="mt-10 flex justify-center">
          <div role="tablist" aria-label="製品を選択" className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-bg-alt p-1 [scrollbar-width:none]">
            {items.map((it, i) => (
              <button
                key={it.slug}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`min-h-10 shrink-0 rounded-full px-4 text-[0.8125rem] whitespace-nowrap transition-colors duration-300 ${
                  i === active ? "bg-white text-fg shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "text-muted hover:text-fg"
                }`}
              >
                {it.name}
              </button>
            ))}
          </div>
        </div>
        <div role="tabpanel" className="mx-auto mt-12 max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div key={p.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <LureDiagram src={mainImage(p)} alt={`${p.name} の図解（コンセプトビジュアル）`} shape={p.shape} details={experience[p.slug].details} />
            </motion.div>
          </AnimatePresence>
        </div>
        <ul className="mx-auto mt-16 grid max-w-5xl gap-x-10 gap-y-6 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((t) => (
            <li key={t.id}>
              <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted">{t.en}</p>
              <p className="mt-1 font-jp text-[1rem] font-bold">{t.title}</p>
              <p className="mt-1.5 font-jp text-[0.8125rem] leading-relaxed text-fg/75">{t.text}</p>
              <p className="mt-2 flex flex-wrap gap-x-3 text-[0.8125rem]">
                {t.products.map((s) => {
                  const pr = products.find((x) => x.slug === s);
                  return pr ? (
                    <Link key={s} href={`/products/${s}`} className="text-link hover:underline">
                      {pr.name}
                    </Link>
                  ) : null;
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
