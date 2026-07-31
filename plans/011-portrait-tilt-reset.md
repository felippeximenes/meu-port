# 011 — Portrait tilt — animate reset to flat on mouse leave

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: MISSED OPPORTUNITY B
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, ~5 lines

## Problem

The portrait in `Hero.tsx` responds to mouse movement with a CSS 3D tilt effect. When the cursor leaves the hero area, the tilt snaps to `transform: none` instantly — there is no eased return animation. The AUDIT principle: **spatially-connected UI with motion explaining where it came from** — here, the portrait should ease back to flat, not snap.

Current behavior from `hooks.ts` (the `useMouseTilt` or equivalent hook): on `mouseleave`, `tilt` is set directly to `''` or `'none'`, and because the CSS transition is on a fixed `transform` property (plan 006), it will transition — but only if the transition property is set BEFORE the value changes. If `tilt` is reset synchronously, the transition fires correctly. If the hook or component removes the inline style on leave, the transition cannot interpolate.

The issue to verify: does the portrait actually animate back to flat, or does it snap? If the `transition` on the portrait element persists through mouseleave (i.e., it's on the element at all times, not only added on mouseenter), then the fix in plan 006 already covers the return animation implicitly. This plan handles the case where it does not.

Current code to verify at `Hero.tsx` ~line 15–25 (the tilt binding):
```tsx
// approximate current — verify exact code before editing
const [tilt, setTilt] = useState('');
// ...
onMouseMove: (e) => {
  const { clientX, clientY, currentTarget } = e;
  // ... compute rotateX/Y
  setTilt(`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`);
},
onMouseLeave: () => setTilt(''),
```

If `setTilt('')` removes the inline `transform` style entirely on leave (style object key missing), the CSS `transition` cannot animate the reset — it has no `from` value to interpolate from. The result: instant snap to flat.

## Target

On `mouseleave`, set `tilt` to an explicit identity transform (`'perspective(800px) rotateX(0deg) rotateY(0deg)'`), not an empty string. This allows the CSS transition to interpolate from the last tilt angle back to flat:

```tsx
// target — mouseleave handler
onMouseLeave: () => setTilt('perspective(800px) rotateX(0deg) rotateY(0deg)'),
```

After the transition completes, the visual result is identical to `''` (flat). The difference is the eased return travel.

Alternative approach if the identity string approach causes a flash: use a `useState<string | null>(null)` and conditionally include `transform` in the style object only when non-null, but then attach a `transitionend` event to remove it. The simpler explicit-identity approach avoids the event listener.

## Repo conventions to follow

- Hero uses inline `onMouseMove`/`onMouseLeave` event handlers and `useState` — keep that pattern.
- No new dependencies.
- The `transition` property must be present on the element at all times (before, during, and after mouse movement) — if it's only added on mouseenter, move it out of any conditional.

## Steps

1. **`src/components/Hero.tsx`** — read the actual tilt reset code (the `onMouseLeave` handler or equivalent) at the portrait element.

2. If `onMouseLeave` sets tilt to `''` or `null` or removes the transform:
   ```tsx
   // old
   onMouseLeave: () => setTilt(''),
   // or: onMouseLeave: () => setTilt(null),
   ```
   Change to:
   ```tsx
   // new
   onMouseLeave: () => setTilt('perspective(800px) rotateX(0deg) rotateY(0deg)'),
   ```

3. Verify the `style` object on the portrait element includes `transform: tilt` regardless of tilt value (not `transform: tilt || undefined`). If it's conditional, remove the condition:
   ```tsx
   // if currently:
   style={{ ..., transform: tilt || undefined }}
   // change to:
   style={{ ..., transform: tilt }}
   ```

4. Confirm the `transition` for `transform` (from plan 006) is on the same element and not conditionally applied.

## Boundaries

- Do NOT change the tilt computation (the `onMouseMove` math).
- Do NOT change the `perspective` value — it must match the one used in `setTilt` inside `onMouseMove`.
- Do NOT add spring physics here — that is `TiltedCard.tsx` (plan 005). The portrait uses CSS transition.
- Do NOT touch any other component.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no errors.
- **Feel check**:
  1. Move the cursor over the portrait at various angles.
  2. Move the cursor off the portrait — the portrait should ease back to flat with the same 0.25s cubic-bezier(0.23,1,0.32,1) curve from plan 006.
  3. Old behavior: the portrait snaps instantly to flat when the cursor leaves.
  4. New behavior: the portrait glides back to flat.
  5. In DevTools → Animations panel at 10% speed, a `transform` animation should be visible on mouseleave (not an instant change).
- **Done when**: Portrait animates from its last tilt angle back to flat on every cursor exit.
