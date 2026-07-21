import { useCountUp, useReveal } from '../hooks/hooks';

function Stat({ target, suffix, label, italic, last }: { target: number; suffix?: string; label: string; italic?: boolean; last?: boolean }) {
  const { ref, value } = useCountUp<HTMLDivElement>(target);
  return (
    <div style={{ padding: '64px 48px', borderRight: last ? 'none' : '1px solid #dcd7ce' }}>
      <div ref={ref} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(60px, 6vw, 96px)', lineHeight: 1, fontStyle: italic ? 'italic' : 'normal' }}>
        {value}{suffix}
      </div>
      <div style={{ marginTop: 12, fontSize: 13, color: '#666', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

export default function Stats() {
  const { ref, style } = useReveal<HTMLElement>();
  return (
    <section ref={ref} style={{ ...style, borderTop: '1px solid #dcd7ce', borderBottom: '1px solid #dcd7ce', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <Stat target={10} suffix="+" label="projetos de ponta a ponta" />
      <Stat target={4} label="LLMs & RAG em produção" italic />
      <Stat target={3} label="idiomas · pt / en / es" last />
    </section>
  );
}
