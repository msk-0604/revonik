/**
 * TECHNOLOGY ページの設計観点（公開情報で確認できた製品の実例のみ）
 * 出典は products.ts / technology.ts の sources を参照。
 */
export const designAspects: { id: string; en: string; title: string; lead: string; examples: { slug: string; text: string }[] }[] = [
  {
    id: "structure",
    en: "Body Structure",
    title: "ボディ構造",
    lead: "肉厚と成形方法から、動きのレスポンスを組み立てる。",
    examples: [
      { slug: "dot-six", text: "本体と下部を分けて成形し、大部分の肉厚を約0.6mmに。強度が必要なアイ周りだけを厚くする。" },
      { slug: "saramoa", text: "フラットサイドのボディを、肉厚を削ぎ落とす薄肉設計で。" },
    ],
  },
  {
    id: "weight",
    en: "Weight Placement",
    title: "ウェイト配置",
    lead: "重心の位置と動きで、飛距離・姿勢・浮上を設計する。",
    examples: [
      { slug: "shekiller-78", text: "樹脂タングステン球がボディ前方から後方へ移動し、飛距離とアクションバランスを両立。" },
      { slug: "mogot", text: "内部ウエイトが自由に動き、浮き角度が変化する（type FREE）。" },
      { slug: "pop-up-jig", text: "独自のボディ形状と重心の設定で、急速な浮上を可能に。" },
    ],
  },
  {
    id: "action",
    en: "Action",
    title: "アクション",
    lead: "どの速度で、どの幅で動くか。",
    examples: [
      { slug: "volbeat", text: "リップレスクランクならではのハイピッチ。ワイヤーリップでタイトに。" },
      { slug: "saramoa", text: "ハイピッチでタイトなアクション。" },
      { slug: "shekiller-78", text: "高速リトリーブでも安定したアクション。" },
    ],
  },
  {
    id: "material",
    en: "Material",
    title: "素材",
    lead: "素材の制約を、構造と配合で超える。",
    examples: [
      { slug: "dot-six", text: "バルサのキビキビとした動きを、樹脂（ABS）で再現することを狙った設計。" },
      { slug: "zenda", text: "硬質素材ドライボーン。通常の ABS とは異なる密度と硬さ。" },
    ],
  },
  {
    id: "buoyancy",
    en: "Buoyancy",
    title: "浮力",
    lead: "浮き方と姿勢も、設計のうち。",
    examples: [
      { slug: "dot-six", text: "薄肉構造による高浮力。" },
      { slug: "shindy-110", text: "SF-M・SuperShallow はスローフローティング。" },
    ],
  },
  {
    id: "depth",
    en: "Running Depth",
    title: "潜行深度",
    lead: "狙う水深に合わせて、リップとモデルを選ぶ。",
    examples: [
      { slug: "shindy-110", text: "SuperShallow 約30〜50cm／SF-M 約1.5m。" },
      { slug: "shekiller-78", text: "リトリーブ時 約2.5〜3m。" },
      { slug: "dispa-118", text: "3〜5mレンジ。" },
    ],
  },
  {
    id: "sound",
    en: "Sound",
    title: "サウンド設計",
    lead: "こだわりの一つは「音」。",
    examples: [
      { slug: "zenda", text: "ラトルインの LOUD とノンラトルの SILENT。ドライボーンで硬質な音に。" },
      { slug: "shindy-110", text: "SF-M ドライボーンにガラスラトルを採用。" },
      { slug: "saramoa", text: "低音ラトルを搭載。" },
    ],
  },
];
