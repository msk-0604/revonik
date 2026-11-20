import Image from "next/image";
import type { Anchor } from "@/data/experience";
import type { LureShape } from "@/types";

/**
 * コンセプト画像上に番号付きの注記を重ねる図解。
 * 位置は画像（1600×1200・形状ごとに構図を統一）上のおおよその部位で、実製品の構造図ではない。
 */
const anchors: Record<LureShape, Record<Anchor, [number, number]>> = {
  vibration: { nose: [20, 53], lip: [20, 53], body: [47, 38], back: [40, 21], belly: [49, 62], tail: [81, 38] },
  minnow: { nose: [22, 46], lip: [17, 55], body: [52, 42], back: [52, 36], belly: [44, 59], tail: [88, 38] },
  shad: { nose: [20, 45], lip: [17, 57], body: [45, 38], back: [45, 24], belly: [49, 63], tail: [81, 38] },
  crankbait: { nose: [25, 42], lip: [22, 53], body: [56, 38], back: [56, 19], belly: [51, 63], tail: [88, 40] },
  pencil: { nose: [12, 46], lip: [12, 46], body: [45, 40], back: [45, 32], belly: [43, 53], tail: [83, 37] },
  popper: { nose: [14, 44], lip: [14, 44], body: [55, 40], back: [55, 29], belly: [48, 56], tail: [88, 37] },
  jig: { nose: [13, 54], lip: [13, 54], body: [45, 48], back: [45, 40], belly: [45, 57], tail: [85, 44] },
};

type Props = {
  src: string;
  alt: string;
  shape: LureShape;
  details: { anchor: Anchor; label: string; text: string }[];
  priority?: boolean;
};

export function LureDiagram({ src, alt, shape, details }: Props) {
  return (
    <figure className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
      <div className="relative aspect-[4/3]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 680px, 100vw" className="object-contain" />
        {details.map((d, i) => {
          const [x, y] = anchors[shape][d.anchor];
          return (
            <span
              key={d.label}
              aria-hidden
              className="absolute grid size-7 -translate-1/2 place-items-center rounded-full bg-fg text-[0.75rem] font-semibold text-on-fg ring-4 ring-bg/70 md:size-8"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {i + 1}
            </span>
          );
        })}
      </div>
      <figcaption>
        <ol className="space-y-6">
          {details.map((d, i) => (
            <li key={d.label} className="grid grid-cols-[2rem_1fr] gap-3">
              <span className="grid size-7 place-items-center rounded-full border border-fg/20 text-[0.75rem] font-semibold">{i + 1}</span>
              <span>
                <span className="block text-[1.0625rem] font-semibold tracking-tight">{d.label}</span>
                <span className="mt-1 block font-jp text-[0.875rem] leading-relaxed text-fg/75">{d.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
