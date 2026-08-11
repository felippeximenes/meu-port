import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { EMAIL, LINKEDIN, GITHUB } from '../data';
import { useReveal } from '../hooks/hooks';
import { useT } from '../i18n';

const GLOBE_DOTS = { color: '#ffffff', size: 5, density: 7, allDots: false };

const Globe = lazy(() => import('./Globe'));

export default function Footer() {
  const { ref, style } = useReveal<HTMLHeadingElement>();
  const footerRef = useRef<HTMLElement>(null);
  const [showGlobe, setShowGlobe] = useState(false);
  const t = useT().footer;

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShowGlobe(true); obs.disconnect(); } },
      { rootMargin: '300px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={footerRef} id="contato" className="noise-bg footer-root" style={{ color: '#fff', borderRadius: '32px 32px 0 0', padding: '110px 48px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: 260, height: 260, marginBottom: 8 }}>
          {showGlobe && (
            <Suspense fallback={null}>
              <Globe
                speed={2}
                smoothing={8}
                scale={8}
                fill="dots"
                dots={GLOBE_DOTS}
                oceanColor="#0b0b0d"
                outlineColor="rgba(255,255,255,0.25)"
                showOutline={true}
                showGrid={false}
                direction="left"
                stopOnHover={true}
                detail={5}
                dragSpeed={5}
              />
            </Suspense>
          )}
        </div>
        <h2 ref={ref} style={{ ...style, margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(34px, 4.5vw, 60px)', lineHeight: 1.1, maxWidth: 760 }}>
          <em style={{ color: '#8b8890', fontFamily: "'Inter', sans-serif", fontStyle: 'italic', fontWeight: 400 }}>{t.headingEm}</em> {t.headingEnd}
        </h2>
        <div style={{ marginTop: 32 }}>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              display: 'inline-flex', alignItems: 'center',
              background: '#ffffff', color: '#0a0a0a',
              borderRadius: 999, padding: '14px 28px',
              fontSize: 15, fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              textDecoration: 'none', letterSpacing: '-0.01em',
              transition: 'opacity 0.18s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {EMAIL}
          </a>
        </div>
      </div>

      <div className="footer-links" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 64, justifyContent: 'center', marginTop: 96, paddingBottom: 56 }}>
        <div>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a7780', marginBottom: 14 }}>{t.navLabel}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <a href="#trabalhos">{t.navItems[0]}</a>
            <a href="#servicos">{t.navItems[1]}</a>
            <a href="#processo">{t.navItems[2]}</a>
            <a href="#faq">{t.navItems[3]}</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a7780', marginBottom: 14 }}>{t.connect}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
            <a href={`mailto:${EMAIL}`}>Email</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a7780', marginBottom: 14 }}>{t.back}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <a href="#">{t.backToTop}</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0', borderTop: '1px solid var(--dark-line)', fontSize: 13, color: '#7a7780' }}>
        <span>Felippe Ximenes © 2026 · {t.copyright}</span>
        <span>{t.madeWith}</span>
      </div>
    </footer>
  );
}
