# REVONIK — 公式サイト提案用デモ（非公式）

株式会社Stark Labが、ルアーブランド **REVONIK（レヴォニック）** に公式ブランドサイトの新規制作をご提案するための、営業用デモサイトです。

> **非公式・営業提案用デモ／制作：Stark Lab**
> REVONIK から正式に受注した案件ではありません。REVONIK の写真・ロゴ・文章は使用していません。
> 画像はすべてオリジナルの仮画像（DEMO IMAGE）で、商品情報は販売店・釣りメディアの公開情報をもとにした**未確定の内容**です。

- 全ページの上部とフッターに「非公式・営業提案用デモ／制作：Stark Lab」を表示
- 検索エンジン対策：`<meta name="robots" content="noindex, nofollow">`、`X-Robots-Tag` ヘッダー、`robots.txt`（`Disallow: /`）の3重で設定

## デザイン方針

白い背景にルアーが浮かび上がる、余白とタイポグラフィ中心のミニマルなデザインです（特定企業のロゴ・画像・文章・固有レイアウトは複製していません）。

| トークン | 値 | 用途 |
| --- | --- | --- |
| `bg` | `#FFFFFF` | メイン背景 |
| `bg-alt` | `#F5F5F7` | セカンダリ背景（セクションを白と交互に） |
| `fg` | `#1D1D1F` | メイン文字 |
| `muted` | `#6E6E73` | サブ文字 |
| `line` | `#E5E5E7` | 境界線（必要な箇所のみ） |
| `link` | `#0071E3` | リンク・主要アクションのみ |

- 色・余白・見出しのルールは `src/app/globals.css`（`@theme` と `headline` / `section-y` などのユーティリティ）に集約
- 商品画像は透明背景・統一サイズ（1600×1200）。白・グレーどちらのセクションにも同じ見え方で配置
- アニメーションはフェードインと軽いスライドのみ。`prefers-reduced-motion` で停止

## 技術構成

| 項目 | 内容 |
| --- | --- |
| フレームワーク | Next.js 16（App Router / Turbopack）・React 19 |
| 言語 | TypeScript |
| スタイル | Tailwind CSS v4 |
| アニメーション | Motion（`motion/react`）＋ CSS。`prefers-reduced-motion` に対応 |
| アイコン | Lucide |
| フォント | Inter（英字）・Noto Sans JP（日本語本文）／`next/font` |
| 画像 | `next/image`（AVIF / WebP 自動変換）、仮画像は `sharp` で生成 |

## はじめに

```bash
npm install
npm run dev        # http://localhost:3000
```

| コマンド | 内容 |
| --- | --- |
| `npm run build` | 本番ビルド（全ページを静的生成） |
| `npm run typecheck` | ルート型の生成 + TypeScript 型チェック |
| `npm run lint` | ESLint |
| `npm run images` | 仮画像（DEMO IMAGE）を再生成 |
| `npm run verify` | Playwright による動作検証とスクリーンショット取得（下記） |

## ページ構成

| URL | 内容 |
| --- | --- |
| `/` | TOP（メインビジュアル・FEATURED PRODUCTS・BRAND PHILOSOPHY・MEDIA・NEWS・ストア導線） |
| `/products` | 商品一覧（カテゴリー絞り込み・商品名検索。条件は URL `?category=&q=` に保存） |
| `/products/[slug]` | 商品詳細（画像・カラー切り替え、コンセプト、特徴、モデル別スペック、カラー、動画、関連商品、ストア導線） |
| `/about` | ブランド概要・開発の考え方・ものづくり・ブランドの歩み |
| `/media` | 公式SNS・ストア・外部メディアへのリンク |
| `/news`, `/news/[slug]` | ニュース一覧・記事詳細（現在はすべてサンプル記事） |
| `/contact` | お問い合わせフォーム（**UI のみ・送信機能は無効**。入力値は送信も保存もされない） |

## ディレクトリ構成

