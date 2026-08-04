import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { projectGroups, allProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every public project Rishi Poddar has shipped — AI and machine learning pipelines, full-stack products, AI automations, and front-end experiments.",
};

export default function ProjectsPage() {
  const liveCount = allProjects.filter((p) => p.live).length;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">
        Projects
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Everything I have built in public — {allProjects.length} projects,{" "}
        {liveCount} of them deployed and running. The ones with a case study get
        the full story over in{" "}
        <Link href="/work" className="text-accent underline underline-offset-4">
          Work
        </Link>
        .
      </p>
      <p className="mt-6">
        <a
          href={site.social.github}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Browse the GitHub profile →
        </a>
      </p>

      {projectGroups.map((group) => (
        <section key={group.id} aria-labelledby={`${group.id}-heading`} className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-3">
            <h2
              id={`${group.id}-heading`}
              className="font-display text-3xl font-bold uppercase tracking-tight"
            >
              {group.title}
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {group.note}
            </p>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {group.projects.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={i * 0.05}>
                  <article
                    className="group flex h-full flex-col border border-t-4 border-border border-t-accent bg-background p-6 transition-colors hover:border-accent"
                  >
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.imageAlt ?? `Screenshot of ${p.name}`}
                        width={1200}
                        height={800}
                        sizes="(min-width: 640px) 45vw, 90vw"
                        className="mb-5 aspect-3/2 w-full border border-border object-cover object-top"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="mb-5 flex aspect-3/2 w-full flex-col justify-between border border-border bg-subtle p-5 text-accent"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">
                          {p.panelNote ?? "Source only — runs locally"}
                        </span>
                        <span className="font-display text-3xl font-bold uppercase leading-none">
                          {p.name}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">
                          {p.stack.join(" / ")}
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                      <span className="font-mono text-xs text-muted">{p.year}</span>
                    </div>
                    <p className="mt-3 flex-1 text-sm text-muted">{p.blurb}</p>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted">
                      {p.stack.join(" · ")}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
                      {p.caseStudy && (
                        <Link
                          href={`/work/${p.caseStudy}`}
                          className="text-accent underline underline-offset-4"
                        >
                          Case study →
                        </Link>
                      )}
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="underline underline-offset-4 hover:text-accent"
                        >
                          {p.liveLabel ?? "Live site"} ↗
                        </a>
                      )}
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="underline underline-offset-4 hover:text-accent"
                        >
                          Source ↗
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
