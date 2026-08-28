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
const FRAME_COUNT = 89;
const RAW_FRAME_COUNT = 145;
const RAW_FPS = 24;

/* ── No-scroll mobile hero (≤768px): fixed framing, no scroll-jack ──────────── */
const STATIC_BREAKPOINT = 768;
const STATIC_PROGRESS = 0.56;
const STATIC_MZ = 1.15;

/* ── Calibrated corrections (do NOT alter) ────────────────────────────────── */
const FIX0 = [[0, 0], [-8, 27], [-4, 0], [7, 0]] as [number, number][];
const TAPER_X = [[0, 1], [13, 0.93], [29, 0.67], [48, 0.26], [66, 0.07], [88, 0]] as [number, number][];
const TAPER_Y = [[0, 1], [13, 0.56], [29, 0.22], [48, 0.04], [66, 0], [88, 0]] as [number, number][];

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
  const staticStageRef = useRef<HTMLDivElement>(null);
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

    /* Pre-load frames (isolated monitor cutout, transparent background) */
    const frames: HTMLImageElement[] = [];
    for (let i = 0; i < RAW_FRAME_COUNT; i++) {
      const img = new Image();
      img.src = '/hero-frames/monitor_' + String(i).padStart(5, '0') + '.webp';
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

    const draw = (rect: DOMRect, img: HTMLImageElement, zoom: number, mz: number, contain: boolean) => {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      const ctx = canvas.getContext('2d');
      if (!ctx || !img || !img.naturalWidth) return;
      // Portrait screens keep the complete 16:9 composition visible. Covering a
      // tall viewport here turns the sequence into an excessively cropped close-up.
      const fit = (contain ? Math.min : Math.max)(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
      const dw = img.naturalWidth * fit;
      const dh = img.naturalHeight * fit;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.translate(rect.width / 2, rect.height / 2);
      ctx.scale(zoom * mz, zoom * mz);
      ctx.drawImage(img, -dw/2, -dh/2, dw, dh);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const curve = (table: [number,number][], frame: number) => {
      for (let i = 0; i < table.length - 1; i++) {
        const a = table[i], b = table[i+1];
        if (frame <= b[0]) return a[1] + (b[1] - a[1]) * ((frame - a[0]) / (b[0] - a[0]));
      }
      return 0;
    };

    const applyCornerPin = (rect: DOMRect, camTime: number, camFrame: number, zoom: number, mz: number, isPortraitLocal: boolean) => {
      if (!tracking || !pin) return;
      let corners = cornersAt(camTime);
      if (!corners) return;
      const cx = corners.reduce((s, p) => s + p[0], 0) / 4;
      const cy = corners.reduce((s, p) => s + p[1], 0) / 4;
      corners = corners.map(([x, y]) => [cx + (x - cx) * (1 + QUAD_EXPAND), cy + (y - cy) * (1 + QUAD_EXPAND)] as [number,number]);
      const kx = curve(TAPER_X, camFrame), ky = curve(TAPER_Y, camFrame);
      if (kx > 0 || ky > 0) corners = corners.map(([x, y], i) => [x + FIX0[i][0] * kx, y + FIX0[i][1] * ky] as [number,number]);
      const fit = (isPortraitLocal ? Math.min : Math.max)(rect.width / tracking.width, rect.height / tracking.height);
      const ox = (rect.width - tracking.width * fit) / 2;
      const oy = (rect.height - tracking.height * fit) / 2;
      const dst = corners.map(([x, y]) => {
        const bx = x * fit + ox;
        const by = y * fit + oy;
        return [(bx - rect.width/2) * zoom * mz + rect.width/2, (by - rect.height/2) * zoom * mz + rect.height/2] as [number,number];
      });
      pin.style.transform = cornerPin(1920, 1080, dst);
    };

    if (isStatic) {
      const stageEl = staticStageRef.current;
      if (!stageEl) return;

      const drawOnce = () => {
        const rect = stageEl.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const cam = camera(STATIC_PROGRESS);
        const camTime = (cam.frame / (FRAME_COUNT - 1)) * BG_DURATION;
        const rawIndex = Math.min(RAW_FRAME_COUNT - 1, Math.round(camTime * RAW_FPS));
        draw(rect, frames[rawIndex], cam.zoom, STATIC_MZ, true);
        applyCornerPin(rect, camTime, cam.frame, cam.zoom, STATIC_MZ, true);
      };

      fetch('/quad_tracking.json').then(r => r.json()).then(d => { tracking = d; drawOnce(); }).catch(() => {});

      const cam0 = camera(STATIC_PROGRESS);
      const camTime0 = (cam0.frame / (FRAME_COUNT - 1)) * BG_DURATION;
      const keyImg = frames[Math.min(RAW_FRAME_COUNT - 1, Math.round(camTime0 * RAW_FPS))];
      keyImg.addEventListener('load', drawOnce);
      window.addEventListener('resize', drawOnce);
      const t = setTimeout(drawOnce, 120);
      return () => {
        keyImg.removeEventListener('load', drawOnce);
        window.removeEventListener('resize', drawOnce);
        clearTimeout(t);
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
        headline.style.opacity = String(fade);
        const headlineSpeed = isCompact ? 0.2 : 0.42;
        headline.style.transform = 'translateY(-' + (progress * window.innerHeight * headlineSpeed).toFixed(1) + 'px)';
      }
      if (hud) hud.style.opacity = String(fade);
      if (tagline) tagline.style.opacity = String(fade);

      applyCornerPin(rect, camTime, cam.frame, cam.zoom, mz, isPortrait);
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
      <section style={{ position: 'relative', background: '#161616', paddingBottom: 40 }}>
        <div className="hero-static-headline" style={{ padding: 'clamp(96px,14vh,130px) 24px 28px', textAlign: 'center' }}>
          {headline}
        </div>

        <div ref={staticStageRef} style={{ position: 'relative', width: '100%', aspectRatio: '16 / 11', overflow: 'hidden' }}>
          {monitorLayer}
        </div>

        <div style={{
          padding: '24px 24px 0', display: 'flex', flexDirection: 'column', gap: 14,
          fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.62)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
            <span>Felippe Ximenes</span>
            <span>Rio de Janeiro, BR · <span ref={clockRef}>--:--</span> BRT</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 6, color: '#fff' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember)', flexShrink: 0 }} />
              {t_badge}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.4, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.75)' }}>{t_sub}</p>
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
