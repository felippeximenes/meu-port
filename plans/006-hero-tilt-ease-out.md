# 006 — Fix portrait tilt using bare `ease` instead of `ease-out`

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: MEDIUM
- **Category**: Easing
- **Estimated scope**: 1 file, 1 line

## Problem

The portrait image in `Hero.tsx` responds to mouse movement with a subtle CSS tilt. Its transition uses bare `ease` — a symmetric S-curve that starts slow, peaks in the middle, then decelerates. For a hover/tilt response this makes the transform feel slightly unresponsive at the start (the slow-start phase), which reads as stickiness.

```tsx
// src/components/Hero.tsx:21 — current
style={{
  transition: 'transform 0.25s ease',   /* ← finding */
  transform: tilt,
}}
```

The AUDIT rule: **hover / color change → `ease`**. However, this specific ease is too symmetric for a tilt that must track the cursor. A cursor-following transform should feel immediate — `ease-out` (fast start, slow end) makes the element jump to track the cursor, then gracefully settle. `ease` (slow start) causes a perceptible lag at the moment the user moves.

## Target

```tsx
// target
style={{
  transition: 'transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
  transform: tilt,
}}
```

Exact curve from AUDIT.md: `cubic-bezier(0.23, 1, 0.32, 1)` — the strong ease-out. Duration stays 0.25s (fast enough for a hover tracking interaction).

## Repo conventions to follow

- Easing tokens are NOT yet in `src/index.css` (plan 008). Until plan 008 lands, inline the cubic-bezier directly in the transition string.
- Hero uses inline styles throughout — keep the same pattern. Do not add a CSS class.
- Exemplar: the `motion.div` badge in `Hero.tsx` uses `ease: 'easeOut'` (Motion API string for a similar curve) — this edit makes the CSS transition consistent with it.

## Steps

1. **`src/components/Hero.tsx`** — find the portrait `<img>` or tilt container element at approximately line 21. Locate the inline style with `transition: 'transform 0.25s ease'`.

   Old:
   ```tsx
   transition: 'transform 0.25s ease',
   ```

   New:
   ```tsx
   transition: 'transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
   ```

## Boundaries

- Do NOT change the `transform` value or how `tilt` is computed.
- Do NOT change the duration (0.25s).
- Do NOT touch any other property in this style object.
- Do NOT add easing tokens — that is plan 008.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no errors.
- **Feel check**:
  1. Move the cursor slowly onto the portrait, then quickly across it.
  2. Old: slight stickiness at the start of each movement.
  3. New: the portrait should feel like it jumps to track the cursor immediately, then eases to the resting angle.
  4. In DevTools → Animations panel at 10% speed, confirm the transform decelerates toward the end (ease-out profile), not through the middle (ease profile).
- **Done when**: The portrait tilt feels immediate and tracks the cursor without perceptible lag at movement onset.
