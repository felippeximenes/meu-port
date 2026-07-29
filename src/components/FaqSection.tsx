import { useState } from 'react';
import { faqs, EMAIL } from '../data';
import { useReveal } from '../hooks/hooks';
import SpecularButton from './SpecularButton';

export default function FaqSection() {
  const [open, setOpen] = useState(0);
  const left = useReveal<HTMLDivElement>();
  const right = useReveal<HTMLDivElement>(0.12, 0.1);
  return (
    <section id="faq" style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
      <div ref={left.ref} style={left.style}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>04 — FAQ</span>
        <h2 style={{ margin: '18px 0 28px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: 'clamp(30px, 3vw, 44px)', lineHeight: 1.15 }}>
          Respostas para as dúvidas <em style={{ color: 'var(--muted)', fontStyle: 'normal' }}>mais comuns antes de começar.</em>
        </h2>
        <SpecularButton href={`mailto:${EMAIL}`} size="md">Me mande um email</SpecularButton>
      </div>
      <div ref={right.ref} style={{ ...right.style, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ background: 'var(--fg)', color: '#fff', borderRadius: 999, padding: '9px 18px', fontSize: 13, fontWeight: 500, width: 'fit-content', marginBottom: 4 }}>Estou aqui para ajudar</span>
        {faqs.map((f, i) => (
          <div key={f.q} style={{ background: open === i ? '#fff' : 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', transition: 'background 0.2s ease' }}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{ all: 'unset', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '18px 22px', cursor: 'pointer', fontFamily: "'Archivo', sans-serif", fontSize: 15, fontWeight: 600 }}
            >
              {f.q}
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, color: 'var(--muted)' }}>{open === i ? '×' : '+'}</span>
            </button>
            {open === i && (
              <p style={{ margin: 0, padding: '0 22px 20px', fontSize: 14, lineHeight: 1.6, color: 'var(--muted)' }}>{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
