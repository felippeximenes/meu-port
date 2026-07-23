import { services } from '../data';
import { useReveal, useTilt } from '../hooks/hooks';
import type { Service } from '../data';

const THUMBS = ['/projects/certara-app.jpg', '/projects/certara2.png', '/projects/edutrack.png', '/projects/moldz2.png', '/projects/travel2.png'];

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const { ref, style } = useReveal<HTMLDivElement>(0.15, i * 0.12, -50);
  const tiltRef = useTilt<HTMLDivElement>(3);
  const imgs = [THUMBS[i % 5], THUMBS[(i + 1) % 5], THUMBS[(i + 2) % 5]];
  return (
    <div ref={ref} style={style}>
      <div ref={tiltRef} style={{ border: s.dark ? 'none' : '1px solid var(--line)', borderRadius: 20, padding: 26, background: s.dark ? 'var(--purple)' : '#fff', color: s.dark ? '#fff' : 'var(--fg)', display: 'flex', flexDirection: 'column', gap: 16, willChange: 'transform', height: '100%' }}>
        <h3 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 20 }}>{s.title}</h3>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: s.dark ? 'rgba(255,255,255,0.85)' : 'var(--muted)' }}>{s.desc}</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {imgs.map(src => (
            <div key={src} style={{ flex: 1, aspectRatio: '1', borderRadius: 12, overflow: 'hidden', border: s.dark ? '1px solid rgba(255,255,255,0.25)' : '1px solid var(--line)' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
          {s.chips.map(c => (
            <span key={c} style={{ fontSize: 12, border: `1px solid ${s.dark ? 'rgba(255,255,255,0.35)' : 'var(--line)'}`, borderRadius: 999, padding: '5px 12px' }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref, style } = useReveal<HTMLDivElement>();
  return (
    <section id="servicos" style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 48px 120px' }}>
      <div ref={ref} style={{ ...style, display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, marginBottom: 56 }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 12 }}>02 — Serviços</span>
        <h2 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: 'clamp(32px, 3.4vw, 50px)', lineHeight: 1.12, maxWidth: 760 }}>
          Soluções completas que tiram ideias do papel. <em style={{ color: 'var(--muted)', fontStyle: 'normal' }}>Do serverless na AWS ao pixel — com IA generativa onde ela gera valor real.</em>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
        {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
      </div>
    </section>
  );
}
