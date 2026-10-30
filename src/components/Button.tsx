import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  external?: boolean;
  className?: string;
};

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden px-7 font-display text-[0.78rem] font-semibold tracking-[0.24em] uppercase transition-[color,background-color,border-color] duration-500 ease-out-expo";

const variants = {
  solid: "bg-fg text-ink hover:bg-accent",
  outline: "border border-line-strong text-fg hover:border-fg hover:bg-fg hover:text-ink",
  ghost: "px-0 text-fg hover:text-accent",
};

export function Button({ href, children, variant = "solid", external, className = "" }: Props) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      <Icon
        aria-hidden
        className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-px"
      />
      {external && <span className="sr-only">（外部サイト・新しいタブで開きます）</span>}
    </>
  );
  const cls = `${base} ${variants[variant]} ${className}`;
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
