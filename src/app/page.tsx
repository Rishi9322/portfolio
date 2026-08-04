import Image from "next/image";
import Link from "next/link";
import { HeroTitle } from "@/components/HeroTitle";
import { Reveal } from "@/components/Reveal";
import { ResumeLink } from "@/components/ResumeLink";
import { getWork, getFeedPosts, type FeedPost } from "@/lib/content";
import { allProjects } from "@/lib/projects";
import { site } from "@/lib/site";

const TICKER = ["BUILD", "SHOOT", "DESIGN", "SHIP", "REPEAT"];

const STATS = [
  { value: String(allProjects.length), label: "public repositories" },
  {
    value: String(allProjects.filter((p) => p.live).length),
    label: "apps deployed live",
  },
  { value: "4", label: "deep case studies" },
  { value: "1st", label: "the poster, always" },
];

const PROCESS = [
  { step: "Idea", note: "If it has no headline, it isn't ready." },
  { step: "Design", note: "The launch poster comes before the code." },
  { step: "Build", note: "Small ships, real data, no mock heroics." },
  { step: "Capture", note: "Stay after the event. Shoot the real moment." },
  { step: "Ship", note: "Push to main is the launch party." },
];

function PostCard({ post }: { post: FeedPost }) {
  const inner = (
    <>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        {new Date(post.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}{" "}
        · {post.readingTimeMinutes} min read
        {post.external ? ` · ${post.source}` : ""}
      </p>
      <h3 className="mt-3 font-display text-2xl font-bold group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-muted">{post.description}</p>
    </>
  );
  const className =
    "group block border-t-2 border-foreground pt-5 transition-colors hover:border-accent";

  return post.external ? (
    <a href={post.href} target="_blank" rel="noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={post.href} className={className}>
      {inner}
    </Link>
  );
}

function Cropmarks() {
  return (
    <>
      <span className="mark" />
      <span className="mark" />
      <span className="mark" />
      <span className="mark" />
    </>
  );
}

export default function Home() {
  const featured = getWork().filter((w) => w.frontmatter.featured).slice(0, 3);
  const posts = getFeedPosts().slice(0, 2);
  const liveProjects = allProjects.filter((p) => p.live).length;

  return (
    <div>
      {/* Above the fold — PRD §5.1 */}
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:pt-24">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Rishi Poddar — software engineer · Mumbai, India
        </p>
        <HeroTitle text="From concept to reality." highlight="reality" />
        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-lg text-muted">{site.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <ResumeLink className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent">
              Download Resume (PDF)
            </ResumeLink>
            <Link
              href="/contact"
              className="rounded-full border border-foreground px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Ticker — the press keeps running */}
      <div
        className="ticker mt-16 bg-foreground py-3 text-background"
        aria-hidden="true"
      >
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex shrink-0 items-center">
              {Array.from({ length: 4 }).flatMap((_, r) =>
                TICKER.map((word) => (
                  <span
                    key={`${copy}-${r}-${word}`}
                    className="mx-5 flex items-center gap-10 font-display text-xl font-bold uppercase tracking-wide"
                  >
                    {word}
                    <span className="text-accent">→</span>
                  </span>
                ))
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <section aria-label="Quick numbers" className="mx-auto max-w-6xl px-5 py-14">
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="border-t-2 border-accent pt-3">
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                {s.label}
              </dt>
              <dd className="mt-1 font-display text-5xl font-bold tracking-tight">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured work */}
      <section aria-labelledby="featured-heading" className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-10 flex items-baseline justify-between">
          <h2
            id="featured-heading"
            className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl"
          >
            Selected work
          </h2>
          <Link
            href="/work"
            className="font-mono text-sm text-accent underline underline-offset-4"
          >
            All work →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {featured.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.08}>
              <Link
                href={`/work/${w.slug}`}
                className="cropmarks group block bg-background p-1 transition-colors"
              >
                <Cropmarks />
                <div className="border border-border transition-colors group-hover:border-accent">
                  {w.frontmatter.hero ? (
                    <Image
                      src={w.frontmatter.hero}
                      alt={w.frontmatter.heroAlt ?? ""}
                      width={1200}
                      height={900}
                      sizes="(min-width: 640px) 30vw, 90vw"
                      className="aspect-4/3 w-full object-cover object-top"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex aspect-4/3 items-center justify-center bg-subtle"
                    >
                      <span className="font-display text-6xl font-bold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-border p-5">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                      {w.frontmatter.tags?.slice(0, 2).join(" · ")}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold group-hover:text-accent">
                      {w.frontmatter.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{w.frontmatter.outcome}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 font-mono text-sm text-muted">
          Everything else I&apos;ve built lives in{" "}
          <Link href="/projects" className="text-accent underline underline-offset-4">
            Projects
          </Link>{" "}
          — {allProjects.length} public repos, {liveProjects} of them live.
        </p>
      </section>

      {/* Process — expanded, PRD §5.1 */}
      <section aria-labelledby="process-heading" className="mx-auto max-w-6xl px-5 py-16">
        <h2
          id="process-heading"
          className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl"
        >
          How the work happens
        </h2>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-5">
          {PROCESS.map((p, i) => (
            <li
              key={p.step}
              className="border-t-4 border-accent bg-background p-5"
            >
              <Reveal delay={i * 0.06}>
                <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-display text-xl font-bold">{p.step}</p>
                <p className="mt-2 text-sm text-muted">{p.note}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Currently */}
      <section aria-label="Currently" className="mx-auto max-w-6xl px-5 py-6">
        <div className="flex flex-col gap-2 border-l-2 border-accent pl-5 font-mono text-sm text-muted">
          <p>
            <span className="text-foreground">now →</span> deep in DentSeg: U-Net
            ablations + the OralVisionX research workstation
          </p>
          <p>
            <span className="text-foreground">last shipped →</span> SentimentAI,
            a fine-tuned FinBERT reading Indian market news
          </p>
        </div>
      </section>

      {/* Latest posts — PRD §5.1 */}
      <section aria-labelledby="latest-posts" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 flex items-baseline justify-between">
          <h2
            id="latest-posts"
            className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl"
          >
            Latest writing
          </h2>
          <Link
            href="/blog"
            className="font-mono text-sm text-accent underline underline-offset-4"
          >
            All posts →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.08}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Big CTA — ink block */}
      <section aria-labelledby="cta-heading" className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <Link href="/contact" className="group block">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-background/60">
                Hiring · freelance · collaboration
              </p>
              <h2
                id="cta-heading"
                className="mt-4 font-display text-[11vw] font-bold uppercase leading-none tracking-tight sm:text-8xl"
              >
                Got an idea?{" "}
                <span
                  aria-hidden="true"
                  className="inline-block text-accent transition-transform group-hover:translate-x-3"
                >
                  →
                </span>
              </h2>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
