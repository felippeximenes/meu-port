import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';
import { services } from '../data';

const LOOP_ITEMS = [
  'AWS Lambda','NestJS','Angular 17','PostgreSQL','PGVector','Playwright','n8n','Make.com',
  'Netlify','Node.js','Next.js','GitHub Actions','React','TypeScript','FastAPI','Python',
  'Amazon Bedrock','Qdrant','MongoDB','Docker','Stripe','Tailwind CSS',
];

const chipStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
  color: 'rgba(255,255,255,0.7)', padding: '3px 8px',
  fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
  textTransform: 'uppercase', letterSpacing: '-0.01em',
};

function LoopItems() {
  // Duplicate list so translate3d(-50%) wraps seamlessly
  const items = [...LOOP_ITEMS, ...LOOP_ITEMS];
  return (
    <>
      {items.map((item, i) => (
        // @ts-ignore
        <span key={i} data-loop-item="">
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{item}</span>
        </span>
      ))}
    </>
  );
}

export default function Services() {
  const { lang } = useLang();
  const t = useT();
  const svcs = services[lang];

  return (
    <section id="servicos" style={{ background: '#161616', color: '#fff', padding: '120px 24px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 24, paddingBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.15)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.45)' }}>{t.services.label}</span>
            <h2 style={{ margin: 0, maxWidth: 900, fontSize: 'clamp(38px,5.2vw,72px)', lineHeight: 0.92, letterSpacing: '-0.055em', textWrap: 'pretty' } as React.CSSProperties}>
              {t.services.headingNormal}
            </h2>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--ember)', whiteSpace: 'nowrap' }}>
            {t.services.available}
          </span>
        </div>

        {/* Service rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {svcs.map((svc, i) => (
            <article
              key={svc.title}
              // @ts-ignore
              data-service=""
              style={{
                display: 'grid', gridTemplateColumns: '60px 1fr minmax(360px,0.9fr)',
                alignItems: 'start', gap: 24, padding: '40px 0',
                borderBottom: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, color: 'var(--ember)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h3 style={{ margin: 0, fontSize: 'clamp(30px,4vw,56px)', lineHeight: 1, letterSpacing: '-0.05em' }}>{svc.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {svc.chips.map(chip => <span key={chip} style={chipStyle}>{chip}</span>)}
                </div>
              </div>
              <p className="svc-desc" style={{ margin: 0, fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.015em', color: 'rgba(255,255,255,0.55)' }}>{svc.desc}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Logo loop */}
      <div style={{ width: '100vw', marginTop: 82, marginLeft: 'calc(50% - 50vw)', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
        {/* @ts-ignore */}
        <div data-loop="" style={{ padding: '26px 0 24px' }}>
          {/* @ts-ignore */}
          <div data-loop-track="l"><LoopItems /></div>
        </div>
      </div>
    </section>
  );
}
