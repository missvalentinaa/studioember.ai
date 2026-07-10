# studioember.ai — Landing Page Design Spec

**Date:** 2026-07-10
**Owner:** Indi Caburian
**Deliverable:** A premium, conversion-focused single-page marketing site for Ember Studio — a web & AI agent studio for startups.

## Concept

**"A gallery for embers."** A calm, warm off-white canvas — like fine paper — with living gradient light sources (embers) that glow and drift as you scroll. Restraint is the luxury: enormous whitespace, precise tight-tracked type, and a few genuinely beautiful motion moments. It reads *funded, considered, expensive* without shouting.

## Decisions (locked)

| Decision | Choice |
|---|---|
| Stack | Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion |
| Theme | Light editorial ember (warm off-white, glowing ember orb focal points) |
| Structure | Single page, sticky pill nav, smooth-scroll anchors (Work / Services / About) |
| Imagery | Code/CSS-generated (ember orbs, gradient meshes, glass UI cards) — no photography |
| Display + body font | General Sans (self-hosted; Neue Montreal is a licensed drop-in), tight tracking |
| Micro-label font | JetBrains Mono, uppercase, letter-spaced |
| Emphasis device | Ember-gradient text fill on accent words + weight/mono contrast |
| Contact | Inquiry form → `/api/contact` route (Resend/Formspree-ready) + `mailto:` fallback; hello@studioember.ai |

## Design tokens

**Color**
- Canvas `#FBF9F6` (warm paper) · elevated surface `#FFFFFF`
- Ink `#1A1614` (espresso near-black) · muted `#8A817B`
- Ember core `#FF6B35` → `#FF8A4C` (primary CTA, glow core)
- Coral/Magenta `#E5484D` → `#C2298A` (gradient partner)
- Violet edge `#7C5CFF` (orb cool rim)
- Hairline `#ECE6DF` (borders/dividers)
- Ember gradient (text/CTA): `linear-gradient(100deg, #7C5CFF, #C2298A 35%, #FF6B35 75%, #FF8A4C)`

**Type scale** (clamp, fluid) — tight tracking on display (−0.02 to −0.035em), body 1.6 line-height, mono labels 0.72rem / +0.18em / uppercase.

**Effects** — grain overlay (SVG noise, low opacity), soft radial ember glows, glass cards (backdrop-blur + hairline + inner highlight), rounded pill geometry, hairline dividers.

## Motion language (Framer Motion)

All animation uses `transform`/`opacity` only, honors `prefers-reduced-motion`, and stays 150–400ms with ease-out enter.

- Ember orbs: slow drift (CSS keyframes) + scroll parallax (`useScroll`/`useTransform`)
- Text: line/word reveal, mask-up, ~40ms stagger
- Buttons: magnetic pull on desktop, scale 0.97 press
- Cards: subtle 3D tilt on hover, glass sheen
- Signature: soft "ember trail" cursor glow (desktop only, off for touch/reduced-motion)
- Section reveals via a shared `<Reveal>` intersection wrapper

## Section flow

1. **Nav** — floating pill: Work / Services / About + "Start a project"
2. **Hero** — floating ember orb; "Look *funded*. Operate like it too."; dual pill CTAs; mono tagline "Built with taste. Shipped at speed."
3. **What We Build** — "Premium web. Useful AI." two columns; glass "Generating reply…" AI card
4. **The Problem** — "Your product has moved on. Your website has not." editorial statement + tension list
5. **Selected Work** — 3 gallery cards, abstract gradient cover art per project, hover-reveal meta
6. **Ways to Work** — Launch Sprint (from £4,000) vs The Continuum (from £2,500/mo) pricing cards
7. **The AI Part** — Support / Onboarding / Workflows + "if it only talks, it's a chatbot" punchline
8. **Why Ember** — Taste / Technical ability / Speed
9. **How It Works** — 01 Define → 02 Build → 03 Ship animated timeline
10. **About** — Indi Caburian, small-studio story
11. **Final CTA + Contact** — "Build the version people take seriously." + inquiry form
12. **Footer** — nav, socials, studioember.ai, tagline, © 2026

## Architecture

```
app/
  layout.tsx          # fonts, metadata, grain overlay, cursor glow
  page.tsx            # composes sections in order
  globals.css         # Tailwind v4 @theme tokens + base
  api/contact/route.ts# inquiry handler (Resend/Formspree-ready + mailto fallback)
  fonts/              # General Sans woff2 (300–700)
components/
  ui/                 # EmberOrb, PillButton, MonoLabel, Reveal, GlassCard, GradientText, Grain, CursorGlow
  sections/           # Nav, Hero, WhatWeBuild, Problem, Work, WaysToWork, AIPart, WhyEmber, Process, About, FinalCTA, Footer
lib/
  content.ts          # all copy centralized for easy editing
```

## Non-goals (YAGNI)

- No CMS, no blog, no auth, no real backend email service wired (route is stubbed + ready)
- No multi-page routing or per-project case-study pages (single page only)
- No dark mode (light editorial is the committed direction)

## Quality bar

- 60fps transforms, no CLS, `font-display: swap`, lazy below-fold
- WCAG AA contrast, visible focus rings, keyboard-navigable, reduced-motion honored
- Responsive verified at 375 / 768 / 1024 / 1440px
- No emojis as icons (inline SVG only)
