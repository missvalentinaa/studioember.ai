"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { finalCta, site } from "@/lib/content";
import { PillButton } from "@/components/ui/PillButton";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-2xl border border-hairline bg-surface/70 px-4 py-3.5 text-[0.95rem] text-ink placeholder:text-faint transition-colors duration-200 focus:border-ember focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (fd: FormData) => {
    const next: { name?: string; email?: string } = {};
    if (!String(fd.get("name") || "").trim()) next.name = "Please add your name.";
    const email = String(fd.get("email") || "").trim();
    if (!email) next.email = "Please add an email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That email doesn't look right.";
    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const found = validate(fd);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus("submitting");
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-hairline bg-surface/90 p-6 backdrop-blur-xl sm:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-white"
              style={{ background: "var(--ember-gradient)" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 12.5l5 5L20 6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-medium tracking-tight">Message sent.</h3>
            <p className="mt-3 max-w-[34ch] text-ink-soft">
              Thanks — we&apos;ll be in touch shortly. You can also reach us directly at{" "}
              <a className="text-ink underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 1 }}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mono-label mb-2 block">
                  Name*
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  className={fieldClass}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p role="alert" className="mt-1.5 text-xs text-coral">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mono-label mb-2 block">
                  Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={fieldClass}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p role="alert" className="mt-1.5 text-xs text-coral">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="company" className="mono-label mb-2 block">
                Company
              </label>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                placeholder="Your startup"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="projectType" className="mono-label mb-2 block">
                What do you need?
              </label>
              <div className="relative">
                <select
                  id="projectType"
                  name="projectType"
                  defaultValue={finalCta.projectTypes[0]}
                  className={`${fieldClass} appearance-none pr-10`}
                >
                  {finalCta.projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mono-label mb-2 block">
                Tell us about it
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="The product, the timeline, what's not working…"
                className={`${fieldClass} resize-none`}
              />
            </div>

            <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <PillButton type="submit" arrow className="w-full py-3.5 sm:w-auto sm:px-8">
                {status === "submitting" ? "Sending…" : "Start a project"}
              </PillButton>
              {status === "error" ? (
                <p role="alert" className="text-sm text-coral">
                  Something went wrong.{" "}
                  <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
                    Email us instead
                  </a>
                  .
                </p>
              ) : (
                <span className="text-xs text-muted">
                  Prefer email?{" "}
                  <a
                    className="text-ink underline underline-offset-2"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                </span>
              )}
            </div>
            <p className="text-xs text-muted">
              We&apos;ll only use this to reply to your enquiry. See our{" "}
              <a className="underline underline-offset-2 hover:text-ink" href="/privacy">
                privacy policy
              </a>
              .
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
