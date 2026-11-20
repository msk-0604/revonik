import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { proposalPoints } from "@/data/proposal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "PROPOSAL",
  description: "Stark Lab から REVONIK への、公式ブランドサイトのご提案。",
};

const compare = [
  { id: "home-pc", label: "HOME ファーストビュー（PC）" },
  { id: "detail-pc", label: "商品詳細（PC）" },
  { id: "home-sp", label: "HOME ファーストビュー（スマートフォン）" },
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
            {site.producer.company} から REVONIK への、公式ブランドサイトのご提案です。本サイトは提案用の非公式デモで、画像はすべてオリジナルのコンセプトビジュアル、製品情報は公開情報をもとにした確認中の内容です。
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="design-compare" className="section-y bg-bg-alt">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Design Direction</p>
            <h2 id="design-compare" className="headline mt-2 text-[2.25rem] sm:text-5xl">
              2つのデザイン案
            </h2>
            <p className="mt-4 font-jp text-[1rem] leading-[1.9] text-fg/80">
              同じ構成・同じ製品ビジュアルで、配色だけを変えた2案です。フッターの切り替え、または URL の <code className="rounded bg-panel px-1.5 py-0.5 text-[0.875rem]">?theme=minimal</code> で、全ページを実際に見比べられます。
            </p>
          </Reveal>
          <div className="mt-12 space-y-14">
            {compare.map((c) => (
              <Reveal key={c.id}>
                <h3 className="text-[1rem] font-semibold">{c.label}</h3>
                <div className={`mt-4 grid gap-4 ${c.id.endsWith("sp") ? "grid-cols-2 sm:max-w-2xl" : "md:grid-cols-2"}`}>
                  {(["dark", "minimal"] as const).map((t) => (
                    <figure key={t}>
                      <div className={`relative overflow-hidden rounded-2xl border border-line bg-panel ${c.id.endsWith("sp") ? "aspect-[390/760]" : "aspect-[16/10]"}`}>
                        <Image
                          src={`/proposal/${c.id}-${t}.webp`}
                          alt={`${c.label}：${t === "dark" ? "ダーク案" : "ミニマル案"}`}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                      <figcaption className="mt-2 text-[0.8125rem] text-muted">{t === "dark" ? "A. ダーク案" : "B. ミニマル案（ホワイト・ライトグレー・ブラック）"}</figcaption>
                    </figure>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <ComparisonTable />
        </div>
      </section>

      <section aria-labelledby="points" className="section-y">
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

function ComparisonTable() {
  const rows = [
    { k: "製品の存在感", a: "暗い背景に光沢が際立ち、ドラマチック。", b: "白い背景に製品の形と色がそのまま浮かぶ。造形と配色を正確に見せられる。" },
    { k: "精密さ・技術感", a: "金属・水中の雰囲気が強く、技術の「迫力」が出る。", b: "図解や数値が読みやすく、技術資料のような「精度」が出る。" },
    { k: "余白・建築的な印象", a: "余白が黒に沈み、空間の広がりは感じにくい。", b: "白とライトグレーの面で空間が分かれ、建築的なミニマリズムに近い。" },
    { k: "情報の読みやすさ", a: "長文はやや疲れやすい。見出し中心のページ向き。", b: "スペック・年表・取扱店など、情報量の多いページでも読みやすい。" },
    { k: "写真の扱いやすさ", a: "黒背景の撮影・切り抜きと相性がよい。", b: "白背景の製品写真をそのまま使える。撮影の運用コストが低い。" },
  ];
  return (
    <Reveal className="mt-16">
      <h3 className="headline text-[1.75rem] sm:text-[2.25rem]">比較と推奨</h3>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[640px] text-left font-jp text-[0.875rem]">
          <thead className="bg-panel text-[0.8125rem] text-muted">
            <tr>
              <th scope="col" className="w-[18%] px-5 py-3 font-medium">観点</th>
              <th scope="col" className="px-5 py-3 font-medium">A. ダーク案</th>
              <th scope="col" className="px-5 py-3 font-medium">B. ミニマル案</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.k} className="border-t border-line align-top">
                <th scope="row" className="px-5 py-4 font-medium">{r.k}</th>
                <td className="px-5 py-4 leading-relaxed text-fg/80">{r.a}</td>
                <td className="px-5 py-4 leading-relaxed text-fg/80">{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 rounded-2xl border border-accent/40 p-6 md:p-8">
        <p className="eyebrow !text-accent">Recommendation</p>
        <p className="mt-3 font-jp text-[1.0625rem] leading-[1.9]">
          <strong>B. ミニマル案をベースに、黒を「見せ場」に限定して使う構成</strong>をおすすめします。
        </p>
        <p className="mt-3 font-jp text-[0.9375rem] leading-[1.9] text-fg/80">
          判断の基準は、派手さではなく「洗練・精密・余白・製品の存在感」です。白とライトグレーの面で空間を区切るミニマル案は、製品の造形と色を正確に見せ、図解や仕様も読みやすく、建築的なミニマリズムに近い印象になります。一方で、水中のシーンや実釣の映像など、迫力を伝えたい場面ではダークが効果的です。ベースはミニマル、黒は製品のヒーローや Field Experience などの限られた場面に——という使い分けが、REVONIK の設計思想とオフィスの美意識に最も近いと考えます。
        </p>
      </div>
    </Reveal>
  );
}