```
src/
  app/            ページ（App Router）
  components/     UI コンポーネント（home/ products/ contact/）
  data/           ★ 編集するのはここ
    products.ts     商品データ（一元管理）
    categories.ts   カテゴリー
    news.ts         ニュース記事
    media.ts        メディア導線
    about.ts        ABOUT ページの内容
    images.ts       サイト共通の画像パス
    site.ts         ブランド名・外部URL・デモ表記
  lib/            データ取得・整形ヘルパー
  types/          型定義
public/
  images/         ★ 許諾済みの正式画像を置く場所
  placeholders/   自動生成の仮画像（DEMO IMAGE）
scripts/
  generate-placeholders.mjs   仮画像の生成
  verify.mjs                  Playwright 動作検証
```

## 許諾済み画像への差し替え

コンポーネントを触らずに、データファイルの書き換えだけで差し替えられます。

**商品画像** — `public/images/products/<slug>/` に画像を置き、`src/data/products.ts` の各カラーに `image` を追加します。

```ts
{ id: "sexy-shad", name: "セクシーシャッド", verified: true, palette: { ... },
  image: "/images/products/saramoa/sexy-shad.jpg" },   // ← 追加するだけ
```

`image` が無いカラーは自動で仮画像（`/placeholders/products/<slug>/<color>.webp`）が使われます。ギャラリー用の追加写真は `gallery: [{ src, alt }]` で指定できます。

**サイト共通画像**（メインビジュアル・ブランド・動画サムネイル等） — `src/data/images.ts` のパスを書き換えます。ニュース記事・メディアカードは各データの `image` で個別に指定できます。

**ロゴ** — 仮のテキストロゴは `src/components/Logo.tsx` に集約しています。正式ロゴ（SVG）を `public/images/logo.svg` に置き、このコンポーネントを `<Image>` に置き換えてください。

**動画** — `products.ts` の `youtubeId` に公式動画の ID を入れると、商品詳細にクリック再生型（`youtube-nocookie.com`）の埋め込みが表示されます。

## 商品の追加

`src/data/products.ts` の配列に1件追加するだけで、一覧・検索・カテゴリー件数・詳細ページ（静的生成）・関連商品に自動で反映されます。

- 不明なスペックは `null` → 画面上は「情報未登録」と表示
- `verification`：`official`（公式確認済）／`retailer`（販売店掲載値・公式未照合）／`unverified`／`draft`
- 新しいカテゴリーは `src/data/categories.ts` と `CategoryId` 型に追加

## 動作検証

```bash
npm run build
npx next start -p 3100 &
BASE_URL=http://localhost:3100 npm run verify
```

PC（1440×900）とスマートフォン（390×844）で全12ページを開き、以下を自動確認して `screenshots/` に保存します。320 / 375 / 430 / 768px でも TOP・商品一覧・商品詳細の横スクロールと文字のはみ出しを確認します。

- HTTP 200 / 存在しない商品は 404
- noindex（meta・ヘッダー・robots.txt）と非公式デモ表示
- 横スクロールが発生しないこと、文字が画面からはみ出さないこと、画像の読み込み
- アクセシビリティの基本（`lang`、h1 が1つ、画像の alt、ボタン名）
- 外部リンクが新しいタブ + `noopener` で開くこと
- 商品のカテゴリー絞り込み・検索・0件表示・リセット・詳細への遷移
- 画像の切り替え・カラー選択・スペックのモデル切り替え・「情報未登録」表示
- モバイルメニューの開閉、フォームのバリデーションと「送信しない」こと（POST が発生しない）
- コンソールエラーが無いこと

> 仮画像を同じファイル名で再生成した場合、`next start` の画像キャッシュが残ります。`rm -rf .next/cache/images` を実行してから確認してください。

## Vercel へのデプロイ

