import type { SourceLink } from "@/types";

/**
 * 新製品の年表（釣りメディア・販売店・公式 SNS の公開情報にもとづく）
 * kind：released＝発売（販売店の入荷・発売を確認）／announced＝発表・受注開始／planned＝発売予定（報道ベース）
 * 日付は確認できた粒度（YYYY / YYYY-MM）で記録する。
 */
export type ReleaseKind = "released" | "announced" | "planned";

export const releases: { slug: string; name: string; date: string; kind: ReleaseKind; text: string; source: SourceLink }[] = [
  {
    slug: "muren",
    name: "MUREN 118",
    date: "2026-10",
    kind: "planned",
    text: "3つのルアーが連なるチェーンベイト。10月下旬の発売予定と報道。",
    source: { label: "釣りまとめアンテナ", url: "https://fishing.nanj-antenna.net/1001643/" },
  },
  {
    slug: "dispa-118",
    name: "Dispa 118SF",
    date: "2026-09",
    kind: "released",
    text: "3〜5mレンジを攻略する食わせ系ジャークベイト。",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/448387" },
  },
  {
    slug: "shindy-110",
    name: "SHINDY 110SF-M DryBone",
    date: "2026-09",
    kind: "released",
    text: "硬質素材「ドライボーン」とガラスラトルを採用。",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/448811" },
  },
  {
    slug: "zenda",
    name: "ZENDA 85 LOUD",
    date: "2026-06",
    kind: "announced",
    text: "ZENDA のダウンサイジングモデル。デビューセットの予約受付を開始。",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/435317" },
  },
  {
    slug: "shekiller-78",
    name: "Shekiller78",
    date: "2026-01",
    kind: "released",
    text: "日本のベイトフィッシュに合わせたクランキングミノー。",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/414368/" },
  },
  {
    slug: "ramzy",
    name: "Ramzy",
    date: "2026",
    kind: "released",
    text: "障害物の回避性能を高めたシャロークランク。",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/414411/" },
  },
  {
    slug: "zenda",
    name: "ZENDA 100",
    date: "2025-08",
    kind: "released",
    text: "LOUD と SILENT を展開するペンシルベイト。",
    source: { label: "吉や", url: "https://www.kitiya.jp/apps/note/archives/20458" },
  },
  {
    slug: "saramoa",
    name: "SaraMoa",
    date: "2025-02",
    kind: "released",
    text: "薄肉設計のフラットサイドシャッド。SHINDY 94SF-S も同時期に登場。",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/354587/" },
  },
  {
    slug: "pop-up-jig",
    name: "POP UP JIG",
    date: "2024-03",
    kind: "released",
    text: "ソルトルアー第一弾。表層の回遊魚を狙うキャスティングジグ。",
    source: { label: "フィッシングサンイン", url: "https://item.rakuten.co.jp/fishingsanin/popupjig/" },
  },
];

export const releaseKindLabel: Record<ReleaseKind, string> = {
  released: "発売",
  announced: "発表",
  planned: "発売予定",
};

/** NEW バッジ：2026年に発売・発表された製品 */
export const newSlugs = new Set(releases.filter((r) => r.date.startsWith("2026")).map((r) => r.slug));
