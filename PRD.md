# Product Requirements Document (PRD)

# Project: MADE BY RISHI

### Version 2.0 — Buildable Edition

**Product type:** Personal brand + creative portfolio + blog
**Owner/builder:** Solo developer (Rishi)
**Target v1 launch:** 6 weeks from content audit sign-off

---

## 1. Vision (Condensed)

One message: **"I take ideas from concept to reality, in whatever medium the idea needs."**

The site is editorial, minimal, and story-driven — but it is a *product*, not an art installation. Every design decision is subordinate to two jobs:

1. A recruiter or founder understands who Rishi is and finds his best work within **10 seconds**.
2. A curious visitor who stays longer gets a genuinely memorable, cinematic experience.

Job 1 is never sacrificed for Job 2.

---

## 2. Audiences and Their Time Budgets

| Audience | Time budget | Must find within that time |
|---|---|---|
| Recruiter | 30–60 sec | Name, role, top 3 projects, resume download, contact |
| Founder / client | 2–5 min | Product thinking, one full case study, how to reach out |
| Creative agency | 2–5 min | Photography/design gallery, visual quality |
| Fellow developer | 5+ min | Case study depth, architecture notes, GitHub |
| Organic search visitor | Varies | A useful blog post → who wrote it → work → contact |

**P0 requirement — Recruiter Fast Lane:** From any page, the header (or persistent minimal nav) always exposes: `Work` · `Blog` · `About` · `Resume (PDF)` · `Contact`. No hidden navigation. No intro screen that blocks content.

---

## 3. Scope

### v1 — Ship in 6 weeks (this document's requirements)
- Home
- Work (3–4 deep case studies)
- Gallery (photography + design, combined)
- Blog (launch with 3 posts)
- About
- Contact (with connect form)
- Resume (PDF, one click from anywhere)

### v2 — Only after v1 is live and indexed
- One signature Three.js/WebGL moment on Home (behind `prefers-reduced-motion` and mobile fallback)
- Poster/campaign interactive case studies
- Film/reel page with lazy-loaded video
- Newsletter signup

### v3 — Earn it
- Archive (searchable everything-collection)
- Community documentary section
- Recruiter mode / resume customization
- AI assistant, visitor achievements, 3D studio walkthrough

Nothing from v2/v3 may be started before v1 is deployed to production. This is a hard rule.

---

## 4. Pre-Build Gate: Content Audit (Week 0)

Code does not start until this checklist is answered honestly:

- [ ] 3–4 projects chosen for case studies — each with: problem statement, 4–8 screenshots or renders, outcome/metrics, 1 lesson learned
- [ ] 20–30 photographs selected, edited, exported (web-optimized WebP/AVIF)
- [ ] 5–10 design/poster pieces exported
- [ ] Resume PDF finalized (1 page)
- [ ] 3 blog posts drafted (see §8)
- [ ] Headshot or workspace photo for About
- [ ] All copy written in a doc before build (Home headline, About, case study text)

If a project lacks media, it is cut from v1 — not padded with placeholders. **Three excellent case studies beat six thin ones.**

---

## 4A. Brand Voice & Signature Motif (personality layer — no architecture change)

The structure in §5 stays as-is (Work / Gallery / Blog / About / Contact remain separate, findable sections — recruiters, Google, and returning visitors all need direct entry points). This section is about *how each of those sections speaks*, not about merging them.

### Positioning line
Replace the placeholder "Creative technologist — I build products, shoot stories, and design experiences" before launch. It must be written from Rishi's actual specifics, not a generic label — e.g. built around real recurring behavior (staying late at events to shoot photos, designing a poster before touching code, carrying a camera to every meetup). Draft 3–5 real candidates during Week 0 content audit and pick the one that couldn't apply to someone else.

### Signature motif
Every case study and select gallery/blog pieces should visibly trace the same arc, used as a lightweight recurring visual/structural device (a small progress rail or section markers), not a new page type:

```
Spark (the rough idea/sketch) → Shape (design/moodboard) → Build → Launch → Capture (photo/reel) → Reflection
```

This replaces the generic "Overview → Problem → Approach → Design → Build → Lessons" template in §5.2 case studies. Same information, told as "the first sketch, the first build, the first real feedback" rather than as a status report. Applies to case study copy and structure — no new engineering work required.

### About section
Must include the specific, human detail flagged as missing in review: what Rishi actually does (stays after events to shoot, designs posters overnight, covers festivals) — 2–3 concrete sentences, not adjectives. This is a copywriting requirement for Week 0, not a scope addition.

### Blog personality (refines §8, does not replace it)
Alongside the SEO-structured technical posts, include process/personality posts in the launch set of 3: e.g. "What covering 30 college events taught me about storytelling," "How I design posters before writing code." Both post types keep the full technical SEO treatment from §8 — personality and ranking aren't in tension.

### What stays out of v1
Full event-level cross-linking (poster → landing page → photos → reel → reflection as one interconnected unit) is a real idea but is v2/v3 scope — it requires a content model (tags/relations across MDX collections) not yet built. Note it in v2 planning; do not let it delay v1.

