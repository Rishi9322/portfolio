import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWork, getWorkBySlug } from "@/lib/content";
import { ConnectForm } from "@/components/ConnectForm";
import { CaseStudyEnd } from "@/components/CaseStudyEnd";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getWork().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: entry.frontmatter.title,
      description: entry.frontmatter.description,
      type: "article",
      url: `/work/${slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: entry.frontmatter.title,
    description: entry.frontmatter.description,
    author: { "@type": "Person", name: site.author, url: site.url },
    datePublished: entry.frontmatter.date,
    url: `${site.url}/work/${slug}`,
  };

  return (
    <article className="mx-auto max-w-6xl px-5 py-16">
      <header className="max-w-3xl">
        {entry.frontmatter.tags && (
          <p className="text-xs uppercase tracking-widest text-accent">
            {entry.frontmatter.tags.join(" · ")}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">
          {entry.frontmatter.title}
        </h1>
        <p className="mt-5 text-lg text-muted">{entry.frontmatter.outcome}</p>
        <p className="mt-3 text-sm text-muted">
          {entry.readingTimeMinutes} min read
        </p>
        {(entry.frontmatter.repo || entry.frontmatter.live) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {entry.frontmatter.live && (
              <a
                href={entry.frontmatter.live}
                className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-accent"
              >
                View live ↗
              </a>
            )}
            {entry.frontmatter.repo && (
              <a
                href={entry.frontmatter.repo}
                className="rounded-full border border-foreground px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </header>

      {/* Signature motif — PRD §4A progress rail */}
      <nav aria-label="Story arc" className="mt-10 border-y border-border py-4">
        <ol className="flex flex-wrap gap-x-3 gap-y-1 text-xs uppercase tracking-widest text-muted">
          {["Spark", "Shape", "Build", "Launch", "Capture", "Reflection"].map(
            (s, i, arr) => (
              <li key={s} className="flex items-center gap-3">
                <span>{s}</span>
                {i < arr.length - 1 && (
                  <span aria-hidden="true" className="text-accent">
                    →
                  </span>
                )}
              </li>
            )
          )}
        </ol>
      </nav>

      <div className="prose mt-10">
        <MDXRemote source={entry.content} />
      </div>

      <CaseStudyEnd slug={slug} />

      <footer className="mt-16 max-w-2xl rounded-2xl border border-border bg-subtle p-7">
        <ConnectForm compact />
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
