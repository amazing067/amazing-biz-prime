import type { MetadataRoute } from "next";

// 한글 도메인은 punycode(origin)로 정규화해 sitemap URL을 안전하게 출력
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://프라임에셋.com"
).origin;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/amazing", priority: 0.9 },
    { path: "/prime-asset", priority: 0.9 },
    { path: "/recruit", priority: 0.9 },
    { path: "/training", priority: 0.8 },
    { path: "/support", priority: 0.7 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority,
  }));
}
