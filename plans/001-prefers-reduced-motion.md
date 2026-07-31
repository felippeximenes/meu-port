# 001 — Add prefers-reduced-motion across all animated components

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 5 files + 1 CSS file

## Problem

Zero `prefers-reduced-motion` handling exists in the codebase. Every user who has enabled reduced motion in their OS gets the full motion experience — scroll-driven blurs, word-by-word BlurText stagger, portrait fadeUp, GooeyNav particles — regardless of their preference. The only guard is a video autoplay check in `Projects.tsx:58`.

Affected locations:

```ts
// src/hooks/hooks.ts:17 — useReveal drives all section entrances
const style: CSSProperties = {
  opacity: visible ? 1 : 0,
  transform: visible ? 'none' : `translate(${fromX}px, 26px)`,
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
};
```

```tsx
// src/components/Hero.tsx:20 — portrait entrance
animation: 'fadeUp 1.1s ease both',
```

```tsx
// src/components/Hero.tsx:29-31 — badge motion.div
initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
transition={{ duration: 0.5, ease: 'easeOut' }}
```

```tsx
// src/components/Hero.tsx:56-58 — CTA motion.div
initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
```

```ts
// src/components/Skills.tsx:115-117 — GSAP blur+stagger reveal
gsap.fromTo(items, { opacity: 0, y: 32, filter: 'blur(8px)' }, {
  opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none', stagger: 0.06, ...
```

```css
/* src/components/GooeyNav.css — particle animations run unconditionally */
animation: particle calc(var(--time)) ease 1 -350ms;
animation: point calc(var(--time)) ease 1 -350ms;
```

## Target

Reduced motion = keep opacity/color feedback, drop position changes and blur transitions. UI still feels alive; movement is removed.

```ts
// hooks/hooks.ts — useReveal target
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const style: CSSProperties = {
  opacity: visible ? 1 : 0,
  transform: prefersReduced ? 'none' : (visible ? 'none' : `translate(${fromX}px, 26px)`),
  transition: prefersReduced
    ? `opacity 0.3s ease ${delay}s`
    : `opacity 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}s`
};
```

```tsx
// Hero.tsx — portrait entrance target
animation: prefersReduced ? 'fadeIn 0.3s ease both' : 'fadeUp 0.8s cubic-bezier(0.23,1,0.32,1) both',
```

```tsx
// Hero.tsx — motion.div targets (badge + CTA)
// Add: const { prefersReducedMotion } = useReducedMotion() — import from 'motion/react'
initial={{ opacity: 0 }}   // drop y and filter when reduced
animate={{ opacity: 1 }}
transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease: 'easeOut' }}
```

```ts
// Skills.tsx — GSAP target
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
gsap.fromTo(items,
  { opacity: 0, y: prefersReduced ? 0 : 32, filter: prefersReduced ? 'blur(0px)' : 'blur(8px)' },
  { opacity: 1, y: 0, filter: 'blur(0px)', stagger: prefersReduced ? 0 : 0.06, ... }
);
```

```css
/* GooeyNav.css — target */
@media (prefers-reduced-motion: reduce) {
  .particle, .point { animation: none; opacity: 0; }
  .gooey-nav-container nav ul li::after { transition: opacity 0.15s ease; }
  .gooey-nav-container .effect.filter { display: none; }
  .gooey-nav-container .effect.text { display: none; }
}
```

Also add `@keyframes fadeIn` to `src/index.css`:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

## Repo conventions to follow

- Motion library is `motion/react` — use `useReducedMotion()` hook from it for JS branches
- Inline styles for component-level motion (see `Hero.tsx`, `Skills.tsx`)
- Global CSS tokens live in `src/index.css`
- GooeyNav animation is CSS-only — handle via `@media` block at the bottom of `GooeyNav.css`

## Steps

1. **`src/index.css`** — Add `@keyframes fadeIn` after the existing `@keyframes fadeUp` block:
   ```css
   @keyframes fadeIn {
     from { opacity: 0; }
     to   { opacity: 1; }
   }
   ```

