import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button";
import { VerificationBadge } from "@/components/DemoBadge";
import { ProductCard } from "@/components/ProductCard";
import { ActionVideo } from "@/components/products/ActionVideo";
import { ProductShowcase } from "@/components/products/ProductShowcase";
import { SpecTable } from "@/components/products/SpecTable";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { colorImage, getCategory, getProduct, mainImage, relatedProducts, storeLink } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name}（${getCategory(product.category).labelJa}）｜${product.summary}`,
    openGraph: { images: [{ url: mainImage(product), width: 1600, height: 1200 }] },
  };
}

function SectionTitle({ id, no, en, ja }: { id: string; no: string; en: string; ja: string }) {
  return (
    <div className="lg:sticky lg:top-32 lg:self-start">
      <p className="font-display text-[0.7rem] font-semibold tracking-[0.24em] text-muted">{no}</p>
      <h2 id={id} className="display mt-3 text-3xl md:text-4xl">{en}</h2>
      <p className="mt-2 font-jp text-xs tracking-[0.2em] text-muted">{ja}</p>
    </div>
  );
}

export default async function ProductDetailPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = relatedProducts(product);
  const storeHref = storeLink(product, site.links.store);
  const row = "grid gap-8 border-t border-line py-16 md:py-24 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16";

  return (
    <>
      <ProductShowcase product={product} category={category} storeHref={storeHref} />

      <div className="container-x mt-20 md:mt-32">
        {/* 製品コンセプト */}
        <section aria-labelledby="concept" className={row}>
          <SectionTitle id="concept" no="01" en="Concept" ja="製品コンセプト" />
          <Reveal>
            {product.concept ? (
              <>
                <p className="font-jp text-lg leading-[2] font-medium tracking-[0.04em] text-fg/90 md:text-xl md:leading-[2.1]">{product.concept}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <VerificationBadge status={product.conceptStatus} />
                  <span className="font-jp text-[0.72rem] text-muted">掲載情報をもとに Stark Lab が要約した文章です。</span>
                </div>
              </>
            ) : (
              <p className="font-jp text-muted">情報未登録（公式情報の受領後に掲載します）</p>
            )}
          </Reveal>
        </section>

        {/* 製品の特徴 */}
        <section aria-labelledby="features" className={row}>
          <SectionTitle id="features" no="02" en="Features" ja="製品の特徴" />
          <div>
            {product.features.length > 0 ? (
              <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
                {product.features.map((f, i) => (
                  <Reveal as="li" key={f} delay={i * 0.06} className="bg-ink p-6 md:p-8">
                    <p className="font-display text-4xl font-extrabold text-fg/20">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-6 font-jp text-[0.9rem] leading-[1.9] text-fg/85">{f}</p>
                  </Reveal>
                ))}
              </ol>
            ) : (
              <p className="font-jp text-muted">情報未登録（公式情報の受領後に掲載します）</p>
            )}
          </div>
        </section>

        {/* スペック */}
        <section id="specs" aria-labelledby="specs-title" className={`${row} scroll-mt-28`}>
          <SectionTitle id="specs-title" no="03" en="Specs" ja="製品スペック" />
          <div>
            <SpecTable product={product} />
            <p className="mt-6 font-jp text-[0.72rem] leading-relaxed text-muted">
              ※ スペックは販売店・釣りメディアの掲載値で、REVONIK 公式情報とは未照合です。確認できない項目は「情報未登録」としています。
            </p>
          </div>
        </section>

        {/* カラーバリエーション */}
        <section aria-labelledby="colors" className={row}>
          <SectionTitle id="colors" no="04" en="Colors" ja="カラーバリエーション" />
          <div>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {product.colors.map((c, i) => (
                <Reveal as="li" key={c.id} delay={(i % 4) * 0.05}>
                  <div className="relative aspect-[4/3] overflow-hidden border border-line bg-panel">
                    <Image src={colorImage(product, c)} alt={`${product.name}（${c.name}）の仮画像`} fill sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 50vw" className="object-cover" />
                  </div>
                  <p className="mt-3 font-jp text-[0.82rem]">
                    {c.name}
                    {!c.verified && <span className="ml-1 text-[0.7rem] text-muted">（仮）</span>}
                  </p>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 font-jp text-[0.72rem] leading-relaxed text-muted">
              {product.colors.some((c) => c.verified)
                ? "※ カラー名は販売店で確認できたもので、全ラインナップではない可能性があります。"
                : "※ カラー名が未確認のため、デモ用の仮カラーを表示しています。"}
            </p>
          </div>
        </section>

        {/* アクション動画 */}
        <section aria-labelledby="movie" className={row}>
          <SectionTitle id="movie" no="05" en="Movie" ja="アクション動画" />
          <div>
            <ActionVideo youtubeId={product.youtubeId} title={product.name} />
          </div>
        </section>

        {/* 出典 */}
        <section aria-labelledby="sources" className="border-t border-line py-10">
          <h2 id="sources" className="eyebrow">Reference（照合に使用した公開情報）</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {product.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-jp text-[0.75rem] text-muted underline decoration-line-strong underline-offset-4 hover:text-fg">
                  {s.label}
                  <ArrowUpRight aria-hidden className="size-3" />
                  <span className="sr-only">（外部サイト）</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* オンラインストア導線 */}
      <section aria-labelledby="buy" className="border-y border-line bg-panel">
        <div className="container-x flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
          <div>
            <p className="eyebrow">Online Store</p>
            <h2 id="buy" className="display mt-4 text-4xl md:text-6xl">
              Get <span className="normal-case">{product.name}</span>
            </h2>
            <p className="mt-4 font-jp text-sm text-muted">在庫・価格は公式オンラインストアでご確認ください。</p>
          </div>
          <Button href={storeHref} external>
            Online Store
          </Button>
        </div>
      </section>

      {/* 関連商品 */}
      <section aria-labelledby="related" className="container-x py-24 md:py-32">
        <p className="eyebrow">Related</p>
        <h2 id="related" className="display mt-4 text-4xl md:text-6xl">Related Products</h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {related.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
