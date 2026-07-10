"use client";

import { aiPart } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<string, React.ReactNode> = {
  Support: (
    <path
      d="M5 13a7 7 0 0 1 14 0M4 13v3a2 2 0 0 0 2 2M20 13v2a4 4 0 0 1-4 4h-2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  Onboarding: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M15 9l-2.4 4.6L8 16l2.4-4.6L15 9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </>
  ),
  Workflows: (
    <>
      <rect x="3" y="4" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="16" y="15" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 6.5h5a3 3 0 0 1 3 3v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
};

export function AIPart() {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.12] blur-3xl"
          style={{ background: "var(--ember-gradient)" }}
        />
      </div>

      <SectionHeading
        label={aiPart.label}
        title={
          <>
            Software that <span className="ember-text">does something.</span>
          </>
        }
        lead={aiPart.body}
        align="center"
      />

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {aiPart.cards.map((c, i) => (
          <Reveal key={c.tag} delay={i * 0.08}>
            <div className="group h-full rounded-[24px] border border-hairline bg-surface/60 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-hairline-2 hover:shadow-[0_30px_60px_-40px_rgba(26,22,20,0.4)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-hairline bg-surface-2/70 text-ink">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {icons[c.tag]}
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium tracking-tight">{c.tag}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-[clamp(1.4rem,3.4vw,2.1rem)] font-medium leading-snug tracking-tight">
            <span className="text-faint">{aiPart.ruleA}</span>
            <br />
            <span className="ember-text">{aiPart.ruleB}</span>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
