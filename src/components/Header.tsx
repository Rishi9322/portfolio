import Link from "next/link";
import { nav } from "@/lib/site";
import { ResumeLink } from "./ResumeLink";

/*
  Recruiter Fast Lane — PRD §2 (P0):
  Work · Blog · About · Resume (PDF) · Contact always visible from any page.
  No hamburger, no hidden navigation — links wrap on small screens instead.
*/
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4">
        <Link
          href="/"
          className="font-display text-lg font-bold uppercase tracking-tight"
        >
          Made by Rishi<span className="text-accent">.</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-foreground/80 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <ResumeLink className="rounded-full border border-foreground px-3.5 py-1.5 font-medium transition-colors hover:border-accent hover:text-accent">
                Resume (PDF)
              </ResumeLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
