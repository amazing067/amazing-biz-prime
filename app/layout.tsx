import type { Metadata } from "next";
import { Noto_Sans_KR, JetBrains_Mono, Noto_Serif_KR } from "next/font/google";
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

const notoSerifKR = Noto_Serif_KR({
  weight: ["600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-display",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://프라임에셋.com";
const iconVersion = "20260319-2";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // 제목 선두 일치: 네이버 「프라임에셋」 한글 검색을 위해 한글 브랜드명을 맨 앞에 (2026-07-24)
  title: "프라임에셋 어메이징사업부 — 보험설계사 리쿠르팅 | Prime Asset Amazing Division",
  // 검색결과 노출 한도(네이버·구글 약 80자)에 맞춘 순한글 설명 — 영어 기술용어 금지 (2026-07-28)
  description:
    "프라임에셋 어메이징사업부 보험설계사 모집. 진료내역 조회·보장분석·실손 미청구 찾기 등 영업 시스템을 직접 개발해 소속 설계사에게 무상 제공합니다.",
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
      "당신의 비전이 현실이 되는 곳. 직접 개발한 영업 시스템으로 설계사가 상담에만 집중할 수 있게 합니다.",
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

// 구조화 데이터 — 검색엔진·AI 검색에 「프라임에셋.com = 어메이징사업부의 리쿠르팅 사이트」임을 명시.
// sameAs 로 어메이징사업부.com(포털)과 상호 연결해 두 도메인이 같은 조직임을 알린다 (2026-08-07).
const PORTAL = "https://xn--h32b21du9cf7grcy2k20f.com";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#org`,
      name: "프라임에셋 어메이징사업부",
      alternateName: ["어메이징사업부", "Prime Asset Amazing Division"],
      url: `${siteUrl}/`,
      logo: `${siteUrl}/icons/icon-512.png`,
      description:
        "보험설계사 업무를 한 화면에서 처리하는 올인원 시스템을 직접 개발해 소속 설계사에게 무상 제공하는 프라임에셋 소속 보험 영업 조직(067·290·292본부).",
      parentOrganization: { "@type": "Organization", name: "프라임에셋" },
      sameAs: [
        `${PORTAL}/`,
        `${PORTAL}/about`,
        "https://blog.naver.com/gsb067",
        "https://talk.naver.com/profile/wj20ujg",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "프라임에셋 어메이징사업부 리쿠르팅",
      url: `${siteUrl}/`,
      publisher: { "@id": `${siteUrl}/#org` },
      inLanguage: "ko",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${jetbrainsMono.variable} ${notoSerifKR.variable}`}>
      <body className="font-sans min-w-0 bg-noise-v2">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

