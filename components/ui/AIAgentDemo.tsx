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
function Message({
  step,
  compact,
}: {
  step: (typeof aiPart.demo.steps)[number];
  compact?: boolean;
}) {
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
        className={clsx(
          "max-w-[85%] rounded-2xl leading-relaxed shadow-sm",
          compact
            ? "px-2.5 py-2 text-[0.68rem] sm:px-3.5 sm:py-2.5 sm:text-[0.78rem]"
            : "px-[1.125rem] py-3.5 text-[0.95rem]",
          step.from === "Customer"
            ? "rounded-tr-sm bg-white text-ink-soft"
            : "rounded-tl-sm bg-white text-ink",
        )}
      >
        {step.message}
      </div>
    </div>
  );
}

export function AIAgentDemo({ compact = false }: { compact?: boolean }) {
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
    <div
      className={clsx(
        "relative overflow-hidden rounded-[26px] border border-hairline bg-surface/80 shadow-[0_40px_80px_-40px_rgba(26,22,20,0.35)] backdrop-blur-sm",
        compact ? "p-3 sm:p-5" : "p-7 sm:p-10",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="mono-label min-w-0 whitespace-nowrap"
          style={
            compact
              ? {
                  fontSize: "clamp(0.16rem, calc(2.22cqw - 3.4px), 0.6rem)",
                  letterSpacing: "0.06em",
                }
              : undefined
          }
        >
          {aiPart.demo.caption}
        </span>
        <div className={clsx("flex shrink-0 items-center", compact ? "gap-1" : "gap-2")}>
          {steps.map((s, i) => (
            <button
              key={s.status}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show step: ${s.status}`}
              aria-current={i === active}
              className={compact ? "p-0.5" : "p-1"}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  height: compact ? "6px" : "8px",
                  width: i === active ? (compact ? "16px" : "24px") : compact ? "6px" : "8px",
                  background: i === active ? "var(--ember-gradient)" : "var(--color-hairline-2)",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <div
        className={clsx(
          "relative overflow-hidden rounded-2xl border border-hairline bg-surface-2/50",
          compact ? "mt-3 h-[96px] p-2.5 sm:h-[80px] sm:p-3.5" : "mt-8 h-[180px] p-5 sm:h-[160px] sm:p-6",
        )}
      >
        <Message key={active} step={step} compact={compact} />
      </div>

      <div className={clsx("flex items-center justify-between", compact ? "mt-3" : "mt-6")}>
        <span
          className={clsx(
            "flex items-center gap-2 font-medium text-ink",
            compact ? "text-[0.75rem]" : "text-[0.85rem]",
          )}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: statusColor[step.status] }}
          />
          {step.status}
        </span>
        <span className={clsx("text-muted", compact ? "text-[0.7rem]" : "text-[0.8rem]")}>
          {step.from}
        </span>
      </div>
    </div>
  );
}
