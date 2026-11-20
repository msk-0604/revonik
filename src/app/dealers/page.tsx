import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { DealerFinder } from "@/components/dealers/DealerFinder";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "DEALERS",
  description: "REVONIK 製品の取扱店。都道府県・販売形態・店名で探せます。",
  alternates: { canonical: "/dealers" },
};

export default function DealersPage() {
  return (
    <>
      <PageHeader eyebrow="Dealers" title="Find a dealer." lead="公式オンラインストアと、取扱店。" />
      <section className="container-x pb-10">
        <a
          href={site.links.store}
          target="_blank"
          rel="noopener noreferrer"
          data-track="store_click"
          data-track-placement="dealers_official"
          className="flex flex-col gap-4 rounded-[1.5rem] border border-line p-6 transition-colors hover:border-fg/40 sm:flex-row sm:items-center sm:justify-between md:p-8"
        >
          <span>
            <span className="eyebrow">Official</span>
            <span className="mt-1 block text-[1.5rem] font-semibold tracking-tight">REVONIK 公式オンラインストア</span>
            <span className="mt-1 block text-[0.8125rem] text-muted">revonik.stores.jp</span>
          </span>
          <span className="inline-flex min-h-12 w-fit items-center gap-1 rounded-full bg-fg px-6 text-[1rem] text-on-fg">
            ストアへ <ArrowUpRight aria-hidden className="size-4" />
            <span className="sr-only">（外部サイト）</span>
          </span>
        </a>
      </section>
      <section aria-labelledby="dealer-list" className="container-x pb-24 md:pb-32">
        <h2 id="dealer-list" className="headline text-[1.75rem] sm:text-[2.25rem]">
          取扱店
        </h2>
        <p className="mt-3 max-w-3xl font-jp text-[0.875rem] leading-relaxed text-muted">
          販売ページで REVONIK 製品の掲載を確認した店舗です（公式の取扱店一覧ではありません）。在庫・取扱状況は各店舗にご確認ください。
        </p>
        <div className="mt-8">
          <DealerFinder />
        </div>
      </section>
    </>
  );
}
