import { useEffect } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';
import { projects, GITHUB } from '../data';
import { useReveal } from '../hooks/useReveal';
import { useGhostParallax } from '../hooks/useGhostParallax';
import SplitHeading from './SplitHeading';

const TAG_STYLE: React.CSSProperties = {
  background: '#fff', padding: '3px 8px',
  fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
  textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#3c3a3e',
};

/* Wipe + cursor-follow + grid focus via DOM (mirrors reference JS exactly) */
function useProjectInteractions() {
  useEffect(() => {
    const grid = document.querySelector('[data-grid]') as HTMLElement | null;
    if (!grid) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = Array.from(grid.querySelectorAll('a[data-card]')) as HTMLAnchorElement[];
    const rafs: number[] = [];

    cards.forEach(card => {
      const media = card.querySelector('[data-media]') as HTMLElement | null;
      const wipe  = card.querySelector('[data-wipe]')  as HTMLElement | null;
      const label = card.querySelector('[data-cursor]') as HTMLElement | null;
      let tx = 0, ty = 0, cx = 0, cy = 0;
      let id: number | null = null;

      const loop = () => {
        cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
        if (label) label.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0) translate(-50%,-50%)`;
        if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) { id = requestAnimationFrame(loop); }
        else { id = null; }
      };

      const onEnter = (e: PointerEvent) => {
        grid.setAttribute('data-focus', '');
        card.setAttribute('data-hot', '');
        if (!media) return;
        const r = media.getBoundingClientRect();
        cx = tx = e.clientX - r.left; cy = ty = e.clientY - r.top;
        if (label) label.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
        if (wipe && !reduce) {
          wipe.style.transition = 'none';
          wipe.style.clipPath = 'inset(0 0 0 0)';
          void wipe.offsetWidth;
          wipe.style.transition = 'clip-path 1150ms var(--ease-out)';
          wipe.style.clipPath = cx < r.width / 2 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
        }
        // Load video on first hover
        const video = card.querySelector('video[data-hover-video]') as HTMLVideoElement | null;
        if (video && !video.src && video.dataset.src) {
          video.src = video.dataset.src;
          video.load();
        }
        if (video) video.play().catch(() => {});
      };
      const onMove = (e: PointerEvent) => {
        if (!media) return;
        const r = media.getBoundingClientRect();
        tx = e.clientX - r.left; ty = e.clientY - r.top;
        if (!id) id = requestAnimationFrame(loop);
      };
      const onLeave = () => {
        grid.removeAttribute('data-focus');
        card.removeAttribute('data-hot');
        if (id) { cancelAnimationFrame(id); id = null; }
        if (wipe && !reduce) {
          wipe.style.transition = 'clip-path 950ms var(--ease-out)';
          wipe.style.clipPath = 'inset(0 100% 0 100%)';
        }
        const video = card.querySelector('video[data-hover-video]') as HTMLVideoElement | null;
        if (video) video.pause();
      };

      if (wipe) wipe.style.clipPath = 'inset(0 100% 0 100%)';
      card.addEventListener('pointerenter', onEnter);
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
      rafs.push(id ?? 0);
    });

    return () => {
      rafs.forEach(r => { if (r) cancelAnimationFrame(r); });
    };
  }, []);
}

interface CardMediaProps {
  poster: string;
  videoSrc: string;
  cursorLabel: string;
}

function CardMedia({ poster, videoSrc, cursorLabel }: CardMediaProps) {
  return (
    // @ts-ignore data-media is valid
    <div data-media="" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#161616' }}>
      {/* @ts-ignore */}
      <div data-wipe="" />
      {/* @ts-ignore */}
      <span data-cursor="">{cursorLabel}</span>
      <video
        // @ts-ignore
        data-hover-video=""
        data-src={videoSrc}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const t = useT();
  const projs = projects[lang];
  useProjectInteractions();
  const gridRef = useReveal<HTMLDivElement>();
  const ghostRef = useGhostParallax<HTMLParagraphElement>('right');

  const [first, ...rest] = projs;

  return (
    <section id="trabalho" style={{ position: 'relative', overflow: 'hidden', background: '#f1f1f1', padding: '112px 24px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#a2a2a2' }}>{t.projects.label}</span>
            <SplitHeading key={lang} text={t.projects.heading} style={{ margin: 0, fontSize: 'clamp(42px,6vw,82px)', lineHeight: 0.88, letterSpacing: '-0.055em', color: '#3c3a3e' }} />
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#7b7a7c' }}>05 / 05</span>
        </div>

        {/* Grid */}
        {/* @ts-ignore */}
        <div ref={gridRef} data-grid="" style={{ display: 'grid', gap: 12, marginTop: 48, borderTop: '1px solid #c9c7cc', paddingTop: 48 }}>
          {/* Card 1 â€” full width */}
          <a
            data-reveal=""
            href={first.href}
            // @ts-ignore
            data-card=""
            target="_blank"
            rel="noopener"
            style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'inherit' }}
          >
            <div style={{ aspectRatio: '16/8' }}>
              <CardMedia
                poster={first.img}
                videoSrc={first.video ?? ''}
                cursorLabel={t.projects.viewCase}
              />
            </div>
            <div className="proj-first-meta" style={{ display: 'grid', gridTemplateColumns: '1fr minmax(280px,0.9fr)', gap: 24, alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, color: '#a2a2a2' }}>{first.n}</span>
                  <h3 style={{ margin: 0, fontSize: 'clamp(22px,4vw,36px)', letterSpacing: '-0.03em', color: '#3c3a3e' }}>{first.name}</h3>
                  <span style={{ background: '#161616', color: '#f1f1f1', padding: '2px 7px', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{first.site}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {first.tags.map(tag => <span key={tag} style={TAG_STYLE}>{tag}</span>)}
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.015em', color: '#7b7a7c' }}>{first.desc}</p>
            </div>
          </a>

          {/* Cards 2â€“5: 2Ã—2 grid */}
          <div className="proj-secondary-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 36 }}>
            {rest.map(p => (
              <a
                key={p.n}
                data-reveal=""
                href={p.href}
                // @ts-ignore
                data-card=""
                target="_blank"
                rel="noopener"
                style={{ display: 'flex', flexDirection: 'column', gap: 14, color: 'inherit' }}
              >
                <div style={{ aspectRatio: '4/3' }}>
                  <CardMedia
                    poster={p.img}
                    videoSrc={p.video ?? ''}
                    cursorLabel={t.projects.viewCase}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, color: '#a2a2a2' }}>{p.n}</span>
                    <h3 style={{ margin: 0, fontSize: 23, letterSpacing: '-0.03em', color: '#3c3a3e' }}>{p.name}</h3>
                    {p.site && p.site !== 'certara-agent' && (
                      <span style={{ background: '#161616', color: '#f1f1f1', padding: '2px 7px', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{p.site}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.tags.slice(0, 2).map(tag => <span key={tag} style={TAG_STYLE}>{tag}</span>)}
                  </div>
                  <p style={{ margin: 0, fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.015em', color: '#7b7a7c' }}>{p.desc}</p>
                </div>
              </a>
            ))}
          </div>

          <a
            href={GITHUB}
            target="_blank"
            rel="noopener"
            style={{ marginTop: 40, width: 'fit-content', paddingBottom: 4, borderBottom: '1px solid currentColor', fontSize: 15, letterSpacing: '-0.01em', color: '#3c3a3e', transition: 'color 200ms ease' }}
          >{t.projects.viewAll}</a>
        </div>
      </div>

      {/* Ghost word: centered, drifts gently with scroll */}
      <p ref={ghostRef} aria-hidden="true" style={{
        margin: '64px 0 -12px', textAlign: 'center', color: '#fff',
        WebkitTextStroke: '2px #3c3a3e', fontFamily: 'var(--disp)',
        fontSize: 'clamp(108px,21vw,310px)', lineHeight: 0.72, letterSpacing: '-0.02em',
        whiteSpace: 'nowrap', textTransform: 'uppercase', userSelect: 'none',
        willChange: 'transform',
      }}>Projetos</p>
    </section>
  );
}
