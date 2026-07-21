/* ------------------------------------------------------------------ *
 *  Cookie/consent state — shared between the consent bar and anything
 *  that needs to gate on it (e.g. analytics loaded in the future).
 *
 *  Nothing non-essential ships today: no analytics, no ad pixels. This
 *  just gives us a compliant, working switch to flip on when that changes,
 *  instead of retrofitting consent after the fact.
 * ------------------------------------------------------------------ */

export type ConsentChoice = {
  essential: true;
  analytics: boolean;
  decidedAt: string;
};

const STORAGE_KEY = "ember-consent";
export const CONSENT_CHANGE_EVENT = "ember-consent-change";
export const CONSENT_OPEN_EVENT = "ember-consent-open";

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentChoice;
  } catch {
    return null;
  }
}

export function setConsent(analytics: boolean) {
  if (typeof window === "undefined") return;
  const choice: ConsentChoice = {
    essential: true,
    analytics,
    decidedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: choice }));
}

/** Reopens the consent bar so a visitor can change their mind at any time. */
export function openConsentManager() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
