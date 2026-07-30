import { useState, useEffect, useRef } from 'react';
import { projects } from '../data';
import { useReveal } from '../hooks/hooks';
import type { Project } from '../data';
import SpecularButton from './SpecularButton';

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="project-inner" style={{
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      background: '#fff',
      position: 'relative',
      overflow: 'hidden',
      transformOrigin: 'center top',
    }}>
      {/* Left — project info, grouped and centered to mirror image height */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        zIndex: 1, padding: '0 3vw 0 6vw', gap: 0,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--muted)',
          }}>
            {p.n} — {projects.length.toString().padStart(2, '0')}
          </span>

          <h3 style={{
            margin: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(26px, 3vw, 44px)',
            fontWeight: 500,
            color: 'var(--fg)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            {p.name}
          </h3>

          <p style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.65,
            color: 'var(--muted)',
            maxWidth: 320,
          }}>
            {p.desc}
          </p>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontSize: 11, color: 'var(--muted)',
                border: '1px solid var(--line)',
                borderRadius: 999, padding: '5px 12px',
              }}>
                {t}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 8 }}>
            <SpecularButton href={p.href} target="_blank" rel="noreferrer" size="sm" style={{ alignSelf: 'flex-start' }}>
              Ver projeto ↗
            </SpecularButton>
          </div>
        </div>
      </div>

      {/* Right — 16:9 screenshot preview */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '36px 40px 36px 0', gap: 10,
      }}>
        <div style={{
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          aspectRatio: '16 / 9',
          background: '#f5f5f7',
        }}>
          {imgErr ? (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 13 }}>
              {p.name}
            </div>
          ) : (
            <img
              src={p.img}
              alt={p.name}
              onError={() => setImgErr(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block' }}
            />
          )}
        </div>
        <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.04em' }}>
          {p.site}
        </span>
      </div>

      {/* Progress dots — right edge white area */}
      <div style={{
        position: 'absolute', right: 14, top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 2,
      }}>
        {projects.map((_, i) => (
          <div key={i} style={{
            width: 3,
            height: i === index ? 22 : 3,
            borderRadius: 999,
            background: i === index ? 'var(--fg)' : 'rgba(0,0,0,0.15)',
            transition: 'height 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const head = useReveal<HTMLDivElement>();
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const vh = window.innerHeight;

      // Batch reads, then writes
      const nextTops = wrapperRefs.current.map(w =>
        w ? w.getBoundingClientRect().top : vh
      );

      wrapperRefs.current.forEach((wrapper, i) => {
        if (!wrapper || i === projects.length - 1) return;
        const inner = wrapper.querySelector<HTMLElement>('.project-inner');
        if (!inner) return;

        const progress = Math.max(0, Math.min(1, (vh - nextTops[i + 1]) / vh));
        inner.style.transform = `scale(${1 - progress * 0.08})`;
        inner.style.opacity = `${1 - progress * 0.12}`;
        inner.style.borderRadius = `${progress * 16}px`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="trabalhos" style={{ paddingTop: 120 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px 64px' }}>
        <div ref={head.ref} style={{ ...head.style, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              01 — Trabalhos selecionados
            </span>
            <h2 style={{ margin: '14px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: 'clamp(30px, 3.4vw, 46px)' }}>
              Trabalhos em destaque
            </h2>
          </div>
          <a
            href="https://github.com/felippeximenes"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--line)', borderRadius: 999, padding: '10px 18px', fontSize: 14, fontWeight: 500, flexShrink: 0 }}
          >
            Todos os projetos <span>↗</span>
          </a>
        </div>
      </div>

      {/* CSS sticky stack — pin by browser, JS only for scale + opacity */}
      <div>
        {projects.map((p, i) => (
          <div
            key={p.name}
            ref={el => { wrapperRefs.current[i] = el; }}
            style={{
              position: 'sticky', top: 0,
              height: '100vh', minHeight: 600,
              zIndex: i + 1,
            }}
          >
            <ProjectCard p={p} index={i} />
          </div>
        ))}
      </div>

      {/* Spacer so last card can un-stick cleanly */}
      <div style={{ height: '30vh' }} />
    </section>
  );
}
