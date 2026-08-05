import { services } from '../data';
import { useReveal } from '../hooks/hooks';
import type { Service } from '../data';
import TiltedCard from './TiltedCard';

const NUMS = ['01', '02', '03'];

const GRID_POS = [
  { gridColumn: 1, gridRow: 1 },
  { gridColumn: 2, gridRow: '1 / 3' },
  { gridColumn: 1, gridRow: 2 },
] as const;

function ServiceCard({ s, num, pos, delay }: { s: Service; num: string; pos: typeof GRID_POS[number]; delay: number }) {
  const { ref, style } = useReveal<HTMLDivElement>(0.15, delay, -24);

  const cardContent = s.dark ? (
    // Feature card — purple
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--purple)',
      borderRadius: 24,
      padding: 48,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 8px rgba(124,58,237,0.2), 0 16px 48px rgba(124,58,237,0.25)',
    }}>
      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Ghost number */}
      <span aria-hidden style={{
        position: 'absolute', right: -10, bottom: -20,
        fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
        fontSize: 160, lineHeight: 1, letterSpacing: '-0.02em',
        color: '#fff', opacity: 0.08, pointerEvents: 'none', userSelect: 'none',
      }}>{num}</span>

      <span style={{ position: 'relative', fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 20 }}>
        {num} — Destaque
      </span>
      <h3 style={{ position: 'relative', margin: 0, fontFamily: "'Inter', sans-serif", fontSize: 'clamp(20px, 1.8vw, 28px)', fontWeight: 600, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
        {s.title}
      </h3>
      <p style={{ position: 'relative', margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', flex: 1, marginBottom: 28 }}>
        {s.desc}
      </p>
      <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>
        {s.chips.map((c, i) => (
          <span key={c}>
            {i > 0 && <span style={{ margin: '0 7px', opacity: 0.4 }}>·</span>}
            {c}
          </span>
        ))}
      </div>
      <a href="#trabalhos" style={{
        position: 'relative',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
        color: '#fff', border: '1.5px solid rgba(255,255,255,0.35)', borderRadius: 999,
        padding: '10px 20px', width: 'fit-content', textDecoration: 'none',
      }}>
        Ver projetos com IA ↗
      </a>
    </div>
  ) : (
    // Regular card — white
    <div style={{
      width: '100%', height: '100%',
      background: '#fff',
      borderRadius: 24,
      padding: 40,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 6px 20px rgba(0,0,0,0.05), 0 20px 60px rgba(0,0,0,0.05)',
    }}>
      {/* Accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 40, right: 40, height: 1,
        background: 'linear-gradient(90deg, var(--purple) 0%, transparent 60%)',
        opacity: 0.35,
      }} />
      {/* Ghost number */}
      <span aria-hidden style={{
        position: 'absolute', right: -10, bottom: -20,
        fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
        fontSize: 140, lineHeight: 1, letterSpacing: '-0.02em',
        color: 'var(--fg)', opacity: 0.04, pointerEvents: 'none', userSelect: 'none',
      }}>{num}</span>

      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 20 }}>
        {num}
      </span>
      <h3 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: 'clamp(20px, 1.8vw, 26px)', fontWeight: 600, color: 'var(--fg)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
        {s.title}
      </h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--muted)', flex: 1, marginBottom: 24 }}>
        {s.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        {s.chips.map((c, i) => (
          <span key={c}>
            {i > 0 && <span style={{ margin: '0 7px', opacity: 0.4 }}>·</span>}
            {c}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={ref} style={{ ...style, ...pos }}>
      <TiltedCard
        containerHeight="100%"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        rotateAmplitude={8}
        scaleOnHover={1.03}
        showMobileWarning={false}
        showTooltip={false}
      >
        {cardContent}
      </TiltedCard>
    </div>
  );
}

export default function Services() {
  const { ref, style } = useReveal<HTMLDivElement>();
  return (
    <section id="servicos" style={{ background: '#F8F7F5', padding: '80px 0 120px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        <div ref={ref} style={{ ...style, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, marginBottom: 56, alignItems: 'start' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 12 }}>
            02 — Serviços
          </span>
          <h2 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 'clamp(28px, 3.4vw, 48px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            <strong style={{ fontWeight: 600 }}>Soluções completas</strong> que tiram ideias do papel.{' '}
            Do serverless na AWS ao pixel — com{' '}
            <em style={{ fontStyle: 'italic', fontFamily: "'Inter', sans-serif", color: 'var(--purple)', fontWeight: 400 }}>IA generativa</em>{' '}
            onde ela gera valor real.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gridTemplateRows: 'auto auto', gap: 20 }}>
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} num={NUMS[i]} pos={GRID_POS[i]} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}
