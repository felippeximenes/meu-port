import { useState, useRef } from 'react';
import { projects } from '../data';
import { useReveal, usePinProgress } from '../hooks/hooks';
import type { Project } from '../data';
import SpecularButton from './SpecularButton';

const NUM = projects.length;

function ProjectCard({ p }: { p: Project }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1.2fr', background: '#F8F7F5', position: 'relative', overflow: 'hidden' }}>

      <span aria-hidden style={{
        position: 'absolute', left: '-10px', bottom: '-24px',
        fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
        fontSize: 'clamp(160px, 18vw, 240px)', lineHeight: 1,
        letterSpacing: '-0.02em', color: 'var(--fg)', opacity: 0.045,
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }}>
        {p.n}
      </span>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 3vw 0 5vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--purple)' }}>
            {p.n} — {NUM.toString().padStart(2, '0')}
          </span>
          <h3 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 600, color: 'var(--fg)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>{p.name}</h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--muted)', maxWidth: 320 }}>{p.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>
            {p.tags.map((t, i) => (
              <span key={t}>
                {i > 0 && <span style={{ margin: '0 7px', opacity: 0.4 }}>·</span>}
                {t}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            <SpecularButton href={p.href} target="_blank" rel="noreferrer" size="sm">Ver projeto ↗</SpecularButton>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '36px 36px 36px 0', gap: 10 }}>
        <div style={{
          borderRadius: 20, overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05), 0 24px 80px rgba(0,0,0,0.07)',
          aspectRatio: '16 / 9', background: '#EEECEA',
        }}>
          {p.video ? (
            <video src={p.video} autoPlay={!window.matchMedia('(prefers-reduced-motion: reduce)').matches} muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block' }} />
          ) : imgErr ? (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 13 }}>{p.name}</div>
          ) : (
            <img src={p.img} alt={p.name} onError={() => setImgErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block' }} />
          )}
        </div>
        <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.04em' }}>{p.site}</span>
      </div>

    </div>
  );
}

export default function Projects() {
  const head = useReveal<HTMLDivElement>();
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const wrapRef = usePinProgress<HTMLElement>((p) => {
    const seg = 1 / NUM;

    projects.forEach((_, i) => {
      const el = stepRefs.current[i];
      if (!el) return;

      const local = (p - i * seg) / seg;

      let o = 0, ty = 40;
      if (local >= 0 && local < 1) {
        const fadeIn  = Math.min(1, local / 0.25);
        const fadeOut = i === NUM - 1 ? 1 : Math.min(1, (1 - local) / 0.25);
        o  = Math.min(fadeIn, fadeOut);
        ty = (1 - fadeIn) * 40 - (1 - fadeOut) * 40;
      } else if (i === 0 && p <= 0) {
        o = 1; ty = 0;
      } else if (i === NUM - 1 && p >= 1) {
        o = 1; ty = 0;
      }

      el.style.opacity        = String(o);
      el.style.transform      = `translateY(${ty}px)`;
      el.style.pointerEvents  = o > 0.5 ? 'auto' : 'none';

      const fill = fillRefs.current[i];
      if (fill) fill.style.transform = `scaleX(${Math.min(1, Math.max(0, local))})`;
    });
  });

  return (
    <section
      id="trabalhos"
      ref={wrapRef}
      style={{ background: '#F8F7F5', height: `${NUM * 100}vh`, position: 'relative' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        <div ref={head.ref} style={{ ...head.style, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '48px 48px 28px', flexShrink: 0 }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block' }}>01 — Trabalhos selecionados</span>
            <h2 style={{ margin: '12px 0 0', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(30px, 3.4vw, 46px)' }}>Trabalhos em destaque</h2>
          </div>
          <a href="https://github.com/felippeximenes" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--line)', borderRadius: 999, padding: '10px 18px', fontSize: 14, fontWeight: 500, flexShrink: 0 }}>
            Todos os projetos ↗
          </a>
        </div>

        {/* Cards empilhados — um por cima do outro, controlados pelo scroll */}
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          {projects.map((p, i) => (
            <div
              key={p.name}
              ref={(el) => { stepRefs.current[i] = el; }}
              style={{ position: 'absolute', inset: 0, opacity: i === 0 ? 1 : 0 }}
            >
              <ProjectCard p={p} />
            </div>
          ))}
        </div>

        {/* Barras de progresso sincronizadas 1:1 com o scroll */}
        <div style={{ display: 'flex', gap: 8, padding: '16px 48px 24px', flexShrink: 0 }}>
          {projects.map((p, i) => (
            <span key={p.name} style={{ height: 2, flex: 1, background: 'rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden', display: 'block', borderRadius: 999 }}>
              <span
                ref={(el) => { fillRefs.current[i] = el; }}
                style={{ position: 'absolute', inset: 0, background: 'var(--fg)', transform: 'scaleX(0)', transformOrigin: '0 50%', display: 'block' }}
              />
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
