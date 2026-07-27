import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
