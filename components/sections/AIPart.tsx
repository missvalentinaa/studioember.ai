"use client";

import Image from "next/image";
import { aiPart } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AIAgentDemo } from "@/components/ui/AIAgentDemo";

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

      {/* Laptop mockup with the agent card sat on the screen — large viewports only,
          since the screen area gets too small to hold readable text below ~1024px. */}
      <Reveal delay={0.08}>
        <div className="relative mx-auto mt-8 hidden w-full max-w-2xl lg:block">
          <Image
            src="/software/laptop-gradient-screen.png"
            alt="Laptop displaying a soft gradient screen"
            width={1074}
            height={734}
            className="h-auto w-full select-none"
            priority={false}
          />
          <div
            className="absolute flex items-center justify-center"
            style={{ top: "5%", bottom: "22.6%", left: "13.3%", right: "13.8%" }}
          >
            <div className="w-[82%] max-w-[420px]">
              <AIAgentDemo compact />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="relative mx-auto mt-16 max-w-2xl lg:hidden">
          <div
            aria-hidden="true"
            className="animate-gradient-flow pointer-events-none absolute -inset-4 rounded-[40px] opacity-70 blur-2xl sm:-inset-6"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #9640a8 0%, #cb72b8 25%, #f9a074 50%, #f4c0c7 75%, #9640a8 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="animate-gradient-flow pointer-events-none absolute -inset-2 rounded-[36px] opacity-90"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #9640a8 0%, #cb72b8 25%, #f9a074 50%, #f4c0c7 75%, #9640a8 100%)",
              animationDuration: "22s",
            }}
          />
          <div className="relative">
            <AIAgentDemo />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mx-auto mt-14 max-w-3xl text-center">
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
