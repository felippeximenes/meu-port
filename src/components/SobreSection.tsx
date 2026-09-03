import { useEffect, useRef } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';
import { RESUME } from '../data';
import { useReveal } from '../hooks/useReveal';
import { useGhostParallax } from '../hooks/useGhostParallax';
import SplitHeading from './SplitHeading';

/* â”€â”€ Profile tilt card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ProfileCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
    const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
      tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin);

    let cx = 0, cy = 0, tx = 0, ty = 0;
    let raf: number | null = null, last = 0, running = false;

    const paint = (x: number, y: number) => {
      const w = card.clientWidth || 1, h = card.clientHeight || 1;
      const px = clamp((100 / w) * x, 0, 100), py = clamp((100 / h) * y, 0, 100);
      wrap.style.setProperty('--pointer-x', px + '%');
      wrap.style.setProperty('--pointer-y', py + '%');
      wrap.style.setProperty('--pointer-from-left', String(px / 100));
      wrap.style.setProperty('--pointer-from-top', String(py / 100));
      wrap.style.setProperty('--pointer-from-center', String(clamp(Math.hypot(py-50, px-50) / 50, 0, 1)));
      wrap.style.setProperty('--background-x', adjust(px, 0, 100, 35, 65).toFixed(2) + '%');
      wrap.style.setProperty('--background-y', adjust(py, 0, 100, 35, 65).toFixed(2) + '%');
      wrap.style.setProperty('--rotate-x', (-(px-50)/5).toFixed(2) + 'deg');
      wrap.style.setProperty('--rotate-y', ((py-50)/4).toFixed(2) + 'deg');
    };

    const step = (ts: number) => {
      if (!running) return;
      if (!last) last = ts;
      const dt = (ts - last) / 1000; last = ts;
      const k = 1 - Math.exp(-dt / 0.14);
      cx += (tx - cx) * k; cy += (ty - cy) * k;
      paint(cx, cy);
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(step);
      } else { running = false; last = 0; raf = null; }
    };

    const target = (x: number, y: number) => {
      tx = x; ty = y;
      if (!running) { running = true; last = 0; raf = requestAnimationFrame(step); }
    };

    let pcT: ReturnType<typeof setTimeout>;
    let pcOut: ReturnType<typeof setTimeout>;

    const onEnter = (e: PointerEvent) => {
      wrap.classList.add('active', 'entering');
      clearTimeout(pcT);
      pcT = setTimeout(() => wrap.classList.remove('entering'), 180);
      const r = card.getBoundingClientRect();
      target(e.clientX - r.left, e.clientY - r.top);
    };
    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      target(e.clientX - r.left, e.clientY - r.top);
    };
    const onLeave = () => {
      target(card.clientWidth / 2, card.clientHeight / 2);
      clearTimeout(pcOut);
      pcOut = setTimeout(() => wrap.classList.remove('active'), 420);
    };

    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    cx = card.clientWidth / 2; cy = card.clientHeight / 2;
    paint(cx, cy);

    return () => {
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
      clearTimeout(pcT); clearTimeout(pcOut);
      if (raf) cancelAnimationFrame(raf);
      running = false;
    };
  }, []);

  return (
    <div
      // @ts-ignore data-pc-wrap is valid
      data-pc-wrap=""
      ref={wrapRef}
      style={{ position: 'relative', perspective: 620, transform: 'translate3d(0,0,0.1px)', touchAction: 'none' }}
    >
      {/* @ts-ignore */}
      <div data-pc-behind="" />
      {/* @ts-ignore */}
      <div data-pc-card="" ref={cardRef}>
        {/* @ts-ignore */}
        <div data-pc-inside="" />
        {/* @ts-ignore */}
        <div data-pc-avatar="" data-portrait="">
          <img src="/felippe-portrait.webp" alt="Felippe Ximenes" />
        </div>
        {/* @ts-ignore */}
        <div data-pc-shine="" />
        {/* @ts-ignore */}
        <div data-pc-glare="" />
        {/* @ts-ignore */}
        <div data-pc-text="">
          <h3>Felippe Ximenes</h3>
          <p>Full-Stack &amp; AI Engineer</p>
        </div>
      </div>
    </div>
  );
}

/* â”€â”€ Portrait reveal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€  */
function usePortraitReveal() {
  useEffect(() => {
    const el = document.querySelector('[data-portrait]') as HTMLElement | null;
    if (!el || !window.IntersectionObserver) return;
    el.style.opacity = '0';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      el.style.animation = reduce ? 'none' : 'portraitIn 700ms var(--ease-out) 120ms both';
      el.style.opacity = '1';
      io.disconnect();
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
}

export default function SobreSection() {
  const { lang } = useLang();
  const t = useT();
  usePortraitReveal();
  const revealRef = useReveal<HTMLDivElement>();
  const ghostRef = useGhostParallax<HTMLParagraphElement>('left');

  return (
    <section id="sobre" style={{ position: 'relative', overflow: 'hidden', background: '#f8f8f8', padding: '130px 24px 0' }}>
      <div ref={revealRef} className="sobre-grid" style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gap: '22px 56px',
        gridTemplateColumns: '1fr 0.85fr', gridTemplateRows: 'auto auto', alignItems: 'stretch',
      }}>
        {/* Col 1 / Row 1: headline + availability */}
        <div style={{ gridColumn: 1, gridRow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 38 }}>
          <SplitHeading
            key={lang}
            text={t.hero.heading}
            style={{ margin: 0, maxWidth: 820, fontSize: 'clamp(38px,5vw,72px)', lineHeight: 0.94, letterSpacing: '-0.055em', color: '#3c3a3e', textWrap: 'pretty' } as React.CSSProperties}
          />
          <div data-reveal="" style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#a2a2a2' }}>
            <span style={{ width: 36, height: 1, background: '#c9c7cc' }} />
            <span>{t.sobre.availability}</span>
          </div>
        </div>

        {/* Col 2 / Row 1: profile card */}
        <div className="sobre-card-col" style={{ gridColumn: 2, gridRow: 1 }}>
          <ProfileCard />
        </div>

        {/* Col 2 / Row 2: bio + cv + identity */}
        <div style={{ gridColumn: 2, gridRow: 2, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.3, letterSpacing: '-0.02em', color: '#7b7a7c' }}>
            {t.sobre.bio}
          </p>
          <a
            href={RESUME[lang]}
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, width: 'fit-content',
              paddingBottom: 4, borderBottom: '1px solid currentColor',
              fontSize: 15, letterSpacing: '-0.01em', color: '#3c3a3e', transition: 'color 200ms ease',
            }}
          >{t.sobre.downloadCV}</a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 6, fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#a2a2a2' }}>
            <span>Felippe Ximenes</span>
            <span>{t.sobre.city}</span>
          </div>
        </div>
      </div>

      {/* Ghost word: centered, drifts gently with scroll */}
      <p ref={ghostRef} aria-hidden="true" style={{
        margin: '34px 0 -14px', textAlign: 'center', color: '#fff',
        WebkitTextStroke: '2px #3c3a3e', fontFamily: 'var(--disp)',
        fontSize: 'clamp(72px,21vw,310px)', lineHeight: 0.72, letterSpacing: '-0.02em',
        whiteSpace: 'nowrap', textTransform: 'uppercase', userSelect: 'none',
        willChange: 'transform',
      }}>Sobre</p>
    </section>
  );
}
