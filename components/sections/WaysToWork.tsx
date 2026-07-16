"use client";

import { waysToWork } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { EmberOrb } from "@/components/ui/EmberOrb";
import { PillButton } from "@/components/ui/PillButton";

type Plan = (typeof waysToWork.plans)[number];

const check = (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8.5l3.2 3.2L13 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function PlanCard({ plan, delay }: { plan: Plan; delay: number }) {
  const dark = plan.theme === "dark";

  const body = (
    <div className="relative flex h-full flex-col p-8 sm:p-10">
      <div className="flex items-center justify-between gap-3">
        <span className="mono-label" style={dark ? { color: "rgba(255,255,255,0.55)" } : undefined}>
          {plan.name}
        </span>
        <span
          className={
            dark
              ? "rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.68rem] font-medium tracking-[0.1em] text-white/70 backdrop-blur-sm"
              : "rounded-full border border-hairline-2 bg-surface-2 px-3 py-1 text-[0.68rem] font-medium tracking-[0.1em] text-ink-soft"
          }
        >
          {plan.cadence}
        </span>
      </div>

      <h3
        className={
          dark
            ? "display-light mt-5 text-[1.7rem] text-white sm:text-[1.9rem]"
            : "display-light mt-5 text-[1.7rem] text-ink sm:text-[1.9rem]"
        }
      >
        {plan.title}
      </h3>
      <p className={dark ? "mt-4 text-white/65" : "mt-4 text-ink-soft"}>{plan.body}</p>

      <span
        className={dark ? "mono-label mt-5 border-t pt-5" : "mono-label mt-7 border-t pt-6"}
        style={
          dark
            ? { color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.12)" }
            : { borderColor: "var(--color-hairline)" }
        }
      >
        {plan.includesLabel}
      </span>
      <ul
        className={
          dark
            ? "mt-2 mb-6 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2"
            : "mt-3 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2"
        }
      >
        {plan.includes.map((item) => (
          <li
            key={item}
            className={
              dark
                ? "flex items-center gap-2.5 text-[0.9rem] text-white/85"
                : "flex items-center gap-2.5 text-[0.9rem] text-ink"
            }
          >
            <span
              className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-white"
              style={{ background: "var(--ember-gradient)" }}
            >
              {check}
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div
        className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t pt-6 sm:pt-8"
        style={dark ? { borderColor: "rgba(255,255,255,0.12)" } : { borderColor: "var(--color-hairline)" }}
      >
        <div>
          <p className="mono-label" style={dark ? { color: "rgba(255,255,255,0.4)" } : undefined}>
            {plan.meta}
          </p>
          <p
            className={
              dark
                ? "mt-2 text-[1.4rem] font-semibold tracking-tight text-white"
                : "mt-2 text-[1.4rem] font-semibold tracking-tight text-ink"
            }
          >
            {plan.price}
          </p>
        </div>
        <PillButton href="#contact" variant={dark ? "light" : "dark"} arrow>
          {plan.cta}
        </PillButton>
      </div>
    </div>
  );

  if (dark) {
    return (
      <Reveal delay={delay} className="h-full">
        <div className="relative h-full overflow-hidden rounded-[26px] border border-white/10 bg-ink shadow-[0_30px_60px_-40px_rgba(0,0,0,0.6)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />
          <EmberOrb variant="ember" className="-top-[26%] -right-[20%] h-80 w-80 opacity-80" blur={64} />
          {body}
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay} className="h-full">
      <GlassCard className="h-full" tilt={false}>
        {body}
      </GlassCard>
    </Reveal>
  );
}

export function WaysToWork() {
  const [launchSprint, continuum] = waysToWork.plans;

  return (
    <Section>
      <SectionHeading label={waysToWork.label} title={waysToWork.heading} align="center" />

      <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:mt-16 sm:grid-cols-2">
        <PlanCard plan={launchSprint} delay={0} />
        <PlanCard plan={continuum} delay={0.08} />
      </div>

      <Reveal delay={0.16}>
        <div className="mx-auto mt-5 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-[22px] border border-hairline bg-surface/60 px-6 py-5 backdrop-blur-sm sm:flex-row sm:text-left">
          <div className="text-center sm:text-left">
            <p className="font-medium tracking-tight text-ink">{waysToWork.fallback.title}</p>
            <p className="mt-1 max-w-[46ch] text-[0.92rem] text-ink-soft">
              {waysToWork.fallback.body}
            </p>
          </div>
          <PillButton href={waysToWork.fallback.href} variant="ghost-glow" arrow className="shrink-0">
            {waysToWork.fallback.cta}
          </PillButton>
        </div>
      </Reveal>
    </Section>
  );
}
