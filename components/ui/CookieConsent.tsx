"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cookieConsent as copy } from "@/lib/content";
import { PillButton } from "@/components/ui/PillButton";
import {
  CONSENT_OPEN_EVENT,
  getConsent,
  setConsent,
} from "@/lib/consent";
import { clsx } from "@/lib/clsx";

/**
 * A slim, dismissible bar — not a full-screen gate. The rest of the site
 * stays usable and visible while a decision is pending, which is both
 * friendlier and squarely within what GDPR/ePrivacy expect (no cookie wall,
 * reject as easy as accept, nothing non-essential set before consent).
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
    const onOpen = () => {
      setAnalytics(getConsent()?.analytics ?? false);
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  const decide = (withAnalytics: boolean) => {
    setConsent(withAnalytics);
    setVisible(false);
    setExpanded(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          aria-modal="false"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-hairline bg-surface/95 shadow-[0_-12px_40px_-24px_rgba(26,22,20,0.35)] backdrop-blur-xl"
        >
          <div className="h-[2px] w-full" style={{ background: "var(--ember-gradient)" }} aria-hidden="true" />

          <div className="mx-auto w-full max-w-6xl px-5 py-3 sm:px-8 sm:py-3.5">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p className="text-[0.85rem] leading-snug text-ink-soft sm:pr-6">
                <span className="font-medium text-ink">{copy.heading}</span>{" "}
                {copy.body}{" "}
                <a
                  href={copy.policyHref}
                  className="text-ink underline underline-offset-2 hover:text-ink-soft"
                >
                  {copy.policyLabel}
                </a>
                .
              </p>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="rounded-full border border-hairline-2 bg-surface/60 px-4 py-2 text-[0.82rem] font-medium text-ink transition-colors duration-200 hover:border-ink/25"
                >
                  {copy.manage}
                </button>
                <button
                  type="button"
                  onClick={() => decide(false)}
                  className="rounded-full border border-hairline-2 bg-surface/60 px-4 py-2 text-[0.82rem] font-medium text-ink transition-colors duration-200 hover:border-ink/25"
                >
                  {copy.reject}
                </button>
                <PillButton onClick={() => decide(true)} className="px-4 py-2 text-[0.82rem]">
                  {copy.accept}
                </PillButton>
              </div>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 flex flex-col gap-2 border-t border-hairline pt-3">
                    {copy.categories.map((cat) => {
                      const checked = cat.key === "essential" ? true : analytics;
                      return (
                        <label
                          key={cat.key}
                          className={clsx(
                            "flex items-center justify-between gap-4 rounded-xl border border-hairline bg-surface-2/60 px-3.5 py-2.5",
                            cat.locked && "opacity-80",
                          )}
                        >
                          <span className="flex items-baseline gap-2">
                            <span className="mono-label" style={{ letterSpacing: "0.12em" }}>
                              {cat.title}
                            </span>
                            <span className="text-[0.82rem] text-ink-soft">{cat.body}</span>
                          </span>
                          <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
                            <input
                              type="checkbox"
                              checked={checked}
                              disabled={cat.locked}
                              onChange={(e) => setAnalytics(e.target.checked)}
                              className="peer sr-only"
                            />
                            <span
                              aria-hidden="true"
                              className={clsx(
                                "absolute inset-0 rounded-full transition-colors duration-200",
                                checked ? "" : "bg-hairline-2",
                              )}
                              style={checked ? { background: "var(--ember-gradient)" } : undefined}
                            />
                            <span
                              aria-hidden="true"
                              className={clsx(
                                "absolute h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200",
                                checked ? "translate-x-[18px]" : "translate-x-1",
                              )}
                            />
                          </span>
                        </label>
                      );
                    })}
                    <div className="flex justify-end pt-0.5">
                      <PillButton onClick={() => decide(analytics)} className="px-5 py-2 text-[0.82rem]">
                        {copy.save}
                      </PillButton>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
