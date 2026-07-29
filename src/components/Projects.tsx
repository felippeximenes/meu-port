import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data';
import { useReveal } from '../hooks/hooks';
import type { Project } from '../data';
import SpecularButton from './SpecularButton';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="project-inner" style={{
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: '0 6vw',
      padding: '0 6vw',
      background: '#fff',
      position: 'relative',
      overflow: 'hidden',
      transformOrigin: 'center top',
    }}>
      {/* Ghost number background */}
      <span style={{
        position: 'absolute',
        right: '-2vw',
        bottom: '-0.1em',
        fontSize: 'clamp(180px, 22vw, 320px)',
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        color: 'rgba(0,0,0,0.04)',
        userSelect: 'none',
        lineHeight: 1,
        pointerEvents: 'none',
      }}>
        {p.n}
      </span>

      {/* Left — project info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, zIndex: 1 }}>
        <span style={{
          fontSize: 12, fontWeight: 600, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--muted)',
        }}>
          {p.n} — {projects.length.toString().padStart(2, '0')}
        </span>

        <h3 style={{
          margin: 0,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(38px, 5vw, 68px)',
          fontWeight: 500,
          color: 'var(--fg)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}>
          {p.name}
        </h3>

        <p style={{
          margin: 0,
          fontSize: 15,
          lineHeight: 1.65,
          color: 'var(--muted)',
          maxWidth: 400,
        }}>
          {p.desc}
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {p.tags.map(t => (
            <span key={t} style={{
              fontSize: 12, color: 'var(--muted)',
              border: '1px solid var(--line)',
              borderRadius: 999, padding: '6px 14px',
            }}>
              {t}
            </span>
          ))}
        </div>

        <SpecularButton href={p.href} target="_blank" rel="noreferrer" size="sm" style={{ alignSelf: 'flex-start' }}>
          Ver projeto ↗
        </SpecularButton>
      </div>

      {/* Right — browser mockup */}
      <div style={{ zIndex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: '100%',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid var(--line)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.1)',
          background: '#f5f5f7',
        }}>
          {/* Browser chrome */}
          <div style={{
            background: '#f0f0f2',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderBottom: '1px solid var(--line)',
            flexShrink: 0,
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ec6a5e', flexShrink: 0 }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f5bf4f', flexShrink: 0 }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#61c454', flexShrink: 0 }} />
            <span style={{
              marginLeft: 8, fontSize: 11, color: 'var(--muted)',
              background: 'rgba(0,0,0,0.06)', borderRadius: 6, padding: '3px 12px',
            }}>
              {p.site}
            </span>
          </div>
          {imgErr ? (
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 13 }}>
              {p.name}
            </div>
          ) : (
            <img
              src={p.img}
              alt={p.name}
              onError={() => setImgErr(true)}
              style={{ width: '100%', display: 'block', maxHeight: '52vh', objectFit: 'cover', objectPosition: 'top' }}
            />
          )}
        </div>
      </div>

      {/* Progress dots — right edge */}
      <div style={{
        position: 'absolute',
        right: 28,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        zIndex: 2,
      }}>
        {projects.map((_, i) => (
          <div key={i} style={{
            width: 3,
            height: i === index ? 28 : 3,
            borderRadius: 999,
            background: i === index ? 'var(--fg)' : 'rgba(0,0,0,0.15)',
            transition: 'height 0.3s ease, background 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const head = useReveal<HTMLDivElement>();
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const stickies = Array.from(stack.querySelectorAll<HTMLElement>('.project-sticky'));

    stickies.forEach((sticky, i) => {
      if (i === stickies.length - 1) return;

      const inner = sticky.querySelector<HTMLElement>('.project-inner');
      if (!inner) return;

      gsap.fromTo(
        inner,
        { scale: 1, borderRadius: 0 },
        {
          scale: 0.88,
          borderRadius: 28,
          ease: 'none',
          scrollTrigger: {
            trigger: stickies[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="trabalhos" style={{ paddingTop: 120 }}>
      {/* Header — scrolls normally above the stack */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px 72px' }}>
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

      {/* Sticky card stack */}
      <div ref={stackRef}>
        {projects.map((p, i) => (
          <div
            key={p.name}
            className="project-sticky"
            style={{ position: 'sticky', top: 0, height: '100vh', zIndex: i + 1 }}
          >
            <ProjectCard p={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
