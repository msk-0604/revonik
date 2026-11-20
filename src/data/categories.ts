import type { Category } from "@/types";

export const categories: Category[] = [
  { id: "vibration", label: "Vibration", labelJa: "バイブレーション" },
  { id: "crankbait", label: "Crankbait", labelJa: "クランクベイト" },
  { id: "shad", label: "Shad", labelJa: "シャッド" },
  { id: "minnow", label: "Minnow / Jerkbait", labelJa: "ミノー・ジャークベイト" },
  { id: "topwater", label: "Topwater", labelJa: "トップウォーター" },
  { id: "chain", label: "Chain bait", labelJa: "チェーンベイト" },
  { id: "metal-jig", label: "Metal jig", labelJa: "メタルジグ" },
  { id: "other", label: "Other", labelJa: "その他・分類未確認" },
];

export const segments = [
  { id: "bass", label: "BASS", labelJa: "バス" },
  { id: "salt", label: "SALT", labelJa: "ソルト" },
] as const;
