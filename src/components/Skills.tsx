import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  siReact, siNextdotjs, siTypescript, siNodedotjs, siPython,
  siFastapi, siNestjs, siDocker, siPostgresql, siAngular,
  siLangchain, siLanggraph, siQdrant,
} from 'simple-icons';

gsap.registerPlugin(ScrollTrigger);

const AWS_PATH = 'M8.087 11.551l-.022-.03-1.56 1.55.025.032c.348.452.728.878 1.13 1.272l1.595-1.585a8.115 8.115 0 0 1-1.168-1.24zm-1.81-3.705l-.036-.014-1.94.792.017.044A9.995 9.995 0 0 0 5.3 11.07l2.05-.506a7.794 7.794 0 0 1-.074-2.718zm2.086-3.416l-.04.008.806 1.927.04-.017a7.79 7.79 0 0 1 2.597-.746l.175-2.073a9.987 9.987 0 0 0-3.578.9zm5.703-.936l.173 2.073a7.793 7.793 0 0 1 2.597.746l.04.017.806-1.927-.04-.008a9.98 9.98 0 0 0-3.576-.9zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.984 13.585a7.79 7.79 0 0 1-1.951 1.425l-.909-1.854a5.735 5.735 0 0 1-2.124.404c-.738 0-1.454-.14-2.124-.404l-.909 1.854a7.79 7.79 0 0 1-1.951-1.425l1.379-1.56a5.765 5.765 0 0 1-1.191-1.98l-1.98.5a7.825 7.825 0 0 1-.224-1.848c0-.597.068-1.179.198-1.738l1.992.442a5.776 5.776 0 0 1 1.084-2.045L9.17 7.386A7.793 7.793 0 0 1 12 6.22a7.793 7.793 0 0 1 2.83.166l-1.083 1.57a5.776 5.776 0 0 1 1.084 2.045l1.992-.442c.13.559.198 1.14.198 1.738 0 .628-.077 1.238-.224 1.848l-1.98-.5a5.765 5.765 0 0 1-1.191 1.98l1.379 1.56z';

interface SkillDef { label: string; path: string; hex: string; }
interface Category { label: string; skills: SkillDef[]; }

const categories: Category[] = [
  {
    label: 'Frontend',
    skills: [
      { label: 'React',      path: siReact.path,      hex: siReact.hex },
      { label: 'Next.js',    path: siNextdotjs.path,  hex: 'ffffff' },
      { label: 'Angular',    path: siAngular.path,    hex: siAngular.hex },
      { label: 'TypeScript', path: siTypescript.path, hex: siTypescript.hex },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { label: 'Node.js', path: siNodedotjs.path, hex: siNodedotjs.hex },
      { label: 'NestJS',  path: siNestjs.path,    hex: siNestjs.hex },
      { label: 'FastAPI', path: siFastapi.path,   hex: siFastapi.hex },
      { label: 'Python',  path: siPython.path,    hex: siPython.hex },
    ],
  },
  {
    label: 'Cloud & IA',
    skills: [
      { label: 'AWS',       path: AWS_PATH,           hex: 'FF9900' },
      { label: 'LangChain', path: siLangchain.path,   hex: siLangchain.hex },
      { label: 'LangGraph', path: siLanggraph.path,   hex: siLanggraph.hex },
      { label: 'Qdrant',    path: siQdrant.path,      hex: siQdrant.hex },
    ],
  },
  {
    label: 'Data & Infra',
    skills: [
      { label: 'PostgreSQL', path: siPostgresql.path, hex: siPostgresql.hex },
      { label: 'Docker',     path: siDocker.path,     hex: siDocker.hex },
    ],
  },
];

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
}

