import { useState } from 'react';
import { projects } from '../data';
import { useReveal } from '../hooks/hooks';
import type { Project } from '../data';

function Cover({ p }: { p: Project }) {
  const [err, setErr] = useState(false);
  return (
    <a href={p.href} target="_blank" rel="noreferrer" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--line)', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ec6a5e' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f5bf4f' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#61c454' }} />
        <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--muted)', background: 'var(--bg-soft)', borderRadius: 999, padding: '4px 12px' }}>{p.site}</span>
      </div>
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        {err ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 14, textAlign: 'center', padding: 24 }}>
            Adicione a capa de {p.name} em public{p.img}
          </div>
        ) : (
          <img
            src={p.img} alt={p.name} onError={() => setErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.5s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
        )}
        <div style={{ position: 'absolute', inset: '0 0 0 0', background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 45%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '20px 22px', color: '#fff' }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22 }}>{p.name}</div>
          <p style={{ margin: '6px 0 10px', fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.82)', maxWidth: 440 }}>{p.desc}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {p.tags.map(t => (
              <span key={t} style={{ fontSize: 12, color: '#fff', border: '1px solid rgba(255,255,255,0.35)', borderRadius: 999, padding: '5px 12px' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

function Card({ p, i }: { p: Project; i: number }) {
  const col = i % 2;
  const { ref, style } = useReveal<HTMLDivElement>(0.15, col * 0.12, -50);
  const last = i === projects.length - 1;
  return (
    <div ref={ref} style={{ ...style, height: 420, gridColumn: last && projects.length % 2 === 1 ? '1 / -1' : undefined }}>
      <Cover p={p} />
    </div>
  );
}

export default function Projects() {
  const head = useReveal<HTMLDivElement>();
  return (
    <section id="trabalhos" style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 48px' }}>
      <div ref={head.ref} style={{ ...head.style, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 44 }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>01 — Trabalhos selecionados</span>
          <h2 style={{ margin: '14px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: 'clamp(30px, 3.4vw, 46px)' }}>Trabalhos em destaque</h2>
        </div>
        <a href="https://github.com/felippeximenes" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--line)', borderRadius: 999, padding: '10px 18px', fontSize: 14, fontWeight: 500, flexShrink: 0 }}>
          Todos os projetos <span>↗</span>
        </a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {projects.map((p, i) => <Card key={p.name} p={p} i={i} />)}
      </div>
    </section>
  );
}
