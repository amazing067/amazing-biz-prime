import type { Metadata } from "next";
import { Noto_Sans_KR, JetBrains_Mono, Noto_Serif_KR } from "next/font/google";
// Vercel Web Analytics — 방문자·페이지뷰 집계. 쿠키를 쓰지 않아 별도 동의 배너가 필요 없다.
import { Analytics } from "@vercel/analytics/next";
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

// 한글 도메인은 반드시 punycode(origin)로 정규화한다.
// metadataBase 는 new URL() 을 거쳐 canonical·og:url 이 punycode 로 나갔지만,
// JSON-LD 는 이 문자열을 그대로 템플릿에 넣어 @id 가 "https://프라임에셋.com/#org" 로 나가고 있었다
// (2026-08-21 실측). 검색엔진·AI 가 한글 URL 과 punycode URL 을 다른 주소로 볼 수 있어 정본이 갈린다.
// sitemap.ts·robots.ts 와 같은 방식으로 통일한다.
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://프라임에셋.com").origin;
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
//
// ★2026-08-21: Organization 의 @id 를 포털(어메이징사업부.com) 것으로 통일했다.
//   그전에는 두 사이트가 각자 `${siteUrl}/#org` 로 조직을 선언하고 sameAs 로만 이어져 있었다.
//   그러면 검색엔진·AI 에게는 「이름이 같고 서로 링크하는 별개의 두 조직」으로 보여
//   브랜드 신호가 둘로 쪼개진다. 같은 조직이 운영하는 여러 사이트는
//   **하나의 Organization(공통 @id) + 사이트마다 WebSite** 로 표현하는 것이 schema.org 관례다.
//   정본(canonical)은 포털이며, 이 사이트는 그 조직의 리쿠르팅 채널로 선언한다.
const PORTAL = "https://xn--h32b21du9cf7grcy2k20f.com";
const ORG_ID = `${PORTAL}/#org`; // ← 포털과 반드시 동일해야 한다(frontend/index.html 의 @id)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "프라임에셋 어메이징사업부",
      alternateName: [
        "어메이징사업부",
        "프라임에셋 어메이징",
        "어메이징사업부 067본부",
        "Prime Asset Amazing Division",
      ],
      url: `${PORTAL}/`,
      logo: `${PORTAL}/logo.png`,
      description:
        "보험설계사 업무를 한 화면에서 처리하는 올인원 시스템을 직접 개발해 소속 설계사에게 무상 제공하는 프라임에셋 소속 보험 영업 조직(067·290·292본부).",
      parentOrganization: { "@type": "Organization", name: "프라임에셋" },
      areaServed: { "@type": "Country", name: "대한민국" },
      knowsAbout: [
        "보험설계사",
        "법인보험대리점",
        "GA 이직",
        "보험설계사 채용",
        "보험 보장분석",
        "실손보험 미청구 보험금",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "보험설계사 입사 상담",
          url: "https://talk.naver.com/profile/wj20ujg",
          availableLanguage: ["ko"],
        },
      ],
      sameAs: [
        `${siteUrl}/`,
        `${PORTAL}/`,
        `${PORTAL}/about`,
        `${PORTAL}/faq`,
        "https://blog.naver.com/gsb067",
        "https://talk.naver.com/profile/wj20ujg",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "프라임에셋 어메이징사업부 리쿠르팅",
      url: `${siteUrl}/`,
      publisher: { "@id": ORG_ID },
      inLanguage: "ko",
      // 같은 조직의 다른 사이트 — 포털을 형제 채널로 명시한다.
      isRelatedTo: {
        "@type": "WebSite",
        "@id": `${PORTAL}/#website`,
        name: "어메이징사업부 포털",
        url: `${PORTAL}/`,
      },
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
        <Analytics />
      </body>
    </html>
  );
}

