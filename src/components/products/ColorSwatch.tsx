import type { ColorPalette } from "@/types";

/** パレットから作る色見本（実物の色味ではなく近似） */
export function ColorSwatch({ palette, className = "" }: { palette: ColorPalette; className?: string }) {
  return (
    <span
      aria-hidden
      className={`block rounded-full ring-1 ring-white/15 ${className}`}
      style={{
        background: `linear-gradient(180deg, ${palette.back} 0%, ${palette.back} 25%, ${palette.body} 50%, ${palette.belly} 85%)`,
        opacity: palette.clear ? 0.8 : 1,
      }}
    />
  );
}
