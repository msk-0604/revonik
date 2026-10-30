import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

const internal = [
  { href: "/products", label: "PRODUCTS" },
  { href: "/about", label: "ABOUT" },
  { href: "/media", label: "MEDIA" },
  { href: "/news", label: "NEWS" },
  { href: "/contact", label: "CONTACT" },
];

const external = [
  { href: site.links.instagram, label: "INSTAGRAM" },
  { href: site.links.store, label: "ONLINE STORE" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-x py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="display text-[clamp(3.2rem,12vw,9rem)] tracking-[0.06em] text-fg/95">REVONIK</p>
            <p className="eyebrow mt-4">Precision × Innovation × Performance</p>
          </div>
          <nav aria-label="フッターナビゲーション" className="grid grid-cols-2 gap-x-6 gap-y-1 self-end">
            <ul>
              {internal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block py-2 font-display text-sm font-semibold tracking-[0.2em] text-fg/75 transition-colors hover:text-fg"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul>
              {external.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-2 font-display text-sm font-semibold tracking-[0.2em] text-fg/75 transition-colors hover:text-fg"
                  >
                    {l.label}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                    <span className="sr-only">（外部サイト）</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 border border-line bg-panel/60 p-5 md:p-7">
          <p className="eyebrow !text-[0.66rem]">Unofficial proposal demo</p>
          <p className="mt-3 font-jp text-[0.8rem] leading-[1.9] text-muted">{site.demoNoticeLong}</p>
          <p className="mt-3 font-jp text-[0.8rem] text-muted">
            制作：
            <a
              href={site.producer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line-strong underline-offset-4 hover:text-fg"
            >
              {site.producer.company}
            </a>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-[0.72rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-jp">{site.demoNotice}</p>
          <p className="font-display tracking-[0.18em]">DEMO © {new Date().getFullYear()} STARK LAB</p>
        </div>
      </div>
    </footer>
  );
}
