# 計測設計（GA4 想定）

営業デモでは計測タグを導入していません。正式導入時に GA4（gtag.js）を読み込むだけで、以下のイベントが送信される設計です。

## 仕組み

- 計測したいリンクに `data-track="<イベント名>"` と `data-track-<パラメータ>="<値>"` を付与済み。
- `src/components/AnalyticsListener.tsx` がクリックを拾い、`src/lib/analytics.ts` の `track()` が `window.gtag("event", ...)` を呼ぶ（gtag が無ければ何もしない。開発時のみコンソールに出力）。

## イベント

| イベント | 発火 | 主なパラメータ | 付与箇所 |
| --- | --- | --- | --- |
| `select_item` | 一覧・TOP・動画・ニュースから商品詳細へ | `item`, `list` | ProductCard、TOP の製品セクション／比較リスト、On the Water、ニュース |
| `store_click` | 公式ストアへのクリック | `item`, `placement` | ヘッダー、モバイルメニュー、TOP（製品・Shop）、商品詳細（上・下・固定バー）、フッター |
| `video_click` | YouTube へのクリック | `video`, `item` | On the Water、MEDIA、商品詳細、フッター |
| `social_click` | Instagram などへのクリック | `network`, `placement` | TOP の Shop、MEDIA、フッター |
| `view_item` | 商品詳細の表示 | `item_id` | 正式導入時に商品詳細ページで送信（GA4 の推奨イベント） |

## KPI

| KPI | 算出方法 |
| --- | --- |
| 商品詳細ページ閲覧数 | `page_view`（/products/*）または `view_item` |
| 商品一覧から詳細への遷移率 | `select_item`（list=products など） ÷ /products の `page_view` |
| ストアへのクリック率 | `store_click` ÷ 商品詳細の `page_view`（`placement` 別に比較） |
| 動画クリック率 | `video_click` ÷ TOP・MEDIA の `page_view` |
| SNS への遷移数 | `social_click`（`network` 別） |

## 正式導入時の作業

1. GA4 プロパティの作成と測定 ID の発行（REVONIK のアカウント）
2. `next/script` で gtag.js を読み込み（Cookie 同意の要否を確認）
3. GA4 でカスタムディメンション（`item`, `placement`, `list`, `video`, `network`）を登録
4. Looker Studio などでダッシュボード化