---

## 5. Page Requirements (v1)

### 5.1 Home
- Above the fold: name, one-line positioning ("Creative technologist — I build products, shoot stories, and design experiences"), 3 featured work thumbnails, Resume + Contact buttons.
- One tasteful signature animation (typographic reveal or scroll-linked image sequence via Framer Motion). No scroll-jacking, no black-screen intro, no sound.
- Below the fold: short process strip (Idea → Design → Build → Capture → Ship), latest 2 blog posts, footer with socials.
- Loads meaningful content in < 1.5s on 4G.

### 5.2 Work
- Index: 3–4 large editorial cards (title, one-line outcome, hero image).
- Case study template (MDX): Overview → Problem → Approach → Design → Build (with 1–2 highlighted code moments, not screenshots) → Result/impact → Lessons. 800–1500 words each.
- Each case study has its own OG image and meta description (these pages are SEO assets too).

### 5.3 Gallery
- Single combined page: Photography and Design as filterable tabs.
- Masonry/editorial grid, lazy-loaded, lightbox on click, one-line story caption per piece.
- No hover-only content (touch devices must see everything).

### 5.4 Blog — SEO Engine (new in v2 of this PRD)
See §8. This is the primary organic-traffic driver; the portfolio alone will rank only for "Rishi's name".

### 5.5 About
- 150–250 words, human tone, photo, skills list (grouped, honest), community/leadership as 3–4 lines with links — not a "documentary" (deferred to v3).

### 5.6 Contact + Connect Form (new in v2 of this PRD)
**Purpose:** convert interested visitors into conversations.

Form fields:
- Name (required)
- Email (required, validated)
- "What brings you here?" — select: `Hiring / Recruiting` · `Project or freelance work` · `Collaboration` · `Just saying hi`
- Message (required, max 1000 chars)

Behavior:
- Submission via a Next.js server action / API route → email notification via **Resend** (free tier) — no database needed. (Alternative if zero-code preferred: Web3Forms or Formspree free tier.)
- Spam protection: honeypot field + server-side rate limit + Cloudflare Turnstile if spam appears. No visible CAPTCHA by default.
- Success state inline ("Got it — I reply within 48 hours."). Failure state with mailto fallback.
- Also list direct email and LinkedIn/GitHub links beside the form — never trap people in a form.
- The form (compact version) also appears at the end of every case study and blog post: "Found this interesting? Let's talk." — this is the connect mechanism for engaged readers, placed where interest peaks.

### 5.7 Resume
- Static PDF served from the site, tracked as a custom analytics event (`resume_download`).

---

## 6. Design Direction (Kept from v1 PRD, constrained)

- Editorial, minimal, warm monochrome (near-black / warm white), one accent color — pick **one** of soft blue / warm orange / emerald and commit.
- Massive editorial typography for section openers; body text stays readable (16–18px, 65–75ch measure).
- Motion: Framer Motion only in v1. Reveal-on-scroll, page transitions, image parallax ≤ 10%. Everything respects `prefers-reduced-motion`.
- Explicitly out for v1: sound design, custom cursor, keyboard shortcuts, 3D scenes, autoplaying video.

---

## 7. Technical Stack (v1 — Final)

| Layer | Choice | Note |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | SSG/ISR for everything |
| Styling | Tailwind CSS | |
| Motion | Framer Motion | GSAP/R3F deferred to v2 |
| Content | MDX in the repo (Contentlayer or `next-mdx-remote`) | Case studies + blog posts as files; no CMS, no database |
| Images | `next/image` + assets in repo or Cloudinary free tier | AVIF/WebP, blur placeholders |
| Form email | Resend (or Web3Forms) | No backend server |
| Analytics | Vercel Analytics **or** Plausible — one only | Custom events: `resume_download`, `form_submit`, `case_study_complete` |
| Hosting | Vercel free tier | |

**Removed from original PRD:** Express, PostgreSQL, Prisma, Supabase, Vercel Blob, Sanity, Notion API, PostHog, Google Analytics, Cloudflare hosting. Monthly cost target: **₹0**.

---

## 8. Blog Requirements (SEO Engine)

### Content strategy
- Niche: build-in-public engineering + creative process. Post types that rank and demonstrate skill:
  1. **Case-study breakdowns** ("How I built X — architecture and tradeoffs")
  2. **Tutorials/how-tos** on specific problems solved (long-tail keywords: e.g. "smooth scroll animations Framer Motion Next.js")
  3. **Process/opinion pieces** (design decisions, photography workflow)
- Launch with 3 posts; cadence 2/month minimum. An empty or stale blog is worse for credibility than no blog.
- Each post: 1000–2000 words, one target keyword phrase, descriptive H2/H3 structure, images with alt text, internal links to relevant case studies, compact connect-form CTA at the end.

