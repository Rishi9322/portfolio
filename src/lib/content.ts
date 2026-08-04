import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { externalPosts } from "./external-posts";

const contentRoot = path.join(process.cwd(), "content");

export type WorkFrontmatter = {
  title: string;
  outcome: string; // one-line outcome for the index card
  description: string; // meta description
  date: string;
  hero?: string; // path under /public
  heroAlt?: string;
  tags?: string[];
  featured?: boolean;
  repo?: string; // GitHub URL
  live?: string; // deployed URL
};

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  keyword?: string; // target keyword phrase — PRD §8
  tags?: string[];
};

export type Entry<T> = {
  slug: string;
  frontmatter: T;
  content: string;
  readingTimeMinutes: number;
};

function readCollection<T>(collection: "work" | "blog"): Entry<T>[] {
  const dir = path.join(contentRoot, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const words = content.trim().split(/\s+/).length;
      return {
        slug: file.replace(/\.mdx?$/, ""),
        frontmatter: data as T,
        content,
        readingTimeMinutes: Math.max(1, Math.round(words / 200)),
      };
    })
    .sort((a, b) => {
      const da = (a.frontmatter as { date?: string }).date ?? "";
      const db = (b.frontmatter as { date?: string }).date ?? "";
      return db.localeCompare(da);
    });
}

export function getWork(): Entry<WorkFrontmatter>[] {
  return readCollection<WorkFrontmatter>("work");
}

export function getWorkBySlug(slug: string): Entry<WorkFrontmatter> | undefined {
  return getWork().find((e) => e.slug === slug);
}

export function getPosts(): Entry<BlogFrontmatter>[] {
  return readCollection<BlogFrontmatter>("blog");
}

export function getPostBySlug(slug: string): Entry<BlogFrontmatter> | undefined {
  return getPosts().find((e) => e.slug === slug);
}

/*
  One reading list. Local MDX posts and posts published on Medium, newest
  first — external ones keep their canonical home and open off-site.
*/
export type FeedPost = {
  key: string;
  title: string;
  href: string;
  description: string;
  date: string;
  readingTimeMinutes: number;
  external: boolean;
  source?: string;
};

export function getFeedPosts(): FeedPost[] {
  const local: FeedPost[] = getPosts().map((p) => ({
    key: p.slug,
    title: p.frontmatter.title,
    href: `/blog/${p.slug}`,
    description: p.frontmatter.description,
    date: p.frontmatter.date,
    readingTimeMinutes: p.readingTimeMinutes,
    external: false,
  }));

  const external: FeedPost[] = externalPosts.map((p) => ({
    key: p.url,
    title: p.title,
    href: p.url,
    description: p.description,
    date: p.date,
    readingTimeMinutes: p.readingTimeMinutes,
    external: true,
    source: p.source,
  }));

  return [...local, ...external].sort((a, b) => b.date.localeCompare(a.date));
}
