import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';
import { faqs } from '../data';

export default function FaqSection() {
  const { lang } = useLang();
  const t = useT();
  const items = faqs[lang];

  return (
    <section id="faq" style={{ background: '#f8f8f8', padding: '112px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div className="faq-header" style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 24, paddingBottom: 28, borderBottom: '1px solid #c9c7cc',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#a2a2a2' }}>FAQ</span>
            <h2 style={{ margin: 0, maxWidth: 820, fontSize: 'clamp(38px,5.2vw,72px)', lineHeight: 0.92, letterSpacing: '-0.055em', color: '#3c3a3e', textWrap: 'pretty' } as React.CSSProperties}>
              {t.faq.heading}
            </h2>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#7b7a7c', whiteSpace: 'nowrap' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember)' }} />
            {t.faq.badge}
          </span>
        </div>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24 }}>
          {items.map((item, i) => (
            <details key={i} style={{ borderBottom: '1px solid #c9c7cc', padding: '20px 0' }}>
              <summary style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                gap: 28, cursor: 'pointer', fontSize: 'clamp(18px,3.5vw,23px)', letterSpacing: '-0.03em', color: '#3c3a3e',
              }}>
                <span>{item.q}</span>
                {/* @ts-ignore */}
                <span data-chevron="" aria-hidden="true" style={{ flex: 'none', fontFamily: 'var(--mono)', fontWeight: 500, fontSize: 22, lineHeight: 1, color: '#a2a2a2' }}>+</span>
              </summary>
              <p style={{ margin: '14px 0 0', maxWidth: 760, fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.02em', color: '#7b7a7c' }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
