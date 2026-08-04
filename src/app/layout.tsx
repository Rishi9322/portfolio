import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@next/third-parties/google";
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

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
          Google Consent Mode v2. The tag loads on every page (so GA can verify
          installation and so nothing is lost between page load and the click),
          but every storage type starts DENIED — gtag holds events in memory and
          writes no cookie until CookieConsent calls consent "update".
        */}
        {gaId && (
          <>
            <Script id="gtag-consent-default" strategy="beforeInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent','default',{
                  ad_storage:'denied',
                  ad_user_data:'denied',
                  ad_personalization:'denied',
                  analytics_storage:'denied',
                  wait_for_update: 500
                });`}
            </Script>
            <GoogleAnalytics gaId={gaId} />
          </>
        )}
        {/*
          Consent gate: flips GA storage on and starts Clarity (which has no
          consent-mode equivalent) only after the visitor opts in. Vercel
          Analytics stays outside it — it is cookieless.
        */}
        <CookieConsent />
        <WebMCPTools data={mcpData} />
      </body>
    </html>
  );
}
