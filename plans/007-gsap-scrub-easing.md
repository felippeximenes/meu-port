# 007 — Remove `ease: 'none'` from GSAP scrub animations in Skills

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: MEDIUM
- **Category**: Easing
- **Estimated scope**: 1 file, 3 occurrences

## Problem

The GSAP scroll-triggered animations in `Skills.tsx` use `ease: 'none'` on their tweens. Because these tweens use `scrub: true` (scroll position drives playback directly), the easing on the tween itself is **ignored** — `ScrollTrigger.scrub` overrides it. This means the `ease: 'none'` declarations are dead code that signals a misunderstanding of how scrubbed GSAP animations work. The real behavior is linear regardless of what ease is set — scrub drives the tween like a seek position, not a playback curve.

```ts
// src/components/Skills.tsx:111 — current (label reveal)
gsap.fromTo(label,
  { opacity: 0, x: -20 },
  { opacity: 1, x: 0, ease: 'none', duration: 1, scrollTrigger: { ... scrub: true ... } }
                       ^^^^^^^^^^^
);
```

```ts
// src/components/Skills.tsx:116 — current (icons reveal)
gsap.fromTo(items,
  { opacity: 0, y: 32, filter: 'blur(8px)' },
  { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none', stagger: 0.06, duration: 1,
                                                          ^^^^^^^^^^^
    scrollTrigger: { ... scrub: true ... } }
);
```

```ts
// src/components/Skills.tsx:168 — current (heading reveal)
gsap.fromTo(heading,
  { opacity: 0, y: 24 },
  { opacity: 1, y: 0, ease: 'none', duration: 1, scrollTrigger: { ... scrub: true ... } }
                       ^^^^^^^^^^^
);
```

For a scrubbed animation, the correct and readable approach is to either omit `ease` or explicitly set it as a visual reminder that scrub overrides it. Omitting is cleaner.

## Target

Remove `ease: 'none'` from all three scrubbed tweens. No functional change — this is a clarity fix that also removes a misleading signal to future maintainers.

```ts
// target — label reveal (Skills.tsx ~111)
gsap.fromTo(label,
  { opacity: 0, x: -20 },
  { opacity: 1, x: 0, duration: 1, scrollTrigger: { ... scrub: true ... } }
);
```

```ts
// target — icons reveal (Skills.tsx ~116)
gsap.fromTo(items,
  { opacity: 0, y: 32, filter: 'blur(8px)' },
  { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.06, duration: 1,
    scrollTrigger: { ... scrub: true ... } }
);
```

```ts
// target — heading reveal (Skills.tsx ~168)
gsap.fromTo(heading,
  { opacity: 0, y: 24 },
  { opacity: 1, y: 0, duration: 1, scrollTrigger: { ... scrub: true ... } }
);
```

## Repo conventions to follow

- GSAP is used only in `Skills.tsx` in this codebase. No global GSAP defaults or config file.
- The `scrub: true` pattern is intentional (scroll-locked reveal) — do not change `scrollTrigger` shape.
- Do not add `ease` back in any form. Omitting is the documented GSAP behavior for scrubbed tweens.

## Steps

1. **`src/components/Skills.tsx`** — find each `ease: 'none'` in the three `gsap.fromTo` calls and delete the `ease: 'none',` key-value pair (including the trailing comma). Do not change any other property in those objects.

   Three edits total:
   - Line ~111 in the label tween
   - Line ~116 in the icons tween
   - Line ~168 in the heading tween

## Boundaries

- Do NOT change `scrub`, `start`, `end`, `trigger`, `stagger`, `duration`, or any other GSAP property.
- Do NOT touch the `fromTo` initial state objects.
- Do NOT change the `filter` animation — it is intentional and within the 20px blur budget (8px).
- Do NOT touch any other file.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no errors.
- **Feel check**:
  1. Scroll to the Skills section. The label and icons should reveal at the same speed as before (no functional change expected).
  2. Scrub slowly through the scroll range — animations should be frame-perfectly locked to scroll position.
  3. Confirm no abrupt snap or easing change compared to before.
- **Done when**: `ease: 'none'` no longer appears in `Skills.tsx` and scrub behavior is unchanged.
