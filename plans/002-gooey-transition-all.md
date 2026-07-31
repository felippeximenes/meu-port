# 002 — Replace `transition: all` on GooeyNav pill

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 file, 1 line

## Problem

`transition: all` on the nav pill animates every CSS property off-GPU, including layout-triggering ones. This means any inherited or applied property change (font-size, padding, border, box-shadow, etc.) will be swept into the transition budget whether intentional or not.

```css
/* src/components/GooeyNav.css:66 — current */
.gooey-nav-container nav ul li::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 100vw;
  background: white;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;   /* ← finding */
  z-index: -1;
}
```

Only `opacity` and `transform` change on this element (from `opacity: 0; transform: scale(0)` to `opacity: 1; transform: scale(1)`). Animating `all` puts every other property through the compositor unnecessarily.

## Target

Transition only the two properties that actually change, using a strong ease-out curve:

```css
/* target */
.gooey-nav-container nav ul li::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 100vw;
  background: white;
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: -1;
}
```

Note: `scale(0)` is also corrected to `scale(0.85)` here — that is plan 003. Both edits land on the same declaration block; execute 002 and 003 together in one edit to avoid a second pass.

## Repo conventions to follow

- Easing tokens are NOT yet in `src/index.css` (that is plan 008). Until plan 008 lands, inline the cubic-bezier directly.
- All other animated properties in this file (`li` color/box-shadow, `.effect.text` color) already use explicit named properties — this edit makes `li::after` consistent with those.
- Exemplar of the pattern already used in this file (line 39):
  ```css
  /* GooeyNav.css:39 — already correct */
  .gooey-nav-container nav ul li {
    transition: color 0.3s ease, box-shadow 0.3s ease;
  }
  ```

## Steps

1. **`src/components/GooeyNav.css`** — find the `.gooey-nav-container nav ul li::after` rule and replace the `transition` line:

   Old:
   ```css
   transition: all 0.3s ease;
   ```

   New:
   ```css
   transition:
     opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
     transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
   ```

   If executing alongside plan 003, also change `transform: scale(0)` → `transform: scale(0.85)` in the same block.

## Boundaries

- Do NOT touch any other rule in `GooeyNav.css`.
- Do NOT touch `GooeyNav.tsx`, `Nav.tsx`, or any other file.
- Do NOT add easing tokens — that is plan 008.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no TypeScript errors (CSS-only change).
- **Feel check**:
  1. Open the site and click each nav item.
  2. The white pill should appear and disappear smoothly.
  3. In DevTools → Animations panel, set playback to 10% speed. Confirm the pill scales and fades simultaneously — no layout jank or unintended property animation.
  4. In DevTools → Performance → record a click event. Confirm no layout (purple) bars during the pill transition — only composite (green).
- **Done when**: DevTools Performance trace shows no layout work during GooeyNav pill activation.
