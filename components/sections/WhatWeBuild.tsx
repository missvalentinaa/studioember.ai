"use client";

import { whatWeBuild } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { EmberOrb } from "@/components/ui/EmberOrb";
import { AIReplyCard } from "@/components/ui/AIReplyCard";

const check = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8.5l3.2 3.2L13 5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function WhatWeBuild() {
  return (
    <Section id="services">
      <SectionHeading
        label={whatWeBuild.label}
        title={
          <>
            Premium web. <span className="ember-text">Useful AI.</span>
          </>
        }
        lead={whatWeBuild.body}
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {/* Websites card */}
        <Reveal>
          <GlassCard className="h-full p-8 sm:p-10">
            <div className="relative">
              <span className="mono-label">{whatWeBuild.columns[0].tag}</span>
              <h3 className="display-light mt-5 text-[1.7rem] sm:text-[2rem]">
                {whatWeBuild.columns[0].title}
              </h3>
              <p className="mt-4 max-w-[40ch] text-ink-soft">
                {whatWeBuild.columns[0].body}
              </p>
              <ul className="mt-7 space-y-2.5">
                {whatWeBuild.columns[0].points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[0.95rem] text-ink">
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                      style={{ background: "var(--ember-gradient)" }}
                    >
                      {check}
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              {/* mini browser mock */}
              <div className="mt-9 overflow-hidden rounded-2xl border border-hairline bg-surface-2/60">
                <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-hairline-2" />
                  <span className="h-2.5 w-2.5 rounded-full bg-hairline-2" />
                  <span className="h-2.5 w-2.5 rounded-full bg-hairline-2" />
                  <span className="ml-3 mono-label" style={{ fontSize: "0.6rem" }}>
                    yourstartup.com
                  </span>
                </div>
                <div className="relative h-32 overflow-hidden p-5">
                  <EmberOrb
                    variant="coral"
                    className="right-[-10%] top-[-30%] h-40 w-40 opacity-70"
                    blur={26}
                    animate={false}
                  />
                  <div className="relative">
                    <div className="h-2.5 w-24 rounded-full bg-ink/80" />
                    <div className="mt-2.5 h-2 w-40 rounded-full bg-ink/15" />
                    <div className="mt-1.5 h-2 w-32 rounded-full bg-ink/15" />
                    <div
                      className="mt-4 h-6 w-24 rounded-full"
                      style={{ background: "var(--ember-gradient)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* AI agents card */}
        <Reveal delay={0.08}>
          <GlassCard className="h-full p-8 sm:p-10">
            <span className="mono-label">{whatWeBuild.columns[1].tag}</span>
            <h3 className="display-light mt-5 text-[1.7rem] sm:text-[2rem]">
              {whatWeBuild.columns[1].title}
            </h3>
            <p className="mt-4 max-w-[40ch] text-ink-soft">{whatWeBuild.columns[1].body}</p>
            <ul className="mt-7 space-y-2.5">
              {whatWeBuild.columns[1].points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[0.95rem] text-ink">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                    style={{ background: "var(--ember-gradient)" }}
                  >
                    {check}
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <AIReplyCard />
            </div>
          </GlassCard>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-hairline pt-12 text-center sm:grid-cols-3">
        {whatWeBuild.outcomes.map((o, i) => (
          <Reveal key={o.label} delay={i * 0.06}>
            <div className="sm:border-l sm:border-hairline sm:first:border-l-0">
              <div className="ember-text animate-gradient-flow text-[3.2rem] font-semibold tracking-tight sm:text-[3.6rem]">
                {o.value}
              </div>
              <p className="mx-auto mt-2 max-w-[24ch] text-[0.92rem] leading-snug text-ink-soft">
                {o.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
