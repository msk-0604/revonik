/**
 * 製品の訴求データ（TOP の製品紹介・商品詳細で使用）
 *
 * - fishing / action / situation / versus / why / details の本文は、釣りメディア・販売店の公開情報で
 *   確認できた内容のみを要約したもの（出典は products.ts の sources）。
 * - tagline は営業提案用のコピー（事実の主張を含めない）。正式導入時に REVONIK と協議して確定する。
 * - details の anchor はコンセプト画像上の位置を示すだけで、実製品の構造図ではない。
 */

export type Scene = "surface" | "shallow" | "mid" | "deep" | "cover";

export const sceneLabels: Record<Scene, { label: string; en: string; text: string }> = {
  surface: { label: "トップ・表層", en: "Surface", text: "水面〜表層" },
  shallow: { label: "シャロー", en: "Shallow", text: "水面直下〜1m前後" },
  mid: { label: "ミドルレンジ", en: "Mid range", text: "1〜3m前後" },
  deep: { label: "ディープ", en: "Deep", text: "3m以深" },
  cover: { label: "障害物まわり", en: "Cover", text: "岩・立木などのストラクチャー" },
};

export type Anchor = "lip" | "body" | "back" | "belly" | "tail" | "nose";

export interface Experience {
  /** 営業提案用のコピー */
  tagline: string;
  /** 一覧・比較用の主要な特徴（確認済み） */
  keyFeature: string;
  scenes: Scene[];
  fishing: string;
  action: string;
  situation: string;
  versus: string;
  why: { title: string; text: string }[];
  details: { anchor: Anchor; label: string; text: string }[];
}

