# 009 — Fix portrait entrance — weak easing and long duration

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: LOW
- **Category**: Easing
- **Estimated scope**: 1 file, 1 property

## Problem

The portrait image in `Hero.tsx` fades up on load using a `@keyframes fadeUp` CSS animation. The timing uses bare `ease` and a 1.1s duration — longer than needed for a first-paint entrance and using a weak built-in easing curve.

```tsx
// src/components/Hero.tsx:20 — current
style={{
  animation: 'fadeUp 1.1s ease both',
  //                  ^^^^ ^^^^
}}
```

AUDIT rules that apply:
1. Bare `ease` on entrances → finding (default entrance = `ease-out`)
2. 1.1s for a portrait entrance → on the long side for a UI element. Marketing pages can be longer, but 0.8s with a strong ease-out feels more decisive and confident.

The `@keyframes fadeUp` is defined in `src/index.css` — do not modify it, only the `animation` timing.

## Target

```tsx
// target
style={{
  animation: 'fadeUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both',
}}
```

Duration: `0.8s` — still clearly a page-load hero moment, but 0.3s tighter.
Easing: `cubic-bezier(0.23, 1, 0.32, 1)` from AUDIT.md — the strong ease-out.

If plan 001 (reduced-motion) is applied first, only the non-reduced branch needs this update. The reduced branch uses `fadeIn 0.3s ease both` and stays as-is.

## Repo conventions to follow

- Hero uses inline styles — keep the same pattern. Do not add a CSS class.
- The `@keyframes fadeUp` in `src/index.css` starts at `opacity: 0; transform: translateY(24px)` — do not modify the keyframe itself.
- Other Hero motion: badge `motion.div` uses 0.5s, CTA `motion.div` uses 0.5s. Portrait at 0.8s is intentionally slower (hero element, first seen) — that's appropriate.

## Steps

1. **`src/components/Hero.tsx`** — find the portrait `<img>` inline style at approximately line 20:

   Old:
   ```tsx
   animation: 'fadeUp 1.1s ease both',
   ```

   New:
   ```tsx
   animation: 'fadeUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both',
   ```

   If plan 001 is already applied, the portrait line looks like:
   ```tsx
   animation: prefersReduced ? 'fadeIn 0.3s ease both' : 'fadeUp 1.1s ease both',
   ```
   Update only the non-reduced branch:
   ```tsx
   animation: prefersReduced ? 'fadeIn 0.3s ease both' : 'fadeUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both',
   ```

## Boundaries

- Do NOT change the `@keyframes fadeUp` in `src/index.css`.
- Do NOT change the `motion.div` badges or CTA — they are separate `motion/react` animations with correct easing.
- Do NOT change the `transform: tilt` portrait style — that is plan 006.
- Do NOT add easing tokens — that is plan 008.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no errors.
- **Feel check**:
  1. Hard-reload the page (Ctrl+Shift+R) and watch the portrait entrance.
  2. Old: 1.1s, feels like a slow dissolve.
  3. New: 0.8s with strong ease-out — portrait arrives decisively, decelerates to rest.
  4. In DevTools → Animations panel (record on reload), confirm the animation duration is 800ms and the easing curve matches the strong ease-out profile (steep start, flat end).
- **Done when**: Portrait entrance completes in 800ms with a strong ease-out curve.
