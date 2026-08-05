import { steps } from '../data';
import { useReveal } from '../hooks/hooks';
import type { Step } from '../data';

function StepCard({ st, i }: { st: Step; i: number }) {
  const right = i % 2 === 1;
  const { ref, style } = useReveal<HTMLDivElement>(0.25, i * 0.06, right ? 50 : -50);
  return (
    <div ref={ref} style={{ ...style, marginLeft: right ? 'auto' : 0, width: 'min(560px, 90%)' }}>
      <div style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-line)', borderRadius: 18, padding: '26px 28px' }}>
        <span style={{ display: 'inline-flex', width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", fontSize: 12, letterSpacing: '0.1em', color: '#a8a6ad', marginBottom: 16 }}>{st.n}</span>
        <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, color: '#fff' }}>{st.title}</h3>
        <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.55, color: '#a8a6ad' }}>{st.desc}</p>
      </div>
    </div>
  );
}

export default function Process() {
  const head = useReveal<HTMLDivElement>();
  return (
    <section id="processo" className="noise-bg" style={{ borderRadius: '32px 32px 0 0', padding: '110px 48px' }}>
      <div ref={head.ref} style={{ ...head.style, maxWidth: 720, margin: '0 auto 56px' }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8b8890' }}>03 — Como trabalho</span>
        <h2 style={{ margin: '18px 0 0', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 'clamp(32px, 3.4vw, 50px)', lineHeight: 1.15, color: '#fff' }}>
          Um processo simples e claro, <em style={{ color: '#8b8890', fontFamily: "'Inter', sans-serif", fontStyle: 'italic', fontWeight: 400 }}>da primeira conversa à entrega final.</em>
        </h2>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {steps.map((st, i) => <StepCard key={st.n} st={st} i={i} />)}
      </div>
    </section>
  );
}
