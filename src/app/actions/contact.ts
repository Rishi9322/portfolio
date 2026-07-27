"use server";

import { headers } from "next/headers";
import { site } from "@/lib/site";

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

export async function submitContact(
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev / not-yet-configured: log instead of sending so the form is testable.
    console.log("[contact] (RESEND_API_KEY not set)", { name, email, reason, message });
    return { status: "success" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [site.email],
        reply_to: email,
        subject: `[madebyrishi] ${reason} — ${name}`,
        text: `From: ${name} <${email}>\nReason: ${reason}\n\n${message}`,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return { status: "success" };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { status: "error", message: "Sending failed." };
  }
}
