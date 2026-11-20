import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Play } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { OfficialFilm } from "@/components/OfficialFilm";
import { DesignDetails } from "@/components/products/DesignDetails";
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
import { videosFor } from "@/data/videos";
import { formatDate } from "@/lib/format";
import { displayColors, getCategory, getProduct, mainImage, relatedProducts, storeLink } from "@/lib/products";

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
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${product.name} | REVONIK`, ...(mainImage(product) ? { images: [{ url: mainImage(product)!, width: 1600, height: 1200 }] } : {}) },
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
      className="inline-flex min-h-12 items-center gap-1 rounded-full bg-fg px-7 text-[1rem] text-on-fg transition-colors hover:bg-fg/80"
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
  // 公式動画：写真が未掲載の間は、1本目を上部のステージに大きく表示し、残りをアクションの項目に並べる
  const films = videosFor(product.slug);
  const hasPhotos = Boolean(mainImage(product)) || displayColors(product).some((c) => c.image);
  const stageFilm = hasPhotos ? undefined : films[0];
  const moreFilms = stageFilm ? films.slice(1) : films;
  const base = site.url.replace(/\/$/, "");
  const image = mainImage(product);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description: product.summary,
        brand: { "@type": "Brand", name: "REVONIK" },
        category: category.labelJa,
        ...(image ? { image: `${base}${image}` } : {}),
        url: `${base}/products/${product.slug}`,
        additionalProperty: [
          { name: "全長", value: product.length },
          { name: "重量", value: product.weight },
          { name: "潜行深度", value: product.depth },
          { name: "浮力", value: product.buoyancy },
        ]
          .filter((p) => p.value)
          .map((p) => ({ "@type": "PropertyValue", ...p })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Products", item: `${base}/products` },
          { "@type": "ListItem", position: 3, name: product.name, item: `${base}/products/${product.slug}` },
        ],
      },
    ],
  };
  const keySpecs = [
    { k: "全長", v: product.length },
    { k: "重量", v: product.weight },
    { k: "潜行深度", v: product.depth },
    { k: "浮力", v: product.buoyancy },
    {
      k: "発売",
      v:
        product.status === "announced"
          ? `${product.plannedRelease ? formatDate(product.plannedRelease) + " " : ""}予定`
          : product.releaseDate
            ? formatDate(product.releaseDate)
            : "発売中",
    },
  ];

  return (
    <ProductColorProvider product={product}>
      <JsonLd data={jsonLd} />

      {/* ── 上部：大きな商品画像・商品名・コンセプト ── */}
      <section aria-labelledby="product-name" className="pt-[84px] md:pt-[100px]">
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
        </div>
        <div className="mt-6 px-3 md:px-6">
          <ProductStage film={stageFilm} />
        </div>
        <div className="container-x pt-10 pb-16 text-center md:pt-14 md:pb-24">
          <div className="animate-fade-up">
            <p className="eyebrow">
              {release && <span className="mr-2 rounded-full bg-fg px-2 py-0.5 text-[0.6875rem] text-on-fg">NEW</span>}
              {category.label}
            </p>
            <h1 id="product-name" className="headline mt-2 text-[3rem] break-words min-[375px]:text-[3.5rem] sm:text-7xl lg:text-[5.5rem]">
              {product.name}
            </h1>
            <p className="statement mt-3 text-[1.125rem] text-fg/80 md:text-[1.375rem]">{x.tagline}</p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl font-jp text-[1.0625rem] leading-[1.85] md:text-[1.1875rem]">{product.concept ?? product.summary}</p>
          <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line text-left sm:grid-cols-5">
            {keySpecs.map((s) => (
              <div key={s.k} className="bg-panel px-4 py-3">
                <dt className="font-jp text-[0.6875rem] text-muted">{s.k}</dt>
                <dd className="mt-1 font-jp text-[0.9375rem] font-medium">{s.v ?? "—"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-jp text-[0.75rem] text-muted">{stageFilm ? "上の映像は REVONIK 公式 YouTube の埋め込みです。" : ""}掲載の仕様・発売情報は確認中です。製品写真は許諾後に掲載します。</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 min-[420px]:flex-row min-[420px]:gap-6">
            <StoreButton href={storeHref} slug={product.slug} placement="product_hero" />
            <Link href="/dealers" data-track="dealer_search" data-track-item={product.slug} className="inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">
              取扱店を探す ›
            </Link>
          </div>
        </div>
      </section>

      {/* ── 中部：特徴・アクション・設計思想・スペック ── */}
      <section aria-labelledby="why" className="section-y bg-bg-alt">
        <div className="container-x">
          <Heading id="why" no="01" eyebrow="Features" title="製品の特徴" />
          <ol className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
            {x.why.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.06} className="rounded-[1.25rem] bg-panel p-7 md:p-8">
                <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-jp text-[1.1875rem] font-bold">{w.title}</h3>
                <p className="mt-2 font-jp text-[0.9375rem] leading-[1.8] text-fg/75">{w.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="action" className="section-y">
        <div className="container-x">
          <Heading id="action" no="02" eyebrow="Action" title="動きと、使いどころ" />
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
          {moreFilms.length > 0 && (
            <Reveal className="mx-auto mt-14 max-w-5xl">
              <p className="text-center text-[0.75rem] font-semibold tracking-[0.2em] text-muted">OFFICIAL FILMS</p>
              <ul className={`mt-6 grid gap-x-6 gap-y-10 ${moreFilms.length > 1 ? "sm:grid-cols-2" : "mx-auto max-w-3xl"}`}>
                {moreFilms.map((v) => (
                  <li key={v.id}>
                    <OfficialFilm video={v} size={moreFilms.length > 1 ? "card" : "large"} placement="product_action" />
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          {videos.length > 0 && (
            <Reveal className="mx-auto mt-10 max-w-4xl">
              <ul className="divide-y divide-line border-y border-line">
                {videos.map((v) => (
                  <li key={v.id}>
                    <a href={v.url} target="_blank" rel="noopener noreferrer" data-track="video_click" data-track-video={v.id} data-track-item={product.slug} className="group flex items-center justify-between gap-4 py-4">
                      <span className="flex items-center gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-bg-alt">
                          <Play aria-hidden className="ml-0.5 size-4 fill-current" />
                        </span>
                        <span>
                          <span className="block font-jp text-[0.9375rem] font-bold group-hover:underline underline-offset-4">{v.title}</span>
                          <span className="block text-[0.75rem] text-muted">{v.source}</span>
                        </span>
                      </span>
                      <ArrowUpRight aria-hidden className="size-4 shrink-0 text-link" />
                      <span className="sr-only">（YouTube・外部サイト）</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      <section aria-labelledby="design" className="section-y bg-bg-alt">
        <div className="container-x">
          <Heading id="design" no="03" eyebrow="Design" title="設計の思想" />
          <Reveal className="mx-auto mt-12 max-w-6xl">
            <DesignDetails details={x.details} />
          </Reveal>
          {techs.length > 0 && (
            <ul className={`mx-auto mt-6 grid gap-4 ${techs.length > 1 ? "max-w-6xl sm:grid-cols-2" : "max-w-xl"}`}>
              {techs.map((t) => (
                <Reveal as="li" key={t.id} className="rounded-[1.25rem] border border-line bg-panel p-6">
                  <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted">{t.en}</p>
                  <p className="mt-1 font-jp text-[1.0625rem] font-bold">{t.title}</p>
                  <p className="mt-2 font-jp text-[0.875rem] leading-relaxed text-fg/75">{t.text}</p>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section id="specs" aria-labelledby="specs-title" className="section-y scroll-mt-16">
        <div className="container-x">
          <Heading id="specs-title" no="04" eyebrow="Specifications" title="スペック" />
          <div className="mt-10">
            <SpecTable product={product} />
          </div>
        </div>
      </section>

      {/* ── 下部：カラー・関連製品・取扱店への導線 ── */}
      <section id="colors-section" aria-labelledby="colors" className="section-y scroll-mt-16 bg-bg-alt">
        <div className="container-x">
          <Heading id="colors" no="05" eyebrow="Colors" title="カラーバリエーション" />
          <div className="mx-auto mt-12 max-w-5xl">
            <ColorGallery />
          </div>
        </div>
      </section>

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

      <section aria-labelledby="buy" className="section-y bg-bg-alt text-center">
        <Reveal className="container-x">
          <p className="eyebrow">Where to buy</p>
          <h2 id="buy" className="headline mt-2 text-[2.25rem] sm:text-5xl">
            {product.name} を、手に。
          </h2>
          <p className="mt-4 font-jp text-[0.9375rem] text-muted">公式オンラインストア、または取扱店でお求めいただけます。</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 min-[420px]:flex-row min-[420px]:gap-6">
            <StoreButton href={storeHref} slug={product.slug} placement="product_bottom" />
            <Link href="/dealers" data-track="dealer_search" data-track-item={product.slug} className="inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">
              取扱店を探す ›
            </Link>
          </div>
        </Reveal>
      </section>

      <StickyStoreBar name={product.name} href={storeHref} slug={product.slug} />
    </ProductColorProvider>
  );
}
