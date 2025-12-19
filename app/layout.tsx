import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "Prime Asset Amazing Division",
  description: "System makes Money. 감정을 배제한 완벽한 영업 지원 시스템.",
  icons: {
    icon: "/prime-logo.png", // 파비콘으로 로고 사용
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

