import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://프라임에셋.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Prime Asset Amazing Division | 프라임에셋 어메이징사업부",
  description:
    "System makes Money. 감정을 배제한 완벽한 영업 지원 시스템. 당신의 비전이 현실이 되는 곳.",
  icons: {
    icon: "/prime-logo.png", // 파비콘으로 로고 사용
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
    <html lang="ko" className={notoSerifKR.variable}>
      <body>{children}</body>
    </html>
  );
}

