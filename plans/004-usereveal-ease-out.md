# 004 — Fix weak `ease` easing on useReveal section entrances

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: MEDIUM
- **Category**: Easing
- **Estimated scope**: 1 file, 1 line

## Problem

`useReveal` is the scroll-reveal hook used by every section entrance in the site (Services, FAQ, etc.). Its CSS transition uses bare `ease` — the browser's default 4-point cubic-bezier — which is a weak, generic curve that makes entrances feel sluggish and department-store generic. The AUDIT rule: **bare `ease` on entrances is a finding; default entrance = `ease-out`**. Strong ease-out (`cubic-bezier(0.23, 1, 0.32, 1)`) starts fast and decelerates, matching the physics of something arriving.

```ts
// src/hooks/hooks.ts:17 — current
const style: CSSProperties = {
  opacity: visible ? 1 : 0,
  transform: visible ? 'none' : `translate(${fromX}px, 26px)`,
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
                                 ^^^^                           ^^^^
};
```

The 0.7s duration is fine for a scroll-reveal (marketing context, not a UI interaction).

## Target

Replace bare `ease` with the strong ease-out curve from AUDIT.md on both properties:

```ts
// src/hooks/hooks.ts — target
const style: CSSProperties = {
  opacity: visible ? 1 : 0,
  transform: visible ? 'none' : `translate(${fromX}px, 26px)`,
  transition: `opacity 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
};
```

Exact curve from AUDIT.md: `cubic-bezier(0.23, 1, 0.32, 1)` — copy verbatim, do not approximate.

## Repo conventions to follow

- Easing tokens are NOT yet in `src/index.css` (that is plan 008). Until plan 008 lands, inline the cubic-bezier string directly in the transition value, exactly as the hero `motion.div` uses `ease: 'easeOut'` inline.
- The hook returns a `style` object applied as inline styles — keep the same pattern. Do not extract to a CSS class.
- Exemplar of the target curve in use: `Hero.tsx` motion.div badges use `ease: 'easeOut'` (Motion's string alias for approximately this curve).

## Steps

1. **`src/hooks/hooks.ts`** — locate the `transition` string at line 17:

   Old:
   ```ts
   transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
   ```

   New:
   ```ts
   transition: `opacity 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}s`
   ```

   If plan 001 (reduced-motion) is applied first, its version of this line already has the correct curve for the non-reduced branch — skip this plan if 001 is already done.

## Boundaries

- Do NOT touch any other line in `hooks.ts`.
- Do NOT change the duration (0.7s) or the delay interpolation (`${delay}s`).
- Do NOT change the transform values (`fromX`, `26px`).
- Do NOT add easing tokens — that is plan 008.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no errors.
- **Feel check**:
  1. Scroll past the fold to the Services section. The heading and cards should snap in fast and then ease to a stop, rather than easing in slowly from zero velocity.
  2. In DevTools → Animations panel at 10% speed, confirm the entrance animation decelerates strongly near the end (not a symmetric S-curve).
  3. Compare before/after: the old `ease` has a noticeable slow-start. The new `cubic-bezier(0.23,1,0.32,1)` should feel immediate.
- **Done when**: All scroll-reveal sections (Services, FAQ, any other) feel snappy on entrance; the first 20% of the animation covers most of the travel.
