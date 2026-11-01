import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AnalyticsListener } from "@/components/AnalyticsListener";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 日本語は端末のシステムフォント（ヒラギノ／游ゴシック／Noto など）を使用。
// Web フォントの日本語サブセットは CSS とフォントの転送量が大きく、表示速度を優先して読み込まない。

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "REVONIK | The Art of Precision.（提案用デモ）",
    template: "%s | REVONIK（提案用デモ）",
  },
  description: site.description,
  applicationName: "REVONIK Proposal Demo",
  // 営業提案用デモのため検索エンジンにインデックスさせない
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "REVONIK（提案用デモ）",
    title: "REVONIK | The Art of Precision.（提案用デモ）",
    description: site.description,
    images: [{ url: "/placeholders/og.png", width: 1200, height: 630, alt: "REVONIK 提案用デモ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "REVONIK（提案用デモ）",
    description: site.description,
    images: ["/placeholders/og.png"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          本文へスキップ
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <AnalyticsListener />
        </MotionProvider>
      </body>
    </html>
  );
}
