# studioember.ai — Scroll-Triggered Cinematic Hero

**Date:** 2026-07-10
**Owner:** Indi Caburian
**Deliverable:** Replace the current static hero with a premium, scroll-driven pinned hero: a 20-frame hand-rising image sequence scrubbed by scroll, climaxing in a warm light-bloom that expands and reveals the next section from inside it.

## Concept

A hand rises from the bottom of the screen and reaches toward the heading. As it nears, a warm flare blooms at the fingertip; the surrounding ethereal gradient brightens and expands outward, washing the frame in warm light, and the next section is revealed as if born from that light. Restrained and filmic — one clean breath, not a flashy landing animation. Extends the existing "gallery for embers" language (warm paper canvas, code/gradient light, tight-tracked General Sans, mono micro-labels).

## Source assets

- Frames extracted from `design-inspiration/hero video 4k.mp4` (3840×2160 HEVC, 24fps, 8s). *(A 1280×720 v1 clip was used first; replaced by the 4K source to fix soft, stuttery playback.)*
- The clip's clean **rise-to-flare arc is 0→~5.4s**; the tail (hand settling) is discarded.
- 60 evenly-spaced frames over that window, downscaled to **1600×900** → `public/hero/frame-001.webp … frame-060.webp` (WebP q88, ~35KB each, **2.1MB total**). Frame 60 is the warm fingertip flare — the bloom seed.
- **Frame budget is governed by decoded-image memory, not download size.** Each preloaded frame costs `w×h×4` bytes decoded; the set must stay well under ~500MB. 60×1600px ≈ 330MB. An early 80×2560px set (~1.2GB decoded) crashed/degraded the renderer (blank compositing) — a real device risk, especially mobile. Trade resolution/count against this ceiling; keep frame count high (smoothness) and cap resolution.

## Rendering technique

**Canvas image-sequence scrub** (Apple-style), not `<video>` scrubbing (janky seeks) and not stacked `<img>` (muddy crossfades). Preload all 60 frames, draw the scroll-mapped frame to a `<canvas>` (`imageSmoothingQuality:"high"`) with `object-fit: cover` math. Blend the two nearest frames by fractional progress (alpha crossfade); fall back to the nearest already-decoded frame if the scrub outruns preloading. Draw only on `requestAnimationFrame` when the scroll-derived frame value changes.

## Architecture

- `components/ui/HeroFrames.tsx` (new, client) — the canvas scrubber. Props: `frame: MotionValue<number>` (continuous 0–19). Preloads frames, cover-draws with nearest-frame crossfade, handles DPR + resize. Edge-feathered via CSS `mask-image` so no hard rectangle; warm-tint layer reconciles the clip's cool-gray ground with the warm paper canvas.
- `components/ui/ScrollHero.tsx` (new, client) — owns the pin + choreography. A `~300svh` **pin track** wraps a `sticky top-0 h-[100svh]` **stage**. `useScroll({ target: track, offset: ["start start","end end"] })` yields one `progress`; every motion value derives from it via `useTransform`. Renders: bloom layer (back) → `HeroFrames` → heading/eyebrow/subhead/CTAs → scroll hint.
- `components/sections/Hero.tsx` — kept but no longer used on the page (or deleted). `app/page.tsx` renders `<ScrollHero />` in its place.
- `components/ui/EmergeFromLight.tsx` (new, client) — thin `whileInView` wrapper (scale 1.06→1, opacity 0→1, slight blur→0) placed around the first following section so it grows out of the light. Reuses existing Reveal conventions.
- Copy still sourced from `lib/content.ts`; typography/tokens/`PillButton`/`MonoLabel`/`.ember-text` reused unchanged.

## Choreography (progress 0 → 1)

| Window | Beat | Behaviour |
|---|---|---|
| 0.00–0.04 | **At rest** | Frame 1 (hand low), aura dim. Eyebrow + heading + subhead + CTAs + scroll hint present. Frames preload. Heading keeps existing CSS `.reveal-line`/`.reveal-rise` mount entrance. |
| 0.04–0.80 | **The rise** | Frames scrub 0→19 (hand rises + rotates toward heading). Subhead + CTAs + scroll hint fade + drift down over 0.04–0.30 so the heading stands alone. Aura brightens gradually. |
| 0.62–0.84 | **Near-contact** | Fingertip/flare arrives beneath the heading. Heading reacts: ~1.02 scale + a hair more tracking + a soft warm glow blooming behind the words. One breath, no bounce. |
| 0.80–1.00 | **Bloom & reveal** | Warm radial gradient (seeded at the fingertip/heading point) brightens toward warm-white (≈ canvas `#fbf9f6`) and scales massively outward. Hand + heading dissolve into the light. |
| after track | **Emerge** | Pin releases; the next section (`WhatWeBuild`) enters via `EmergeFromLight`. Because the bloom's warm-white == canvas == section bg, the handoff reads as light → content, not a white flash. |

Heading sits upper-centre (over the lighter top of the aura, preserving ink contrast); the fingertip rises to just beneath the first line. A soft warm radial "paper light" behind the heading both lifts text contrast and becomes the bloom seed.

## Performance & accessibility

- Transform/opacity + canvas only; no layout-animated properties, no CLS (canvas has a reserved box; `100svh`).
- Draw throttled to rAF off the motion value; frames preloaded (240KB) during the at-rest beat.
- **Reduced motion:** no pin, no scrub — a single `100svh` stage shows frame 20 + heading at rest with a static soft bloom; page scrolls normally. (`useReducedMotion`.)
- Heading stays dark ink; contrast verified in preview (≥4.5:1). Canvas is `aria-hidden`; heading remains real, selectable text.
- Verify at 375 / 768 / 1024 / 1440; cover-crop keeps the centered hand prominent at every width.

## Non-goals

- No change to sections below `WhatWeBuild`, nav, or content copy.
- No video element on the page; no per-frame runtime extraction.
- No dark mode (light editorial remains committed).
