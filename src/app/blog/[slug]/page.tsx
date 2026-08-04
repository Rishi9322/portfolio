import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPosts, getPostBySlug } from "@/lib/content";
import { ConnectForm } from "@/components/ConnectForm";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated ?? post.frontmatter.date,
      url: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    author: { "@type": "Person", name: site.author, url: site.url },
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updated ?? post.frontmatter.date,
    url: `${site.url}/blog/${slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <header>
        <p className="text-xs uppercase tracking-widest text-muted">
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>{" "}
          · {post.readingTimeMinutes} min read
          {post.frontmatter.updated && (
            <> · Updated {new Date(post.frontmatter.updated).toLocaleDateString("en-IN")}</>
          )}
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
          {post.frontmatter.title}
        </h1>
      </header>

      <div className="prose mt-10">
        <MDXRemote source={post.content} />
      </div>

      <footer className="mt-16 rounded-2xl border border-border bg-subtle p-7">
        <ConnectForm compact />
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
