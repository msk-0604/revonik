import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { siteImages } from "@/data/images";
import { technologies } from "@/data/technology";
import { getProduct } from "@/lib/products";

/** テクノロジー：水中シーンのバナー ＋ 技術カード */
export function Technology() {
  return (
    <section id="technology" aria-labelledby="tech-title" className="bg-bg">
      <div className="relative overflow-hidden bg-[#0d2a33] text-white">
        <div className="relative aspect-[4/3] sm:aspect-[12/5]">
          <Image src={siteImages.sceneTech.src} alt={siteImages.sceneTech.alt} fill sizes="100vw" className="object-cover object-right sm:object-center" />
        </div>
        <Reveal className="absolute inset-x-0 top-0 container-x pt-10 sm:inset-y-0 sm:flex sm:flex-col sm:justify-center sm:pt-0">
          <p className="text-[0.8125rem] font-semibold tracking-[0.04em] text-white/75">Technology</p>
          <h2 id="tech-title" className="headline mt-2 max-w-md text-[2.25rem] sm:text-5xl">
            動きと音を、
            <br />
            構造からつくる。
          </h2>
        </Reveal>
      </div>
      <div className="container-x section-y">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((t, i) => (
            <Reveal as="li" key={t.id} delay={(i % 3) * 0.06} className="flex flex-col rounded-[1.25rem] bg-bg-alt p-7">
              <p className="text-[0.75rem] font-semibold tracking-[0.12em] text-muted">{t.en}</p>
              <h3 className="mt-2 font-jp text-[1.25rem] font-bold">{t.title}</h3>
              <p className="mt-3 font-jp text-[0.875rem] leading-[1.85] text-fg/75">{t.text}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {t.products.map((slug) => {
                  const p = getProduct(slug);
                  return p ? (
                    <li key={slug}>
                      <Link href={`/products/${slug}`} className="inline-flex min-h-8 items-center rounded-full bg-white px-3 text-[0.75rem] hover:text-link">
                        {p.name}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
              <a
                href={t.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-5 font-jp text-[0.6875rem] text-muted hover:text-fg hover:underline"
              >
                出典：{t.source.label}
                <span className="sr-only">（外部サイト）</span>
              </a>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 font-jp text-[0.6875rem] text-muted">※ 説明文は公開情報を Stark Lab が要約したものです。</p>
      </div>
    </section>
  );
}
