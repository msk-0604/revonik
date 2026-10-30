import { Button } from "@/components/Button";
import { VerificationBadge } from "@/components/DemoBadge";
import { Reveal } from "@/components/Reveal";

const pillars = [
  { en: "Precision", ja: "精度", text: "わずかな形状や重心の違いが、水中での動きを変える。" },
  { en: "Innovation", ja: "革新", text: "構造や素材から、新しいアプローチを探る。" },
  { en: "Performance", ja: "性能", text: "信頼して投げ続けられる一本を。" },
];

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="section-y bg-bg-alt">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Brand Philosophy</p>
          <h2 id="philosophy-title" className="headline mt-2 text-[2.5rem] sm:text-6xl lg:text-[4.5rem]">
            Built for the water.
          </h2>
          <p className="prose-jp mx-auto mt-6 max-w-[28em] text-[1rem] text-fg/80 md:text-[1.1875rem]">
            ボディの肉厚、重心、リップの角度。ルアーの動きを決める一つひとつの要素を突き詰め、釣り人の一投に応える道具をつくる。
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <VerificationBadge status="draft" />
            <p className="font-jp text-[0.6875rem] text-muted">営業提案用の仮文章です。正式公開時は REVONIK の開発理念に差し替えます。</p>
          </div>
        </Reveal>
        <ul className="mx-auto mt-14 grid max-w-5xl gap-10 text-center sm:grid-cols-3 md:mt-20">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.en} delay={i * 0.08}>
              <p className="headline text-[1.75rem]">{p.en}</p>
              <p className="mt-1 font-jp text-[0.75rem] text-muted">{p.ja}</p>
              <p className="prose-jp mx-auto mt-3 max-w-[16em] text-[0.875rem] text-fg/75">{p.text}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-12 text-center">
          <Button href="/about" variant="link">
            ブランドについて
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
