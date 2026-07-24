import { useTilt } from '../hooks/hooks';
import BlurText from './BlurText';

export default function Hero() {
  const tiltRef = useTilt<HTMLImageElement>(4);
  return (
    <header style={{ position: 'relative', minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingTop: 40 }}>
      {/* felippe3.png tem ~34% de espaço vazio acima da cabeça — recorta esse topo e ancora a foto no alto, como no site de referência */}
      <div style={{ position: 'absolute', zIndex: 1, left: '50%', top: 0, transform: 'translateX(-50%)', height: '90vh', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
        <img
          ref={tiltRef}
          src="/upscalemedia-transformed.png"
          alt="Felippe Ximenes"
          style={{
            height: '130%', width: 'auto', flexShrink: 0, marginTop: '-29vh', display: 'block',
            filter: 'contrast(1.06) brightness(1.02)',
            maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
            animation: 'fadeUp 1.1s ease both',
            transition: 'transform 0.25s ease',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'end', padding: '0 48px 46px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 'clamp(0px, 8vw, 120px)', animation: 'fadeUp 0.9s ease both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid var(--line)', borderRadius: 999, padding: '8px 16px', fontSize: 14, color: 'var(--muted)', width: 'fit-content' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1fae5e', boxShadow: '0 0 0 4px rgba(31,174,94,0.15)' }} />
            Disponível para projetos
          </div>
          <BlurText
            text="Felippe constrói produtos com IA de ponta a ponta — do pipeline RAG à interface"
            delay={120}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 'clamp(34px, 3.6vw, 54px)', lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--fg)' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 260, justifySelf: 'end', paddingRight: 'clamp(8px, 2vw, 32px)', animation: 'fadeUp 0.9s ease 0.15s both' }}>
          <BlurText
            text="Desenvolvedor Full-Stack com LLMs em produção: RAG, automações e aplicações web escaláveis — da arquitetura ao deploy."
            delay={80}
            animateBy="words"
            direction="top"
            stepDuration={0.3}
            style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--muted)' }}
          />
          <a href="#trabalhos" style={{ background: 'var(--fg)', color: '#fff', padding: '15px 28px', borderRadius: 999, fontSize: 15, fontWeight: 500, width: 'fit-content' }}>Ver projetos</a>
        </div>
      </div>
    </header>
  );
}
