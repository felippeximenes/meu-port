import { steps } from '../data';
import { usePinnedProgress } from '../hooks/hooks';

export default function Process() {
  const [ref, p] = usePinnedProgress<HTMLElement>();
  return (
    <section id="processo" ref={ref} style={{ position: 'relative', height: '340vh', background: '#121110', color: '#faf9f7', borderRadius: '32px 32px 0 0' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', padding: '0 64px', overflow: 'hidden' }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a756c' }}>03 — Como trabalho</span>
          <h2 style={{ margin: '18px 0 0', fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(32px, 3.4vw, 50px)', lineHeight: 1.12 }}>
            Um processo simples e claro, <em style={{ color: '#7a756c' }}>da primeira conversa à entrega final.</em>
          </h2>
          <div style={{ marginTop: 36, height: 2, background: '#2a2825', borderRadius: 2, maxWidth: 340, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${p * 100}%`, background: '#faf9f7' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.4vh, 14px)', maxHeight: '100vh', justifyContent: 'center' }}>
          {steps.map((st, i) => {
            const on = p >= (i + 0.5) / steps.length - 0.08;
            return (
              <div key={st.n} style={{ background: '#1b1a18', border: '1px solid #2a2825', borderRadius: 16, padding: 'clamp(10px, 2vh, 22px) clamp(16px, 2vw, 26px)', opacity: on ? 1 : 0.15, transform: on ? 'none' : 'translateY(14px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 18, color: '#7a756c' }}>{st.n}</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>{st.title}</h3>
                    <p style={{ margin: '5px 0 0', fontSize: 'clamp(12px, 1.9vh, 14px)', lineHeight: 1.45, color: '#a29c92' }}>{st.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
