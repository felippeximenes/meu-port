# 012 — GooeyNav inactive items — add hover opacity feedback

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: MISSED OPPORTUNITY C
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, ~5 lines added

## Problem

Inactive GooeyNav items render at `rgba(255, 255, 255, 0.65)` and have no hover feedback beyond the browser default cursor. The AUDIT principle: **hover effects on frequently-seen elements that tens-of-times-a-day — remove or drastically reduce**. However, a subtle opacity nudge on an unvisited nav item is a comprehension aid (it signals clickability), not a decorative animation — this is a missed opportunity, not a violation.

Current CSS for inactive nav items:
```css
/* src/components/GooeyNav.css:35-45 — current */
.gooey-nav-container nav ul li {
  border-radius: 100vw;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 0.5px 1.5px transparent;
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
```

No `:hover` rule exists on `li`. The `li::after` pill only appears on `.active`. Hovering over an inactive nav item gives zero visual feedback other than the cursor change, which makes the nav feel slightly inert.

## Target

Add a `:hover` rule that nudges opacity to full white — immediate feedback that this is clickable, without triggering the full pill animation:

```css
/* target — add after the li rule */
@media (hover: hover) and (pointer: fine) {
  .gooey-nav-container nav ul li:not(.active):hover {
    color: rgba(255, 255, 255, 0.9);
    transition: color 0.15s ease;
  }
}
```

Design rationale:
- `rgba(255,255,255,0.9)` — not full white (that's reserved for the active state); 90% opacity signals hover without confusion with active.
- `0.15s ease` — faster than the 0.3s pill animation; hover feedback should feel instant.
- `:not(.active)` — prevents the hover from visually overriding the active item's `color: black`.
- `@media (hover: hover) and (pointer: fine)` — touch devices generate false hover events on tap; this guard ensures the hover style only applies on pointer devices (desktop/trackpad).

## Repo conventions to follow

- All other transitions in `GooeyNav.css` use explicit properties (not `all`) — the new rule follows that pattern.
- The `@media (hover: hover) and (pointer: fine)` guard is the AUDIT.md-specified approach for hover effects (category 6: Accessibility).
- Keep the color inline, not as a token — this is a one-off opacity variation of an existing color.

## Steps

1. **`src/components/GooeyNav.css`** — append the following rule after the `.gooey-nav-container nav ul li` block (after line 45, before the `li a` rule):

   ```css
   @media (hover: hover) and (pointer: fine) {
     .gooey-nav-container nav ul li:not(.active):hover {
       color: rgba(255, 255, 255, 0.9);
       transition: color 0.15s ease;
     }
   }
   ```

## Boundaries

- Do NOT trigger the pill animation on hover — only color change.
- Do NOT touch the `.active` state or the `li::after` pill rules.
- Do NOT remove the existing `transition: color 0.3s ease, box-shadow 0.3s ease` on `li` — the new rule's `transition: color 0.15s ease` overrides it inside the hover state only (the shorter transition applies on enter; the `li` transition applies on exit). This is intentional: hover enter is faster (responsive) than hover exit (graceful).
- Do NOT add hover effects to the `.effect.text` layer — it mirrors the `li` layer and will inherit the color change automatically.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no errors (CSS-only change).
- **Feel check**:
  1. On a desktop browser, move the cursor over each inactive nav item.
  2. The label text should brighten slightly from 65% to 90% opacity on hover.
  3. Active item should be unaffected (`:not(.active)` guard).
  4. On a touch device (or with DevTools mobile emulation), no hover state should trigger.
  5. Hover-in should feel faster than hover-out — the 0.15s enter vs 0.3s exit is intentional.
- **Done when**: Inactive nav items show a subtle brightness increase on hover; active item and touch devices are unaffected.
