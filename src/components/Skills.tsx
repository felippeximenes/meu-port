import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaAws } from 'react-icons/fa';
import { useT } from '../i18n';
import {
  siReact, siNextdotjs, siTypescript, siNodedotjs, siPython,
  siFastapi, siNestjs, siDocker, siPostgresql, siAngular,
  siLangchain, siLanggraph, siQdrant,
} from 'simple-icons';

gsap.registerPlugin(ScrollTrigger);

interface SkillDef { label: string; path?: string; Icon?: typeof FaAws; hex: string; }
interface Category { label: string; skills: SkillDef[]; }

const categories: Category[] = [
  {
    label: 'Frontend',
    skills: [
      { label: 'React',      path: siReact.path,      hex: siReact.hex },
      { label: 'Next.js',    path: siNextdotjs.path,  hex: 'ffffff' },
      { label: 'Angular',    path: siAngular.path,    hex: 'DD0031' },
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
      { label: 'AWS',       Icon: FaAws,              hex: 'FF9900' },
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
  const rgb = hexToRgb(skill.hex);
  return (
    <div
      className="skill-item"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11, cursor: 'default', opacity: 0 }}
      onMouseEnter={e => {
        const card = e.currentTarget.querySelector('.skill-card') as HTMLElement;
        if (!card) return;
        card.style.borderColor = `rgba(${rgb}, 0.45)`;
        card.style.boxShadow = `0 0 0 1px rgba(${rgb}, 0.12), 0 8px 28px rgba(${rgb}, 0.2)`;
        card.style.background = `rgba(${rgb}, 0.14)`;
      }}
      onMouseLeave={e => {
        const card = e.currentTarget.querySelector('.skill-card') as HTMLElement;
        if (!card) return;
        card.style.borderColor = `rgba(${rgb}, 0.2)`;
        card.style.boxShadow = 'none';
        card.style.background = `rgba(${rgb}, 0.07)`;
      }}
    >
      <div
        className="skill-card"
        style={{
          width: 76, height: 76, borderRadius: 20,
          background: `rgba(${rgb}, 0.07)`,
          border: `1px solid rgba(${rgb}, 0.2)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
        }}
      >
        {skill.Icon
          ? <skill.Icon size={34} color={`#${skill.hex}`} aria-label={skill.label} />
          : (
            <svg viewBox="0 0 24 24" width={34} height={34} fill={`#${skill.hex}`} aria-label={skill.label}>
              <path d={skill.path} />
            </svg>
          )}
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
        background: 'linear-gradient(90deg, var(--accent) 0%, rgba(255,100,54,0.15) 30%, transparent 70%)',
        opacity: 0.45,
      }} />

      {/* Ghost watermark */}
      <span aria-hidden style={{
        position: 'absolute', right: -12, top: 0,
        fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400,
        fontSize: 'clamp(100px, 10vw, 150px)', lineHeight: 1, letterSpacing: '-0.03em',
        color: '#fff', opacity: 0.035, pointerEvents: 'none', userSelect: 'none',
      }}>{num}</span>

      <div className="skills-row-grid" style={{ display: 'grid', gridTemplateColumns: '160px 1fr', alignItems: 'center', gap: '0 32px' }}>
        {/* Left — number + label */}
        <div className="cat-label" style={{ opacity: 0 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.8, display: 'block' }}>
            {num}
          </span>
          <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em', display: 'block', marginTop: 4 }}>
            {category.label}
          </span>
        </div>

        {/* Right — icons centered */}
        <div className="skills-icons" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {category.skills.map(s => <SkillIcon key={s.label} skill={s} />)}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const headRef = useRef<HTMLDivElement>(null);
  const t = useT().skills;
  const translatedCategories = categories.map((cat, i) => ({ ...cat, label: t.categories[i] }));

  useEffect(() => {
    if (!headRef.current) return;
    gsap.fromTo(headRef.current, { opacity: 0, y: 24, filter: 'blur(6px)' }, {
      opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none',
      scrollTrigger: { trigger: headRef.current, start: 'top bottom-=10%', end: 'bottom center', scrub: true },
    });
  }, []);

  return (
    <section className="skills-sec" style={{ background: 'var(--dark)', padding: '96px 48px 112px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div ref={headRef} style={{ marginBottom: 72, opacity: 0 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            {t.label}
          </span>
          <h2 style={{ margin: '14px 0 0', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(28px, 3vw, 42px)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            <strong style={{ fontWeight: 600 }}>Skills</strong> &amp;{' '}
            <em style={{ fontStyle: 'italic', fontFamily: "'Inter', sans-serif", color: 'var(--accent)', fontWeight: 400 }}>Tools</em>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
          {translatedCategories.map((cat, i) => (
            <CategoryRow key={i} category={cat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
