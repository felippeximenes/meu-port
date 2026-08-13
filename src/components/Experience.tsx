import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Experience as Exp } from '../data';
import { experiences } from '../data';
import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';

function Entry({ exp, isLast, currentLabel }: { exp: Exp; isLast: boolean; currentLabel: string }) {
  return (
    <div
      className="exp-entry"
      style={{ paddingLeft: 36, paddingBottom: isLast ? 0 : 72, position: 'relative', opacity: 0 }}
    >
      {/* Timeline dot */}
      <div style={{
        position: 'absolute', left: -5, top: 6,
        width: 12, height: 12, borderRadius: '50%',
        background: exp.current ? 'var(--accent)' : 'var(--bg)',
        border: '2px solid var(--accent)',
        zIndex: 1,
      }} />

      {/* Ghost year watermark */}
      <span aria-hidden style={{
        position: 'absolute', right: -12, top: -8,
        fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400,
        fontSize: 'clamp(80px, 8vw, 120px)', lineHeight: 1, letterSpacing: '-0.02em',
        color: 'var(--fg)', opacity: 0.04, pointerEvents: 'none', userSelect: 'none',
      }}>{exp.year}</span>

      {/* Period + badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.8 }}>
          {exp.period}
        </span>
        {exp.current && (
          <span style={{
            background: 'var(--accent)', color: '#fff', borderRadius: 999,
            padding: '2px 9px', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
          }}>
            {currentLabel}
          </span>
        )}
      </div>

      {/* Company name */}
      <h3 style={{
        margin: '0 0 4px',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(22px, 2.8vw, 34px)',
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
        color: 'var(--fg)',
      }}>
        {exp.company}
      </h3>

      {/* Role */}
      <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--muted)', fontWeight: 400 }}>
        {exp.role}
      </p>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 14 }}>
        {exp.chips.map((chip, i) => (
          <span key={chip}>
            {i > 0 && <span style={{ margin: '0 8px', color: 'var(--muted)', opacity: 0.4 }}>·</span>}
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {chip}
            </span>
          </span>
        ))}
      </div>

      {/* Highlights */}
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {exp.highlights.map(h => (
          <li key={h} style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--muted)', paddingLeft: 14, position: 'relative' }}>
            <span aria-hidden style={{ position: 'absolute', left: 0, top: '0.55em', width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', opacity: 0.45 }} />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = useT().experience;
  const exps = experiences[lang];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const head = section.querySelector('.exp-head');
    const line = section.querySelector('.exp-line');
    const entries = section.querySelectorAll('.exp-entry');

    if (head) {
      gsap.fromTo(head, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: head, start: 'top bottom-=10%', end: 'bottom center', scrub: true },
      });
    }

    if (line) {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top+=220 center', end: 'bottom-=80 center', scrub: true },
      });
    }

    entries.forEach(entry => {
      gsap.fromTo(entry, { opacity: 0, x: -24 }, {
        opacity: 1, x: 0,
        scrollTrigger: { trigger: entry, start: 'top bottom-=10%', end: 'top center', scrub: true },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="experiencia" className="exp-sec" style={{ background: 'var(--bg-soft)', padding: '96px 48px 112px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Section heading */}
        <div className="exp-head exp-head-grid" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, marginBottom: 72, alignItems: 'start' }}>
          <span className="exp-head-spacer" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 12 }}>
            {t.label}
          </span>
          <h2 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(28px, 3.4vw, 48px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            <strong style={{ fontWeight: 600 }}>{t.headingBold}</strong> {t.headingMid}{' '}
            {t.headingPre}{' '}
            <em style={{ fontStyle: 'normal', fontFamily: "'Inter', sans-serif", color: 'var(--accent)', fontWeight: 400 }}>
              {t.headingEm}
            </em>{' '}
            {t.headingEnd}
          </h2>
        </div>

        {/* Timeline — alinhado com o grid do heading */}
        <div className="exp-tl-grid" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48 }}>
          <div className="exp-tl-spacer" />
          <div style={{ position: 'relative' }}>
            {/* Dim background track */}
            <div style={{ position: 'absolute', left: 0, top: 6, bottom: 6, width: 2, background: 'rgba(255,100,54,0.1)', borderRadius: 2 }} />
            {/* Animated purple fill — scaleY driven by scroll */}
            <div className="exp-line" style={{ position: 'absolute', left: 0, top: 6, bottom: 6, width: 2, background: 'var(--accent)', transformOrigin: 'top center', transform: 'scaleY(0)', borderRadius: 2 }} />

            {exps.map((exp, i) => (
              <Entry key={exp.company} exp={exp} isLast={i === exps.length - 1} currentLabel={t.current} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
