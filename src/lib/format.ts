export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

export const verificationLabel = {
  official: "公式情報",
  retailer: "販売店掲載値（公式未照合）",
  unverified: "未確認",
  draft: "提案用の仮文章",
} as const;