export const experience: Record<string, Experience> = {
  volbeat: {
    tagline: "シャローに、ハイピッチを。",
    keyFeature: "ワイヤーリップ付きバイブレーション",
    scenes: ["shallow"],
    fishing: "シャローを巻いて探るバイブレーションの釣り。",
    action: "リップレスクランクならではのハイピッチなアクション。",
    situation: "水深の浅いエリアを、ハイピッチな動きで巻いて探りたいとき。",
    versus: "フローティング（F）が基本。より沈めたいときはシンキング（S）、さらに浅く・タイトにしたいときは付属のワイヤーリップを装着。",
    why: [
      { title: "シャローで使えるバイブ", text: "フローティングを基本とし、浅いレンジでストレスなく使える設計。" },
      { title: "ワイヤーリップで調整", text: "装着するとアクションがタイトになり、潜行レンジを浅くできる。" },
      { title: "2サイズ・F/S", text: "60・70の2サイズ、フローティングとシンキングを展開。" },
    ],
    details: [
      { anchor: "nose", label: "ワイヤーリップ", text: "付属。装着でタイトなアクション、浅いレンジに。" },
      { anchor: "body", label: "リップレスボディ", text: "ハイピッチなバイブレーションを生むボディ。" },
      { anchor: "back", label: "ラインアイ", text: "背中側にラインアイを持つバイブレーション形状。" },
    ],
  },
  "shindy-110": {
    tagline: "狙ったレンジで、切れ味を。",
    keyFeature: "レンジ違いを選べる110mmジャークベイト",
    scenes: ["shallow", "mid"],
    fishing: "ジャーキングとリトリーブで誘うジャークベイトの釣り。",
    action: "肉薄ボディによるキレのあるアクション。",
    situation: "超シャローから約1.5mまで、狙うレンジに合わせてモデルを選びたいとき。",
    versus: "超シャローは SuperShallow（約30〜50cm）、約1.5mまでは SF-M。より深い3〜5mは Dispa 118SF。",
    why: [
      { title: "レンジで選べる", text: "SuperShallow・SF-M などリップ違いのモデルを展開。" },
      { title: "潜りすぎない", text: "SuperShallow は一定速度のリトリーブやジャーキングでもレンジをキープ。" },
      { title: "ドライボーン", text: "硬質素材とガラスラトルを採用した SF-M ドライボーンも登場。" },
    ],
    details: [
      { anchor: "lip", label: "リップ", text: "モデルごとに形状が異なり、潜行レンジが変わる。" },
      { anchor: "body", label: "110mm スリムボディ", text: "ジャーキングに対応する細身のシルエット。" },
      { anchor: "belly", label: "スローフローティング", text: "SF-M・SuperShallow はスローフローティング。" },
    ],
  },
  saramoa: {
    tagline: "強すぎず、弱すぎず。",
    keyFeature: "薄肉ボディのフラットサイドシャッド",
    scenes: ["mid"],
    fishing: "巻いて使うフラットサイドシャッドの釣り。",
    action: "薄肉設計によるハイピッチでタイトなアクションと、低音ラトル。",
    situation: "フラットサイドクランクほど強くない、ちょうどいいアピールで約1.5mのレンジを引きたいとき。",
    versus: "より小さく見せたいときは SaraMoa PORO（50mm）。障害物の多い場所では Ramzy。",
    why: [
      { title: "ちょうどいいアピール", text: "フラットサイドクランクとシャッドの中間を狙ったコンセプト。" },
      { title: "薄肉設計", text: "肉厚を削ぎ落とし、アクションのレスポンスを高めている。" },
      { title: "低音ラトル", text: "バルサにはないラトル入りの構造。" },
    ],
    details: [
      { anchor: "lip", label: "リップ", text: "潜行深度は約1.5m。" },
      { anchor: "body", label: "フラットサイド", text: "平たい側面のフラットサイドボディ。" },
      { anchor: "belly", label: "低音ラトル", text: "ラトル入りの構造。" },
    ],
  },
  "dot-six": {
    tagline: "0.6mm が、動きを変える。",
    keyFeature: "肉厚約0.6mmのシャロークランク",
    scenes: ["shallow"],
    fishing: "シャローを巻いて探るクランクベイトの釣り。",
    action: "バルサのようなキビキビとしたアクションを、樹脂（ABS）で再現することを狙った設計。",
    situation: "高浮力とキレのある動きで、浅いレンジを巻きたいとき。",
    versus: "障害物の多い場所での回避性能を重視するなら Ramzy。",
    why: [
      { title: "約0.6mm の薄肉", text: "大部分の肉厚を約0.6mmに抑えた構造。名前の由来にも。" },
      { title: "バルサのような動き", text: "樹脂製でバルサのキビキビとした動きを目指した。" },
      { title: "分割成形", text: "本体と下部を分けて成形し、アイ周りだけを厚くしている。" },
    ],
    details: [
      { anchor: "body", label: "肉厚 約0.6mm", text: "ボディの大部分を極限まで薄くした構造。" },
      { anchor: "belly", label: "分割成形", text: "本体と下部を分けて成形。" },
      { anchor: "lip", label: "アイ周りの補強", text: "強度が必要な部分だけを厚くしている。" },
    ],
  },
  ramzy: {
    tagline: "障害物を、すり抜ける。",
    keyFeature: "障害物回避型のシャロークランク",
    scenes: ["shallow", "cover"],
    fishing: "障害物まわりを巻いて探るシャロークランクの釣り。",
    action: "障害物に当たっても弾かれすぎず、吸いつくようにかわしていく。",
    situation: "岩や立木などのストラクチャーの近くを、タイトに通したいとき。",
    versus: "オープンエリアでの薄肉のキレを重視するなら Dot SIX、ちょうどいいアピールなら SaraMoa。",
    why: [
      { title: "回避性能", text: "SaraMoa をベースに、障害物の回避性能を高めた設計。" },
      { title: "薄肉 0.75mm", text: "肉厚0.75mmのボディ。" },
      { title: "ドライボーンモデル", text: "硬質素材のドライボーンモデルも展開。" },
    ],
    details: [
      { anchor: "lip", label: "回避性能", text: "障害物に当たっても弾かれすぎずにかわす。" },
      { anchor: "body", label: "肉厚 0.75mm", text: "薄肉のボディ。" },
      { anchor: "tail", label: "58mm / 約9.3g", text: "SaraMoa ベースのサイズ感。" },
    ],
  },
  "shekiller-78": {
    tagline: "巻くだけで、届く。",
    keyFeature: "巻きで使うクランキングミノー",
    scenes: ["mid"],
    fishing: "ただ巻きを基本にした、クランキングミノーの釣り。",
    action: "高速リトリーブでも安定したアクション。",
    situation: "日本のベイトフィッシュに合うサイズで、約2.5〜3mのレンジを巻いて探りたいとき。",
    versus: "ジャーキングで食わせるなら SHINDY・Dispa、より浅いレンジなら SaraMoa。",
    why: [
      { title: "ベイトサイズ", text: "日本の主要なベイトフィッシュに合わせた78mm。" },
      { title: "飛距離とバランス", text: "樹脂タングステン球の重心移動で、飛距離とアクションを両立。" },
      { title: "エアベント＆フローホール", text: "空気抵抗を抑え、水流をコントロールするシステム。" },
    ],
    details: [
      { anchor: "back", label: "AIR VENT & FLOW HOLE", text: "空気抵抗を抑え、水流をコントロール。" },
      { anchor: "body", label: "重心移動", text: "樹脂タングステン球がボディ前方から後方へ移動。" },
      { anchor: "lip", label: "約2.5〜3m", text: "リトリーブ時の潜行深度。" },
    ],
  },
  "dispa-118": {
    tagline: "深いレンジで、食わせる。",
    keyFeature: "3〜5mを攻める食わせ系ジャークベイト",
    scenes: ["deep"],
    fishing: "深いレンジを探るジャークベイトの釣り。",
    action: "食わせを重視したジャークベイト。",
    situation: "3〜5mのレンジを自在に攻めたいとき。",
    versus: "より浅いレンジは SHINDY 110（SF-M 約1.5m／SuperShallow 約30〜50cm）。",
    why: [
      { title: "3〜5mレンジ", text: "深いレンジを自在に攻められる設計。" },
      { title: "約2年の開発", text: "足かけ2年の開発期間を経て完成。" },
      { title: "2026年秋の新作", text: "2026年9月にリリース。" },
    ],
    details: [
      { anchor: "lip", label: "3〜5mレンジ", text: "深いレンジに対応。" },
      { anchor: "body", label: "食わせ系", text: "食わせを重視したジャークベイト。" },
    ],
  },
  zenda: {
    tagline: "水面に、音を描く。",
    keyFeature: "LOUD／SILENT を選べるペンシルベイト",
    scenes: ["surface"],
    fishing: "水面を引いて誘う、トップウォーターのペンシルベイトの釣り。",
    action: "水面でのペンシルベイトのアクション。ラトルの有無で音を選べる。",
    situation: "水面で魚を誘い出したいとき。ラトル音で寄せたいなら LOUD、静かに誘いたいなら SILENT。",
    versus: "より小さく見せたいときは 85。ポッパーで誘うなら MOGOT。",
    why: [
      { title: "LOUD と SILENT", text: "ラトルインの LOUD と、ノンラトルの SILENT を展開。" },
      { title: "ドライボーンの音", text: "硬質素材ドライボーンによる、硬質で抜けのよいサウンド。" },
      { title: "100 と 85", text: "100 に続き、ダウンサイジングした 85 が登場。" },
    ],
    details: [
      { anchor: "body", label: "LOUD／SILENT", text: "ラトルインとノンラトルを選べる。" },
      { anchor: "belly", label: "ドライボーン", text: "硬質素材による抜けのよいサウンド（LOUD DryBone）。" },
      { anchor: "nose", label: "100mm／85mm", text: "2サイズを展開。" },
    ],
  },
  mogot: {
    tagline: "浮き角度まで、操る。",
    keyFeature: "浮き角度が変わるトップウォーターポッパー",
    scenes: ["surface"],
    fishing: "水面でアクションさせて誘う、ポッパーの釣り。",
    action: "内部ウエイトが自由に動き、浮き角度が変化するマニュアル仕様。",
    situation: "水面で、ポップ音やスプラッシュで魚を誘いたいとき。",
    versus: "水面を引いて誘うならペンシルベイトの ZENDA。",
    why: [
      { title: "type FREE", text: "内部ウエイトが自由に動き、浮き角度が変化する。" },
      { title: "薄肉コンセプト", text: "Dot SIX から受け継いだ薄肉コンセプトで設計。" },
      { title: "ドライボーン", text: "硬質素材のドライボーンモデルも展開。" },
    ],
    details: [
      { anchor: "nose", label: "ポッパーのカップ", text: "水面で音とスプラッシュを生むカップ形状。" },
      { anchor: "body", label: "type FREE", text: "内部ウエイトが自由に動き、浮き角度が変わる。" },
      { anchor: "belly", label: "68mm / 7.5g", text: "フローティング。" },
    ],
  },
  muren: {
    tagline: "群れで、誘う。",
    keyFeature: "3つのルアーが連なるチェーンベイト",
    scenes: ["shallow"],
    fishing: "群れを演出して巻いて誘う、チェーンベイトの釣り。",
    action: "異なる3つのルアーが、ひとつの集団としてルアーを形成する。",
    situation: "ベイトの群れを演出したいとき。潜行深度は約1.0m。",
    versus: "単体のシルエットで巻くなら Shekiller78 や SaraMoa。",
    why: [
      { title: "群れを演出", text: "3つのルアーが連なり、ひとつの群れを形成。" },
      { title: "ハードルアーで", text: "「ハードルアー版のアラバマリグ」として紹介。" },
      { title: "約1.0m", text: "118mm・18.7g のフローティング。" },
    ],
    details: [
      { anchor: "body", label: "チェーン構造", text: "3つのルアーがひとつの集団を形成。" },
      { anchor: "lip", label: "潜行深度 約1.0m", text: "フローティング。" },
    ],
  },
  "pop-up-jig": {
    tagline: "沈めて、跳ね上げる。",
    keyFeature: "急速浮上する青物用キャスティングジグ",
    scenes: ["surface"],
    fishing: "表層付近を回遊する青物を狙う、ソルトのキャスティングの釣り。",
    action: "独自のボディ形状と重心の設定による、急速な浮上。",
    situation: "表層付近に回遊する青物を、キャスティングで狙いたいとき。",
    versus: "重さで選ぶ：30g と 40g。",
    why: [
      { title: "急速浮上", text: "独自のボディ形状と重心設定で、素早く浮き上がる。" },
      { title: "表層の回遊魚に", text: "表層付近の回遊魚をターゲットに開発。" },
      { title: "ソルト第一弾", text: "REVONIK のソルトルアー第一弾として紹介。" },
    ],
    details: [
      { anchor: "body", label: "独自のボディ形状", text: "浮上を生むボディ形状。" },
      { anchor: "belly", label: "重心設定", text: "急速浮上のための重心の設定。" },
      { anchor: "nose", label: "30g / 40g", text: "フック #1/0。" },
    ],
  },
};
