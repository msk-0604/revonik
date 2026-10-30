import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  /** primary：青の主要アクション／secondary：控えめな枠線／link：青のテキストリンク */
  variant?: "primary" | "secondary" | "link";
  external?: boolean;
  className?: string;
};

const variants = {
  primary:
    "min-h-11 rounded-full bg-link px-6 text-[0.9375rem] text-white hover:bg-link-hover",
  secondary:
    "min-h-11 rounded-full border border-fg/15 px-6 text-[0.9375rem] text-fg hover:border-fg/40",
  link: "min-h-11 text-[1.0625rem] text-link hover:underline underline-offset-4",
};

export function Button({ href, children, variant = "primary", external, className = "" }: Props) {
  const cls = `group inline-flex items-center justify-center gap-1 font-normal transition-colors duration-300 ${variants[variant]} ${className}`;
  const icon =
    variant === "link" ? (
      external ? (
        <ArrowUpRight aria-hidden className="size-4" />
      ) : (
        <ChevronRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )
    ) : external ? (
      <ArrowUpRight aria-hidden className="size-4" />
    ) : null;
  const content = (
    <>
      <span>{children}</span>
      {icon}
      {external && <span className="sr-only">（外部サイト・新しいタブで開きます）</span>}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
