/**
 * 計測イベントの設計（GA4 想定）
 *
 * 営業デモでは計測タグを導入しない。正式導入時に GA4（gtag）を読み込むと、
 * data-track 属性を持つ要素のクリックがそのままイベントとして送信される。
 *
 * | イベント名        | 発火タイミング                      | 主なパラメータ               |
 * | ----------------- | ----------------------------------- | ---------------------------- |
 * | view_item         | 商品詳細ページの表示                | item_id                      |
 * | select_item       | 一覧・TOP から商品詳細へ遷移        | item_id, list                |
 * | store_click       | 公式ストアへのリンククリック        | item_id, placement           |
 * | video_click       | 動画（YouTube）へのリンククリック   | video_id, item_id            |
 * | social_click      | Instagram などSNSへの遷移           | network, placement           |
 */
export type TrackEvent = "view_item" | "select_item" | "store_click" | "video_click" | "social_click";

type Gtag = (command: "event", name: string, params?: Record<string, string>) => void;

export function track(event: TrackEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (gtag) gtag("event", event, params);
  else if (process.env.NODE_ENV === "development") console.debug("[track]", event, params);
}

/** data-track="store_click" data-track-item="volbeat" のような属性からパラメータを作る */
export function trackAttrs(event: TrackEvent, params: Record<string, string> = {}) {
  const attrs: Record<string, string> = { "data-track": event };
  for (const [k, v] of Object.entries(params)) attrs[`data-track-${k}`] = v;
  return attrs;
}