1. [Vercel](https://vercel.com/) にログインし **Add New… → Project** からこのリポジトリ（`msk-0604/revonik`）を Import
2. Framework Preset は **Next.js**（自動検出）。Build Command・Output は既定のまま
3. 必要に応じて Environment Variables に `NEXT_PUBLIC_SITE_URL`（例：`https://revonik-demo.vercel.app`）を設定（OGP の絶対URLに使用）
4. **Deploy**
5. 営業デモの共有範囲を限定する場合は、Project Settings → **Deployment Protection**（Vercel Authentication / Password Protection）を有効化

noindex はコード側で設定済みのため、Vercel 側の追加設定は不要です。

## 情報の確認状況（2026年10月時点）

REVONIK 公式オンラインストア（revonik.stores.jp）と公式 Instagram は、制作環境のネットワーク制限により直接閲覧できませんでした。商品情報は**販売店・釣りメディアの公開情報を複数照合**したもので、すべて「販売店掲載値（公式未照合）」として表示しています。

| 商品 | 確認できた主な情報 | 未登録の項目 |
| --- | --- | --- |
| VOLBEAT | 60F：63mm・8g・F・フック#6／60S：12g・S／70S：69mm・17.0g・S／ワイヤーリップ付属／カラー8色 | 潜行深度・推奨ライン、70F の全長・重量 など |
| SHINDY 110 | 110SF-M：110mm・15g・SF・約1.5m／110SS：110mm・14g・SF・約30〜50cm／110SP-M（品名のみ） | 推奨ライン・フック・カラー名 |
| SaraMoa | 58mm・8.5g・F・約1.5m／PORO：50mm・約5.5g／カラー4色 | 推奨ライン・フック |
| Dot SIX | ver1.5 7+：59mm・約9.5g／肉厚約0.6mmの薄肉構造／カラー4色 | タイプ・潜行深度・推奨ライン・フック |
| Ramzy / Shekiller78 | 販売店の取扱一覧で名称のみ確認 | すべて |

**仮データの箇所**：キャッチコピー（The Art of Precision.／精密な設計から生まれる、新たな釣りの可能性。／Built for the water. ほか）、BRAND PHILOSOPHY と ABOUT の「開発に対する考え方」の文章、ニュース記事（全件サンプル）、SHINDY・Ramzy・Shekiller78 のカラー（DEMO COLOR）、全画像、色見本の色味、個別の商品ページURL（現在はストアTOPへ誘導）。

## 正式契約後に必要な作業

1. **素材の受領と差し替え**：正式ロゴ（SVG）、商品写真（カラー別・ギャラリー）、メインビジュアル、ブランド写真、動画の使用許諾
2. **商品情報の確定**：全商品のスペック（全長・重量・タイプ・潜行深度・推奨ライン・フック）、カラーの全ラインナップと正式名称、価格表示の要否、廃番・限定品の扱い
3. **文章の確定**：ブランド紹介・開発理念・年表を REVONIK 監修のもとで作成（仮文章の削除）
4. **ストア連携**：各商品の個別ページURL（`storeUrl`）を設定
5. **SNS・動画**：公式 YouTube の有無確認、Instagram 埋め込みの方針決定
6. **ニュース運用**：サンプル記事の削除、更新方法の決定（データファイル更新／microCMS 等のヘッドレス CMS 連携）
7. **お問い合わせ**：Server Action + メール送信（Resend 等）、スパム対策（Turnstile 等）、自動返信、プライバシーポリシー
8. **公開設定**：独自ドメイン、`NEXT_PUBLIC_SITE_URL`、**デモ表記と noindex の解除**（`src/data/site.ts`・`layout.tsx` の `robots`・`next.config.ts` の `X-Robots-Tag`・`src/app/robots.ts`）、sitemap 追加、アクセス解析
9. **法務表記**：会社情報、特定商取引法に基づく表記（必要に応じて）、プライバシーポリシー
10. **最終確認**：実機での表示確認、Lighthouse、OGP 画像の正式版作成