### Technical SEO (P0)
- Unique `<title>` and meta description per page/post; canonical URLs.
- Open Graph + Twitter card images (auto-generated per post via `@vercel/og` or a template).
- `sitemap.xml` and `robots.txt` auto-generated; RSS feed.
- Structured data: `Person` (site-wide), `Article` (posts), `CreativeWork` (case studies), `BreadcrumbList`.
- Clean URLs: `/blog/slug`, `/work/slug`.
- Reading time, published/updated dates, tag pages (noindex tag pages until there are 5+ posts per tag).
- Core Web Vitals green on mobile — this is a ranking factor and the real performance budget (see §10).
- Submit to Google Search Console at launch; monitor indexing weekly.

---

## 9. Accessibility (P0 — was absent from v1 PRD)

- WCAG 2.1 AA contrast on all text.
- Full keyboard navigability; visible focus states.
- `prefers-reduced-motion` disables all non-essential animation.
- Alt text on every image; captions are real text, not baked into images.
- No autoplaying media with sound; no hover-only information.
- Semantic HTML landmarks; skip-to-content link.

---

## 10. Performance Budget (Realistic)

Measured on mobile, Lighthouse throttled:

- LCP < 2.5s · CLS < 0.1 · INP < 200ms (Core Web Vitals green)
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on Home, Work index, and Blog posts
- JS shipped on Home < 200KB gzipped in v1
- v2's WebGL page is exempt from the JS budget but must lazy-load and never affect other routes

---

## 11. Success Metrics (Measurable)

Review 30 and 90 days post-launch:

- `resume_download` events ≥ 15/month
- Connect-form submissions ≥ 5/month, with ≥ 1 from `Hiring` or `Project` category
- Median case-study scroll depth ≥ 60%
- Mobile bounce rate on Home < 55%
- Blog: 3 posts indexed within 30 days; ≥ 200 organic sessions/month by day 90
- Site referenced in ≥ 1 interview/client call ("I saw your site")

---

## 12. Timeline (Solo, ~10–15 hrs/week)

| Week | Deliverable |
|---|---|
| 0 | Content audit complete (§4 gate passed); copy drafted |
| 1 | Repo, design tokens, layout shell, nav/footer, About |
| 2 | Home page complete with signature animation |
| 3 | Case study template + 2 case studies live locally |
| 4 | Remaining case studies + Gallery |
| 5 | Blog engine + 3 posts + full SEO pass (meta, sitemap, structured data, OG) |
| 6 | Contact form + analytics events + a11y and performance pass → **deploy** |
| 7+ | Search Console, fix indexing issues, start v2 planning only if metrics justify it |

If content audit isn't done, the timeline hasn't started. Content slippage is the #1 risk.

---

## 13. Hard Rules

1. No v2/v3 feature work before v1 ships.
2. No page ships without meta tags, alt text, and mobile QA.
3. Nothing blocks the Recruiter Fast Lane — ever.
4. One accent color, one analytics tool, one form provider, zero databases.
5. Blog cadence (2/month) is a commitment, not an aspiration — otherwise cut the blog.

---

## 14. Analytics & Tracking Setup (P0 — launch day)

Analytics covers four distinct questions, each with its own tool. Total setup time: under 1 hour, cost ₹0.

### 14.1 Site traffic — who visits
- **Vercel Analytics** (chosen tool per §7). Install: `npm i @vercel/analytics`, add `<Analytics />` in the root layout.
- Dashboard provides: visitors, page views, top pages, referrers, countries, devices.
- GA4 explicitly rejected: overkill, cookie-consent burden, poor dashboard for a portfolio.

### 14.2 Visitor behavior — custom events
Page views alone don't prove the site works. Fire custom events at the conversion moments; these feed the §11 success metrics directly:

```ts
import { track } from '@vercel/analytics';

track('resume_download');          // Resume button click
track('form_submit', { reason });  // connect-form success (reason = dropdown value)
track('case_study_complete');      // reader reaches end of a case study
```

### 14.3 Shared-link tracking — who clicked the link
- **UTM parameters** on every shared URL, one per channel:
  `?utm_source=linkedin` · `?utm_source=whatsapp` · `?utm_source=email` · `?utm_source=resume`
  Analytics dashboard then attributes visitors by source automatically.
- **Dub.co free tier** (or Bitly) for one-to-one sends: a short link with a per-click counter shows whether a specific recipient (e.g. a recruiter) actually opened it — counted server-side, so ad-blockers can't hide it.
- Rule: the bare URL is never shared in outreach — always a UTM-tagged or shortened link.

### 14.4 Search performance — who found it on Google
- **Google Search Console**: verify domain and submit `sitemap.xml` on launch day (not Week 7 — moved up).
- Provides impressions, search clicks, CTR, and ranking keywords — data unavailable in any client-side analytics.
- Review weekly for the first 90 days; fix indexing errors within a week of appearing.

### 14.5 Reporting cadence
- Monthly 15-minute review against §11 metrics: resume downloads, form submissions by reason, case-study completion, top referrer sources, Search Console clicks.
- Decisions come from this review (e.g. which case study to promote, which blog topics to double down on) — analytics that don't change behavior are decoration.