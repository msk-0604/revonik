export const site = {
  name: "REVONIK",
  nameKana: "レヴォニック",
  /** 本番ドメイン確定後に NEXT_PUBLIC_SITE_URL で上書き */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "ルアーブランド REVONIK（レヴォニック）の公式サイトリニューアル提案用デモ。制作：Stark Lab（非公式）。",
  links: {
    store: "https://revonik.stores.jp/",
    instagram: "https://www.instagram.com/revonik.fishing/",
    instagramHandle: "@revonik.fishing",
    youtube: "https://www.youtube.com/@RevonikFishing",
    /** 加藤誠司氏のチャンネル（公式Xで SaraMoa 実釣テストの公開先として案内）。URL未確認のため検索結果へ */
    youtubeLab: "https://www.youtube.com/results?search_query=%E5%8A%A0%E8%97%A4%E8%AA%A0%E5%8F%B8+%E6%93%AC%E4%BC%BC%E9%A4%8C%E7%A0%94%E7%A9%B6%E6%89%80",
    youtubeSearch: "https://www.youtube.com/@RevonikFishing",
  },
  producer: {
    name: "Stark Lab",
    company: "株式会社Stark Lab",
    url: "https://starklab.jp/",
  },
  demoNotice: "非公式・営業提案用デモ／制作：Stark Lab",
  demoNoticeLong:
    "本サイトは、株式会社Stark Lab が REVONIK への公式サイト制作をご提案するために作成した非公式のデモです。REVONIK の公式サイトではありません。",
  /** フッターに表示する、デモの取り扱いに関する3点 */
  demoPoints: [
    "掲載の製品画像・シーン画像は、Stark Lab が制作したオリジナルのコンセプトビジュアルです（実際の製品写真ではありません）。",
    "キャッチコピーは提案用の文案です。REVONIK の公式コピーではありません。",
    "製品情報は公開情報をもとにした確認中の内容です。正式公開時に REVONIK にて確認いただきます。",
  ],
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/media", label: "Media" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;
