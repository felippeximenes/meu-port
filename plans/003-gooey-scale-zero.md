# 003 — Fix `scale(0)` on GooeyNav pill — nothing appears from nothing

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: HIGH
- **Category**: Physicality
- **Estimated scope**: 1 file, 2 occurrences

## Problem

Two elements in `GooeyNav.css` use `transform: scale(0)` as their hidden state. Nothing in the real world appears from mathematical nothingness — it breaks the physical intuition of a pill sliding/popping into existence. The AUDIT rule: **Never `scale(0)` — target `scale(0.85–0.97)` + `opacity: 0`**.

```css
/* src/components/GooeyNav.css:65 — current (li::after pill) */
.gooey-nav-container nav ul li::after {
  opacity: 0;
  transform: scale(0);    /* ← finding */
  transition: all 0.3s ease;
}
```

```css
/* src/components/GooeyNav.css:123 — current (effect.filter::after mirror pill) */
.gooey-nav-container .effect.filter::after {
  content: '';
  position: absolute;
  inset: 0;
  background: white;
  transform: scale(0);    /* ← finding */
  opacity: 0;
  z-index: -1;
  border-radius: 100vw;
}
```

## Target

Both elements start from `scale(0.85)` — visually imperceptible at `opacity: 0`, but physically grounded.

```css
/* target — li::after */
.gooey-nav-container nav ul li::after {
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
```

```css
/* target — effect.filter::after */
.gooey-nav-container .effect.filter::after {
  content: '';
  position: absolute;
  inset: 0;
  background: white;
  transform: scale(0.85);
  opacity: 0;
  z-index: -1;
  border-radius: 100vw;
}
```

The `@keyframes pill` animation that drives `.effect.active::after` already transitions `to { transform: scale(1); opacity: 1; }` — leave the keyframe untouched. The `from` state is the element's initial style (`scale(0.85)`, `opacity: 0`), so CSS fills it in automatically.

## Repo conventions to follow

- All initial hidden states in this codebase pair `opacity: 0` with a near-identity transform: `translate(${fromX}px, 26px)` in `hooks.ts`, `y: -12` in Hero `motion.div`. Follow the same "invisible but real" pattern.
- Do NOT use `visibility: hidden` or `display: none` for animated elements — they can't be transitioned.

## Steps

1. **`src/components/GooeyNav.css`** — find `.gooey-nav-container nav ul li::after` and change:
   ```css
   transform: scale(0);
   ```
   to:
   ```css
   transform: scale(0.85);
   ```
   *(Also update `transition: all 0.3s ease` → explicit properties per plan 002 if applying together.)*

2. **`src/components/GooeyNav.css`** — find `.gooey-nav-container .effect.filter::after` and change:
   ```css
   transform: scale(0);
   ```
   to:
   ```css
   transform: scale(0.85);
   ```

## Boundaries

- Do NOT touch the `@keyframes pill` block — its `to { transform: scale(1) }` is correct.
- Do NOT touch `GooeyNav.tsx`, `Nav.tsx`, or any other file.
- Do NOT change `opacity` values — they are correct at `0`.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no errors (CSS-only change).
- **Feel check**:
  1. Click each nav item at normal speed — pill should feel like it "pops" from a near-real size, not materializes from nothing.
  2. In DevTools → Animations panel, set playback to 10% speed. The pill should start visibly at `scale(0.85)` (tiny but not zero) and expand to full.
  3. The gooey filter blob (`.effect.filter::after`) should scale from the same `0.85` start — the blob and text-layer pill should feel synchronized.
- **Done when**: At 10% playback speed, neither pill element starts from scale zero.
