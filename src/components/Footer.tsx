import Link from "next/link";
import { site, nav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold uppercase">
            Made by Rishi<span className="text-accent">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            I take ideas from concept to reality, in whatever medium the idea
            needs.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-foreground/80 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-col gap-2 text-sm">
          <li>
            <a href={site.social.github} className="hover:text-accent">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.social.linkedin} className="hover:text-accent">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              {site.email}
            </a>
          </li>
        </ul>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-8 text-xs text-muted">
        © {new Date().getFullYear()} Rishi. Built with Next.js — no cookies, no
        trackers beyond privacy-friendly analytics.
      </div>
    </footer>
  );
}
