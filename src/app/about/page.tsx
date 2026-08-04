import type { Metadata } from "next";
import { ResumeLink } from "@/components/ResumeLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Rishi Poddar — software engineer and full-stack developer in Mumbai building AI-powered products with Next.js, Python, and Generative AI.",
};

const SKILLS = [
  {
    group: "Build",
    items: [
      "TypeScript / Next.js / React",
      "Python / Flask / FastAPI",
      "Node.js / Express",
      "PHP / MySQL / PostgreSQL",
      "Turso (libSQL) / Neo4j / MongoDB",
    ],
  },
  {
    group: "AI / ML",
    items: [
      "Generative AI / LLMs / RAG",
      "NLP / Scikit-learn",
      "OpenAI · Gemini · Vertex AI",
      "Prompt engineering",
      "Hugging Face",
    ],
  },
  {
    group: "Ship",
    items: [
      "Vercel / GCP / Docker",
      "GitHub Actions CI/CD",
      "PyTest / Jest",
      "REST APIs / Microservices",
      "Google Analytics",
    ],
  },
];

const CERTS = [
  "Machine Learning I — Columbia University",
  "Explore Generative AI with Vertex AI Gemini API — Google Cloud",
  "Prompt Design in Vertex AI — Google Cloud",
  "Neo4j Certified Professional — Neo4j",
  "Responsible Innovation and Trustworthy AI — SAS",
  "Google Analytics Individual Qualification — Google",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">
        About
      </h1>

      <div className="mt-8 grid gap-10 sm:grid-cols-[1fr_200px]">
        <div className="flex flex-col gap-5 text-lg leading-relaxed">
          <p>
            I&rsquo;m Rishi Poddar — a software engineer and full-stack
            developer from Mumbai, finishing my B.Sc. in Information Technology
            at Thakur College in May 2026. Right now I&rsquo;m a Software
            Developer Intern at SNSS Global, building full-stack modules and
            prototyping AI integrations with the Gemini API.
          </p>
          <p>
            I like taking things all the way: six of my projects run live in
            production — financial analysis tools, an NLP fake-news classifier,
            a fine-tuned FinBERT sentiment model — each with its own CI/CD
            pipeline on Vercel. One of them, Promptify, took 1st place at the
            Jai Hind College tech competition among 30+ teams.
          </p>
          <p>
            Along the way I&rsquo;ve picked up 11+ certifications from Google
            Cloud, Columbia University, SAS, NVIDIA, and Neo4j — mostly in
            machine learning and Generative AI, because that&rsquo;s where the
            interesting problems are.
          </p>
        </div>
        <div
          role="img"
          aria-label="Placeholder for Rishi's photo — add a headshot"
          className="flex aspect-3/4 items-center justify-center rounded-xl border border-border bg-subtle font-display text-muted/50"
        >
          Photo
        </div>
      </div>

      <section aria-labelledby="skills" className="mt-14">
        <h2 id="skills" className="font-display text-2xl font-bold">
          What I work with
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {SKILLS.map((s) => (
            <div key={s.group}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
                {s.group}
              </h3>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted">
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="experience" className="mt-14">
        <h2 id="experience" className="font-display text-2xl font-bold">
          Experience
        </h2>
        <ul className="mt-4 flex flex-col gap-4">
          <li>
            <p className="font-semibold">
              Software Developer Intern — SNSS Global
            </p>
            <p className="text-sm text-muted">
              Apr 2026 – present · Full-stack modules, REST APIs, Gemini-powered
              workflow automation.
            </p>
          </li>
          <li>
            <p className="font-semibold">
              Web Developer Intern — Paranubhuti Foundation
            </p>
            <p className="text-sm text-muted">
              May – Aug 2025 · Rebuilt the org website; improved Lighthouse
              mobile performance for 500+ monthly visitors.
            </p>
          </li>
          <li>
            <p className="font-semibold">
              Operations & Community Intern — Crimailed (Founder&rsquo;s Office)
            </p>
            <p className="text-sm text-muted">
              Jul – Nov 2025 · Cross-functional ops in an early-stage startup;
              +30% social engagement.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="certs" className="mt-14">
        <h2 id="certs" className="font-display text-2xl font-bold">
          Certifications
        </h2>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
          {CERTS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">
          …and 5 more on the{" "}
          <ResumeLink className="text-accent underline underline-offset-4">
            full resume
          </ResumeLink>
          .
        </p>
      </section>

      <section aria-labelledby="community" className="mt-14">
        <h2 id="community" className="font-display text-2xl font-bold">
          Community
        </h2>
        <ul className="mt-4 flex flex-col gap-2 text-muted">
          <li>
            Student Marketing Associate with Viral Fission — organized 3+
            campus events with 100+ attendees each.
          </li>
          <li>
            Open-source projects on{" "}
            <a
              className="text-accent underline underline-offset-4"
              href={site.social.github}
            >
              GitHub
            </a>
            .
          </li>
        </ul>
      </section>

      <div className="mt-14 flex flex-wrap gap-3">
        <ResumeLink className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent">
          Download Resume (PDF)
        </ResumeLink>
        <a
          href="/contact"
          className="rounded-full border border-foreground px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Contact me
        </a>
      </div>
    </div>
  );
}
