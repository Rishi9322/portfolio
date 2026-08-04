/*
  Every public, non-fork repository on github.com/Rishi9322, written up as a
  one-line pitch, plus the automations that have no repo at all. `caseStudy`
  points at the /work slug when a project has a full write-up — those cards
  send readers to the case study instead.
*/

export type Project = {
  name: string;
  repo?: string; // absent for no-code / hosted automations
  panelNote?: string; // overrides the fallback panel caption when there is no image
  liveLabel?: string; // overrides the "Live site" link text
  live?: string;
  caseStudy?: string; // slug under /work
  image?: string; // screenshot under /public/projects
  imageAlt?: string;
  blurb: string;
  stack: string[];
  year: string;
};

export type ProjectGroup = {
  id: string;
  title: string;
  note: string;
  projects: Project[];
};

export const projectGroups: ProjectGroup[] = [
  {
    id: "ai",
    title: "AI & machine learning",
    note: "Models trained, evaluated, and put behind a real interface.",
    projects: [
      {
        name: "DentSeg / OralVisionX",
        image: "/projects/dentseg.webp",
        imageAlt:
          "Validation Dice curves comparing the baseline, CLAHE, and two seed runs across 40 training epochs.",
        repo: "https://github.com/Rishi9322/DentSeg",
        caseStudy: "dentseg",
        blurb:
          "Tooth-region segmentation research pipeline plus a FastAPI + Next.js app serving real inference, AI-generated reports, and a human-reviewed feedback loop.",
        stack: ["PyTorch", "FastAPI", "Next.js"],
        year: "2026",
      },
      {
        name: "SentimentAI",
        image: "/projects/sentimentai.webp",
        imageAlt:
          "The SentimentAI dashboard homepage showing the fine-tuned FinBERT model and stocks tracked.",
        repo: "https://github.com/Rishi9322/sentimental-Aanalysis",
        live: "https://sentimental-aanalysis.onrender.com",
        caseStudy: "sentimentai",
        blurb:
          "A FinBERT model fine-tuned on Kaggle financial text, reading sentiment across NIFTY 50 and SENSEX news with live Alpha Vantage price charts.",
        stack: ["PyTorch", "Flask", "NLP"],
        year: "2026",
      },
      {
        name: "Fake News Detection",
        image: "/projects/fake-news.webp",
        imageAlt:
          "The Fake News Detection web app homepage.",
        repo: "https://github.com/Rishi9322/fake_news",
        live: "https://fake-news-green.vercel.app",
        blurb:
          "NLP classifier and OpenRouter LLM check that score news articles for authenticity, wrapped in a cinematic storytelling UI.",
        stack: ["Python", "scikit-learn", "Flask"],
        year: "2026",
      },
      {
        name: "Traffic Data Analyzer",
        repo: "https://github.com/Rishi9322/AnaaaAAAAAA",
        blurb:
          "Streamlit tool that reads traffic CSVs and returns AI insights — best posting windows, budget recommendations, and cross-file comparisons.",
        stack: ["Streamlit", "OpenRouter", "Pandas"],
        year: "2025",
      },
    ],
  },
  {
    id: "products",
    title: "Products & platforms",
    note: "Full-stack apps with auth, data, and a deploy pipeline behind them.",
    projects: [
      {
        name: "FinRatio",
        image: "/projects/finratio.webp",
        imageAlt:
          "The FinRatio landing page with its business-potential calculator call to action.",
        repo: "https://github.com/Rishi9322/finRatio",
        live: "https://fin-ratio.vercel.app",
        caseStudy: "finratio",
        blurb:
          "Financial ratio and credit analysis platform — email-OTP auth, gated DSCR and debt-equity calculators, AI insights, and PDF reports.",
        stack: ["Next.js", "TypeScript", "Prisma"],
        year: "2026",
      },
      {
        name: "FinRatio SaaS",
        image: "/projects/finration-fig.webp",
        imageAlt:
          "The FinRatio SaaS platform landing page.",
        repo: "https://github.com/Rishi9322/FinrationFig",
        live: "https://finration-fig.vercel.app",
        blurb:
          "The SaaS rebuild of FinRatio: credentials auth with JWT session cookies, CSRF protection, role-based access, and admin-managed feature gating.",
        stack: ["Next.js", "JWT", "RBAC"],
        year: "2026",
      },
      {
        name: "ExpenseTrack",
        image: "/projects/expensetrack.webp",
        imageAlt:
          "The ExpenseTrack landing page showing setup-time and active-vault statistics.",
        repo: "https://github.com/Rishi9322/m-mojo",
        live: "https://mmojo.vercel.app",
        caseStudy: "expensetrack",
        blurb:
          "Expense dashboard on React 19 and Turso with analytics charts, currency conversion, and a GitHub Actions pipeline that ships on every push to main.",
        stack: ["React 19", "Turso", "Chart.js"],
        year: "2026",
      },
      {
        name: "OSTAS",
        image: "/projects/ostas.webp",
        imageAlt:
          "The OSTAS sign-in screen beside its real-time crowd-sourced traffic alerts pitch.",
        repo: "https://github.com/Rishi9322/traffic",
        live: "https://traffic-one-woad.vercel.app",
        blurb:
          "Overcrowd Source Traffic Alert System — real-time, crowd-sourced traffic alerts for Indian commuters, backed by Turso SQLite.",
        stack: ["JavaScript", "Turso", "Vercel"],
        year: "2026",
      },
      {
        name: "Stu-Survey",
        repo: "https://github.com/Rishi9322/Stu-Survey",
        blurb:
          "Student satisfaction survey system with AI-assisted response analysis, built on PHP and MySQL for a college rollout.",
        stack: ["PHP", "MySQL", "AI"],
        year: "2026",
      },
      {
        name: "Canteen CMS",
        repo: "https://github.com/Rishi9322/canteen_cms",
        blurb:
          "Second-year college brief to digitise the campus canteen — kept as a working PHP/MySQL base for inventory and ordering upgrades.",
        stack: ["PHP", "MySQL"],
        year: "2026",
      },
    ],
  },
  {
    id: "automation",
    title: "Automations & AI workflows",
    note: "Pipelines that run without me — triggered by real events, not a cron I babysit.",
    projects: [
      {
        name: "Booking Confirmation Agent",
        panelNote: "Live automation — runs on every booking",
        live: "https://cal.com/rishi-poddar-qcc99l/30min",
        liveLabel: "Trigger it — book a slot",
        blurb:
          "Cal.com booking fires an Activepieces flow: Cohere's command-r7b drafts the confirmation as strict JSON, a code step parses it, and Gmail sends it to the attendee — no template, no manual reply.",
        stack: ["Activepieces", "Cohere", "Cal.com", "Gmail API"],
        year: "2026",
      },
    ],
  },
  {
    id: "web",
    title: "Web & experiments",
    note: "Smaller front-end builds — the places I try an idea before it grows up.",
    projects: [
      {
        name: "Promtify",
        image: "/projects/promtify.webp",
        imageAlt:
          "The Promtify concept site imagining life in 2050.",
        repo: "https://github.com/Rishi9322/promtify",
        live: "https://promtify-pearl.vercel.app",
        blurb:
          "A prompt-generated concept site imagining life, study, and work in 2050 — a test of how far one prompt can carry a whole design.",
        stack: ["HTML", "CSS", "JavaScript"],
        year: "2025",
      },
      {
        name: "Landingg",
        image: "/projects/landingg.webp",
        imageAlt:
          "The Landingg static marketing landing page.",
        repo: "https://github.com/Rishi9322/Landingg",
        live: "https://landingg-one.vercel.app",
        blurb:
          "A static marketing landing page built to practise layout rhythm and responsive type without a framework.",
        stack: ["HTML", "CSS"],
        year: "2025",
      },
      {
        name: "Portfolio Site",
        image: "/projects/portfolio-site.webp",
        imageAlt:
          "The React portfolio template homepage with an animated introduction.",
        repo: "https://github.com/Rishi9322/portfolio-site",
        live: "https://rishi9322.github.io/portfolio-site/",
        blurb:
          "A customisable React portfolio template — projects and skills driven entirely by JSON, animated with Framer Motion.",
        stack: ["React", "Framer Motion"],
        year: "2025",
      },
      {
        name: "Landing Page",
        image: "/projects/landing-page.webp",
        imageAlt:
          "An early CSS-only landing page layout.",
        repo: "https://github.com/Rishi9322/landing-Page",
        live: "https://rishi9322.github.io/landing-Page/",
        blurb: "An early CSS-only landing page — first proper go at a design system of my own.",
        stack: ["HTML", "CSS"],
        year: "2025",
      },
      {
        name: "Basic Quiz",
        repo: "https://github.com/Rishi9322/Basic-Quiz",
        blurb:
          "Interactive multiple-choice quiz with instant feedback and score tracking, in plain HTML, CSS, and JavaScript.",
        stack: ["HTML", "CSS", "JavaScript"],
        year: "2025",
      },
      {
        name: "GCP Lab Scripts",
        repo: "https://github.com/Rishi9322/GCP-Lab-Scripts",
        blurb:
          "Shell scripts collected while working through Google Cloud Skills Boost labs — automation for the repetitive setup steps.",
        stack: ["Shell", "GCP"],
        year: "2026",
      },
    ],
  },
];

export const allProjects: Project[] = projectGroups.flatMap((g) => g.projects);
