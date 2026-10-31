import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button";
import { VerificationBadge } from "@/components/DemoBadge";
import { ProductCard } from "@/components/ProductCard";
import { ActionVideo } from "@/components/products/ActionVideo";
import { ColorGallery, ProductColorProvider, ProductStage } from "@/components/products/ProductColors";
import { SpecTable } from "@/components/products/SpecTable";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/products";
import { designer } from "@/data/designer";
import { getCategory, getProduct, mainImage, relatedProducts } from "@/lib/products";

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

function Heading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <Reveal className="text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="headline mt-2 text-[2.25rem] sm:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}

export default async function ProductDetailPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = relatedProducts(product);

  return (
    <ProductColorProvider product={product}>
      {/* 1. 商品名 */}
      <section aria-labelledby="product-name" className="pt-[118px] md:pt-[136px]">
        <div className="container-x">
          <nav aria-label="パンくずリスト" className="text-[0.75rem] text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-fg hover:underline">Home</Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link href="/products" className="hover:text-fg hover:underline">Products</Link>
              </li>
              <li aria-hidden>›</li>
              <li aria-current="page" className="text-fg">{product.name}</li>
            </ol>
          </nav>
          <Reveal className="mt-10 text-center md:mt-14">
            <p className="eyebrow">
              {category.label}
              <span className="ml-2 font-jp font-normal">{category.labelJa}</span>
            </p>
            <h1 id="product-name" className="headline mt-1 text-[3rem] break-words min-[375px]:text-[3.5rem] sm:text-7xl lg:text-[6rem]">
              {product.name}
            </h1>
            {product.nameKana && <p className="mt-2 font-jp text-[0.875rem] tracking-[0.15em] text-muted">{product.nameKana}</p>}
            <VerificationBadge status={product.verification} className="mt-4" />
          </Reveal>
        </div>
      </section>

      {/* 2. 大きな商品写真 */}
      <section aria-label="商品写真" className="mt-6 px-2 md:mt-8">
        <Reveal y={32}>
          <ProductStage />
        </Reveal>
      </section>

      {/* 3. 短い製品紹介 */}
      <section aria-labelledby="intro" className="container-x section-y text-center">
        <Reveal className="mx-auto max-w-3xl">
          <h2 id="intro" className="sr-only">製品紹介</h2>
          <p className="headline text-[1.75rem] leading-[1.35] sm:text-[2.5rem] font-jp tracking-normal">{product.summary}</p>
          {product.concept ? (
            <p className="prose-jp mx-auto mt-8 max-w-2xl text-[1rem] text-fg/80 md:text-[1.0625rem]">{product.concept}</p>
          ) : (
            <p className="prose-jp mt-8 text-muted">製品紹介は情報未登録です（公式情報の受領後に掲載します）。</p>
          )}
          {product.concept && (
            <p className="mt-4 font-jp text-[0.75rem] text-muted">
              ※ 販売店・釣りメディアの掲載情報を Stark Lab が要約した文章です（公式の文言ではありません）。
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7">
            <Button href="#colors-section" variant="link">
              カラーを見る
            </Button>
            <Button href="#specs" variant="link">
              スペックを見る
            </Button>
          </div>
        </Reveal>
      </section>

      {/* 4. 製品の特徴 */}
      <section aria-labelledby="features" className="section-y bg-bg-alt">
        <div className="container-x">
          <Heading id="features" eyebrow="Features" title="製品の特徴" />
          {product.features.length > 0 ? (
            <ol className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
              {product.features.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 0.06} className="rounded-[1.25rem] bg-white p-7 md:p-8">
                  <p className="text-[0.8125rem] font-semibold text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-3 font-jp text-[1rem] leading-[1.8]">{f}</p>
                </Reveal>
              ))}
            </ol>
          ) : (
            <p className="mt-10 text-center font-jp text-muted">情報未登録（公式情報の受領後に掲載します）</p>
          )}
        </div>
      </section>

      {/* 5. カラーバリエーション */}
      <section id="colors-section" aria-labelledby="colors" className="section-y scroll-mt-24">
        <div className="container-x">
          <Heading id="colors" eyebrow="Colors" title="カラーバリエーション" />
          <div className="mx-auto mt-12 max-w-5xl">
            <ColorGallery />
            <p className="mt-8 text-center font-jp text-[0.75rem] leading-relaxed text-muted">
              {product.colors.some((c) => c.verified)
                ? "※ カラー名は販売店で確認できたもので、全ラインナップではない可能性があります。画像は仮のイラストで、実物の色味とは異なります。"
                : "※ カラー名が未確認のため、デモ用の仮カラーを表示しています。"}
            </p>
          </div>
        </div>
      </section>

      {/* 6. スペック */}
      <section id="specs" aria-labelledby="specs-title" className="section-y scroll-mt-24 bg-bg-alt">
        <div className="container-x">
          <Heading id="specs-title" eyebrow="Specs" title="スペック" />
          <div className="mt-10">
            <SpecTable product={product} />
            <p className="mx-auto mt-6 max-w-3xl font-jp text-[0.75rem] leading-relaxed text-muted">
              ※ 販売店・釣りメディアの掲載値で、REVONIK 公式情報とは未照合です。確認できない項目は「情報未登録」としています。
            </p>
          </div>
        </div>
      </section>

      {/* 7. アクション動画 */}
      <section aria-labelledby="movie" className="section-y">
        <div className="container-x">
          <Heading id="movie" eyebrow="Movie" title="アクション動画" />
          <Reveal className="mx-auto mt-12 max-w-4xl">
            <ActionVideo youtubeId={product.youtubeId} title={product.name} />
          </Reveal>
        </div>
      </section>

      {/* 開発者の言葉 */}
      <section aria-labelledby="designer-note" className="section-y bg-bg-alt text-center">
        <Reveal className="container-x">
          <p className="index-label">Designer</p>
          <h2 id="designer-note" className="sr-only">
            ルアーデザイナーの言葉
          </h2>
          <p className="statement mx-auto mt-6 max-w-3xl text-[1.5rem] sm:text-[2.25rem]">「{designer.quote.text}」</p>
          <p className="mt-6 font-jp text-[0.9375rem] tracking-[0.2em]">{designer.name}</p>
          <a
            href={designer.quote.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-jp text-[0.6875rem] text-muted hover:text-fg hover:underline"
          >
            出典：{designer.quote.source.label} 記事見出しより<span className="sr-only">（外部サイト）</span>
          </a>
          <div className="mt-6">
            <Button href="/about" variant="link">
              ルアー開発への考え方
            </Button>
          </div>
        </Reveal>
      </section>

      {/* 関連商品 */}
      <section aria-labelledby="related" className="section-y">
        <div className="container-x">
          <Heading id="related" eyebrow="Related" title="ほかの製品" />
          <ul className="mt-12 grid gap-x-6 gap-y-14 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {related.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>

          <div className="mt-20 border-t border-line pt-6">
            <h2 className="text-[0.75rem] font-semibold text-muted">照合に使用した公開情報</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {product.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-8 items-center gap-0.5 font-jp text-[0.75rem] text-muted hover:text-fg hover:underline"
                  >
                    {s.label}
                    <ArrowUpRight aria-hidden className="size-3" />
                    <span className="sr-only">（外部サイト）</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </ProductColorProvider>
  );
}