2. **`src/hooks/hooks.ts`** — In `useReveal`, read the media query once outside the returned style object:
   ```ts
   const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   const style: CSSProperties = {
     opacity: visible ? 1 : 0,
     transform: (prefersReduced || visible) ? 'none' : `translate(${fromX}px, 26px)`,
     transition: prefersReduced
       ? `opacity 0.3s ease ${delay}s`
       : `opacity 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
   };
   ```

3. **`src/components/Hero.tsx`** — Add `useReducedMotion` import and apply it:
   ```tsx
   import { motion, useReducedMotion } from 'motion/react';
   // inside Hero():
   const prefersReduced = useReducedMotion();
   ```
   Portrait img: change `animation: 'fadeUp 1.1s ease both'` →
   ```tsx
   animation: prefersReduced ? 'fadeIn 0.3s ease both' : 'fadeUp 0.8s cubic-bezier(0.23,1,0.32,1) both',
   ```
   Badge `motion.div`:
   ```tsx
   initial={{ opacity: 0, ...(prefersReduced ? {} : { y: -12, filter: 'blur(6px)' }) }}
   animate={{ opacity: 1, ...(prefersReduced ? {} : { y: 0, filter: 'blur(0px)' }) }}
   transition={{ duration: prefersReduced ? 0.2 : 0.5, ease: 'easeOut' }}
   ```
   CTA `motion.div`:
   ```tsx
   initial={{ opacity: 0, ...(prefersReduced ? {} : { y: 10, filter: 'blur(6px)' }) }}
   animate={{ opacity: 1, ...(prefersReduced ? {} : { y: 0, filter: 'blur(0px)' }) }}
   transition={{ duration: prefersReduced ? 0.2 : 0.5, delay: prefersReduced ? 0 : 0.6, ease: 'easeOut' }}
   ```

4. **`src/components/Skills.tsx`** — In `CategoryRow`'s `useEffect`, read reduced-motion before the GSAP calls:
   ```ts
   const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   gsap.fromTo(label, { opacity: 0, x: prefersReduced ? 0 : -20 }, { opacity: 1, x: 0, ... });
   gsap.fromTo(items,
     { opacity: 0, y: prefersReduced ? 0 : 32, filter: prefersReduced ? 'blur(0px)' : 'blur(8px)' },
     { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none', stagger: prefersReduced ? 0 : 0.06, scrollTrigger: { ... } }
   );
   ```
   Same pattern for the heading `useEffect` in `Skills()`.

5. **`src/components/GooeyNav.css`** — Append at the bottom of the file:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .particle,
     .point {
       animation: none;
       opacity: 0;
     }
     .gooey-nav-container .effect.filter {
       display: none;
     }
     .gooey-nav-container .effect.text {
       display: none;
     }
     .gooey-nav-container nav ul li::after {
       transition: opacity 0.15s ease, transform 0.15s ease;
     }
   }
   ```

## Boundaries

- Do NOT touch `BlurText.tsx` — it already accepts a custom `easing` prop; the caller (Hero.tsx) can pass a no-op if needed, but for now the IntersectionObserver + opacity-only path is acceptable
- Do NOT change markup or component structure
- Do NOT add new dependencies — `useReducedMotion` is already in `motion/react` which is installed

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no errors
- **Feel check**:
  1. In Chrome DevTools → Rendering panel → check "Emulate CSS media feature prefers-reduced-motion: reduce"
  2. Reload page — portrait should fade in without vertical movement
  3. Badge and CTA in Hero should appear without blur or vertical travel
  4. Scroll to Skills — icons should appear without blur or vertical travel, no stagger delay
  5. Click GooeyNav items — pill should switch with no particles or filter blob
  6. All section reveals (Services, FAQ, etc.) should fade in without translateY
- **Done when**: With reduce-motion emulated, zero position/blur changes occur on any animated element; opacity feedback still works everywhere.
