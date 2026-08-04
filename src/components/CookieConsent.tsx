"use client";

import { useCallback, useEffect, useState } from "react";

/*
  Analytics consent gate.

  Nothing that sets a cookie runs until the visitor opts in. The GA tag is
  present from page load (so Google can verify the install) but starts under
  Consent Mode v2 with analytics_storage DENIED, writing no cookie; accepting
  sends the consent "update" that switches it on. Clarity has no equivalent, so
  it is not loaded at all until consent. The choice is remembered in
  localStorage (not a cookie, so the banner itself never sets one) and can be
  changed from the footer.

  Sentry is deliberately NOT gated here — it records errors, sets no tracking
  cookie, and is configured with sendDefaultPii: false.
*/

const STORAGE_KEY = "analytics-consent";
export const CONSENT_CHANGED_EVENT = "analytics-consent-change";

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null; // private mode / storage blocked
  }
}

/** Lets the footer re-open the banner. */
export function openCookieSettings() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

export function CookieConsent() {
  // `undefined` = not yet read on the client; avoids a flash of the banner.
  const [consent, setConsent] = useState<Consent | undefined>(undefined);

  const sync = useCallback(() => setConsent(readConsent()), []);

  useEffect(() => {
    sync();
    window.addEventListener(CONSENT_CHANGED_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, sync);
  }, [sync]);

  // Tell gtag the moment consent changes, both ways.
  useEffect(() => {
    if (consent === undefined) return;
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (!gtag) return;
    gtag("consent", "update", {
      analytics_storage: consent === "granted" ? "granted" : "denied",
    });
  }, [consent]);

  // Start Clarity only once consent is granted.
  useEffect(() => {
    if (consent !== "granted") return;
    const id = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (!id || process.env.NODE_ENV !== "production") return;

    let cancelled = false;
    import("@microsoft/clarity")
      .then(({ default: Clarity }) => {
        if (cancelled) return;
        Clarity.init(id);
        Clarity.consent(true);
      })
      .catch((err) => console.error("[consent] Clarity init failed", err));
    return () => {
      cancelled = true;
    };
  }, [consent]);

  const choose = (value: Exclude<Consent, null>) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setConsent(value);
  };

  return (
    <>
      {consent === null && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-heading"
          className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-accent bg-background/95 backdrop-blur"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                id="cookie-consent-heading"
                className="font-display text-base font-bold uppercase tracking-tight"
              >
                Analytics cookies
              </p>
              <p className="mt-1 max-w-xl text-sm text-muted">
                I use Google Analytics and Microsoft Clarity to see which work
                people actually read. No cookies are stored until you say yes,
                and I never sell or share the data.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
