# Ember Studio — studioember.ai

A premium, conversion-focused marketing site for Ember Studio (a web & AI agent studio for startups). Light editorial "ember" aesthetic — warm paper canvas, glowing gradient orbs, tight-tracked grotesque type, tasteful motion.

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

## Deploy

Push to a Git repo and import into **Vercel** (zero config — it detects Next.js). Or:

```bash
npx vercel        # preview
npx vercel --prod # production
```

Point the `studioember.ai` domain at the Vercel project in the dashboard.

## Editing content

**All copy lives in one file:** [`lib/content.ts`](lib/content.ts). Change headings, services, projects, pricing, FAQ, footer links, etc. there — every section reads from it. No component edits needed for routine copy changes.

## Customizing the look

- **Colors, type scale, spacing:** design tokens are CSS variables in [`app/globals.css`](app/globals.css) under `@theme` (e.g. `--color-ember`, `--color-canvas`, `--ember-gradient`).
- **Fonts:** display/body is **General Sans** (self-hosted in `app/fonts/`), a free stand-in for Neue Montreal. To use licensed **Neue Montreal**, drop its `.woff2` files into `app/fonts/` and update the `localFont` `src` list in [`app/layout.tsx`](app/layout.tsx). Micro-labels use JetBrains Mono.
- **Orbs / visuals:** all imagery is code-generated (no image assets). The signature orb is [`components/ui/EmberOrb.tsx`](components/ui/EmberOrb.tsx).

## Contact form

Submissions POST to [`app/api/contact/route.ts`](app/api/contact/route.ts). Out of the box it validates and logs the inquiry (returns 200 so the form works immediately). To deliver real email:

1. `npm install resend`
2. Uncomment the Resend block in `route.ts`
3. Set `RESEND_API_KEY` in your environment (and verify your sending domain)

Update the display email in `lib/content.ts` (`site.email`).

## Structure

```
app/
  layout.tsx            fonts, metadata, grain, cursor glow, reduced-motion provider
  page.tsx              composes the sections in order
  globals.css           Tailwind v4 @theme tokens + base styles + keyframes
  api/contact/route.ts  inquiry handler
  fonts/                General Sans woff2
components/
  ui/                   EmberOrb, PillButton, MonoLabel, Reveal, GlassCard, Logo,
                        SectionHeading, AIReplyCard, ContactForm, CursorGlow, MotionProvider
  sections/             Nav, Hero, WhatWeBuild, Problem, Work, WaysToWork,
                        AIPart, WhyEmber, Process, About, FinalCTA, Footer
lib/
  content.ts            all site copy
  clsx.ts               tiny classnames helper
```

## Accessibility & performance

- Respects `prefers-reduced-motion` (Framer Motion `MotionConfig` + CSS fallback)
- Fluid type, mobile-first responsive (375 / 768 / 1024 / 1440)
- `font-display: swap`, capped blur radii for low-end GPUs, transform/opacity-only animation
- Semantic headings, skip link, visible focus rings, keyboard-navigable
