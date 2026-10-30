"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, site } from "@/data/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ページ遷移時にメニューを閉じる
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* 非公式デモ表示（全ページ共通） */}
      <div className="relative z-10 border-b border-line bg-ink">
        <p className="container-x flex h-7 items-center justify-center gap-2 text-center font-jp text-[0.66rem] tracking-wider text-muted sm:text-[0.7rem]">
          <span aria-hidden className="size-1 rounded-full bg-muted" />
          {site.demoNotice}
        </p>
      </div>

      <div
        className={`relative z-10 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <Logo />

          <nav aria-label="メインナビゲーション" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative py-2 font-display text-[0.74rem] font-semibold tracking-[0.22em] text-fg/80 transition-colors hover:text-fg aria-[current=page]:text-fg"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-0.5 left-0 h-px bg-fg transition-all duration-500 ease-out-expo ${
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.links.store}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-line-strong px-4 py-2.5 font-display text-[0.72rem] font-semibold tracking-[0.22em] transition-colors duration-500 hover:border-fg hover:bg-fg hover:text-ink"
                >
                  ONLINE STORE
                  <ArrowUpRight aria-hidden className="size-3.5" />
                  <span className="sr-only">（外部サイト）</span>
                </a>
              </li>
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            className="-mr-2 grid size-11 place-items-center lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-0 overflow-y-auto bg-ink/97 pt-28 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="モバイルナビゲーション" className="container-x flex min-h-full flex-col pb-10">
              <ul className="border-t border-line">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-center justify-between py-5 display text-[2rem] text-fg/85 aria-[current=page]:text-fg"
                    >
                      {item.label}
                      <span className="font-display text-xs font-medium tracking-[0.2em] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10 flex flex-col gap-3"
              >
                <a
                  href={site.links.store}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-center gap-2 bg-fg font-display text-sm font-semibold tracking-[0.24em] text-ink"
                >
                  ONLINE STORE <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only">（外部サイト）</span>
                </a>
                <a
                  href={site.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-center gap-2 border border-line-strong font-display text-sm font-semibold tracking-[0.24em]"
                >
                  INSTAGRAM <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only">（外部サイト）</span>
                </a>
                <p className="mt-6 font-jp text-xs leading-relaxed text-muted">{site.demoNotice}</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
