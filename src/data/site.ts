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
    /** 公式チャンネル未確認のため検索結果へのリンク */
    youtubeSearch: "https://www.youtube.com/results?search_query=REVONIK+%E3%83%AC%E3%83%B4%E3%82%A9%E3%83%8B%E3%83%83%E3%82%AF",
  },
  producer: {
    name: "Stark Lab",
    company: "株式会社Stark Lab",
    url: "https://starklab.jp/",
  },
  demoNotice: "非公式・営業提案用デモ／制作：Stark Lab",
  demoNoticeLong:
    "本サイトは株式会社Stark LabがREVONIKへの公式サイト制作をご提案するために作成した非公式のデモです。REVONIKの公式サイトではありません。掲載の画像はすべてオリジナルの仮画像で、商品情報は販売店・釣りメディアの公開情報をもとにした未確定の内容を含みます。",
} as const;

export const navItems = [
  { href: "/", label: "HOME" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/about", label: "ABOUT" },
  { href: "/media", label: "MEDIA" },
  { href: "/news", label: "NEWS" },
  { href: "/contact", label: "CONTACT" },
] as const;
