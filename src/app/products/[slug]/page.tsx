import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Play } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ActionVideo } from "@/components/products/ActionVideo";
import { LureDiagram } from "@/components/products/LureDiagram";
import { ColorGallery, ProductColorProvider, ProductStage } from "@/components/products/ProductColors";
import { SpecTable } from "@/components/products/SpecTable";
import { StickyStoreBar } from "@/components/products/StickyStoreBar";
import { Reveal } from "@/components/Reveal";
import { categories } from "@/data/categories";
import { experience, sceneLabels } from "@/data/experience";
import { media } from "@/data/media";
import { products } from "@/data/products";
import { releases } from "@/data/releases";
import { site } from "@/data/site";
import { technologiesFor } from "@/data/technology";
import { getCategory, getProduct, mainImage, relatedProducts, storeLink } from "@/lib/products";

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

function Heading({ id, no, eyebrow, title }: { id: string; no: string; eyebrow: string; title: string }) {
  return (
    <Reveal className="text-center">
      <p className="index-label">
        <span>{no}</span>
        <span aria-hidden className="h-px w-6 bg-muted/40" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} className="headline mt-3 text-[2.25rem] sm:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}

function StoreButton({ href, slug, placement, label = "オンラインストアで見る" }: { href: string; slug: string; placement: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-track="store_click"
      data-track-item={slug}
      data-track-placement={placement}
      className="inline-flex min-h-12 items-center gap-1 rounded-full bg-fg px-7 text-[1rem] text-white transition-colors hover:bg-fg/80"
    >
      {label}
      <ArrowUpRight aria-hidden className="size-4" />
      <span className="sr-only">（外部サイト）</span>
    </a>
  );
}

export default async function ProductDetailPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const x = experience[product.slug];
  const category = getCategory(product.category);
  const related = relatedProducts(product);
  const techs = technologiesFor(product.slug);
  const release = releases.find((r) => r.slug === product.slug);
  const storeHref = storeLink(product, site.links.store);
  const videos = media.filter((m) => m.kind === "youtube" && (m.related?.includes(product.slug) || m.relatedCategory === product.category));

  return (
    <ProductColorProvider product={product}>
      {/* 01. PRODUCT HERO */}
      <section aria-labelledby="product-name" className="pt-[92px] md:pt-[110px]">
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
          <div className="mt-8 animate-fade-up text-center md:mt-12">
            <p className="eyebrow">
              {release && <span className="mr-2 rounded-full bg-fg px-2 py-0.5 text-[0.6875rem] text-white">NEW</span>}
              {category.label}
            </p>
            <h1 id="product-name" className="headline mt-2 text-[3rem] break-words min-[375px]:text-[3.5rem] sm:text-7xl lg:text-[6rem]">
              {product.name}
            </h1>
            <p className="statement mt-3 text-[1.125rem] text-fg/80 md:text-[1.5rem]">{x.tagline}</p>
          </div>
        </div>
      </section>
      <section aria-label="商品画像" className="mt-4 px-1 md:mt-6">
        <ProductStage />
      </section>
      <section aria-labelledby="intro" className="container-x pt-10 pb-20 text-center md:pb-28">
        <Reveal className="mx-auto max-w-2xl">
          <h2 id="intro" className="sr-only">製品紹介</h2>
          <p className="font-jp text-[1.125rem] leading-[1.85] md:text-[1.3125rem]">{product.summary}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 min-[420px]:flex-row min-[420px]:gap-6">
            <StoreButton href={storeHref} slug={product.slug} placement="product_hero" />
            <a href="#specs" className="inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">
              スペックを見る ›
            </a>
          </div>
        </Reveal>
      </section>

      {/* 02. WHY THIS LURE */}
      <section aria-labelledby="why" className="section-y bg-bg-alt">
        <div className="container-x">
          <Heading id="why" no="01" eyebrow="Why this lure" title="このルアーを選ぶ理由。" />
          <ol className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
            {x.why.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.06} className="rounded-[1.25rem] bg-white p-7 md:p-8">
                <p className="text-[2.25rem] font-semibold leading-none tracking-tight text-fg/15">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 font-jp text-[1.1875rem] font-bold">{w.title}</h3>
                <p className="mt-2 font-jp text-[0.9375rem] leading-[1.8] text-fg/75">{w.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 03. ACTION & PERFORMANCE */}
      <section aria-labelledby="action" className="section-y">
        <div className="container-x">
          <Heading id="action" no="02" eyebrow="Action & Performance" title="動きと、使いどころ。" />
          <Reveal className="mx-auto mt-12 max-w-5xl">
            <dl className="grid gap-x-10 gap-y-8 border-t border-line pt-8 md:grid-cols-2">
              {[
                { label: "釣り", text: x.fishing },
                { label: "動き", text: x.action },
                { label: "使う場面", text: x.situation },
                { label: "使い分け", text: x.versus },
              ].map((f) => (
                <div key={f.label}>
                  <dt className="text-[0.75rem] font-semibold text-muted">{f.label}</dt>
                  <dd className="mt-1.5 font-jp text-[1rem] leading-[1.8]">{f.text}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-8 flex flex-wrap gap-2">
              {x.scenes.map((s) => (
                <li key={s}>
                  <Link href={`/products?scene=${s}`} className="inline-flex min-h-9 items-center rounded-full bg-bg-alt px-4 font-jp text-[0.8125rem] hover:bg-line">
                    {sceneLabels[s].label}
                    <span className="ml-1.5 text-muted">{sceneLabels[s].text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mx-auto mt-12 max-w-4xl">
            {videos.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2">
                {videos.map((v) => (
                  <li key={v.id}>
                    <a href={v.url} target="_blank" rel="noopener noreferrer" data-track="video_click" data-track-video={v.id} data-track-item={product.slug} className="group block">
                      <span className="relative block aspect-video overflow-hidden rounded-[1.25rem] bg-bg-alt">
                        {/* eslint-disable-next-line @next/next/no-img-element -- 小さなサムネイル */}
                        <img src={v.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                        <span aria-hidden className="absolute inset-0 grid place-items-center">
                          <span className="grid size-14 place-items-center rounded-full bg-white/90">
                            <Play className="ml-0.5 size-5 fill-current" />
                          </span>
                        </span>
                      </span>
                      <span className="mt-3 block font-jp text-[1rem] font-bold group-hover:underline underline-offset-4">{v.title}</span>
                      <span className="mt-0.5 block text-[0.75rem] text-muted">{v.source}</span>
                      <span className="sr-only">（YouTube・外部サイト）</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <ActionVideo youtubeId={product.youtubeId} title={product.name} />
            )}
          </Reveal>
        </div>
      </section>

      {/* 04. DESIGN DETAILS */}
      <section aria-labelledby="design" className="section-y bg-bg-alt">
        <div className="container-x">
          <Heading id="design" no="03" eyebrow="Design Details" title="細部の設計。" />
          <Reveal className="mx-auto mt-12 max-w-6xl">
            <LureDiagram src={mainImage(product)} alt={`${product.name} の図解（コンセプトビジュアル）`} shape={product.shape} details={x.details} />
          </Reveal>
          {techs.length > 0 && (
            <ul className={`mx-auto mt-14 grid gap-4 ${techs.length > 1 ? "max-w-5xl sm:grid-cols-2" : "max-w-xl"}`}>
              {techs.map((t) => (
                <Reveal as="li" key={t.id} className="rounded-[1.25rem] bg-white p-6">
                  <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted">{t.en}</p>
                  <p className="mt-1 font-jp text-[1.0625rem] font-bold">{t.title}</p>
                  <p className="mt-2 font-jp text-[0.875rem] leading-relaxed text-fg/75">{t.text}</p>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 05. COLORS */}
      <section id="colors-section" aria-labelledby="colors" className="section-y scroll-mt-16">
        <div className="container-x">
          <Heading id="colors" no="04" eyebrow="Colors" title="カラー" />
          <div className="mx-auto mt-12 max-w-5xl">
            <ColorGallery />
          </div>
        </div>
      </section>

      {/* 06. SPECIFICATIONS */}
      <section id="specs" aria-labelledby="specs-title" className="section-y scroll-mt-16 bg-bg-alt">
        <div className="container-x">
          <Heading id="specs-title" no="05" eyebrow="Specifications" title="スペック" />
          <div className="mt-10">
            <SpecTable product={product} />
          </div>
        </div>
      </section>

      {/* 07. RELATED PRODUCTS */}
      <section aria-labelledby="related" className="section-y">
        <div className="container-x">
          <Heading id="related" no="06" eyebrow="Related" title="あわせて使いたい製品" />
          <ul className="mt-12 grid gap-x-6 gap-y-14 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {related.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <Link href={`/products?category=${product.category}`} className="text-[1rem] text-link hover:underline underline-offset-4">
              {categories.find((c) => c.id === product.category)?.labelJa}をすべて見る ›
            </Link>
          </p>
        </div>
      </section>

      {/* 08. ONLINE STORE */}
      <section aria-labelledby="buy" className="section-y bg-bg-alt text-center">
        <Reveal className="container-x">
          <p className="eyebrow">Online Store</p>
          <h2 id="buy" className="headline mt-2 text-[2.25rem] sm:text-5xl">
            {product.name} を、手に。
          </h2>
          <p className="mt-4 font-jp text-[0.9375rem] text-muted">在庫・価格は公式オンラインストアでご確認いただけます。</p>
          <div className="mt-8">
            <StoreButton href={storeHref} slug={product.slug} placement="product_bottom" />
          </div>
        </Reveal>
      </section>

      <StickyStoreBar name={product.name} href={storeHref} slug={product.slug} />
    </ProductColorProvider>
  );
}
