import { useState } from 'react';
import { faqs, EMAIL } from '../data';
import { useReveal } from '../hooks/hooks';

export default function FaqSection() {
  const [open, setOpen] = useState(-1);
  const left = useReveal<HTMLDivElement>();
  const right = useReveal<HTMLDivElement>(0.12, 0.1);
  return (
    <section id="faq" style={{ minHeight: '100vh', maxWidth: 1280, margin: '0 auto', padding: '120px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignContent: 'center' }}>
      <div ref={left.ref} style={left.style}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8478' }}>04 — FAQ</span>
        <h2 style={{ margin: '18px 0 28px', fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(30px, 3vw, 44px)', lineHeight: 1.15 }}>
          Respostas para as dúvidas <em style={{ color: '#8a8478' }}>mais comuns antes de começar.</em>
        </h2>
        <a href={`mailto:${EMAIL}`} style={{ background: '#141414', color: '#faf9f7', padding: '14px 26px', borderRadius: 999, fontSize: 14, fontWeight: 500, display: 'inline-block' }}>Me mande um email</a>
      </div>
      <div ref={right.ref} style={{ ...right.style, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {faqs.map((f, i) => (
          <div key={f.q} style={{ background: '#fff', border: '1px solid #eae6de', borderRadius: 14, overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{ all: 'unset', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '18px 22px', cursor: 'pointer', fontFamily: "'Archivo', sans-serif", fontSize: 15, fontWeight: 600 }}
            >
              {f.q}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#8a8478' }}>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <p style={{ margin: 0, padding: '0 22px 20px', fontSize: 14, lineHeight: 1.6, color: '#555' }}>{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
