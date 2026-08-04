import type { MetadataRoute } from "next";
import { getWork, getPosts } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/work",
    "/projects",
    "/gallery",
    "/blog",
    "/about",
    "/contact",
  ].map(
    (p) => ({
      url: `${site.url}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })
  );

  const work = getWork().map((w) => ({
    url: `${site.url}/work/${w.slug}`,
    lastModified: w.frontmatter.date,
    changeFrequency: "yearly" as const,
    priority: 0.9,
  }));

  const posts = getPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.frontmatter.updated ?? p.frontmatter.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...work, ...posts];
}
