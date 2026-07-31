# 010 — FAQ accordion — animate height instead of teleporting content

- **Status**: TODO
- **Commit**: 9a0f435
- **Severity**: MISSED OPPORTUNITY A
- **Category**: Missed opportunities
- **Estimated scope**: 1 file, ~15 lines changed

## Problem

The FAQ accordion in `FaqSection.tsx` toggles content visibility with a direct conditional render — the answer paragraph teleports in and out with no height animation. This violates the AUDIT principle: **state changes that teleport (content swaps, layout jumps) where a brief transition would prevent a jarring change**.

```tsx
// src/components/FaqSection.tsx:28 — current
{open === i && <p style={{ marginTop: 8, color: 'var(--muted)' }}>{faq.answer}</p>}
```

The content appears and disappears instantly, causing the layout to jump. This is a jarring UX for an FAQ — the user clicks to expand and the content just pops in, with no spatial relationship between the question and answer.

## Target

Use the `grid-template-rows: 0fr → 1fr` CSS transition trick — the only pure-CSS way to animate height from 0 to auto without JavaScript height measurement. No new dependencies needed.

```tsx
// target pattern for each FAQ item
<div
  style={{
    display: 'grid',
    gridTemplateRows: open === i ? '1fr' : '0fr',
    transition: 'grid-template-rows 0.28s cubic-bezier(0.23, 1, 0.32, 1)',
  }}
>
  <div style={{ overflow: 'hidden' }}>
    <p style={{ marginTop: 8, paddingBottom: 4, color: 'var(--muted)' }}>
      {faq.answer}
    </p>
  </div>
</div>
```

How this works:
- The outer `div` is a 1-row grid. `grid-template-rows` transitions between `0fr` (row takes 0 of the available fraction = zero height) and `1fr` (full height). The browser interpolates this value, which drives a height animation.
- The inner `div` has `overflow: hidden` to clip the content during the transition.
- The `<p>` is always rendered in the DOM (not conditionally) — no teleport.

Duration `0.28s` with `cubic-bezier(0.23, 1, 0.32, 1)`: fast start (content rushes in), eases to stop (no overshooting layout). Opening feels snappy; the answer is readable by the time the animation completes.

## Repo conventions to follow

- `FaqSection.tsx` already uses inline styles — keep that pattern.
- Do NOT install `framer-motion` animate-height or any accordion library — the CSS grid trick is the lazy solution.
- Easing tokens are planned for plan 008. Until 008 lands, inline `cubic-bezier(0.23, 1, 0.32, 1)` directly.
- The outer wrapper div must NOT have `overflow: hidden` — that's on the inner div. Outer overflow:hidden would clip box-shadows or borders on the FAQ item itself.

## Steps

1. **`src/components/FaqSection.tsx`** — locate the conditional render of the answer paragraph at approximately line 28.

   Old structure inside the map (approximate):
   ```tsx
   <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{ ... }}>
     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
       <span>{faq.question}</span>
       <span>{open === i ? '−' : '+'}</span>
     </div>
     {open === i && <p style={{ marginTop: 8, color: 'var(--muted)' }}>{faq.answer}</p>}
   </div>
   ```

   New structure — replace the conditional `<p>` with an animated grid wrapper:
   ```tsx
   <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{ ... }}>
     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
       <span>{faq.question}</span>
       <span>{open === i ? '−' : '+'}</span>
     </div>
     <div
       style={{
         display: 'grid',
         gridTemplateRows: open === i ? '1fr' : '0fr',
         transition: 'grid-template-rows 0.28s cubic-bezier(0.23, 1, 0.32, 1)',
       }}
     >
       <div style={{ overflow: 'hidden' }}>
         <p style={{ marginTop: 8, paddingBottom: 4, color: 'var(--muted)' }}>
           {faq.answer}
         </p>
       </div>
     </div>
   </div>
   ```

2. If `FaqSection.tsx` has multiple FAQ items in a map, this structure applies inside the map — no change to the map iteration itself.

## Boundaries

- Do NOT add state management beyond the existing `open` state.
- Do NOT touch the click handler or the open/close toggle logic.
- Do NOT install any new dependencies.
- Do NOT change the FAQ data or question/answer content.
- Do NOT animate the `+`/`−` icon rotation — that is out of scope.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no errors.
- **Feel check**:
  1. Click a FAQ question — the answer should slide down smoothly, not pop in.
  2. Click the same question again — the answer should slide up and disappear.
  3. Click quickly between different questions — each closes and opens without layout jumps or Z-fighting.
  4. In DevTools → Animations panel at 10% speed, confirm `grid-template-rows` is animating (it appears as a custom property transition).
  5. The content inside (the `<p>`) should be clipped to the animated height — no overflow visible during the transition.
- **Done when**: FAQ answers expand and collapse with a smooth height animation; no content teleports.
