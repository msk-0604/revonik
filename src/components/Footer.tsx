import Link from "next/link";
import { site } from "@/data/site";

const internal = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/media", label: "Media" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

const external = [
  { href: site.links.store, label: "Online Store", track: "store_click" },
  { href: site.links.instagram, label: "Instagram", track: "social_click" },
  { href: site.links.youtube, label: "YouTube", track: "video_click" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-alt text-[0.75rem] text-muted">
      <div className="container-x py-12 md:py-16">
        <div className="grid gap-10 pb-10 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-[0.9375rem] font-semibold tracking-[0.24em] text-fg">REVONIK</p>
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
            <p className="font-semibold text-fg">Official</p>
            <ul className="mt-3 space-y-0.5">
              {external.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track={l.track}
                    data-track-placement="footer"
                    className="inline-block py-1.5 hover:text-fg hover:underline"
                  >
                    {l.label} ↗<span className="sr-only">（外部サイト）</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 非公式の営業提案であることの表示（全ページ共通） */}
        <section aria-labelledby="demo-notice" className="rounded-2xl border border-line bg-white p-5 md:p-6">
          <h2 id="demo-notice" className="font-jp text-[0.875rem] font-bold text-fg">
            {site.demoNotice}
          </h2>
          <p className="mt-2 font-jp text-[0.8125rem] leading-[1.8] text-fg/80">{site.demoNoticeLong}</p>
          <ul className="mt-3 space-y-1 font-jp text-[0.75rem] leading-[1.8]">
            {site.demoPoints.map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden>・</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-jp text-[0.75rem]">
            制作：
            <a href={site.producer.url} target="_blank" rel="noopener noreferrer" className="text-fg/80 underline-offset-4 hover:underline">
              {site.producer.company}
            </a>
          </p>
        </section>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p className="font-jp">{site.demoNotice}</p>
          <p>Demo © {new Date().getFullYear()} Stark Lab</p>
        </div>
      </div>
    </footer>
  );
}
