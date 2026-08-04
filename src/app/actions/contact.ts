"use server";

import { headers } from "next/headers";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const REASONS = [
  "Hiring / Recruiting",
  "Project or freelance work",
  "Collaboration",
  "Just saying hi",
] as const;

// Simple server-side rate limit — PRD §5.6. Per-instance in-memory is fine at
// this traffic level; upgrade to Turnstile only if spam actually appears.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

/*
  Validates a submission and mirrors it to the lead pipeline. It does NOT send
  the email.

  Web3Forms' free plan rejects server-to-server calls ("Use our API in client
  side... Pro plan is required"), so the actual send happens in the browser —
  see ConnectForm. Everything that genuinely needs the server (honeypot, IP
  rate limit, field validation) still runs here first, so the browser only ever
  sends a submission this function has already approved.
*/
export async function validateContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot — bots fill every field; humans never see this one.
  if (formData.get("company")) {
    return { status: "success" }; // silently drop
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const reason = String(formData.get("reason") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in name, email, and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email address doesn't look valid." };
  }
  if (message.length > 1000) {
    return { status: "error", message: "Message must be under 1000 characters." };
  }
  if (!REASONS.includes(reason as (typeof REASONS)[number])) {
    return { status: "error", message: "Please choose what brings you here." };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "Too many messages in a short time — please try again later.",
    };
  }

  /*
    Optional second destination: an Activepieces webhook, so form leads land in
    the same pipeline as Cal.com bookings (sheet / CRM / digest). The email
    itself goes out via Web3Forms from the browser, so a failure here must never
    block the visitor — it is logged and swallowed.
  */
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          reason,
          message,
          source: "madebyrishi-contact-form",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("[contact] webhook mirror failed", err);
    }
  }

  return { status: "success" };
}
