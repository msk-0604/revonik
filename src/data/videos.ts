/**
 * REVONIK 公式 YouTube チャンネル（Revonik Fishing / @RevonikFishing）の動画
 *
 * - 2026-11-20 にチャンネルの動画一覧で確認。タイトルは公式の表記のまま。
 * - すべて YouTube の oEmbed で「埋め込み可」を確認済み。YouTube の利用規約に沿って、
 *   公式プレーヤー（youtube-nocookie）で埋め込む。動画・サムネイルは複製せず、YouTube から直接表示する。
 * - products：タイトルで製品名が確認できるものだけを紐づける（内容の推測では紐づけない）。
 */
export type OfficialVideo = {
  id: string;
  title: string;
  /** 関連する製品の slug（タイトルに製品名があるもの） */
  products: string[];
  /** 縦型のショート動画 */
  short?: boolean;
  /** 関連する技術（タイトルに技術名があるもの） */
  technologies?: string[];
};

export const officialChannel = {
  name: "Revonik Fishing",
  handle: "@RevonikFishing",
  url: "https://www.youtube.com/@RevonikFishing",
  checkedAt: "2026-11-20",
} as const;

/** 新しい順（チャンネルの並び順） */
export const officialVideos: OfficialVideo[] = [
  { id: "UgeSqhBNEBU", title: "【2026 A/W】MUREN 118F /加藤誠司 徹底解説", products: ["muren"] },
  { id: "DjC-qzHz_NQ", title: "【2026 NEW】SHINDY110SF-M DRYBONE 解説", products: ["shindy-110"], technologies: ["dry-bone"] },
  { id: "J0teAsa3L3o", title: "【2026】DotSIX Ver1.5 8HF スペシャルカラー解説", products: ["dot-six"] },
  { id: "TguVVt5DBbo", title: "【DISPA118SF】ワイヤーガードセッティング法", products: ["dispa-118"] },
  { id: "IckW2YdUmU8", title: "【Revonik】2026 新製品 開発現場から【Short】", products: [], short: true },
  { id: "VJombF6wmw8", title: "【2026 NEW】SheKiller78SF 製品解説", products: ["shekiller-78"] },
  { id: "1Vn6hePO4Wg", title: "【2026 NEW】Saramoa PORO 解説", products: ["saramoa"] },
  { id: "rWVPdInUYNU", title: "【2026 NEW】Ramzy解説", products: ["ramzy"] },
  { id: "Lz6ZQNogJlM", title: "【2026 NEW】DotSIX Ver1.5 解説", products: ["dot-six"] },
  { id: "SJ-ducb5dUU", title: "【Revonik】2025新製品 ペンシルベイト\"ZENDA\" を加藤誠司が実釣解説", products: ["zenda"] },
  { id: "XgI-OSuamMY", title: "【Revonik】Saramoa / サラモア", products: ["saramoa"] },
  { id: "nzwyTXcXeGc", title: "【Revonik】DotSIX / ドットシックス", products: ["dot-six"] },
  { id: "7e5KAEwYHng", title: "【Revonik】SHINDY110SS / シンディ110SS", products: ["shindy-110"] },
  { id: "hCZ_EZSgyo8", title: "【Revonik】SHINDY110SF-M / シンディ110SF-M", products: ["shindy-110"] },
  { id: "NdrQ-lwjKQg", title: "【Revonik】Volbeat / ヴォルビート", products: ["volbeat"] },
  { id: "pN4Pxn-3Hls", title: "【Revonik】MOGOT/モゴット解説 【加藤誠司】", products: ["mogot"] },
];

export const videosFor = (slug: string) => officialVideos.filter((v) => v.products.includes(slug));
export const videosForTechnology = (id: string) => officialVideos.filter((v) => v.technologies?.includes(id));
export const getVideo = (id: string) => officialVideos.find((v) => v.id === id);

/** タイトルから【…】などの装飾を外した表示用の名前 */
export const videoLabel = (v: OfficialVideo) =>
  v.title
    .replace(/【(Revonik|Short)】/g, "")
    .replace(/^【([^】]+)】/, "$1 ")
    .replace(/\s+/g, " ")
    .trim();
