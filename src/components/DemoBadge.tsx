import { verificationLabel } from "@/lib/format";
import type { VerificationStatus } from "@/types";

/** 情報の確認状況。色は使わず、控えめなグレーのラベルで表示する */
export function VerificationBadge({ status, className = "" }: { status: VerificationStatus; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-bg-alt px-3 py-1 font-jp text-[0.75rem] text-muted ${className}`}>
      {verificationLabel[status]}
    </span>
  );
}

export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-muted ${className}`}>
      SAMPLE
    </span>
  );
}
