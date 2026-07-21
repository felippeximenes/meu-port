import { useState } from 'react';
import { projects } from '../data';
import { usePinnedProgress } from '../hooks/hooks';

function Cover({ src, name }: { src: string; name: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div style={{ width: '100%', height: '100%', borderRadius: 18, background: '#eeeae2', border: '1px dashed #cfc9bd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8478', fontSize: 14, textAlign: 'center', padding: 24 }}>
        Adicione a capa de {name} em public{src}
      </div>
    );
  }
  return <img src={src} alt={name} onError={() => setErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18, display: 'block' }} />;
}

export default function Projects() {
  const [ref, p] = usePinnedProgress<HTMLElement>();
  const panels = projects.length;
  const current = Math.min(panels, Math.round(p * (panels - 1)) + 1);
  return (
    <section id="trabalhos" ref={ref} style={{ position: 'relative', height: '420vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '34px 48px 0' }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8478' }}>01 — Trabalhos selecionados</span>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 18, color: '#8a8478' }}>{current} / {panels}</span>
        </div>
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', willChange: 'transform', transform: `translateX(${-p * (panels - 1) * 100}vw)` }}>
          {projects.map(proj => (
            <div key={proj.name} style={{ flex: '0 0 100vw', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 'clamp(24px, 4vw, 64px)', alignItems: 'center', padding: '0 clamp(32px, 5vw, 80px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(80px, 10vw, 150px)', lineHeight: 1, color: '#e8e4dd' }}>{proj.n}</span>
                <a href={proj.href} target="_blank" rel="noreferrer" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(34px, 3.4vw, 54px)', lineHeight: 1.05 }}>{proj.name} ↗</a>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#555', maxWidth: 420, textWrap: 'pretty' }}>{proj.desc}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {proj.tags.map(t => (
                    <span key={t} style={{ fontSize: 12, color: '#666', border: '1px solid #dcd7ce', borderRadius: 999, padding: '6px 14px' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ height: 'min(66vh, 620px)', position: 'relative' }}>
                <Cover src={proj.img} name={proj.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
