import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { designer } from "@/data/designer";

/** ルアーデザイナー・加藤誠司氏の言葉（出典付き）と経歴 */
export function DesignerSection() {
  return (
    <section aria-labelledby="designer-title" className="section-y bg-bg-alt">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="index-label">
            <span>Designer</span>
            <span aria-hidden className="h-px w-6 bg-muted/40" />
            <span>{designer.nameEn}</span>
          </p>
        </Reveal>
        <Reveal delay={0.05} className="mx-auto mt-10 max-w-4xl text-center">
          <figure>
            <blockquote>
              <p id="designer-title" className="statement text-[1.75rem] min-[375px]:text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem]">
                「{designer.quote.text}」
              </p>
            </blockquote>
            <figcaption className="mt-8">
              <span className="block font-jp text-[1rem] font-medium tracking-[0.2em]">{designer.name}</span>
              <span className="mt-1 block text-[0.75rem] text-muted">{designer.role}</span>
              <a
                href={designer.quote.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-jp text-[0.6875rem] text-muted hover:text-fg hover:underline"
              >
                出典：{designer.quote.source.label} 記事見出しより
                <span className="sr-only">（外部サイト）</span>
              </a>
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl text-center">
          <p className="prose-jp text-[0.9375rem] text-fg/80 md:text-[1rem]">{designer.career.text}</p>
          <div className="mt-6">
            <Button href="/about" variant="link">
              ルアー開発への考え方
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
