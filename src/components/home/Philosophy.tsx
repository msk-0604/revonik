import Image from "next/image";
import { Button } from "@/components/Button";
import { VerificationBadge } from "@/components/DemoBadge";
import { Reveal } from "@/components/Reveal";
import { siteImages } from "@/data/images";

const pillars = [
  { en: "PRECISION", ja: "精度", text: "わずかな形状や重心の違いが、水中での動きを変える。細部まで突き詰めたものづくりを。" },
  { en: "INNOVATION", ja: "革新", text: "既存の枠にとらわれず、構造や素材から新しいアプローチを探る。" },
  { en: "PERFORMANCE", ja: "性能", text: "フィールドで結果を出すために。釣り人が信頼して投げ続けられる一本を。" },
];

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="relative overflow-hidden border-y border-line bg-panel">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[44rem]">
          <Image src={siteImages.philosophy.src} alt={siteImages.philosophy.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-panel/40" />
        </div>
        <div className="px-5 py-20 md:px-10 md:py-28 lg:px-16 xl:px-24">
          <Reveal>
            <p className="eyebrow">Brand Philosophy</p>
            <h2 id="philosophy-title" className="display mt-6 text-[2.8rem] sm:text-6xl xl:text-7xl">
              Built for
              <br />
              the water.
            </h2>
            <div className="mt-8">
              <VerificationBadge status="draft" />
            </div>
            <p className="prose-jp mt-6 max-w-xl text-[0.95rem]">
              水の中で起きていることに、まっすぐ向き合う。ボディの肉厚、重心、リップの角度——ルアーの動きを決める一つひとつの要素を突き詰め、釣り人の「一投」に応える道具をつくる。
            </p>
            <p className="mt-4 font-jp text-[0.72rem] leading-relaxed text-muted">
              ※ 本文は営業提案用に作成した仮の文章です。正式公開時は REVONIK の開発理念に差し替えます。
            </p>
          </Reveal>
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.en} delay={i * 0.08} className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <p className="font-display text-sm font-bold tracking-[0.24em]">
                  {p.en}
                  <span className="ml-3 font-jp text-xs font-normal tracking-wider text-muted">{p.ja}</span>
                </p>
                <p className="font-jp text-[0.85rem] leading-[1.9] text-fg/75">{p.text}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10">
            <Button href="/about" variant="ghost">
              About REVONIK
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
