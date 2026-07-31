# 008 — Add easing tokens to `:root` in `index.css`

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: LOW
- **Category**: Cohesion
- **Estimated scope**: 1 file, 3 lines added

## Problem

The codebase has multiple inline `cubic-bezier(...)` strings scattered across components, but no shared easing tokens in `:root`. After plans 002–007 each inline a cubic-bezier, there will be 5–7 occurrences of `cubic-bezier(0.23, 1, 0.32, 1)` hand-typed across `GooeyNav.css`, `hooks.ts`, `Hero.tsx`, `Skills.tsx`. One typo in any of them will silently diverge. The fix is to declare the curves once in `src/index.css` and reference `var(--ease-out)` everywhere.

Current `:root` in `src/index.css` has color and spacing tokens but zero easing tokens.

## Target

Add two easing tokens to `:root`:

```css
/* src/index.css — target addition to :root */
:root {
  /* ... existing tokens ... */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
}
```

Exact values from AUDIT.md — copy verbatim:
- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` — strong ease-out for UI entrances
- `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` — strong ease-in-out for on-screen movement

**This plan only adds tokens.** Replacing inline cubic-bezier strings with `var(--ease-out)` is a follow-up refactor to do after all plans land (CSS `var()` works in CSS files; TypeScript inline style strings require `getComputedStyle` to resolve, so for `hooks.ts` and `Hero.tsx` keep the raw curve until a design-system refactor).

## Repo conventions to follow

- Color tokens already in `:root` of `src/index.css` (e.g. `--purple: #7c3aed`). Easing tokens go in the same block.
- Naming convention: `--ease-out`, `--ease-in-out` — verb describes the curve's profile.
- No Tailwind, no CSS-modules — global `:root` is the token store.

## Steps

1. **`src/index.css`** — open the `:root` block. After the last existing token line (before the closing `}`), append:

   ```css
   --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
   --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
   ```

2. **`src/components/GooeyNav.css`** — after plan 002 has inlined `cubic-bezier(0.23, 1, 0.32, 1)` in `.gooey-nav-container nav ul li::after`, replace with the token:

   Old (after plan 002):
   ```css
   transition:
     opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
     transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
   ```

   New:
   ```css
   transition:
     opacity 0.3s var(--ease-out),
     transform 0.3s var(--ease-out);
   ```

   Note: `var()` in CSS is supported in all modern browsers and works inside `transition` shorthand values.

## Boundaries

- Do NOT replace inline cubic-beziers in `.ts` or `.tsx` files — CSS `var()` cannot be resolved in JS template literals without `getComputedStyle`. Leave those as raw values.
- Do NOT add `--ease-drawer` or any other token not listed above — YAGNI.
- Do NOT touch any other property or file beyond `src/index.css` and `src/components/GooeyNav.css`.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no errors (CSS-only changes). Browser DevTools → Elements → `:root` computed values should show `--ease-out` and `--ease-in-out`.
- **Feel check**:
  1. Click a GooeyNav item — the pill transition should feel identical to before (same curve, just referenced via token).
  2. In DevTools → Elements panel → select `<html>` → Computed → filter for `ease` — confirm both tokens appear with their cubic-bezier values resolved.
- **Done when**: Both tokens appear in `:root` computed styles; `GooeyNav.css` pill transition uses `var(--ease-out)`.
