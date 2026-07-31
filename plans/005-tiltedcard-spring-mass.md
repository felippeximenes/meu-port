# 005 — Fix TiltedCard spring mass — hover tilt feels heavy

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: MEDIUM
- **Category**: Physicality
- **Estimated scope**: 1 file, 1 line

## Problem

`TiltedCard.tsx` uses `motion/react` spring physics for its mouse-driven 3D tilt. The current spring config has `mass: 2`, which doubles the inertia of the virtual object and makes the tilt feel like it's dragging through molasses — too slow to respond, too slow to settle.

```ts
// src/components/TiltedCard.tsx:5 — current
const springValues = { damping: 30, stiffness: 100, mass: 2 };
```

Physics: `mass: 2` halves the effective stiffness-to-mass ratio. The card needs to respond immediately to the cursor to feel like a physical object you're tilting with your hand. High stiffness + normal mass = responsive; high mass = sluggish.

## Target

```ts
// src/components/TiltedCard.tsx — target
const springValues = { damping: 20, stiffness: 200, mass: 1 };
```

Why these values:
- `mass: 1` — standard unit mass, removes the artificial drag
- `stiffness: 200` — 2× the current value; makes the spring stiffer so it tracks the cursor closely without being a rigid CSS transform
- `damping: 20` — lower than current (30) to allow a small overshoot on fast movement; combined with stiffness 200 this gives a responsive feel with a tiny spring tail. The damping ratio is `20 / (2 * sqrt(200 * 1)) ≈ 0.71` — slightly underdamped, meaning a subtle natural bounce at the end of movement, which reads as physical.

The Motion spring formula: `damping ratio = damping / (2 * sqrt(stiffness * mass))`. Current ratio: `30 / (2*sqrt(100*2)) ≈ 1.06` (critically damped, no overshoot). Target: `0.71` (slightly underdamped, one gentle bounce).

## Repo conventions to follow

- `TiltedCard.tsx` uses `useSpring` from `motion/react`. The spring config object is typed by the library — `damping`, `stiffness`, `mass` are all valid keys.
- Do NOT switch to `{ type: 'spring', duration, bounce }` API — the current `useSpring` pattern is correct.
- The hover tilt is a frequently-seen interaction (Services section, visible on scroll) — keep the feel subtle, not bouncy. Target `bounce ≈ 0` perceptually; `damping: 20` with `stiffness: 200` achieves this.

## Steps

1. **`src/components/TiltedCard.tsx`** — find line 5 and replace the spring config object:

   Old:
   ```ts
   const springValues = { damping: 30, stiffness: 100, mass: 2 };
   ```

   New:
   ```ts
   const springValues = { damping: 20, stiffness: 200, mass: 1 };
   ```

## Boundaries

- Do NOT change any other line in `TiltedCard.tsx`.
- Do NOT change the `useSpring` calls or how `springValues` is spread into them.
- Do NOT touch `Services.tsx` or any caller.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no errors.
- **Feel check**:
  1. Navigate to the Services section and hover over any TiltedCard.
  2. Move the mouse quickly across the card — it should track the cursor with a short lag (spring), not a long drag.
  3. Release the hover — the card should return to flat with a subtle overshoot (tiny bounce), not a sluggish return.
  4. Compare the response time: old config requires ~0.4s to settle; new config should settle in ~0.2s.
  5. The tilt should feel like a physical credit-card-sized object, not a heavy board.
- **Done when**: TiltedCard tracks the cursor responsively and returns to rest with one subtle bounce.
