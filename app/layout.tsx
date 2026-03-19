import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-kr",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://프라임에셋.com";
const iconVersion = "20260319-2";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Prime Asset Amazing Division | 프라임에셋 어메이징사업부",
  description:
    "System makes Money. 감정을 배제한 완벽한 영업 지원 시스템. 당신의 비전이 현실이 되는 곳.",
  icons: {
    icon: [
      { url: `/icons/favicon-16x16.png?v=${iconVersion}`, sizes: "16x16", type: "image/png" },
      { url: `/icons/favicon-32x32.png?v=${iconVersion}`, sizes: "32x32", type: "image/png" },
      { url: `/icons/icon-192.png?v=${iconVersion}`, sizes: "192x192", type: "image/png" },
      { url: `/icons/icon-512.png?v=${iconVersion}`, sizes: "512x512", type: "image/png" },
    ],
    shortcut: `/favicon.ico?v=${iconVersion}`,
    apple: [{ url: `/icons/apple-touch-icon.png?v=${iconVersion}`, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "프라임에셋 어메이징사업부",
    title: "Prime Asset Amazing Division | 프라임에셋 어메이징사업부",
    description:
      "당신의 비전이 현실이 되는 곳. System makes Money. 감정을 배제한 완벽한 영업 지원 시스템.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "프라임에셋 어메이징사업부",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Asset Amazing Division | 프라임에셋 어메이징사업부",
    description: "당신의 비전이 현실이 되는 곳.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans min-w-0">{children}</body>
    </html>
  );
}

