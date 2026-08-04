import * as Sentry from "@sentry/nextjs";

/*
  Client-side error tracking, initialised before the app becomes interactive.

  Gated on its env var, so a missing DSN is a no-op instead of a crash, and the
  init is wrapped so a failure here never takes down the page.
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

// Clarity and GA are NOT started here — they set cookies, so they load only
// after the visitor opts in. See components/CookieConsent.tsx.

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
