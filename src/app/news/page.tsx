import type { Metadata } from "next";
import { NewsList } from "@/components/news/NewsList";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "NEWS",
  description: "新製品・発売情報・イベント・メディア掲載など、REVONIK の最新情報。",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <PageHeader eyebrow="News" title="Latest." lead="新製品・発売情報・メディア掲載。" />
      <section aria-label="記事一覧" className="container-x pb-24 md:pb-32">
        <NewsList />
      </section>
    </>
  );
}
