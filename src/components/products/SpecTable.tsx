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
        <div role="tablist" aria-label="モデルを選択" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:px-0">
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
              className={`min-h-11 shrink-0 border px-5 font-display text-[0.75rem] font-semibold tracking-[0.14em] whitespace-nowrap transition-colors ${
                i === active ? "border-fg bg-fg text-ink" : "border-line-strong text-fg/80 hover:border-fg"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
      <div id={`${baseId}-panel`} role={tabs ? "tabpanel" : undefined} aria-labelledby={tabs ? `${baseId}-tab-${active}` : undefined} className="mt-6">
        <table className="w-full border-t border-line text-left">
          <caption className="sr-only">{product.name} {variant.label} のスペック</caption>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-b border-line">
                <th scope="row" className="w-[42%] py-4 pr-4 align-top font-normal sm:w-[34%] md:py-5">
                  <span className="block font-display text-[0.66rem] font-semibold tracking-[0.24em] text-muted">{r.en}</span>
                  <span className="mt-1 block font-jp text-[0.82rem] text-fg/85">{r.label}</span>
                </th>
                <td className={`py-4 align-top font-jp text-[0.95rem] md:py-5 ${r.missing ? "text-muted" : "text-fg"}`}>
                  {r.missing ? <span className="inline-flex items-center gap-2"><span aria-hidden className="h-px w-4 bg-muted" />{r.value}</span> : r.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {variant.note && <p className="mt-4 font-jp text-[0.75rem] leading-relaxed text-muted">※ {variant.note}</p>}
      </div>
    </div>
  );
}
