import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Deep case studies of products Rishi has taken from concept to reality — problem, process, build, and outcome.",
};

export default function WorkPage() {
  const work = getWork();
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">Work</h1>
      <p className="mt-4 max-w-xl text-muted">
        A few projects, told properly — from the first sketch to what shipped
        and what it taught me. For the full repository list, see{" "}
        <Link href="/projects" className="text-accent underline underline-offset-4">
          Projects
        </Link>
        .
      </p>
      <div className="mt-12 flex flex-col gap-8">
        {work.map((w, i) => (
          <Reveal key={w.slug} delay={i * 0.06}>
            <Link
              href={`/work/${w.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-border transition-colors hover:border-accent sm:grid-cols-[2fr_3fr]"
            >
              <div
                aria-hidden="true"
                className="flex aspect-video items-center justify-center bg-subtle font-display text-6xl font-bold text-accent sm:aspect-auto"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                {w.frontmatter.tags && (
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {w.frontmatter.tags.join(" · ")}
                  </p>
                )}
                <h2 className="mt-2 font-display text-2xl font-bold group-hover:text-accent sm:text-3xl">
                  {w.frontmatter.title}
                </h2>
                <p className="mt-3 text-muted">{w.frontmatter.outcome}</p>
                <p className="mt-4 text-sm font-medium text-accent">
                  Read the case study →
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
