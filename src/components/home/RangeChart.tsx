import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ranges } from "@/data/marketing";
import { getProduct } from "@/lib/products";

const MAX = 5; // 表示する最大水深（m）
const ticks = [0, 1, 2, 3, 4, 5];

/** レンジで選ぶ：水深に対する各ルアーの潜行レンジ */
export function RangeChart() {
  return (
    <section aria-labelledby="range-title" className="section-y bg-bg-alt">
      <div className="container-x">
        <SectionHeading
          id="range-title"
          eyebrow="Range Chart"
          title="狙う水深で、選ぶ。"
          lead="水面直下から5mまで。レンジで比べて、選ぶ。"
        />
        <Reveal className="mx-auto mt-12 max-w-5xl overflow-x-auto [scrollbar-width:thin]">
          <div className="relative min-w-[640px] rounded-[1.5rem] bg-gradient-to-b from-[#1b3a44] to-[#0b1a1f] px-4 pt-6 pb-4 sm:px-8">
            <div className="grid gap-2 sm:gap-4" style={{ gridTemplateColumns: `2.5rem repeat(${ranges.length}, minmax(0, 1fr))` }}>
              {/* 水深の目盛り */}
              <div className="relative h-[360px]">
                {ticks.map((t) => (
                  <span key={t} className="absolute right-1 -translate-y-1/2 text-[0.6875rem] text-fg/70 tabular-nums" style={{ top: `${(t / MAX) * 100}%` }}>
                    {t}m
                  </span>
                ))}
              </div>
              {ranges.map((r) => {
                const p = getProduct(r.slug);
                if (!p) return null;
                const top = (r.min / MAX) * 100;
                const height = Math.max(((r.max - r.min) / MAX) * 100, 4);
                return (
                  <div key={r.model} className="relative h-[360px]">
                    {ticks.map((t) => (
                      <span key={t} aria-hidden className="absolute inset-x-0 border-t border-dashed border-fg/15" style={{ top: `${(t / MAX) * 100}%` }} />
                    ))}
                    <div
                      className="absolute inset-x-[30%] rounded-full bg-gradient-to-b from-link/70 to-link"
                      style={{ top: `${top}%`, height: `${height}%` }}
                      aria-hidden
                    />
                    <Link
                      href={`/products/${r.slug}`}
                      className="absolute left-1/2 w-[120%] max-w-[120px] -translate-x-1/2 -translate-y-1/2"
                      style={{ top: `${top + height / 2}%` }}
                      aria-label={`${r.model}：${r.note}`}
                    >
                      <span className="mx-auto block size-3.5 rounded-full border-2 border-white bg-fg shadow" />
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 grid gap-2 sm:gap-4" style={{ gridTemplateColumns: `2.5rem repeat(${ranges.length}, minmax(0, 1fr))` }}>
              <span />
              {ranges.map((r) => (
                <div key={r.model} className="text-center">
                  <p className="text-[0.8125rem] font-semibold leading-tight tracking-tight">{r.model}</p>
                  <p className="mt-0.5 font-jp text-[0.6875rem] text-fg/65">{r.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <p className="mx-auto mt-4 max-w-5xl font-jp text-[0.6875rem] leading-relaxed text-muted">
          潜行深度が公開されている製品のみ掲載。実際のレンジはラインの太さや使い方で変わります。
        </p>
      </div>
    </section>
  );
}
