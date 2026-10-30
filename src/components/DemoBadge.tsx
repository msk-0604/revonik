import { verificationLabel } from "@/lib/format";
import type { VerificationStatus } from "@/types";

const tone: Record<VerificationStatus, string> = {
  official: "border-emerald-300/40 text-emerald-200",
  retailer: "border-amber-200/30 text-amber-100/90",
  unverified: "border-line-strong text-muted",
  draft: "border-sky-200/30 text-sky-100/90",
};

export function VerificationBadge({ status, className = "" }: { status: VerificationStatus; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-jp text-[0.68rem] tracking-wider ${tone[status]} ${className}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {verificationLabel[status]}
    </span>
  );
}

export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center border border-line-strong bg-ink/70 px-2 py-0.5 font-display text-[0.62rem] font-semibold tracking-[0.2em] text-muted backdrop-blur ${className}`}
    >
      SAMPLE
    </span>
  );
}
