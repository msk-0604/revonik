/**
 * 取扱店データ
 *
 * 公式の取扱店一覧は確認できていないため、ここには「販売ページで REVONIK 製品の掲載を確認できた店舗」だけを載せる
 * （2026年11月時点・Stark Lab 調べ）。架空の店舗は作らない。
 * prefecture はページ上で所在地が確認できた場合のみ入力し、それ以外は null。
 * 正式運用時は REVONIK の取扱店リスト（店頭販売店を含む）に置き換える。
 */
export type DealerChannel = "online" | "store";

export interface Dealer {
  id: string;
  name: string;
  channel: DealerChannel[];
  prefecture: string | null;
  url: string;
  /** 取扱を確認したページ */
  evidenceUrl: string;
}

export const dealers: Dealer[] = [
  { id: "popeye", name: "カニエのポパイ", channel: ["online"], prefecture: null, url: "https://www.popeyeweb.jp/", evidenceUrl: "https://www.popeyeweb.jp/SHOP/vb60.html" },
  { id: "bfarm", name: "B-FARM", channel: ["online"], prefecture: null, url: "https://bfarm.buyshop.jp/", evidenceUrl: "https://bfarm.buyshop.jp/categories/5823202" },
  { id: "fishing-jump", name: "フィッシングジャンプ", channel: ["online"], prefecture: null, url: "https://www.fishing-jump.com/", evidenceUrl: "https://www.fishing-jump.com/?pid=189296283" },
  { id: "knoxville", name: "Knoxville", channel: ["online"], prefecture: null, url: "https://knoxville2018.shop-pro.jp/", evidenceUrl: "https://knoxville2018.shop-pro.jp/?pid=185953833" },
  { id: "lure-shop-bb", name: "ルアーショップB.B", channel: ["online"], prefecture: null, url: "https://store.shopping.yahoo.co.jp/lure-shop-bb/", evidenceUrl: "https://store.shopping.yahoo.co.jp/lure-shop-bb/revonik.html" },
  { id: "otsuka", name: "つり具の大塚", channel: ["online"], prefecture: null, url: "https://www.fishing-otsuka.co.jp/", evidenceUrl: "https://www.fishing-otsuka.co.jp/basscojp/en/?m=m&mc=0625" },
  { id: "ace", name: "釣具のエース", channel: ["online"], prefecture: null, url: "http://www.ace-f.net/", evidenceUrl: "http://www.ace-f.net/sys/goods/view/1389" },
  { id: "kumagai", name: "くまがい釣具", channel: ["online"], prefecture: null, url: "https://f-kumagai.shop-pro.jp/", evidenceUrl: "https://f-kumagai.shop-pro.jp/?pid=191615982" },
  { id: "backlash", name: "BackLash", channel: ["online"], prefecture: null, url: "https://www.backlash.co.jp/", evidenceUrl: "https://www.backlash.co.jp/sp/item/4582737950019/" },
  { id: "kitiya", name: "吉や", channel: ["online", "store"], prefecture: null, url: "https://www.kitiya.jp/", evidenceUrl: "https://www.kitiya.jp/apps/note/archives/20458" },
  { id: "hama", name: "lure angle HAMA", channel: ["online"], prefecture: null, url: "https://hama.shop-pro.jp/", evidenceUrl: "https://hama.shop-pro.jp/?pid=179519764" },
  { id: "tsurisuke", name: "釣り助", channel: ["online"], prefecture: "神奈川県", url: "https://www.tsurisuke.com/", evidenceUrl: "https://www.tsurisuke.com/product/45150" },
];

export const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
];
