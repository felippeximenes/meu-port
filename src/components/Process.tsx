import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';
import { steps } from '../data';
import { useReveal } from '../hooks/useReveal';
import SplitHeading from './SplitHeading';

export default function Process() {
  const { lang } = useLang();
  const t = useT();
  const stps = steps[lang];
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section id="processo" style={{ background: '#f8f8f8', padding: '112px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 28, borderBottom: '1px solid #c9c7cc' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#a2a2a2' }}>{t.process.label}</span>
          <SplitHeading key={lang} text={t.process.heading} style={{ margin: 0, maxWidth: 900, fontSize: 'clamp(38px,5.2vw,72px)', lineHeight: 0.92, letterSpacing: '-0.055em', color: '#3c3a3e', textWrap: 'pretty' } as React.CSSProperties} />
        </div>

        {/* Grid 5 columns */}
        <div ref={gridRef} className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginTop: 48 }}>
          {stps.map((step) => (
            <div
              key={step.n}
              data-reveal=""
              style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid #c9c7cc', paddingTop: 16 }}
            >
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, color: 'var(--ember)' }}>{step.n}</span>
              <h3 style={{ margin: 0, fontSize: 23, letterSpacing: '-0.03em', color: '#3c3a3e' }}>{step.title}</h3>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.02em', color: '#7b7a7c' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
