import { services } from '../data';
import { useReveal, useTilt } from '../hooks/hooks';
import type { Service } from '../data';

function ServiceCard({ s }: { s: Service }) {
  const { ref, style } = useReveal<HTMLDivElement>();
  const tiltRef = useTilt<HTMLDivElement>();
  return (
    <div ref={ref} style={style}>
      <div ref={tiltRef} style={{ border: '1px solid #dcd7ce', borderRadius: 20, padding: 32, background: s.dark ? '#141414' : '#fff', color: s.dark ? '#faf9f7' : '#141414', display: 'flex', flexDirection: 'column', gap: 16, willChange: 'transform', height: '100%' }}>
        <h3 style={{ margin: 0, fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 28 }}>{s.title}</h3>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: s.dark ? '#b8b3aa' : '#555', flex: 1 }}>{s.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {s.chips.map(c => (
            <span key={c} style={{ fontSize: 12, border: `1px solid ${s.dark ? '#3a3733' : '#e4e0d8'}`, borderRadius: 999, padding: '5px 12px' }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref, style } = useReveal<HTMLDivElement>();
  return (
    <section id="servicos" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '110px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div ref={ref} style={{ ...style, display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, marginBottom: 56 }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8478', marginTop: 12 }}>02 — Serviços</span>
        <h2 style={{ margin: 0, fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(32px, 3.4vw, 50px)', lineHeight: 1.12, maxWidth: 760 }}>
          Soluções completas que tiram ideias do papel. <em style={{ color: '#8a8478' }}>Do serverless na AWS ao pixel — com IA generativa onde ela gera valor real.</em>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
        {services.map(s => <ServiceCard key={s.title} s={s} />)}
      </div>
    </section>
  );
}