function SkillIcon({ skill }: { skill: SkillDef }) {
  return (
    <div
      className="skill-item"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11, cursor: 'default', opacity: 0 }}
      onMouseEnter={e => {
        const card = e.currentTarget.querySelector('.skill-card') as HTMLElement;
        if (!card) return;
        const rgb = hexToRgb(skill.hex);
        card.style.borderColor = `rgba(${rgb}, 0.5)`;
        card.style.boxShadow = `0 0 0 1px rgba(${rgb}, 0.15), 0 4px 24px rgba(${rgb}, 0.2)`;
        card.style.background = 'rgba(255,255,255,0.09)';
      }}
      onMouseLeave={e => {
        const card = e.currentTarget.querySelector('.skill-card') as HTMLElement;
        if (!card) return;
        card.style.borderColor = 'rgba(255,255,255,0.08)';
        card.style.boxShadow = 'none';
        card.style.background = 'rgba(255,255,255,0.05)';
      }}
    >
      <div
        className="skill-card"
        style={{
          width: 76, height: 76, borderRadius: 20,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
        }}
      >
        <svg viewBox="0 0 24 24" width={34} height={34} fill={`#${skill.hex}`} aria-label={skill.label}>
          <path d={skill.path} />
        </svg>
      </div>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.02em', fontWeight: 400 }}>
        {skill.label}
      </span>
    </div>
  );
}

function CategoryRow({ category, index }: { category: Category; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const label = row.querySelector('.cat-label');
    const items = row.querySelectorAll('.skill-item');

    gsap.fromTo(label, { opacity: 0, x: -20 }, {
      opacity: 1, x: 0, ease: 'none',
      scrollTrigger: { trigger: row, start: 'top bottom-=10%', end: 'top center', scrub: true },
    });

    gsap.fromTo(items, { opacity: 0, y: 32, filter: 'blur(8px)' }, {
      opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none', stagger: 0.06,
      scrollTrigger: { trigger: row, start: 'top bottom-=5%', end: 'bottom center+=10%', scrub: true },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const num = String(index + 1).padStart(2, '0');

  return (
    <div ref={rowRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Separator */}
      <div style={{
        height: 1, marginBottom: 36,
        background: 'linear-gradient(90deg, var(--purple) 0%, rgba(124,58,237,0.2) 30%, transparent 70%)',
        opacity: 0.45,
      }} />

      {/* Ghost watermark */}
      <span aria-hidden style={{
        position: 'absolute', right: -12, top: 0,
        fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
        fontSize: 'clamp(100px, 10vw, 150px)', lineHeight: 1, letterSpacing: '-0.03em',
        color: '#fff', opacity: 0.035, pointerEvents: 'none', userSelect: 'none',
      }}>{num}</span>

      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', alignItems: 'center', gap: '0 32px' }}>
        {/* Left — number + label */}
        <div className="cat-label" style={{ opacity: 0 }}>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--purple)', opacity: 0.8, display: 'block' }}>
            {num}
          </span>
          <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em', display: 'block', marginTop: 4 }}>
            {category.label}
          </span>
        </div>

        {/* Right — icons centered */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {category.skills.map(s => <SkillIcon key={s.label} skill={s} />)}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headRef.current) return;
    gsap.fromTo(headRef.current, { opacity: 0, y: 24, filter: 'blur(6px)' }, {
      opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none',
      scrollTrigger: { trigger: headRef.current, start: 'top bottom-=10%', end: 'bottom center', scrub: true },
    });
  }, []);

  return (
    <section style={{ background: 'var(--dark)', padding: '96px 48px 112px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div ref={headRef} style={{ marginBottom: 72, opacity: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            02 — Stack
          </span>
          <h2 style={{ margin: '14px 0 0', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            <strong style={{ fontWeight: 600 }}>Skills</strong> &amp;{' '}
            <em style={{ fontStyle: 'italic', fontFamily: "'Inter', sans-serif", color: 'var(--purple)', fontWeight: 400 }}>Tools</em>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
          {categories.map((cat, i) => (
            <CategoryRow key={cat.label} category={cat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
