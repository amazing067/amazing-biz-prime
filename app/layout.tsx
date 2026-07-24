import type { Metadata } from "next";
import { Noto_Sans_KR, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-kr",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-italic",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://프라임에셋.com";
const iconVersion = "20260319-2";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // 제목 선두 일치: 네이버 「프라임에셋」 한글 검색을 위해 한글 브랜드명을 맨 앞에 (2026-07-24)
  title: "프라임에셋 어메이징사업부 — 보험설계사 리쿠르팅 | Prime Asset Amazing Division",
  description:
    "프라임에셋 어메이징사업부 보험설계사 모집. System makes Money — 진료내역 조회·AI 보장분석·실손 미청구 찾기 등 직접 개발한 영업 지원 시스템을 소속 설계사에게 무상 제공합니다.",
  alternates: { canonical: "/" },
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
    title: "프라임에셋 어메이징사업부 — 보험설계사 리쿠르팅",
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
    title: "프라임에셋 어메이징사업부 — 보험설계사 리쿠르팅",
    description: "당신의 비전이 현실이 되는 곳.",
    images: ["/og-image.png"],
  },
  verification: {
    other: {
      "naver-site-verification": "ea4d63de392f36c07b6ad336ecb05c370011cd32",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans min-w-0 bg-noise-v2">{children}</body>
    </html>
  );
}

