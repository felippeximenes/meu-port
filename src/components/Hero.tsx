import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';

/* ── Camera curve ─────────────────────────────────────────────────────────── */
const KEYS = [
  { p: 0, f: 0, z: 1 }, { p: 0.12, f: 4, z: 1 }, { p: 0.25, f: 13, z: 1.01 },
  { p: 0.4, f: 29, z: 1.025 }, { p: 0.56, f: 48, z: 1.055 }, { p: 0.7, f: 66, z: 1.09 },
  { p: 0.84, f: 80, z: 1.13 }, { p: 1, f: 88, z: 1.16 },
];
const BG_DURATION = 6.041667;
const QUAD_EXPAND = 0.006;
const RISE_END = 0.6;
const RISE_FROM = 0.45;
const RISE_TO = -0.04;
const FADE_START = 0.82;
const FADE_END = 0.98;
// Headline: rises out of the way of the monitor early in the scroll, then
// holds in place — capped, so it always stays fully visible (see Hero(),
// "Rises just enough to clear room...").
const HEADLINE_RISE_END = 0.45;
const HEADLINE_MAX_RISE = 64;
const FRAME_COUNT = 89;
const RAW_FRAME_COUNT = 145;
const RAW_FPS = 24;

/* ── Mobile hero (≤768px): shorter sticky scroll-jack, tuned for phones ─────── */
const STATIC_BREAKPOINT = 768;
const STATIC_TRACK_EXTRA_VH = 55;
// A CONSTANT multiplier, deliberately not a start->end curve. The mobile
// clip's own tracked corners already grow smoothly and monotonically on
// their own (verified against the tracking data directly — zero
// frame-to-frame shrinks across all 192 frames); an *extra* multiplier
// that itself changes with scroll progress fights that growth at a
// different rate than the (eased) frame selection advances, and the two
// mismatched rates are exactly what made the rendered size shrink, grow,
// then shrink again while scrolling instead of just growing. A flat
// constant can only ever scale the already-monotonic curve uniformly, so
// it can't reintroduce that — tune this single number, not a range.
const STATIC_MZ = 1.0;
// A separate portrait-shot source (own frame sequence + corner tracking),
// not a reuse/crop of the desktop one — see /public/hero-mobile-raw.mp4.
// It carries its own built-in camera push-in, so mobile drives raw frame
// selection straight off scroll progress instead of desktop's KEYS curve.
const MOBILE_RAW_FRAME_COUNT = 192;
const MOBILE_RAW_FPS = 24;
const MOBILE_BG_DURATION = MOBILE_RAW_FRAME_COUNT / MOBILE_RAW_FPS;
// The desktop QUAD_EXPAND (0.6%) was tuned against a 1280x720 tracking
// space; mobile's own tracking space is 360x640, so the same fractional
// expansion is a much smaller number of actual pixels — not enough to hide
// the green screen's edge once scaled up to fill a phone screen. Wider on
// purpose for that smaller source.
const MOBILE_QUAD_EXPAND = 0.03;
// Initial CSS fallback only — sizeStage() in the effect below immediately
// replaces this with a JS-measured height (viewport minus the overlay's
// real text height), so the stage always ends snug against the fixed
// overlay: no gap, no collision, and no guessed constant to keep in sync
// with copy that can reflow by language or font load.
const STATIC_STAGE_VH = 68;

