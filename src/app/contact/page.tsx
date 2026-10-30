import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "CONTACT",
  description: "お問い合わせフォーム（提案用デモ・送信機能は無効）。",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact" lead="製品・取扱店・取材などのお問い合わせ窓口の掲載イメージです。" />
      <section className="container-x grid gap-14 pb-24 md:pb-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
        <aside className="space-y-10">
          <div>
            <h2 className="headline text-[1.5rem]">お問い合わせの前に</h2>
            <p className="prose-jp mt-3 text-[0.9375rem] text-muted">
              製品の在庫・価格・配送については、オンラインストアの各ページもあわせてご確認ください。
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {[
              { href: site.links.store, label: "Online Store", sub: "revonik.stores.jp" },
              { href: site.links.instagram, label: "Instagram", sub: site.links.instagramHandle },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-5">
                  <span>
                    <span className="block text-[1.0625rem] font-semibold text-link">{l.label}</span>
                    <span className="mt-1 block font-jp text-xs text-muted">{l.sub}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-5 text-link transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="sr-only">（外部サイト）</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <ContactForm />
      </section>
    </>
  );
}
