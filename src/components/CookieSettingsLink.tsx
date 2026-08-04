"use client";

import { openCookieSettings } from "./CookieConsent";

/* Lets a visitor reopen the consent banner and change their answer. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="underline underline-offset-4 hover:text-accent"
    >
      Cookie settings
    </button>
  );
}
