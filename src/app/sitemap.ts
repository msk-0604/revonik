import type { MetadataRoute } from "next";
import { news } from "@/data/news";
import { products } from "@/data/products";
import { site } from "@/data/site";

/**
 * サイトマップ。営業デモでは robots.txt でクロールを拒否しているため実際には使われない。
 * 正式公開時に robots.ts を公開用に切り替えると、そのまま検索エンジンへの案内になる。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages = ["", "/products", "/technology", "/about", "/news", "/media", "/dealers", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...news.map((n) => ({ url: `${base}/news/${n.slug}`, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
