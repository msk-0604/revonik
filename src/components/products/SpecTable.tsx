"use client";

import { useId, useState } from "react";
import { specRows } from "@/lib/products";
import type { Product } from "@/types";

export function SpecTable({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const variant = product.variants[active];
  const rows = specRows(product, variant);
  const tabs = product.variants.length > 1;

  return (
    <div>
      {tabs && (
        <div className="flex justify-center">
          <div role="tablist" aria-label="モデルを選択" className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-bg-alt p-1 [scrollbar-width:none]">
            {product.variants.map((v, i) => (
              <button
                key={v.id}
                id={`${baseId}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`${baseId}-panel`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  const n = (active + (e.key === "ArrowRight" ? 1 : -1) + product.variants.length) % product.variants.length;
                  setActive(n);
                  document.getElementById(`${baseId}-tab-${n}`)?.focus();
                }}
                className={`min-h-10 shrink-0 rounded-full px-4 text-[0.8125rem] whitespace-nowrap transition-colors duration-300 ${
                  i === active ? "bg-white text-fg shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "text-muted hover:text-fg"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div id={`${baseId}-panel`} role={tabs ? "tabpanel" : undefined} aria-labelledby={tabs ? `${baseId}-tab-${active}` : undefined} className="mx-auto mt-8 max-w-3xl">
        <table className="w-full border-t border-line text-left">
          <caption className="sr-only">
            {product.name} {variant.label} のスペック
          </caption>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-b border-line">
                <th scope="row" className="w-[38%] py-4 pr-4 align-top font-jp text-[0.875rem] font-normal text-muted sm:w-1/3">
                  {r.label}
                </th>
                <td className={`py-4 align-top font-jp text-[0.9375rem] ${r.missing ? "text-muted" : "text-fg"}`}>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 font-jp text-[0.75rem] leading-relaxed text-muted">「—」の項目は確認中です。</p>
      </div>
    </div>
  );
}
