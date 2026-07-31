import { useState, useEffect, useRef } from 'react';
import { projects } from '../data';
import { useReveal } from '../hooks/hooks';
import type { Project } from '../data';
import SpecularButton from './SpecularButton';

const NUM = projects.length;

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1.2fr', background: '#F8F7F5', position: 'relative', overflow: 'hidden' }}>

      {/* Ghost watermark number */}
      <span aria-hidden style={{
        position: 'absolute', left: '-10px', bottom: '-24px',
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: 'clamp(160px, 18vw, 240px)', lineHeight: 1,
        letterSpacing: '-0.04em', color: 'var(--fg)', opacity: 0.045,
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }}>
        {p.n}
      </span>

      {/* Left — info */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 3vw 0 5vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Index — accent color */}
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--purple)' }}>
            {p.n} — {NUM.toString().padStart(2, '0')}
          </span>
          <h3 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 600, color: 'var(--fg)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>{p.name}</h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--muted)', maxWidth: 320 }}>{p.desc}</p>
          {/* Tags inline — sem bordas */}
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

      {/* Right — media 16:9 */}
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

      {/* Progress bar — linha fina na base */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(0,0,0,0.07)', zIndex: 2 }}>
        <div style={{
          height: '100%',
          width: `${((index + 1) / NUM) * 100}%`,
          background: 'var(--fg)',
          borderRadius: 999,
          transition: 'width 0.4s ease',
        }} />
      </div>

    </div>
  );
}

export default function Projects() {
  const head = useReveal<HTMLDivElement>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let currentX = 0;
    const tick = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (section && track) {
        const scrollable = section.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, (window.scrollY - section.offsetTop) / scrollable));
        const targetX = -p * (NUM - 1) * window.innerWidth;
        currentX += (targetX - currentX) * 0.06;
        track.style.transform = `translateX(${currentX}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="trabalhos" style={{ background: '#F8F7F5' }}>
      <div ref={sectionRef} style={{ height: `${NUM * 100}vh`, position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* Header — anchored inside the sticky so stays visible while scrolling cards */}
          <div ref={head.ref} style={{ ...head.style, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '48px 48px 28px', flexShrink: 0 }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block' }}>01 — Trabalhos selecionados</span>
              <h2 style={{ margin: '12px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: 'clamp(30px, 3.4vw, 46px)' }}>Trabalhos em destaque</h2>
            </div>
            <a href="https://github.com/felippeximenes" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--line)', borderRadius: 999, padding: '10px 18px', fontSize: 14, fontWeight: 500, flexShrink: 0 }}>
              Todos os projetos ↗
            </a>
          </div>

          {/* Cards track */}
          <div ref={trackRef} style={{ display: 'flex', flex: 1, willChange: 'transform' }}>
            {projects.map((p, i) => (
              <div key={p.name} style={{ flex: '0 0 100vw', height: '100%' }}>
                <ProjectCard p={p} index={i} />
              </div>
            ))}
          </div>

        </div>
      </div>
      <div style={{ height: 60 }} />
    </section>
  );
}
