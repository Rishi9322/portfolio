import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { CookieConsent } from "@/components/CookieConsent";
import { WebMCPTools, type WebMCPData } from "@/components/WebMCPTools";
import { getWork, getFeedPosts } from "@/lib/content";
import { allProjects } from "@/lib/projects";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site, booking } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Rishi Poddar, Software Engineer`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
};

// Structured data: Person, site-wide — PRD §8
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.author,
  url: site.url,
  jobTitle: "Software Engineer",
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressCountry: "IN",
  },
  sameAs: [site.social.github, site.social.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read-only snapshot handed to WebMCP so browser agents can query the site.
  const mcpData: WebMCPData = {
    projects: allProjects.map((p) => ({
      name: p.name,
      blurb: p.blurb,
      stack: [...p.stack],
      year: p.year,
      url: p.live ?? p.repo,
    })),
    work: getWork().map((w) => ({
      title: w.frontmatter.title,
      outcome: w.frontmatter.outcome,
      url: `${site.url}/work/${w.slug}`,
      tags: w.frontmatter.tags ?? [],
    })),
    posts: getFeedPosts().map((p) => ({
      title: p.title,
      description: p.description,
      url: p.external ? p.href : `${site.url}${p.href}`,
      date: p.date,
      source: p.source ?? "madebyrishi",
    })),
    contact: {
      email: site.email,
      booking: booking.options.map((b) => ({
        label: b.label,
        minutes: b.minutes,
        url: b.url,
      })),
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Analytics />
        {/*
          Consent gate: renders GA4 and starts Clarity only after the visitor
          opts in. Vercel Analytics stays outside it — it is cookieless.
        */}
        <CookieConsent />
        <WebMCPTools data={mcpData} />
      </body>
    </html>
  );
}
