import * as Sentry from "@sentry/nextjs";
import Clarity from "@microsoft/clarity";

/*
  Client-side observability, initialised before the app becomes interactive.

  Each tool is gated on its own env var, so a missing key is a no-op instead of
  a crash, and every init is wrapped — a failure in one must never take down
  the others or the page itself.
*/

// Sentry — errors and traces.
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  try {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.VERCEL_ENV ?? "development",
      tracesSampleRate: 1,
      // Never ship contact-form PII to a third party.
      sendDefaultPii: false,
      enabled: process.env.NODE_ENV === "production",
    });
  } catch (err) {
    console.error("[instrumentation] Sentry init failed", err);
  }
}

// Microsoft Clarity — session replay and heatmaps.
if (process.env.NEXT_PUBLIC_CLARITY_ID && process.env.NODE_ENV === "production") {
  try {
    Clarity.init(process.env.NEXT_PUBLIC_CLARITY_ID);
  } catch (err) {
    console.error("[instrumentation] Clarity init failed", err);
  }
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
