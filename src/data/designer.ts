import type { SourceLink } from "@/types";

/**
 * ルアーデザイナー・加藤誠司氏に関する掲載データ
 *
 * - すべて釣りメディアの公開記事にもとづく。本人の発言として扱うのは、記事見出しで本人の言葉として紹介された一文のみ。
 * - 開発思想の各項目は、記事で紹介された内容を Stark Lab が要約したもの（本人の言葉ではない）。
 * - 正式公開時は、ご本人への取材・監修のうえで文章を差し替える前提。
 */

const luremagaDotSix: SourceLink = {
  label: "ルアマガプラス（2024年10月9日）",
  url: "https://plus.luremaga.jp/2024/10/09/381965/",
};

export const designer = {
  name: "加藤誠司",
  nameEn: "Seiji Kato",
  role: "ルアーデザイナー／REVONIK",
  /** 記事見出しで本人の言葉として紹介された一文 */
  quote: {
    text: "自分だけが釣れるルアーを作らない。",
    source: luremagaDotSix,
  },
  career: {
    text: "ダイワ精工（現グローブライド）、ラッキークラフト、ジャッカルでルアー開発に携わり、TDバイブレーションやベビーシャッドなど数多くのルアーを手がけてきたと紹介されています。2023年に株式会社レヴォニックを立ち上げました。",
    sources: [
      { label: "ルアマガプラス", url: "https://plus.luremaga.jp/2024/10/09/381965/" },
      { label: "Yahoo!ニュース（ルアマガプラス）", url: "https://news.yahoo.co.jp/articles/3c388605392d04907b0fdae88c59bdf01105083d" },
    ] as SourceLink[],
  },
};

/** 開発思想（公開記事の内容を要約） */
export const principles: { no: string; en: string; title: string; text: string; example: string; source: SourceLink }[] = [
  {
    no: "01",
    en: "For every angler",
    title: "誰もが釣れるルアーを。",
    text: "使い手を選ばず、誰が投げても釣れること。インタビューでは、それが自身の作るルアーのいちばんの特徴だと語られています。",
    example: "記事見出し「自分だけが釣れるルアーを作らない」",
    source: luremagaDotSix,
  },
  {
    no: "02",
    en: "Challenge the unmade",
    title: "まだないものに挑む。",
    text: "新しいものを生み出すには、まだ世の中にないものに挑戦するしかない、という考え方が紹介されています。Dot SIX の開発もその延長にあります。",
    example: "Dot SIX：ボディの肉厚を約0.6mmまで薄くした樹脂製クランク",
    source: luremagaDotSix,
  },
  {
    no: "03",
    en: "Beyond the material",
    title: "素材の限界を、構造で超える。",
    text: "バルサ製クランクのキビキビとした動きを、樹脂（ABS）で再現する。素材の制約を、肉厚や構造の工夫で乗り越えるアプローチがとられています。",
    example: "SaraMoa：バルサのフラットサイドを樹脂化し、ラトル入りの構造に",
    source: { label: "Yahoo!ニュース（ルアマガプラス）", url: "https://news.yahoo.co.jp/articles/3c388605392d04907b0fdae88c59bdf01105083d" },
  },
  {
    no: "04",
    en: "The power of sound",
    title: "音まで、設計する。",
    text: "こだわりの一つとして「音」が挙げられ、独自の硬質素材「ドライボーン」を採用したモデルが展開されています。",
    example: "SHINDY 110SF-M ドライボーン：ガラスラトルを採用",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/450340" },
  },
  {
    no: "05",
    en: "Made for Japanese waters",
    title: "日本のフィールドに合わせる。",
    text: "日本の主要なベイトフィッシュにマッチするサイズとシルエット。フィールドから逆算した設計が紹介されています。",
    example: "Shekiller78：日本のベイトフィッシュに合わせた「巻きで使うクランキングミノー」",
    source: { label: "ルアーニュースR", url: "https://www.lurenewsr.com/414368/" },
  },
];
