import Link from "next/link";

/** 仮のテキストロゴ。正式ロゴ受領後は SVG に差し替える（README 参照） */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="REVONIK ホーム" className={`group inline-flex items-center gap-2 ${className}`}>
      <span className="display text-[1.35rem] tracking-[0.2em] md:text-[1.5rem]">REVONIK</span>
    </Link>
  );
}
