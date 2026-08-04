import type { Metadata } from "next";
import { ConnectForm } from "@/components/ConnectForm";
import { site, booking } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rishi — hiring, freelance projects, collaborations, or just to say hi.",
};

function BookingLink({
  slot,
}: {
  slot: (typeof booking.options)[number];
}) {
  return (
    <a
      href={slot.url}
      target="_blank"
      rel="noreferrer"
      className="group block border border-border border-l-4 border-l-accent bg-background p-4 transition-colors hover:border-accent"
    >
      <span className="flex items-baseline justify-between gap-3">
        <span className="font-display text-lg font-bold group-hover:text-accent">
          {slot.label}
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {slot.minutes} min
        </span>
      </span>
      <span className="mt-1 block text-sm text-muted">{slot.note}</span>
      <span className="mt-2 block text-sm font-medium text-accent">
        Book it ↗
      </span>
    </a>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">
        Let&rsquo;s talk
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Hiring, a project, a collaboration, or just a hello — all welcome. I
        reply within 48 hours. Send a message below, or skip the back-and-forth
        and put time straight on my calendar.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[3fr_2fr]">
        <div className="max-w-xl">
          <ConnectForm />
        </div>

        {/* Never trap people in a form — PRD §5.6 */}
        <aside className="flex flex-col gap-10">
          <div>
            <h2 className="font-display text-xl font-semibold">
              Rather just talk?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Pick a slot — you will get a confirmation by email straight away.
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {booking.options.map((slot) => (
                <li key={slot.url}>
                  <BookingLink slot={slot} />
                </li>
              ))}
            </ul>
          </div>

          <div>
          <h2 className="font-display text-xl font-semibold">
            Prefer direct?
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              Email:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-accent underline underline-offset-4"
              >
                {site.email}
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a
                href={site.social.linkedin}
                className="text-accent underline underline-offset-4"
              >
                /in/rishi-poddar
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href={site.social.github}
                className="text-accent underline underline-offset-4"
              >
                @Rishi9322
              </a>
            </li>
          </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
