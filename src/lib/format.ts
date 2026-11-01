/** "2026-09-10" → "2026.09.10"、"2026-09" → "2026.09" */
export function formatDate(iso: string) {
  return iso.split("-").join(".");
}

export const verificationLabel = {
  official: "公式情報",
  retailer: "販売店掲載値（公式未照合）",
  unverified: "未確認",
  draft: "提案用の仮文章",
} as const;
