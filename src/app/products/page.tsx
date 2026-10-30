import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { StoreCta } from "@/components/StoreCta";

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
        lead="カテゴリーと商品名で絞り込めます。スペックは販売店・釣りメディアの掲載値をもとにした仮データで、公式情報との照合後に確定します。"
      />
      <section aria-label="商品一覧" className="container-x pb-24 md:pb-36">
        <ProductExplorer />
      </section>
      <StoreCta />
    </>
  );
}
