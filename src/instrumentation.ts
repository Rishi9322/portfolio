import * as Sentry from "@sentry/nextjs";

/*
  Server + edge error tracking. Everything is gated on SENTRY_DSN so a missing
  DSN is a no-op rather than a crash — local dev and preview builds stay quiet
  until the key is set.
*/
export async function register() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.VERCEL_ENV ?? "development",
    // Portfolio traffic is low; sample everything so a rare error is never missed.
    tracesSampleRate: 1,
    // Never ship PII from a contact form to a third party.
    sendDefaultPii: false,
    enabled: process.env.NODE_ENV === "production",
  });
}

export const onRequestError = Sentry.captureRequestError;
