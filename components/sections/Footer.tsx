"use client";

import { footer, site } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { EmberOrb } from "@/components/ui/EmberOrb";
import { openConsentManager } from "@/lib/consent";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline">
      <EmberOrb
        variant="spectrum"
        className="bottom-[-40%] left-1/2 h-[380px] w-[700px] -translate-x-1/2 opacity-25"
        blur={70}
        animate={false}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-[32ch] text-ink-soft">{footer.blurb}</p>
            <p className="mono-label mt-8" style={{ letterSpacing: "0.14em" }}>
              {site.tagline}
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="mono-label">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-ink-soft transition-colors duration-200 hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* giant wordmark */}
        <a
          href="#top"
          aria-label="Back to top"
          className="block select-none pb-10 text-center"
        >
          <span
            className="ember-text display block text-[clamp(3rem,15vw,11rem)] leading-none"
          >
            studioember.ai
          </span>
        </a>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-hairline py-8 text-sm text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Ember Studio. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={openConsentManager}
              className="transition-colors duration-200 hover:text-ink"
            >
              Manage cookies
            </button>
            <span className="font-mono text-xs tracking-wide">{site.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
