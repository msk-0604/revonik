import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
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

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
  preload: false,
});

// 引用・ステートメント用のアクセント書体
const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

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
    <html lang="ja" className={`${inter.variable} ${noto.variable} ${serif.variable}`}>
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
        </MotionProvider>
      </body>
    </html>
  );
}
