import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';
import { experiences } from '../data';

gsap.registerPlugin(ScrollTrigger);

const chipStyle: React.CSSProperties = {
  background: '#fff', padding: '3px 8px',
  fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
  textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#3c3a3e',
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = useT();
  const exps = experiences[lang];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const head = section.querySelector('[data-tl-head]');
      if (head) {
        gsap.fromTo(head, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, immediateRender: false,
          scrollTrigger: { trigger: head, start: 'top bottom-=10%', end: 'bottom center', scrub: true },
        });
      }

      const line = section.querySelector('[data-tl-line]');
      if (line) {
        gsap.fromTo(line, { scaleY: 0 }, {
          scaleY: 1, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top+=220 center', end: 'bottom-=80 center', scrub: true },
        });
      }

      section.querySelectorAll('[data-entry]').forEach(entry => {
        gsap.fromTo(entry, { opacity: 0, x: -24 }, {
          opacity: 1, x: 0, immediateRender: false,
          scrollTrigger: { trigger: entry, start: 'top bottom-=10%', end: 'top center', scrub: true },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={sectionRef} id="experiencia" style={{ background: '#f1f1f1', padding: '112px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        {/* @ts-ignore */}
        <div data-tl-head="" style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 28, borderBottom: '1px solid #c9c7cc' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#a2a2a2' }}>{t.experience.label}</span>
          <h2 style={{ margin: 0, maxWidth: 900, fontSize: 'clamp(38px,5.2vw,72px)', lineHeight: 0.92, letterSpacing: '-0.055em', color: '#3c3a3e', textWrap: 'pretty' } as React.CSSProperties}>
            {t.experience.heading}
          </h2>
        </div>

        {/* Timeline */}
        {/* @ts-ignore */}
        <div data-tl-wrap="" style={{ position: 'relative', display: 'flex', flexDirection: 'column', paddingLeft: 34 }}>
          {/* @ts-ignore */}
          <div data-tl-line="" style={{ position: 'absolute', left: 0, top: 0, width: 2, height: '100%', background: '#c9c7cc', transformOrigin: 'top center' }} />

          {exps.map(exp => (
            <article
              key={exp.company + exp.period}
              // @ts-ignore
              data-entry=""
              style={{
                display: 'grid', gridTemplateColumns: '90px 1fr minmax(360px,1fr)',
                gap: 24, alignItems: 'start', padding: '36px 0', borderBottom: '1px solid #c9c7cc',
              }}
            >
              {/* Year */}
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, color: '#a2a2a2' }}>{exp.year}</span>

              {/* Company + role */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontSize: 'clamp(22px,4vw,36px)', letterSpacing: '-0.03em', color: '#3c3a3e' }}>{exp.company}</h3>
                  {exp.current && (
                    <span style={{ background: '#161616', color: '#f1f1f1', padding: '2px 7px', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                      {t.experience.current}
                    </span>
                  )}
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#7b7a7c' }}>
                  {exp.role} Â· {exp.period}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                  {exp.chips.map(chip => <span key={chip} style={chipStyle}>{chip}</span>)}
                </div>
              </div>

              {/* Highlights */}
              <ul className="exp-highlights" style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.02em', color: '#7b7a7c' }}>
                {exp.highlights.map(h => <li key={h}>{h}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
