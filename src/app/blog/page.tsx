import type { Metadata } from "next";
import Link from "next/link";
import { getFeedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Build-in-public engineering and creative process — case-study breakdowns, tutorials, and essays on design, code, and photography.",
};

export default function BlogPage() {
  const posts = getFeedPosts();
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">Blog</h1>
      <p className="mt-4 text-muted">
        Build-in-public engineering, design decisions, and the creative process
        behind the work. Posts marked Medium live on{" "}
        <a
          href="https://medium.com/@rishipoddarr"
          target="_blank"
          rel="noreferrer"
          className="text-accent underline underline-offset-4"
        >
          my Medium
        </a>{" "}
        and open there.
      </p>
      <ul className="mt-12 flex flex-col divide-y divide-border">
        {posts.map((p) => (
          <li key={p.key} className="py-8 first:pt-0">
            <article>
              <p className="flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-widest text-muted">
                <time dateTime={p.date}>
                  {new Date(p.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span>· {p.readingTimeMinutes} min read</span>
                {p.external && (
                  <span className="border border-accent px-1.5 py-0.5 text-[10px] text-accent">
                    {p.source}
                  </span>
                )}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold">
                {p.external ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {p.title}
                  </a>
                ) : (
                  <Link href={p.href} className="transition-colors hover:text-accent">
                    {p.title}
                  </Link>
                )}
              </h2>
              <p className="mt-2 text-muted">{p.description}</p>
              {p.external ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-accent"
                >
                  Read on {p.source} ↗
                </a>
              ) : (
                <Link
                  href={p.href}
                  className="mt-3 inline-block text-sm font-medium text-accent"
                >
                  Read post →
                </Link>
              )}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
