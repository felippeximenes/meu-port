import {
  siReact, siNextdotjs, siTypescript, siNodedotjs, siPython,
  siFastapi, siNestjs, siDocker, siPostgresql, siAngular,
  siLangchain, siLanggraph, siQdrant,
} from 'simple-icons';
import { useReveal } from '../hooks/hooks';

// AWS Bedrock uses official brand color; no simple-icons entry exists for it
const AWS_PATH = 'M8.087 11.551l-.022-.03-1.56 1.55.025.032c.348.452.728.878 1.13 1.272l1.595-1.585a8.115 8.115 0 0 1-1.168-1.24zm-1.81-3.705l-.036-.014-1.94.792.017.044A9.995 9.995 0 0 0 5.3 11.07l2.05-.506a7.794 7.794 0 0 1-.074-2.718zm2.086-3.416l-.04.008.806 1.927.04-.017a7.79 7.79 0 0 1 2.597-.746l.175-2.073a9.987 9.987 0 0 0-3.578.9zm5.703-.936l.173 2.073a7.793 7.793 0 0 1 2.597.746l.04.017.806-1.927-.04-.008a9.98 9.98 0 0 0-3.576-.9zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.984 13.585a7.79 7.79 0 0 1-1.951 1.425l-.909-1.854a5.735 5.735 0 0 1-2.124.404c-.738 0-1.454-.14-2.124-.404l-.909 1.854a7.79 7.79 0 0 1-1.951-1.425l1.379-1.56a5.765 5.765 0 0 1-1.191-1.98l-1.98.5a7.825 7.825 0 0 1-.224-1.848c0-.597.068-1.179.198-1.738l1.992.442a5.776 5.776 0 0 1 1.084-2.045L9.17 7.386A7.793 7.793 0 0 1 12 6.22a7.793 7.793 0 0 1 2.83.166l-1.083 1.57a5.776 5.776 0 0 1 1.084 2.045l1.992-.442c.13.559.198 1.14.198 1.738 0 .628-.077 1.238-.224 1.848l-1.98-.5a5.765 5.765 0 0 1-1.191 1.98l1.379 1.56z';

interface SkillDef {
  label: string;
  path: string;
  hex: string;
}

const skills: SkillDef[] = [
  { label: 'React',       path: siReact.path,      hex: siReact.hex },
  { label: 'Next.js',     path: siNextdotjs.path,  hex: 'ffffff' },
  { label: 'Angular',     path: siAngular.path,    hex: siAngular.hex },
  { label: 'TypeScript',  path: siTypescript.path, hex: siTypescript.hex },
  { label: 'Node.js',     path: siNodedotjs.path,  hex: siNodedotjs.hex },
  { label: 'NestJS',      path: siNestjs.path,     hex: siNestjs.hex },
  { label: 'FastAPI',     path: siFastapi.path,    hex: siFastapi.hex },
  { label: 'Python',      path: siPython.path,     hex: siPython.hex },
  { label: 'AWS',         path: AWS_PATH,          hex: 'FF9900' },
  { label: 'LangChain',   path: siLangchain.path,  hex: siLangchain.hex },
  { label: 'LangGraph',   path: siLanggraph.path,  hex: siLanggraph.hex },
  { label: 'Qdrant',      path: siQdrant.path,     hex: siQdrant.hex },
  { label: 'PostgreSQL',  path: siPostgresql.path, hex: siPostgresql.hex },
  { label: 'Docker',      path: siDocker.path,     hex: siDocker.hex },
];

function SkillIcon({ skill, delay }: { skill: SkillDef; delay: number }) {
  const { ref, style } = useReveal<HTMLDivElement>(0.1, delay, 24);
  return (
    <div
      ref={ref}
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const card = e.currentTarget.querySelector('.skill-card') as HTMLElement;
        if (card) { card.style.borderColor = 'var(--dark-line)'; card.style.background = '#222027'; }
      }}
      onMouseLeave={e => {
        const card = e.currentTarget.querySelector('.skill-card') as HTMLElement;
        if (card) { card.style.borderColor = 'transparent'; card.style.background = 'var(--dark-card)'; }
      }}
    >
      <div
        className="skill-card"
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          background: 'var(--dark-card)',
          border: '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease, border-color 0.2s ease',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width={34}
          height={34}
          fill={`#${skill.hex}`}
          aria-label={skill.label}
        >
          <path d={skill.path} />
        </svg>
      </div>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em', fontWeight: 400 }}>
        {skill.label}
      </span>
    </div>
  );
}

export default function Skills() {
  const head = useReveal<HTMLDivElement>();
  return (
    <section style={{ background: 'var(--dark)', padding: '96px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div ref={head.ref} style={{ ...head.style, marginBottom: 64 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            02 — Stack
          </span>
          <h2 style={{ margin: '14px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: 'clamp(28px, 3vw, 42px)', color: '#fff' }}>
            Skills & Tools
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '48px 24px' }}>
          {skills.map((s, i) => (
            <SkillIcon key={s.label} skill={s} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
