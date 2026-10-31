import type { SourceLink } from "@/types";

/**
 * 新製品情報（釣りメディアの公開記事にもとづく）
 * 発売時期はメディア掲載時点の情報で、公式情報との照合が必要。
 */
export const releases: { slug: string; name: string; date: string; text: string; source: SourceLink }[] = [
  {
    slug: "dispa-118",
    name: "Dispa 118SF",
    date: "2026.09",
    text: "3〜5mレンジを攻略する食わせ系ジャークベイト。",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/448387" },
  },
  {
    slug: "shindy-110",
    name: "SHINDY 110SF-M DryBone",
    date: "2026.09",
    text: "硬質素材「ドライボーン」とガラスラトルを採用。",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/448811" },
  },
  {
    slug: "ramzy",
    name: "Ramzy",
    date: "2026",
    text: "障害物の回避性能を高めたシャロークランク。",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/414411/" },
  },
  {
    slug: "shekiller-78",
    name: "Shekiller78",
    date: "2026.01",
    text: "日本のベイトフィッシュに合わせたクランキングミノー。",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/414368/" },
  },
  {
    slug: "saramoa",
    name: "SaraMoa PORO",
    date: "2026",
    text: "SaraMoa の小型モデル（50mm）。",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/414323/" },
  },
];

export const newSlugs = new Set(releases.map((r) => r.slug));
