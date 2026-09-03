---
target: Sobre section - richer/more informative
total_score: 10
max_score: 16
na_heuristics: 1,3,5,7,9,10
p0_count: 1
p1_count: 2
timestamp: 2026-09-03T20-43-40Z
slug: src-components-sobresection-tsx
---
Method: dual-agent (A: general-purpose design-review sub-agent · B: general-purpose detector/browser sub-agent)

Note on evidence quality: Assessment A had no browser tool available in its isolated context and worked from source/CSS only. Assessment B did have browser access, but its screenshots appear to have been captured during the site's preloader animation (a known timing quirk in this project — the preloader briefly shows unrelated placeholder headline text before the real page settles), so its visual read of on-page copy is not reliable evidence here; its detector and route findings are unaffected and reliable.

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | n/a | Static bio block, no system status to show |
| 2 | Match System / Real World | 3 | Plain language, but generic developer-bio register rather than a distinctly personal voice |
| 3 | User Control and Freedom | n/a | No flow/state to escape |
| 4 | Consistency and Standards | 3 | Follows the site's mono-label + CTA pattern consistently |
| 5 | Error Prevention | n/a | No input |
| 6 | Recognition Rather Than Recall | 2 | "Desde 2022" has no referent — reads ambiguously as an availability date, not a career-start date |
| 7 | Flexibility and Efficiency | n/a | Persuade/Experience surface, correctly excluded |
| 8 | Aesthetic and Minimalist Design | 2 | Minimalism tips into under-substantiated: two sentences + a date tag is the entire case for a senior claim |
| 9 | Error Recovery | n/a | No error states |
| 10 | Help and Documentation | n/a | Not applicable to a bio block |
| **Total** | | **10/16** | **Acceptable (62%)** |

### Design Specificity Verdict

**LLM assessment**: Generic. The bio ("Full-stack developer focused on AI engineering... TypeScript, Python, React and AWS") is a tech-stack list, not a story — swap the name and it fits any mid-level dev's portfolio. Nothing here is unique to Felippe except the words themselves: no year count, no project tally, no named highlight, no personality beat. The ProfileCard's pointer-driven tilt/shine/glare interaction (spring-damped, `k = 1-exp(-dt/0.14)`) is genuinely crafted and distinctive — but the copy column next to it is the single most common About-section pattern in existence: photo + 2-sentence bio + download button.

**Deterministic scan**: `detect.mjs --json` on SobreSection.tsx returned exit code 0, zero findings. No mechanical pattern violations (no false positives to weigh either, since nothing fired).

**Visual overlays**: No `detect.js` overlay route exists in this project (a Vite dev-server catch-all made it look reachable at first; actual script injection failed with a load error). No user-visible overlay was shown — this is expected, not a defect, since the project never wired that endpoint up.

### Overall Impression

The section is clean and on-brand but content-thin relative to what the codebase can actually prove. The visual/interaction layer (tilt card, split-heading reveal, ghost-word parallax) is doing more persuasive work than the words next to it. The fix isn't more decoration — it's surfacing facts that already exist in `data.ts` (4 real employers, 5 shipped projects with real payment/auth/RAG systems, 3 service categories) that currently never reach this section.

### What's Working

1. **ProfileCard micro-interaction** — pointer-tracked tilt, shine, and glare with proper spring damping is production-grade motion craft, matching the claimed skill set.
2. **Entrance choreography** (`usePortraitReveal`, `useGhostParallax`, `SplitHeading`) gives the section its own identity rather than being a static block.
3. Typographic restraint (mono labels, tight tracking) stays consistent with the rest of the site's system — nothing here clashes.

### Priority Issues

**[P0] Section is informationally hollow relative to what `data.ts` proves.**
Why it matters: a recruiter or client reading only this section learns he "knows AWS" but not that he's shipped 5 production apps with real payments/auth/RAG, or how long he's been doing this professionally. The persuasive case the rest of the site makes never reaches the About section.
Fix: add a compact stat/fact row under the bio — years active (derived from the earliest `experiences` entry, 2022), shipped-project count (`projects.length`), current role/company (`experiences[0]`) — 3-4 short facts, not paragraphs, to stay minimal but substantiated.
Suggested command: `/impeccable layout` (to place it) + `/impeccable clarify` (to word it tightly)

**[P1] "Desde 2022" is a label without a referent.**
Why it matters: on first read it looks like an availability chip ("available since 2022"), not a career-start date — actively ambiguous, undersells experience length instead of stating it.
Fix: either fold the start date into the new stat row with explicit framing ("4+ anos de experiência") and replace this slot with a real availability status, or relabel it outright.
Suggested command: `/impeccable clarify`

**[P1] Column balance will need a second look once content grows.**
Why it matters: the 1fr / 0.85fr split currently gives the photo visual parity with the entire text column, but the text column is thin. Adding the P0 stat row without revisiting proportions risks the opposite imbalance.
Fix: after adding substantiating content, re-check `gridTemplateColumns` and consider letting a stat row span both columns beneath row 2 rather than staying confined to the narrower column.
Suggested command: `/impeccable layout`

**[P2] No in-page bridge from Sobre to the proof (projects/experience).**
Why it matters: the highest-signal content on the whole site (`data.ts` projects and experience) is one scroll away and completely unreferenced from Sobre — a skimmer has no cue to keep going.
Fix: a small anchor/line pointing at what's next (current role + a nudge toward the work below).
Suggested command: `/impeccable delight` or `/impeccable clarify`

**[P3] Mobile stacking order shows the photo before any bio text.**
Why it matters: on the majority-mobile-traffic case, a visitor sees a face and a name before learning anything about the work — works against the "richer/informative" goal specifically on mobile.
Fix: consider reordering the mobile stack so bio/stat content precedes or immediately follows the headline, ahead of the photo.
Suggested command: `/impeccable adapt`

### Persona Red Flags

**Jordan (skeptical technical evaluator)**: Sees buzzwords ("RAG pipelines," "AWS infrastructure") but zero proof-of-scale right where credibility should be established — no years, no project count, no client range. Will scroll past unconvinced.

**Riley (time-pressed decision-maker)**: Wants the elevator-pitch facts (experience length, availability, specialization) scannable in seconds; currently must infer everything from prose, and "Desde 2022" is actively ambiguous on a skim.

**Casey (detail-oriented researcher)**: Would expect the career timeline surfaced here, not requested to dig further down the page — may not realize the Neocoder/Zosia AI role history exists as page content at all.

### Minor Observations

- The CV download (`RESUME[lang]`) is a good touch (locale-correct PDF) but isn't visually distinguished from a generic "learn more" CTA — no format/size hint.
- The `aria-hidden` "Sobre" ghost watermark is a nice peak-end visual beat; purely decorative, not a bug.
- Detector found zero mechanical issues — whatever changes come out of this critique, they're stylistic/informational, not pattern-violation fixes.

### Questions to Consider

1. If someone reads only this section and nothing else on the page, do they know he's shipped 5 production apps with real payment/auth/RAG systems — or just that he "knows AWS"?
2. Is the profile card's interactive sophistication currently doing more persuasive work than the words next to it?
3. Would fixing the availability-tag ambiguity alone change how confident a first-time visitor feels, even before any new content is added?
