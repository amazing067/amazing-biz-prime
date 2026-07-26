import type { MetadataRoute } from "next";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://프라임에셋.com"
).origin;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/member/", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
