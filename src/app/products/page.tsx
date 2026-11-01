import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { RangeChart } from "@/components/home/RangeChart";

export const metadata: Metadata = {
  title: "PRODUCTS",
  description: "REVONIK のルアーをカテゴリー別に閲覧できる商品一覧（提案用デモ）。",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Lineup"
        title="Products"
        lead="タイプ・シーン・名前から、狙いに合う一本を。"
      />
      <section aria-label="商品一覧" className="container-x pb-24 md:pb-32">
        <ProductExplorer />
      </section>
      <RangeChart />
    </>
  );
}
