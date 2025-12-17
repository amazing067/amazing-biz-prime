import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prime Asset Amazing Division",
  description: "System makes Money. 감정을 배제한 완벽한 영업 지원 시스템.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

