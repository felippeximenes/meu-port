import { useCountUp, useReveal } from '../hooks/hooks';

function Num({ target, suffix, italic }: { target: number; suffix?: string; italic?: boolean }) {
  const { ref, value } = useCountUp<HTMLDivElement>(target);
  return (
    <div ref={ref} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(48px, 5vw, 72px)', lineHeight: 1, fontStyle: italic ? 'italic' : 'normal' }}>
      {value}{suffix}
    </div>
  );
}

function Card({ children, i }: { children: React.ReactNode; i: number }) {
  const { ref, style } = useReveal<HTMLDivElement>(0.2, i * 0.12, -50);
  return <div ref={ref} style={style}>{children}</div>;
}

export default function Stats() {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px 120px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      <Card i={0}>
        <div style={{ border: '1px solid var(--line)', borderRadius: 20, padding: 28, height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--purple-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>●</span>
          <Num target={10} suffix="+" />
          <div style={{ fontSize: 13, color: 'var(--muted)', letterSpacing: '0.04em' }}>projetos de ponta a ponta</div>
        </div>
      </Card>
      <Card i={1}>
        <div style={{ background: 'var(--dark)', color: '#fff', borderRadius: 20, padding: 28, height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, color: 'var(--purple)' }}>”</span>
          <Num target={4} italic />
          <div style={{ fontSize: 13, color: '#a8a6ad', letterSpacing: '0.04em' }}>LLMs &amp; RAG em produção</div>
        </div>
      </Card>
      <Card i={2}>
        <div style={{ background: 'var(--bg-soft)', borderRadius: 20, padding: 28, height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--purple)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✓</span>
          <Num target={3} />
          <div style={{ fontSize: 13, color: 'var(--muted)', letterSpacing: '0.04em' }}>idiomas · pt / en / es</div>
        </div>
      </Card>
    </section>
  );
}
