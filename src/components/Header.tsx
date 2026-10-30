"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { navItems, site } from "@/data/site";
import { Logo } from "./Logo";

const ease = [0.25, 0.1, 0.25, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  const links = navItems.filter((i) => i.href !== "/");
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* 非公式デモ表示（全ページ共通） */}
      <p className="relative z-10 flex h-7 items-center justify-center bg-bg-alt px-4 text-center font-jp text-[0.6875rem] text-muted">
        {site.demoNotice}
      </p>

      <div
        className={`relative z-10 border-b transition-colors duration-300 ${
          scrolled && !open ? "border-line bg-white/80 backdrop-blur-xl backdrop-saturate-150" : "border-line/70 bg-white"
        }`}
      >
        <div className="container-x flex h-[60px] items-center justify-between">
          <Logo />

          <nav aria-label="メインナビゲーション" className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-9">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="py-2 text-[0.8125rem] text-fg/70 transition-colors hover:text-fg aria-[current=page]:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.links.store}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 py-2 text-[0.8125rem] text-link hover:underline underline-offset-4"
                >
                  Online Store
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
            className="-mr-2.5 grid size-11 place-items-center md:hidden"
          >
            <span aria-hidden className="relative block h-3 w-[18px]">
              <span
                className={`absolute left-0 block h-[1.5px] w-full bg-fg transition-transform duration-300 ${
                  open ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-full bg-fg transition-transform duration-300 ${
                  open ? "top-[5px] -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
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
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-0 overflow-y-auto bg-white pt-[88px] md:hidden"
          >
            <nav aria-label="モバイルナビゲーション" className="container-x pt-6 pb-12">
              <ul>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.03, duration: 0.35, ease }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="block py-2.5 text-[1.75rem] font-semibold tracking-tight text-fg/85 aria-[current=page]:text-fg"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.35 }}
                className="mt-8 border-t border-line pt-6"
              >
                <ul className="space-y-1">
                  {[
                    { href: site.links.store, label: "Online Store" },
                    { href: site.links.instagram, label: "Instagram" },
                  ].map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1 text-[1.0625rem] text-link"
                      >
                        {l.label}
                        <ArrowUpRight aria-hidden className="size-4" />
                        <span className="sr-only">（外部サイト）</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-jp text-xs leading-relaxed text-muted">{site.demoNotice}</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
