"use client";

import { waysToWork } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { EmberOrb } from "@/components/ui/EmberOrb";
import { clsx } from "@/lib/clsx";

type Plan = (typeof waysToWork.plans)[number];

const check = (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8.5l3.2 3.2L13 5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function PlanCard({ plan }: { plan: Plan }) {
  const body = (
    <div
      className={clsx(
        "relative flex h-full flex-col rounded-[26px] p-8 sm:p-10",
        plan.featured
          ? "bg-surface"
          : "border border-hairline bg-surface/60 backdrop-blur-sm",
      )}
    >
      {plan.featured && (
        <EmberOrb
          variant="spectrum"
          className="right-[-6%] top-[-10%] h-40 w-40 opacity-40"
          blur={40}
        />
      )}
      <div className="relative flex items-center justify-between">
        <span className="mono-label">{plan.name}</span>
        {plan.featured && (
          <span
            className="rounded-full px-3 py-1 text-[0.68rem] font-medium text-white"
            style={{ background: "var(--ember-gradient)" }}
          >
            Most chosen
          </span>
        )}
      </div>

      <h3 className="display-light relative mt-6 text-[1.6rem] sm:text-[1.9rem]">
        {plan.title}
      </h3>
      <p className="relative mt-4 text-ink-soft">{plan.body}</p>

      <ul className="relative mt-8 space-y-3 border-t border-hairline pt-8">
        {plan.includes.map((item) => (
          <li key={item} className="flex items-center gap-3 text-[0.95rem] text-ink">
            <span
              className={clsx(
                "flex h-5 w-5 items-center justify-center rounded-full",
                plan.featured ? "text-white" : "text-white",
              )}
              style={{
                background: plan.featured ? "var(--ember-gradient)" : "#1a1614",
              }}
            >
              {check}
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="relative mt-8 border-t border-hairline pt-8">
        <p className="mono-label" style={{ letterSpacing: "0.14em" }}>
          {plan.meta}
        </p>
        <p className="mt-4 text-[1.9rem] font-semibold tracking-tight text-ink">
          {plan.price}
        </p>
        <div className="mt-6">
          <PillButton
            href="#contact"
            variant={plan.featured ? "primary" : "dark"}
            arrow
            className="w-full py-3.5"
          >
            {plan.cta}
          </PillButton>
        </div>
      </div>
    </div>
  );

  if (plan.featured) {
    return (
      <div className="relative">
        <div
          className="absolute -inset-[1.5px] rounded-[27px] opacity-90"
          style={{ background: "var(--ember-gradient)" }}
        />
        <div
          className="absolute -inset-6 -z-10 rounded-[40px] opacity-30 blur-2xl"
          style={{ background: "var(--ember-gradient)" }}
        />
        <div className="relative">{body}</div>
      </div>
    );
  }
  return body;
}

export function WaysToWork() {
  return (
    <Section className="relative">
      <SectionHeading
        label={waysToWork.label}
        title={waysToWork.heading}
        align="center"
      />
      <div className="mx-auto mt-16 grid max-w-4xl items-stretch gap-6 lg:grid-cols-2">
        {waysToWork.plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className="h-full">
            <PlanCard plan={p} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-[22px] border border-hairline bg-surface/60 px-6 py-5 backdrop-blur-sm sm:flex-row sm:text-left">
          <div className="text-center sm:text-left">
            <p className="font-medium tracking-tight text-ink">{waysToWork.fallback.title}</p>
            <p className="mt-1 max-w-[46ch] text-[0.92rem] text-ink-soft">
              {waysToWork.fallback.body}
            </p>
          </div>
          <PillButton href={waysToWork.fallback.href} variant="ghost" arrow className="shrink-0">
            {waysToWork.fallback.cta}
          </PillButton>
        </div>
      </Reveal>
    </Section>
  );
}
