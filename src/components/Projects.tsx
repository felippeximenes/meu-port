import { useState, useRef } from 'react';
import { projects } from '../data';
import { useReveal, usePinProgress, useIsMobile } from '../hooks/hooks';
import type { Project } from '../data';
import SpecularButton from './SpecularButton';
import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';

const mediaBox = {
  borderRadius: 16, overflow: 'hidden',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)',
  background: '#EEECEA',
} as const;

function Media({ p }: { p: Project }) {
  const [imgErr, setImgErr] = useState(false);
  if (p.video) return <video src={p.video} muted loop playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block' }} />;
  if (imgErr) return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 13 }}>{p.name}</div>;
  return <img src={p.img} alt={p.name} onError={() => setImgErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block' }} />;
}

function ProjectCard({ p, isMobile, total, viewLabel }: { p: Project; isMobile: boolean; total: number; viewLabel: string }) {
  const counter = `${p.n} · ${String(total).padStart(2, '0')}`;
  if (isMobile) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F8F7F5', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
          <div style={{ ...mediaBox, aspectRatio: '16/9' }}><Media p={p} /></div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px', gap: 12, overflow: 'hidden' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--purple)' }}>{counter}</span>
          <h3 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: 'clamp(22px, 6vw, 32px)', fontWeight: 600, color: 'var(--fg)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>{p.name}</h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--muted)' }}>{p.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            {p.tags.map((t, i) => <span key={t}>{i > 0 && <span style={{ margin: '0 7px', opacity: 0.4 }}>·</span>}{t}</span>)}
          </div>
          <div><SpecularButton href={p.href} target="_blank" rel="noreferrer" size="sm">{viewLabel}</SpecularButton></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1.2fr', background: '#F8F7F5', position: 'relative', overflow: 'hidden' }}>
      <span aria-hidden style={{ position: 'absolute', left: '-10px', bottom: '-24px', fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: 'clamp(160px, 18vw, 240px)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--fg)', opacity: 0.045, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>
        {p.n}
      </span>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 3vw 0 5vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--purple)' }}>{counter}</span>
          <h3 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 600, color: 'var(--fg)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>{p.name}</h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--muted)', maxWidth: 320 }}>{p.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>
            {p.tags.map((t, i) => <span key={t}>{i > 0 && <span style={{ margin: '0 7px', opacity: 0.4 }}>·</span>}{t}</span>)}
          </div>
          <div style={{ marginTop: 8 }}><SpecularButton href={p.href} target="_blank" rel="noreferrer" size="sm">{viewLabel}</SpecularButton></div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '36px 36px 36px 0', gap: 10 }}>
        <div style={{ ...mediaBox, aspectRatio: '16 / 9' }}><Media p={p} /></div>
        <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.04em' }}>{p.site}</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const isMobile = useIsMobile();
  const { lang } = useLang();
  const t = useT().projects;
  const ps = projects[lang];
  const NUM = ps.length;

  const head = useReveal<HTMLDivElement>();
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const activeVideo = useRef(-1);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const wrapRef = usePinProgress<HTMLElement>((p) => {
    const seg = 1 / NUM;
    ps.forEach((_, i) => {
      const el = stepRefs.current[i];
      if (!el) return;
      const local = (p - i * seg) / seg;
      let o = 0, ty = 40;
      if (local >= 0 && local < 1) {
        const fadeIn = Math.min(1, local / 0.25);
        const fadeOut = i === NUM - 1 ? 1 : Math.min(1, (1 - local) / 0.25);
        o = Math.min(fadeIn, fadeOut);
        ty = (1 - fadeIn) * 40 - (1 - fadeOut) * 40;
      } else if (i === 0 && p <= 0) { o = 1; ty = 0; }
        else if (i === NUM - 1 && p >= 1) { o = 1; ty = 0; }
      el.style.opacity = String(o);
      el.style.transform = `translateY(${ty}px)`;
      el.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
      const fill = fillRefs.current[i];
      if (fill) fill.style.transform = `scaleX(${Math.min(1, Math.max(0, local))})`;

      // Só o card ativo (>50% visível) reproduz vídeo — evita 5 vídeos tocando ao mesmo tempo
      if (!reduceMotion && o > 0.5 && activeVideo.current !== i) {
        if (activeVideo.current >= 0) stepRefs.current[activeVideo.current]?.querySelector('video')?.pause();
        activeVideo.current = i;
        el.querySelector('video')?.play().catch(() => {});
      }
    });
  });

  const headerPad = isMobile ? '32px 20px 20px' : '48px 48px 28px';
  const barPad    = isMobile ? '12px 20px 16px' : '16px 48px 24px';

  return (
    <section id="trabalhos" ref={wrapRef} style={{ background: '#F8F7F5', height: `${NUM * 100}vh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: isMobile ? 68 : 0, height: isMobile ? 'calc(100vh - 68px)' : '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        <div ref={head.ref} style={{ ...head.style, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: headerPad, flexShrink: 0 }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block' }}>{t.label}</span>
            <h2 style={{ margin: '12px 0 0', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(24px, 3.4vw, 46px)' }}>{t.heading}</h2>
          </div>
          <a href="https://github.com/felippeximenes" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--line)', borderRadius: 999, padding: isMobile ? '8px 14px' : '10px 18px', fontSize: isMobile ? 13 : 14, fontWeight: 500, flexShrink: 0 }}>
            {isMobile ? t.viewAllMobile : t.viewAll}
          </a>
        </div>

        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          {ps.map((p, i) => (
            <div key={p.name} ref={(el) => { stepRefs.current[i] = el; }} style={{ position: 'absolute', inset: 0, opacity: i === 0 ? 1 : 0 }}>
              <ProjectCard p={p} isMobile={isMobile} total={NUM} viewLabel={t.viewProject} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, padding: barPad, flexShrink: 0 }}>
          {ps.map((p, i) => (
            <span key={p.name} style={{ height: 2, flex: 1, background: 'rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden', display: 'block', borderRadius: 999 }}>
              <span ref={(el) => { fillRefs.current[i] = el; }} style={{ position: 'absolute', inset: 0, background: 'var(--fg)', transform: 'scaleX(0)', transformOrigin: '0 50%', display: 'block' }} />
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
