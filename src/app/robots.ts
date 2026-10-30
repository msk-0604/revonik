import type { MetadataRoute } from "next";

/** 営業提案用デモ：すべてのクローラーを拒否 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
