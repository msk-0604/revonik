import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { designer } from "@/data/designer";

const facts = [
  { value: "2023", label: "ブランド設立" },
  { value: "0.6mm", label: "Dot SIX の肉厚" },
  { value: "大津", label: "工房の所在地" },
];

/** SECTION 05 — BRAND STORY：確認できた背景のみで構成 */
export function BrandStory() {
  return (
    <section id="story" aria-labelledby="story-title" className="section-y bg-bg-alt">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Brand Story</p>
          <h2 id="story-title" className="headline mt-2 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">
            数々のルアーを生んだ手が、
            <br className="hidden sm:block" />
            新しいブランドを。
          </h2>
        </Reveal>
        <Reveal y={32} className="mx-auto mt-12 max-w-[1100px]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:aspect-[21/9]">
            <Image src="/placeholders/scene-designer.webp" alt="水中を泳ぐルアーのイメージ（コンセプトビジュアル）" fill sizes="(min-width: 1100px) 1100px, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <p className="font-jp text-[1.0625rem] leading-[1.9] md:text-[1.1875rem]">{designer.career.text}</p>
            <figure className="mt-8 border-l-2 border-fg pl-5">
              <blockquote className="statement text-[1.25rem] md:text-[1.5rem]">「{designer.quote.text}」</blockquote>
              <figcaption className="mt-2 text-[0.75rem] text-muted">— {designer.name}（ルアマガプラス掲載記事より）</figcaption>
            </figure>
            <Link href="/about" className="mt-8 inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">
              ブランドについて
              <ChevronRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-6">
              {facts.map((f) => (
                <div key={f.label} className="border-t border-line pt-4">
                  <dt className="font-jp text-[0.75rem] text-muted">{f.label}</dt>
                  <dd className="mt-1 text-[1.75rem] font-semibold tracking-tight md:text-[2.5rem]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
