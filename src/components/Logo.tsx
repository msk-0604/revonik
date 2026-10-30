import Link from "next/link";

/** 仮のテキストロゴ。正式ロゴ受領後は SVG に差し替える（README 参照） */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="REVONIK ホーム" className={`inline-flex items-center ${className}`}>
      <span className="text-[1.0625rem] font-semibold tracking-[0.24em]">REVONIK</span>
    </Link>
  );
}
