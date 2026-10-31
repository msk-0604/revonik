import Link from "next/link";
import { site } from "@/data/site";

const internal = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/media", label: "Media" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

const external = [{ href: site.links.instagram, label: "Instagram" }];

export function Footer() {
  return (
    <footer className="bg-bg-alt text-[0.75rem] text-muted">
      <div className="container-x py-10 md:py-14">
        <div className="border-b border-line pb-6 font-jp leading-[1.8]">
          <p>{site.demoNoticeLong}</p>
          <p className="mt-2">
            制作：
            <a href={site.producer.url} target="_blank" rel="noopener noreferrer" className="text-fg/80 hover:underline">
              {site.producer.company}
            </a>
          </p>
        </div>

        <div className="grid gap-8 py-8 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-[0.875rem] font-semibold tracking-[0.24em] text-fg">REVONIK</p>
            <p className="mt-2">Precision × Innovation × Performance</p>
          </div>
          <nav aria-label="サイト内リンク">
            <p className="font-semibold text-fg">Explore</p>
            <ul className="mt-3 space-y-0.5">
              {internal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1.5 hover:text-fg hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="外部リンク">
            <p className="font-semibold text-fg">Follow</p>
            <ul className="mt-3 space-y-0.5">
              {external.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 hover:text-fg hover:underline">
                    {l.label} ↗<span className="sr-only">（外部サイト）</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:justify-between">
          <p className="font-jp">{site.demoNotice}</p>
          <p>Demo © {new Date().getFullYear()} Stark Lab</p>
        </div>
      </div>
    </footer>
  );
}
