import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/products";
import { proposalPoints } from "@/data/proposal";
import { videosFor } from "@/data/videos";
import { displayColors, mainImage } from "@/lib/products";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "PROPOSAL",
  description: "Stark Lab から REVONIK への、公式ブランドサイトのご提案。",
};

const shots = [
  { id: "home-pc", label: "HOME ファーストビュー（PC）" },
  { id: "detail-pc", label: "商品詳細（PC）" },
  { id: "home-sp", label: "HOME ファーストビュー（スマートフォン）" },
];

const principles = [
  { title: "製品が主役", text: "大きな製品ビジュアルを中心に、情報は詰め込みすぎない。" },
  { title: "大胆な余白", text: "白とライトグレーの面で空間を区切る、建築的なレイアウト。黒基調の第二案も同じ設計で切り替え可能。" },
  { title: "精度で魅せる", text: "装飾ではなく、文字組み・写真・グリッドの精度で上質さを。" },
  { title: "控えめな動き", text: "フェードインと軽いスライドだけ。表示の速さを優先。" },
];

export default function ProposalPage() {
  return (
    <>
      <section className="container-x pt-32 pb-16 md:pt-44 md:pb-24">
        <Reveal>
          <p className="index-label">
            <span>Proposal</span>
            <span aria-hidden className="h-px w-6 bg-muted/40" />
            <span>Stark Lab → REVONIK</span>
          </p>
          <h1 className="display mt-6 text-[10vw] sm:text-7xl lg:text-[6.5rem]">
            A brand site,
            <br />
            engineered.
          </h1>
          <p className="mt-8 max-w-2xl font-jp text-[1.0625rem] leading-[1.9] text-fg/80">
            {site.producer.company} から REVONIK への、公式ブランドサイトのご提案です。本サイトは提案用の非公式デモです。製品写真は許諾をいただいた後に掲載するため、現在は REVONIK 公式 YouTube の動画（公式プレーヤーでの埋め込み）と、製品名を示す枠で表示しています。製品情報は公開情報をもとにした確認中の内容です。
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="design-direction" className="section-y bg-bg-alt">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Design Direction</p>
            <h2 id="design-direction" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              余白と精度で、製品を主役に。
            </h2>
            <p className="mt-4 font-jp text-[1rem] leading-[1.9] text-fg/80">
              ホワイト・ライトグレー・ブラックだけで構成し、装飾ではなく、タイポグラフィ・写真・レイアウトの精度で上質さをつくります。標準はホワイト。黒基調の案も、同じレイアウトのまま配色だけを切り替えて維持しています（フッターの「表示テーマ」で切り替え）。
            </p>
            {/* テーマは読み込み時に反映するため、ページ遷移ではなく通常のリンクで開く */}
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/?theme=light" className="inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">White で見る ›</a>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/?theme=dark" className="inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">Black で見る ›</a>
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <li key={p.title}>
                <p className="font-jp text-[1rem] font-bold">{p.title}</p>
                <p className="mt-1.5 font-jp text-[0.875rem] leading-relaxed text-fg/75">{p.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 space-y-14">
            {shots.map((c) => (
              <Reveal key={c.id}>
                <h3 className="text-[1rem] font-semibold">{c.label}</h3>
                <div className={`mt-4 grid gap-4 ${c.id.endsWith("sp") ? "max-w-[660px] grid-cols-2" : "max-w-6xl md:grid-cols-2"}`}>
                  {(["minimal", "dark"] as const).map((t) => (
                    <figure key={t}>
                      <div className={`relative overflow-hidden rounded-2xl border border-line bg-panel ${c.id.endsWith("sp") ? "aspect-[390/760]" : "aspect-[16/10]"}`}>
                        <Image src={`/proposal/${c.id}-${t}.webp`} alt={`${c.label}（${t === "minimal" ? "White" : "Black"}）`} fill sizes="(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
                      </div>
                      <figcaption className="mt-2 text-[0.75rem] text-muted">{t === "minimal" ? "White（標準）" : "Black（第二案）"}</figcaption>
                    </figure>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="assets" className="section-y">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Assets</p>
            <h2 id="assets" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              素材の状況
            </h2>
            <p className="mt-4 font-jp text-[1rem] leading-[1.9] text-fg/80">
              製品写真は、販売店に掲載されている画像の出典を素材台帳に記録したうえで、REVONIK からの許諾またはご提供を待っています（無断での転載はしていません）。公式 YouTube の動画は、YouTube の公式プレーヤーで埋め込んでいます。
            </p>
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-t border-line text-left font-jp text-[0.875rem]">
              <caption className="sr-only">製品ごとの素材の状況</caption>
              <thead>
                <tr className="border-b border-line text-[0.75rem] text-muted">
                  <th scope="col" className="py-3 pr-4 font-normal">製品</th>
                  <th scope="col" className="py-3 pr-4 font-normal">製品写真</th>
                  <th scope="col" className="py-3 pr-4 font-normal">公式動画（埋め込み）</th>
                  <th scope="col" className="py-3 font-normal">カラー名（確認済み）</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const photo = Boolean(mainImage(p)) || displayColors(p).some((c) => c.image);
                  const films = videosFor(p.slug).length;
                  return (
                    <tr key={p.slug} className="border-b border-line">
                      <th scope="row" className="py-3 pr-4 font-semibold">
                        <Link href={`/products/${p.slug}`} className="hover:text-link hover:underline">{p.name}</Link>
                      </th>
                      <td className="py-3 pr-4">{photo ? "掲載済み" : <span className="text-muted">許諾待ち</span>}</td>
                      <td className="py-3 pr-4 tabular-nums">{films > 0 ? `${films} 本` : <span className="text-muted">—</span>}</td>
                      <td className="py-3 tabular-nums">{displayColors(p).length > 0 ? `${displayColors(p).length} 色` : <span className="text-muted">確認中</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="points" className="section-y bg-bg-alt">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">What we propose</p>
            <h2 id="points" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              ご提案の内容
            </h2>
          </Reveal>
          <ol className="mt-12 border-t border-line">
            {proposalPoints.map((p) => (
              <Reveal as="li" key={p.no} className="grid gap-6 border-b border-line py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
                <div>
                  <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-accent tabular-nums">{p.no}</p>
                  <h3 className="headline mt-3 text-[1.75rem] sm:text-[2.25rem]">{p.title}</h3>
                  <p className="mt-3 font-jp text-[1rem] text-fg/80">{p.summary}</p>
                </div>
                <div>
                  <ul className="space-y-2.5 font-jp text-[0.9375rem] leading-[1.8] text-fg/80">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-2.5">
                        <span aria-hidden className="mt-[0.7em] block size-1 shrink-0 rounded-full bg-accent" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  {p.link && (
                    <Link href={p.link.href} className="mt-5 inline-flex min-h-11 items-center text-[1rem] text-link hover:underline underline-offset-4">
                      {p.link.label} ›
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mt-10 font-jp text-[0.8125rem] text-muted">※ 料金・契約条件は、ヒアリングの内容をもとに別途ご相談させてください。</p>
        </div>
      </section>
    </>
  );
}
