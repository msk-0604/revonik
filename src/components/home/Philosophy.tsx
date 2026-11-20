import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { designer } from "@/data/designer";

const process = [
  {
    no: "01",
    en: "Design",
    title: "まだないものを、設計する。",
    text: "新しいものを生むには、まだ世の中にないものに挑むしかない——という考え方が紹介されています。Dot SIX はその延長にある製品です。",
  },
  {
    no: "02",
    en: "Engineering",
    title: "素材の限界を、構造で超える。",
    text: "肉厚約0.6mmの薄肉ボディ、分割成形、硬質素材ドライボーン。動きと音を、構造から組み立てる。",
  },
  {
    no: "03",
    en: "Field",
    title: "水の中で、確かめる。",
    text: "実釣の様子は公式 YouTube などで公開されています。設計の答え合わせは、いつもフィールドで。",
  },
];

/** BRAND PHILOSOPHY：設計 → 技術 → 実釣での検証 というプロセスを伝える */
export function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="section-y scroll-mt-16 bg-bg-alt">
      <div className="container-x">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="index-label">
            <span>Brand Philosophy</span>
            <span aria-hidden className="h-px w-6 bg-muted/40" />
            <span>{designer.nameEn}</span>
          </p>
          <h2 id="philosophy-title" className="statement mt-8 text-[1.75rem] min-[375px]:text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem]">
            「{designer.quote.text}」
          </h2>
          <p className="mt-4 text-[0.75rem] text-muted">— {designer.name}（ルアマガプラス掲載記事より）</p>
        </Reveal>
        <ol className="mx-auto mt-16 grid max-w-6xl gap-px overflow-hidden rounded-[1.5rem] bg-line md:grid-cols-3">
          {process.map((p, i) => (
            <Reveal as="li" key={p.no} delay={i * 0.06} className="bg-bg-alt p-8 md:p-10">
              <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-accent">
                {p.no} — {p.en.toUpperCase()}
              </p>
              <h3 className="mt-5 font-jp text-[1.25rem] font-bold leading-snug md:text-[1.375rem]">{p.title}</h3>
              <p className="mt-3 font-jp text-[0.9375rem] leading-[1.85] text-fg/75">{p.text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mx-auto mt-12 max-w-3xl text-center">
          <p className="font-jp text-[0.9375rem] leading-[1.9] text-fg/80">{designer.career.text}</p>
          <Link href="/about" className="mt-6 inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">
            ブランドについて ›
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
