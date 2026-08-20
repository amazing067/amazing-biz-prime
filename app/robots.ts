import type { MetadataRoute } from "next";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://프라임에셋.com"
).origin;

/**
 * AI 검색·학습 크롤러 명시 허용 (GEO) — 2026-08-21.
 *
 * 기본 규칙(User-agent: *)으로도 허용되지만, 일부 크롤러는 자기 이름의 블록만 읽고
 * 명시 허용이 없으면 보수적으로 동작한다. 이 사이트의 공개 페이지는 전부 인용되기를 원한다.
 * 비공개 영역(/member, /api)은 아래 disallow 로 동일하게 막는다.
 *
 * ★포털(어메이징사업부.com)의 frontend/public/robots.txt 와 같은 목록을 유지할 것.
 */
const AI_AGENTS = [
  // OpenAI (ChatGPT 검색·브라우징·학습)
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic (Claude)
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  // Google (Gemini·AI 개요)
  "Google-Extended",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Microsoft Copilot / Bing
  "bingbot",
  // Apple Intelligence
  "Applebot",
  "Applebot-Extended",
  // Common Crawl (다수 AI 학습 데이터의 원천)
  "CCBot",
  // Meta AI
  "FacebookBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/member/", "/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
