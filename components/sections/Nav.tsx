"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { PillButton } from "@/components/ui/PillButton";
import { clsx } from "@/lib/clsx";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "flex w-full max-w-5xl items-center justify-between rounded-full border py-2 pl-4 pr-2 transition-all duration-300 sm:pl-5",
          scrolled
            ? "border-hairline bg-canvas/80 shadow-[0_10px_40px_-24px_rgba(26,22,20,0.45)] backdrop-blur-xl"
            : "border-transparent bg-canvas/20 backdrop-blur-md",
        )}
      >
        <a href="#top" aria-label="Ember Studio — home" className="shrink-0">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-[0.9rem] text-ink-soft transition-colors duration-200 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <PillButton href={nav.cta.href} arrow className="px-5 py-2.5 text-[0.9rem]">
              {nav.cta.label}
            </PillButton>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface/60 text-ink md:hidden"
          >
            <span className="relative block h-3.5 w-4.5">
              <span
                className={clsx(
                  "absolute left-0 h-[1.5px] w-full bg-ink transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-1.5 h-[1.5px] w-full bg-ink transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 h-[1.5px] w-full bg-ink transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-[76px] z-50 rounded-3xl border border-hairline bg-canvas/95 p-3 shadow-[0_30px_60px_-30px_rgba(26,22,20,0.4)] backdrop-blur-xl md:hidden"
          >
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3.5 text-lg text-ink transition-colors hover:bg-surface-2"
              >
                {l.label}
              </a>
            ))}
            <a
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-2xl px-4 py-3.5 text-center text-lg font-medium text-white"
              style={{ background: "var(--ember-gradient)" }}
            >
              {nav.cta.label}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
