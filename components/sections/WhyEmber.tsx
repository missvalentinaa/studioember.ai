"use client";

import { whyEmber } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function WhyEmber() {
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <MonoLabel>{whyEmber.label}</MonoLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-6 text-[clamp(2rem,5vw,3.4rem)]">
              One studio. <br />
              <span className="ember-text">The whole build.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[42ch] text-lg text-ink-soft">{whyEmber.body}</p>
          </Reveal>
        </div>

        <RevealGroup className="flex flex-col">
          {whyEmber.pillars.map((p, i) => (
            <RevealItem key={p.tag}>
              <div className="flex gap-6 border-t border-hairline py-8 first:border-t-0 first:pt-0">
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl font-medium tracking-tight">{p.tag}</h3>
                  <p className="mt-3 max-w-[46ch] text-ink-soft">{p.body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