/* ── Corner-pin math (ported literally from reference) ────────────────────── */
function adj(m: number[]): number[] {
  return [
    m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4],
    m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5],
    m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3],
  ];
}
function multmm(a: number[], b: number[]): number[] {
  const c = new Array(9);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    let v = 0;
    for (let k = 0; k < 3; k++) v += a[3*i+k] * b[3*k+j];
    c[3*i+j] = v;
  }
  return c;
}
function multmv(m: number[], v: number[]): number[] {
  return [m[0]*v[0]+m[1]*v[1]+m[2]*v[2], m[3]*v[0]+m[4]*v[1]+m[5]*v[2], m[6]*v[0]+m[7]*v[1]+m[8]*v[2]];
}
function basisToPoints(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): number[] {
  const m = [x1, x2, x3, y1, y2, y3, 1, 1, 1];
  const v = multmv(adj(m), [x4, y4, 1]);
  return multmm(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}
function cornerPin(srcW: number, srcH: number, dst: [number, number][]): string {
  const [tl, tr, br, bl] = dst;
  const s = basisToPoints(0, 0, srcW, 0, srcW, srcH, 0, srcH);
  const d = basisToPoints(tl[0], tl[1], tr[0], tr[1], br[0], br[1], bl[0], bl[1]);
  const h = multmm(d, adj(s));
  const scale = h[8] !== 0 ? h[8] : 1;
  const n = h.map(v => v / scale);
  const mat = [n[0], n[3], 0, n[6], n[1], n[4], 0, n[7], 0, 0, 1, 0, n[2], n[5], 0, n[8]];
  return 'matrix3d(' + mat.map(v => v.toFixed(8)).join(',') + ')';
}

export default function Hero() {
  const { lang } = useLang();
  const t = useT();

  const [isStatic, setIsStatic] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${STATIC_BREAKPOINT}px)`).matches
  );

  const trackRef     = useRef<HTMLDivElement>(null);
  const stageRef     = useRef<HTMLDivElement>(null);
  const staticTrackRef = useRef<HTMLDivElement>(null);
  const staticStageRef = useRef<HTMLDivElement>(null);
  const staticOverlayRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const pinRef       = useRef<HTMLDivElement>(null);
  const plateRef     = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLDivElement>(null);
  const hudRef       = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);
  const barRef       = useRef<HTMLDivElement>(null);
  const clockRef     = useRef<HTMLSpanElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const fallbackRef  = useRef<HTMLDivElement>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);

  /* ── Full-video lightbox: Esc to close, lock background scroll ────────── */
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxOpen(false); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen]);

  /* ── Track the static/scroll-jack breakpoint ───────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${STATIC_BREAKPOINT}px)`);
    const handler = () => setIsStatic(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* ── Clock ──────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const el = clockRef.current;
    if (!el) return;
    const tick = () => {
      el.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isStatic]);

  /* ── Hero video ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    const fallback = fallbackRef.current;
    if (!video) return;
    video.muted = true;
    (video as HTMLVideoElement & { defaultMuted: boolean }).defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    const showVideo = () => {
      video.style.display = 'block';
      if (fallback) fallback.style.display = 'none';
      video.play().catch(() => {});
    };
    const showFallback = () => {
      video.style.display = 'none';
      if (fallback) fallback.style.display = 'block';
    };
    showFallback();
    video.addEventListener('loadeddata', showVideo);
    video.addEventListener('error', showFallback);
    const src = '/video-case.mp4';
    fetch(src, { method: 'HEAD' }).then(r => { if (r.ok) video.src = src; }).catch(() => showFallback());
    let videoIO: IntersectionObserver | null = null;
    if (window.IntersectionObserver) {
      videoIO = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting && video.paused) video.play().catch(() => {}); });
      }, { threshold: 0.05 });
      videoIO.observe(video);
    }
    return () => {
      video.removeEventListener('loadeddata', showVideo);
      video.removeEventListener('error', showFallback);
      videoIO?.disconnect();
    };
  }, [isStatic]);

  /* ── Monitor scene: scroll-jacked (desktop/tablet) or fixed framing (mobile) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const pin = pinRef.current;
    if (!canvas) return;

    /* Pre-load frames (isolated monitor cutout). Mobile has its own portrait
       shot (see MOBILE_RAW_FRAME_COUNT above) — load only the set the
       current device actually needs, not both. */
    const frameCount = isStatic ? MOBILE_RAW_FRAME_COUNT : RAW_FRAME_COUNT;
    const framePath = isStatic ? '/hero-frames-mobile/monitor_' : '/hero-frames/monitor_';
    const frames: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = framePath + String(i).padStart(5, '0') + '.webp';
      frames[i] = img;
    }

    let tracking: { fps: number; width: number; height: number; frames: { corners: [number,number][] }[] } | null = null;

    const easeInOutCubic = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;

    const camera = (p: number) => {
      for (let i = 0; i < KEYS.length - 1; i++) {
        const a = KEYS[i], b = KEYS[i+1];
        if (p <= b.p) {
          const l = easeInOutCubic((p - a.p) / (b.p - a.p));
          return { frame: Math.round(a.f + (b.f - a.f) * l), zoom: a.z + (b.z - a.z) * l };
        }
      }
      return { frame: KEYS[KEYS.length-1].f, zoom: KEYS[KEYS.length-1].z };
    };

    const cornersAt = (time: number) => {
      if (!tracking) return null;
      const last = tracking.frames.length - 1;
      const index = Math.min(Math.max(time * tracking.fps, 0), last);
      const i0 = Math.floor(index);
      const i1 = Math.min(i0 + 1, last);
      const a = index - i0;
      const from = tracking.frames[i0].corners;
      const to   = tracking.frames[i1].corners;
      if (!from) return null;
      if (!to) return from;
      return from.map((pt, i) => [pt[0] + (to[i][0] - pt[0]) * a, pt[1] + (to[i][1] - pt[1]) * a] as [number,number]);
    };

    // `usableHeight` lets a caller confine the drawn frame to the TOP portion
    // of `rect` (centered within 0..usableHeight instead of 0..rect.height),
    // reserving the strip below it for something else entirely — the mobile
    // hero's fixed identity/tagline overlay, which must never have the
    // zooming monitor grow into it. Desktop/tablet don't pass this, so it
    // defaults to the full rect and behaves exactly as before.
    const draw = (rect: DOMRect, img: HTMLImageElement, zoom: number, mz: number, contain: boolean, usableHeight: number = rect.height, gapFill: string | null = '#0c0c0d') => {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      const ctx = canvas.getContext('2d');
      if (!ctx || !img || !img.naturalWidth) return;
      // Portrait screens keep the complete 16:9 composition visible. Covering a
      // tall viewport here turns the sequence into an excessively cropped close-up.
      const fit = (contain ? Math.min : Math.max)(rect.width / img.naturalWidth, usableHeight / img.naturalHeight);
      const dw = img.naturalWidth * fit;
      const dh = img.naturalHeight * fit;
      const centerY = usableHeight / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      // In "contain" mode (portrait/tablet) the frame doesn't reach the
      // canvas edges. The seam this used to cause was specifically below
      // the frame — its own dark desk meeting the Layer 1 gradient once
      // that's already turned much lighter — so only that strip gets a
      // solid fill (#0c0c0d: the desk's own pixel color, also the
      // gradient's top stop). Above the frame is left transparent, same as
      // always, since that's also where the headline composes through at
      // low scroll progress. In "cover" mode the frame already reaches the
      // bottom edge, so this is a no-op and nothing changes from before.
      // `gapFill: null` (mobile) skips this: that gradient stays dark
      // end-to-end now, so the flat-fill rectangle was itself the visible
      // seam — better to leave it transparent and let the real CSS
      // gradient (which is already the right, continuously-varying tone)
      // show straight through.
      const bh = dh * zoom * mz;
      const gapBottom = centerY + bh / 2;
      if (gapFill && gapBottom < usableHeight) {
        ctx.fillStyle = gapFill;
        ctx.fillRect(0, gapBottom, rect.width, usableHeight - gapBottom);
      }
      ctx.translate(rect.width / 2, centerY);
      ctx.scale(zoom * mz, zoom * mz);
      ctx.drawImage(img, -dw/2, -dh/2, dw, dh);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const applyCornerPin = (rect: DOMRect, camTime: number, zoom: number, mz: number, isPortraitLocal: boolean, usableHeight: number = rect.height, expand: number = QUAD_EXPAND) => {
      if (!tracking || !pin) return;
      let corners = cornersAt(camTime);
      if (!corners) return;
      const cx = corners.reduce((s, p) => s + p[0], 0) / 4;
      const cy = corners.reduce((s, p) => s + p[1], 0) / 4;
      corners = corners.map(([x, y]) => [cx + (x - cx) * (1 + expand), cy + (y - cy) * (1 + expand)] as [number,number]);
      const fit = (isPortraitLocal ? Math.min : Math.max)(rect.width / tracking.width, usableHeight / tracking.height);
      const ox = (rect.width - tracking.width * fit) / 2;
      const oy = (usableHeight - tracking.height * fit) / 2;
      const centerY = usableHeight / 2;
      const dst = corners.map(([x, y]) => {
        const bx = x * fit + ox;
        const by = y * fit + oy;
        return [(bx - rect.width/2) * zoom * mz + rect.width/2, (by - centerY) * zoom * mz + centerY] as [number,number];
      });
      pin.style.transform = cornerPin(1920, 1080, dst);
    };

    if (isStatic) {
      const stageEl = staticStageRef.current;
      const trackEl = staticTrackRef.current;
      const overlayEl = staticOverlayRef.current;
      const sectionEl = trackEl?.parentElement as HTMLElement | null;
      if (!stageEl || !trackEl || !sectionEl) return;

      // Mobile-tuned scroll-jack: the stage is CSS-sticky inside a track
      // that's taller than the viewport by STATIC_TRACK_EXTRA_VH, so it
      // pins in place and holds the full camera sweep before releasing —
      // same held-until-complete feel as desktop/tablet, just with a much
      // shorter added-scroll budget (desktop adds 160vh; this adds far
      // less), since asking a phone for 160vh of extra scroll to sit
      // through one animation is not a reasonable responsive trade.
      //
      // The stage's own height is sized in JS (below), not left at a fixed
      // dvh, specifically so it always ends BEFORE the fixed overlay's own
      // top edge: the canvas clips to the stage's box, so a stage that
      // simply doesn't reach as far down as the overlay can never have the
      // zooming monitor collide with it — no separate "reserved" zone
      // inside the box needed, and no leftover dead gap between them
      // either, since the sizing keeps the two snug against each other.
      let overlayH = 0;
      const sizeStage = () => {
        const viewportH = window.visualViewport?.height || window.innerHeight;
        overlayH = overlayEl?.getBoundingClientRect().height || 0;
        const gap = 16;
        const stagePx = Math.max(viewportH - overlayH - gap, viewportH * 0.55);
        stageEl.style.height = stagePx + 'px';
        trackEl.style.height = (stagePx + viewportH * (STATIC_TRACK_EXTRA_VH / 100)) + 'px';
        // A stage shorter than the viewport (needed above, to sit snug
        // against the overlay instead of leaving a gap) means the section
        // it's in can end up shorter than one viewport-height once you're
        // deep into the pinned scroll — and the fixed overlay's own top
        // edge fades to fully transparent, so whatever's normally
        // scrolling underneath it (the NEXT section, once the document is
        // that short) starts showing through before the pin has actually
        // released. Padding the section by the shortfall keeps the
        // document long enough that this can't happen before release.
        sectionEl.style.paddingBottom = Math.max(40, viewportH - stagePx) + 'px';
      };

      const paint = () => {
        const rect = stageEl.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        // Divide by the stage's own (measured) height, not window.innerHeight —
        // that's what actually determines when CSS position:sticky releases,
        // so progress now reaches 1 exactly as the pin lets go instead of
        // finishing early and leaving a dead, nothing-happening pinned stretch.
        const trackHeight = trackEl.offsetHeight - rect.height;
        const progress = trackHeight <= 0 ? 0 : Math.min(Math.max(-trackEl.getBoundingClientRect().top / trackHeight, 0), 1);
        // Mobile's own portrait shot already carries the full push-in as
        // baked-in camera motion (see MOBILE_RAW_FRAME_COUNT above), so
        // scroll progress maps straight onto its raw frames — no separate
        // KEYS/zoom curve to keep in sync with a different source clip.
        const camTime = easeInOutCubic(progress) * MOBILE_BG_DURATION;
        const rawIndex = Math.min(MOBILE_RAW_FRAME_COUNT - 1, Math.round(camTime * MOBILE_RAW_FPS));
        draw(rect, frames[rawIndex], 1, STATIC_MZ, false, rect.height, null);
        applyCornerPin(rect, camTime, 1, STATIC_MZ, false, rect.height, MOBILE_QUAD_EXPAND);
        // Visible from before the pin even engages, through the held pin,
        // and through the ENTIRE release scroll after it — not just a
        // fixed-height footprint near the bottom. Once the stage releases
        // it's still a real, stageHeight-tall box that has to scroll fully
        // off before the next section can take its place; a fixed-size
        // overlay covering only its own small footprint at the bottom of
        // the screen leaves most of that scroll-through, above it, showing
        // nothing but a bare stretch of flat background — which is exactly
        // the "black part" that stays after the text disappears too early.
        // So instead of a fixed box, this STRETCHES: its top edge tracks
        // the stage's own retreating bottom edge (never covering the
        // stage's still-visible real content), and its bottom edge tracks
        // the next section's advancing top edge (never covering ITS real
        // content either) — so it always exactly spans whatever "nothing
        // is happening here" gap currently exists between the two, with
        // the text pinned to the bottom of that stretch (justifyContent:
        // flex-end + overflow:hidden), staying on screen for the entire
        // gap's lifetime and shrinking away only as the gap itself closes,
        // never before. Before release (rect.bottom is still comfortably
        // above the text's own natural height), this reduces to the exact
        // original fixed footprint and gradient — unchanged from before.
        const viewportH = window.visualViewport?.height || window.innerHeight;
        const sectionBottom = sectionEl.getBoundingClientRect().bottom;
        if (overlayEl) {
          const stageBottom = Math.max(0, rect.bottom);
          const nextEdge = Math.min(viewportH, sectionBottom);
          const naturalTop = viewportH - overlayH;
          if (stageBottom < naturalTop) {
            // Post-release: the stage's real content has retreated above
            // where the overlay's normal footprint would start, meaning a
            // gap of exposed flat background now sits between them. Stretch
            // to exactly [stageBottom, nextEdge] — never further than
            // either real edge — solid so nothing arriving behind it can
            // bleed through, hidden only once the gap has fully closed.
            const height = Math.max(0, nextEdge - stageBottom);
            overlayEl.style.top = stageBottom + 'px';
            overlayEl.style.height = height + 'px';
            overlayEl.style.opacity = height > 0 ? '1' : '0';
            overlayEl.style.background = '#161616';
          } else {
            // Rest / pin phase: original fixed-height footprint, unchanged.
            overlayEl.style.top = 'auto';
            overlayEl.style.height = 'auto';
            overlayEl.style.opacity = '1';
            overlayEl.style.background = 'linear-gradient(180deg,rgba(22,22,22,0) 0%,rgba(22,22,22,0.6) 46%,rgba(22,22,22,0.94) 100%)';
          }
        }
      };

      sizeStage();
      paint();
      fetch('/quad_tracking_mobile.json').then(r => r.json()).then(d => { tracking = d; paint(); }).catch(() => {});
      // Re-measure once web fonts finish loading — the overlay's text can
      // reflow to a different height than the fallback font gave it.
      document.fonts?.ready.then(() => { sizeStage(); paint(); }).catch(() => {});
      window.addEventListener('resize', sizeStage);

      // Run the rAF loop for as long as the SECTION (not just the stage) is
      // anywhere on screen — the overlay needs paint() to keep evaluating
      // the section's bottom edge all the way through the release-scroll
      // buffer, well after the stage itself has scrolled away, otherwise
      // it'd freeze at whatever opacity it last had the instant the loop
      // stopped. Only stop once the section isn't intersecting at all,
      // which is true both before the hero is reached and after it's
      // fully scrolled past — opacity 0 is correct either way.
      let raf = 0;
      const loop = () => { paint(); raf = requestAnimationFrame(loop); };
      let io: IntersectionObserver | null = null;
      if (window.IntersectionObserver) {
        io = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) { if (!raf) raf = requestAnimationFrame(loop); }
            else if (raf) { cancelAnimationFrame(raf); raf = 0; if (overlayEl) overlayEl.style.opacity = '0'; }
          });
        }, { rootMargin: '0px' });
        io.observe(sectionEl);
      } else {
        raf = requestAnimationFrame(loop);
      }

      return () => {
        if (raf) cancelAnimationFrame(raf);
        io?.disconnect();
        window.removeEventListener('resize', sizeStage);
      };
    }

    const track   = trackRef.current;
    const stage   = stageRef.current;
    const plate   = plateRef.current;
    const headline = headlineRef.current;
    const hud     = hudRef.current;
    const tagline = taglineRef.current;
    const bar     = barRef.current;
    if (!track || !stage) return;

    fetch('/quad_tracking.json').then(r => r.json()).then(d => { tracking = d; }).catch(() => {});

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const height = track.offsetHeight - window.innerHeight;
      const progress = height <= 0 ? 0 : Math.min(Math.max(-track.getBoundingClientRect().top / height, 0), 1);
      const cam = camera(progress);
      const camTime = (cam.frame / (FRAME_COUNT - 1)) * BG_DURATION;
      const rawIndex = Math.min(RAW_FRAME_COUNT - 1, Math.round(camTime * RAW_FPS));
      const rect = stage.getBoundingClientRect();
      const isCompact = window.matchMedia('(max-width: 900px)').matches;
      const isPortrait = isCompact && rect.height > rect.width * 1.1;
      // Desktop deliberately stays on the original, immersive cover treatment.
      // Compact landscape keeps a light crop; portrait uses the full wide frame.
      const mz = isPortrait ? 1.15 : isCompact ? 1.06 : 1;
      draw(rect, frames[rawIndex], cam.zoom, mz, isPortrait);
      if (bar) bar.style.width = progress * 100 + '%';

      if (plate) {
        const rise = easeInOutCubic(Math.min(progress / RISE_END, 1));
        const riseFrom = isCompact ? 0.05 : RISE_FROM;
        const offset = (riseFrom + (RISE_TO - riseFrom) * rise) * window.innerHeight;
        plate.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      }

      const fade = 1 - Math.min(Math.max((progress - FADE_START) / (FADE_END - FADE_START), 0), 1);
      if (headline) {
        // Rises just enough to clear room for the monitor, then holds — it
        // no longer keeps climbing all the way to progress 1, which used to
        // carry it off the top of the viewport entirely. It still fades out
        // with the same `fade` curve as the HUD/tagline (finishing by
        // progress 0.98): without that, the headline stays at opacity 1
        // through the very end of the scroll-jacked track, including the
        // brief tail past where the sticky layers let go, so it would
        // still be painted — now static-positioned, so no longer confined
        // to the viewport — over whatever section comes next.
        const headlineRise = easeInOutCubic(Math.min(progress / HEADLINE_RISE_END, 1));
        headline.style.opacity = String(fade);
        headline.style.transform = 'translateY(-' + (headlineRise * HEADLINE_MAX_RISE).toFixed(1) + 'px)';
      }
      if (hud) hud.style.opacity = String(fade);
      if (tagline) tagline.style.opacity = String(fade);

      applyCornerPin(rect, camTime, cam.zoom, mz, isPortrait);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isStatic]);

  const t_badge = t.hero.badge;
  const t_sub   = t.hero.sub;

  const headline = (
    <h1 style={{
      display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline',
      columnGap: '0.22em', rowGap: '0.1em', margin: 0, padding: 0, maxWidth: '100%',
      fontFamily: 'var(--hero-font)', fontWeight: 400, textTransform: 'uppercase',
      fontSize: 'clamp(48px,15.2vw,272px)', lineHeight: 0.74, letterSpacing: '-0.02em',
      textAlign: 'center', color: 'rgb(201,199,204)',
    }}>
      <span style={{ flexBasis: '100%', fontSize: '0.66em', whiteSpace: 'nowrap' }}>
        {lang === 'pt' ? 'Sistemas que' : 'Systems that'}
      </span>
      <span style={{ flexBasis: '100%' }}>
        {lang === 'pt' ? 'se resolvem' : 'run themselves'}
      </span>
    </h1>
  );

  const monitorLayer = (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      {/* Mobile only: the "cover" fit fills the whole stage with the
          canvas's own drawn pixels — including the clip's solid black
          backdrop — so the section's own dark background never actually
          shows through underneath it. This layer sits between the canvas
          and the real corner-pinned video, and mix-blend-mode:screen tints
          the canvas's black backdrop to the exact same flat #161616 used
          everywhere else in the section: screen(black, #161616) is
          #161616, so the backdrop fuses with the page instead of reading
          as a pure-black hole, while brighter pixels (the monitor bezel)
          only lighten slightly rather than being recolored outright.
          Desktop never renders this (isStatic is false there), so nothing
          here touches it. */}
      {isStatic && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: '#161616',
            mixBlendMode: 'screen', pointerEvents: 'none',
          }}
        />
      )}
      <div
        ref={pinRef}
        className="hero-video-trigger"
        role="button"
        tabIndex={0}
        aria-label={lang === 'pt' ? 'Assistir ao vídeo completo' : 'Watch the full video'}
        onClick={() => setLightboxOpen(true)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxOpen(true); } }}
        style={{
          position: 'absolute', top: 0, left: 0, width: 1920, height: 1080,
          transformOrigin: '0 0', zIndex: 2, overflow: 'hidden', willChange: 'transform',
        }}
      >
        <video
          ref={videoRef}
          preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'none' }}
        />
        <div ref={fallbackRef} style={{ position: 'absolute', inset: 0, background: '#0e1113' }} />
        <span className="hero-play-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </div>
    </>
  );

  const lightbox = lightboxOpen ? createPortal(
    <div className="hero-lightbox-backdrop" onClick={() => setLightboxOpen(false)}>
      <button
        type="button"
        className="hero-lightbox-close"
        onClick={() => setLightboxOpen(false)}
        aria-label={lang === 'pt' ? 'Fechar vídeo' : 'Close video'}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>
      <video
        className="hero-lightbox-video"
        src="/video-case.mp4"
        controls
        autoPlay
        playsInline
        onClick={e => e.stopPropagation()}
      />
    </div>,
    document.body
  ) : null;

  if (isStatic) {
    return (
      <>
      <section style={{
        position: 'relative', paddingBottom: 40,
        // One flat color for the whole section — headline, stage and the
        // padding below it — instead of a dynamically sampled or gradient
        // tint. Dynamic sampling and gradients both left a seam somewhere
        // (a percentage-based fade needing the section's full height to
        // reach the stage's own already-fully-tinted starting pixel, or a
        // sampled hue drifting away from the site's own established dark
        // tone). A single uniform #161616 — the same onyx used by the nav
        // and footer — removes the seam by construction: there's nothing
        // for two different values to disagree about.
        background: '#161616',
      }}>
        <div className="hero-static-headline" style={{ padding: 'clamp(96px,14vh,130px) 24px 28px', textAlign: 'center' }}>
          {headline}
        </div>

        {/* Track adds a modest scroll budget so the stage below can pin and
            hold through the full camera sweep, then release — the same
            held-until-complete feel as desktop/tablet, just shorter. The
            stage itself is full-viewport height (not a small boxed
            thumbnail), so the identity/tagline overlay has room to sit
            fixed on top of the scene the whole time it's pinned, instead
            of only appearing once the pin lets go. */}
        <div ref={staticTrackRef} style={{ position: 'relative', height: `calc(${STATIC_STAGE_VH}dvh + ${STATIC_TRACK_EXTRA_VH}dvh)` }}>
          <div ref={staticStageRef} style={{
            position: 'sticky', top: 0, width: '100%', height: `${STATIC_STAGE_VH}dvh`, overflow: 'hidden',
            // Same flat #161616 as the section around it — no gradient, no
            // sampled color — so the stage reads as part of one continuous
            // surface instead of a boxed-in panel with its own tone.
            background: '#161616',
          }}>
            {monitorLayer}
          </div>
        </div>

        {/* Identity + tagline: fixed to the viewport, and deliberately a
            SIBLING of the stage rather than nested inside it — a
            position:fixed descendant still gets clipped by an ancestor's
            overflow:hidden despite being positioned relative to the
            viewport, so nesting it inside the (overflow:hidden) stage only
            rendered correctly by coincidence while pinned, and vanished as
            soon as the stage's own box scrolled away from the viewport
            before/after the pin. Visible at rest, not just once scrolled
            into the pin, and stays put the whole time the hero is anywhere
            near the screen — shown/hidden by the intersection observer
            above. The monitor's own draw area is kept clear of this
            block's measured height (see the effect above), so it never
            zooms into it. */}
        <div ref={staticOverlayRef} style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 30,
          opacity: 0, transition: 'opacity 200ms ease', pointerEvents: 'none',
          overflow: 'hidden',
          background: 'linear-gradient(180deg,rgba(22,22,22,0) 0%,rgba(22,22,22,0.6) 46%,rgba(22,22,22,0.94) 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.62)',
        }}>
          {/* Padding lives on this inner wrapper, not the sized/positioned
              outer div above: a box's own padding is a hard floor on how
              small it can render (border-box still can't push content
              below zero), so padding directly on the element whose height
              we shrink toward 0 as the gap closes would leave it stuck at
              ~82px (its padding sum) right at the very end — a last sliver
              of the next section's content that never quite gets covered
              in time, then jump-covered by that leftover 82px for a beat.
              Padding on this child instead means the wrapper is free to
              actually reach 0 (clipped by the outer's overflow:hidden). */}
          <div style={{ padding: '54px 24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              <span>Felippe Ximenes</span>
              <span>Rio de Janeiro, BR · <span ref={clockRef}>--:--</span> BRT</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 6, color: '#fff' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember)', flexShrink: 0 }} />
                {t_badge}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.4, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.8)' }}>{t_sub}</p>
          </div>
        </div>
      </section>
      {lightbox}
      </>
    );
  }

  return (
    <>
    <div ref={trackRef} id="hero-track" style={{ position: 'relative', height: '260vh', background: '#161616' }}>
      {/* Layer 1: gradient background */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 0, height: '100vh', width: '100%', marginBottom: '-100vh',
        background: 'linear-gradient(180deg,#0c0c0d 0%,#141416 26%,#3a3a3d 58%,#8d8c90 82%,#c9c7cc 100%)',
      }} />

      {/* Layer 2: headline */}
      <div
        ref={headlineRef}
        className="hero-headline"
        style={{
          position: 'sticky', top: 0, zIndex: 20, height: '100vh', width: '100%', marginBottom: '-100vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
          padding: 'clamp(120px,19vh,210px) 24px 0', textAlign: 'center', pointerEvents: 'none',
        }}
      >
        {headline}
      </div>

      {/* Layer 3: canvas stage + HUD + tagline + bar */}
      <div className="hero-stage" style={{ position: 'sticky', top: 0, zIndex: 30, height: '100vh', width: '100%', overflow: 'hidden' }}>
        <div ref={stageRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', transform: 'translateZ(0)' }}>
          <div
            ref={plateRef}
            className="hero-plate"
            style={{
              position: 'absolute', inset: 0, willChange: 'transform',
              WebkitMaskImage: 'linear-gradient(180deg,rgba(0,0,0,0) 0%,#000 11%)',
              maskImage: 'linear-gradient(180deg,rgba(0,0,0,0) 0%,#000 11%)',
            }}
          >
            {monitorLayer}
          </div>
        </div>

        {/* HUD: bottom-left */}
        <div ref={hudRef} className="hero-hud" style={{
          position: 'absolute', bottom: 30, left: 30, zIndex: 30,
          display: 'flex', flexDirection: 'column', gap: 4,
          fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.62)',
        }}>
          <span>Felippe Ximenes</span>
          <span>Rio de Janeiro, BR · <span ref={clockRef}>--:--</span> BRT</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 6, color: '#fff' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember)', flexShrink: 0 }} />
            {t_badge}
          </span>
        </div>

        {/* Tagline: bottom-right */}
        <p ref={taglineRef} className="hero-tagline" style={{
          position: 'absolute', right: 24, bottom: 24, zIndex: 30, margin: 0,
          maxWidth: 342, padding: '14px 16px',
          background: 'rgba(12,12,13,0.52)', backdropFilter: 'blur(8px)',
          textAlign: 'right', fontSize: 17, lineHeight: 1.3, letterSpacing: '-0.01em',
          color: 'rgba(255,255,255,0.92)',
        }}>{t_sub}</p>

        {/* Progress bar */}
        <div ref={barRef} style={{
          position: 'absolute', bottom: 0, left: 0, zIndex: 40,
          height: 2, width: 0, background: 'var(--ember)',
        }} />
      </div>
    </div>
    {lightbox}
    </>
  );
}
