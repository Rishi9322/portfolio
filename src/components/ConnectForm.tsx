"use client";

import { useActionState } from "react";
import { track } from "@vercel/analytics";
import { validateContact, type ContactState } from "@/app/actions/contact";
import { site } from "@/lib/site";

const REASONS = [
  "Hiring / Recruiting",
  "Project or freelance work",
  "Collaboration",
  "Just saying hi",
];

/*
  Web3Forms access keys are designed to live in the client — that is the only
  way their free plan accepts submissions, so this is a published identifier
  rather than a leaked secret. The server still validates and rate-limits
  every submission before the browser is allowed to send it.
*/
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

async function sendToWeb3Forms(formData: FormData): Promise<boolean> {
  if (!WEB3FORMS_KEY) {
    // Not configured (local dev): treat as sent so the form stays testable.
    console.warn("[contact] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY not set — skipping send");
    return true;
  }
  const name = String(formData.get("name") ?? "");
  const reason = String(formData.get("reason") ?? "");

  const payload = new FormData();
  payload.append("access_key", WEB3FORMS_KEY);
  payload.append("subject", `[madebyrishi] ${reason} — ${name}`);
  payload.append("from_name", name);
  payload.append("name", name);
  payload.append("email", String(formData.get("email") ?? ""));
  payload.append("reason", reason);
  payload.append("message", String(formData.get("message") ?? ""));

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: payload,
    });
    const data = (await res.json()) as { success?: boolean };
    return res.ok && data.success === true;
  } catch {
    return false;
  }
}

/*
  Connect form — PRD §5.6. `compact` renders the end-of-article variant
  ("Found this interesting? Let's talk.") used on case studies and blog posts.
*/
export function ConnectForm({ compact = false }: { compact?: boolean }) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    async (prev, formData) => {
      // Server first: honeypot, validation, rate limit.
      const checked = await validateContact(prev, formData);
      if (checked.status !== "success") return checked;

      // Then the browser sends it — the only path Web3Forms' free plan allows.
      const sent = await sendToWeb3Forms(formData);
      if (!sent) {
        return { status: "error", message: "Sending failed." };
      }

      track("form_submit", {
        reason: String(formData.get("reason") ?? "unknown"),
      });
      return { status: "success" };
    },
    { status: "idle" }
  );

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-lg border border-border bg-subtle px-5 py-4 text-sm"
      >
        Got it — I reply within 48 hours.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {compact && (
        <p className="font-display text-xl font-semibold">
          Found this interesting? Let&rsquo;s talk.
        </p>
      )}

      {/* Honeypot — hidden from humans, tabbed past by screen readers */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={compact ? "flex flex-col gap-4 sm:flex-row" : "flex flex-col gap-4"}>
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reason" className="text-sm font-medium">
          What brings you here?
        </label>
        <select
          id="reason"
          name="reason"
          required
          defaultValue={REASONS[0]}
          className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm"
        >
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={1000}
          rows={compact ? 3 : 5}
          className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm"
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-accent">
          {state.message ?? "Something went wrong."} You can also email me
          directly at{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
