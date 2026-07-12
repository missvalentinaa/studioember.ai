"use client";

import { useEffect, useRef, useState } from "react";
import { aiPart } from "@/lib/content";
import { clsx } from "@/lib/clsx";

const STEP_MS = 3400;

const statusColor: Record<string, string> = {
  Received: "#8a817b",
  Working: "#f4c0c7",
  Resolved: "#22a06b",
};

/** Fades + rises in on mount via a plain CSS transition — no AnimatePresence,
 *  so a rapid string of step changes (auto-advance + fast clicking) can never
 *  leave an exit animation's promise unresolved. */
function Message({ step }: { step: (typeof aiPart.demo.steps)[number] }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={clsx(
        "transition-all duration-300 ease-out",
        shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        step.from === "Customer" ? "flex justify-end" : "flex justify-start",
      )}
    >
      <div
        className={
          step.from === "Customer"
            ? "max-w-[85%] rounded-2xl rounded-tr-sm bg-white px-[1.125rem] py-3.5 text-[0.95rem] leading-relaxed text-ink-soft shadow-sm"
            : "max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-[1.125rem] py-3.5 text-[0.95rem] leading-relaxed text-ink shadow-sm"
        }
      >
        {step.message}
      </div>
    </div>
  );
}

export function AIAgentDemo() {
  const steps = aiPart.demo.steps;
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, STEP_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [steps.length]);

  const step = steps[active];

  const goTo = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActive(i);
  };

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-hairline bg-surface/80 p-7 shadow-[0_40px_80px_-40px_rgba(26,22,20,0.35)] backdrop-blur-sm sm:p-10">
      <div className="flex items-center justify-between">
        <span className="mono-label">{aiPart.demo.caption}</span>
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <button
              key={s.status}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show step: ${s.status}`}
              aria-current={i === active}
              className="p-1"
            >
              <span
                className="block h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "24px" : "8px",
                  background: i === active ? "var(--ember-gradient)" : "var(--color-hairline-2)",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-8 h-[180px] overflow-hidden rounded-2xl border border-hairline bg-surface-2/50 p-5 sm:h-[160px] sm:p-6">
        <Message key={active} step={step} />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[0.85rem] font-medium text-ink">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: statusColor[step.status] }}
          />
          {step.status}
        </span>
        <span className="text-[0.8rem] text-muted">{step.from}</span>
      </div>
    </div>
  );
}
