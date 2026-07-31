import { motion } from 'motion/react';
import { useTilt } from '../hooks/hooks';
import BlurText from './BlurText';
import SpecularButton from './SpecularButton';
import Orb from './Orb';
export default function Hero() {
  const tiltRef = useTilt<HTMLImageElement>(4);
  return (
    <header className="hero-noise" style={{ position: 'relative', minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingTop: 40 }}>
      {/* Orb atrás da foto — zIndex 0, background branco igual ao hero:
          o anel colorido aparece em volta da pessoa, fundo fora do anel é branco (invisível) */}
      <div style={{
        position: 'absolute', left: '50%', top: '50vh',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        filter: 'sepia(1) hue-rotate(255deg) saturate(2.2) brightness(1.15)',
      }}>
        <div style={{ width: 'min(120vh, 120vw)', height: 'min(120vh, 120vw)' }}>
          <Orb
            hue={0}
            backgroundColor="#ffffff"
            hoverIntensity={0.4}
            rotateOnHover={false}
            forceHoverState={false}
          />
        </div>
      </div>

      {/* felippe3.png tem ~34% de espaço vazio acima da cabeça — recorta esse topo e ancora a foto no alto, como no site de referência */}
      <div style={{ position: 'absolute', zIndex: 1, left: '50%', top: 0, transform: 'translateX(-50%)', height: '90vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', mixBlendMode: 'multiply', pointerEvents: 'none' }}>
        <img
          ref={tiltRef}
          src="/upscalemedia-transformed.jpeg"
          alt="Felippe Ximenes"
          style={{
            height: '130%', width: 'auto', flexShrink: 0, marginTop: '-29vh', display: 'block',
            filter: 'contrast(1.06) brightness(1.02)',
            maskImage: 'linear-gradient(to bottom, black 94%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 94%, transparent 100%)',
            animation: 'fadeUp 1.1s ease both',
            transition: 'transform 0.25s ease',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'end', padding: '0 48px 46px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 'clamp(0px, 8vw, 120px)', maxWidth: 'clamp(240px, 32vw, 480px)' }}>
          <motion.div
            initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid var(--line)', borderRadius: 999, padding: '8px 16px', fontSize: 14, color: 'var(--muted)', width: 'fit-content' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1fae5e', boxShadow: '0 0 0 3px rgba(31,174,94,0.15)', animation: 'pulse-dot 2.5s ease-in-out infinite' }} />
            Disponível para projetos
          </motion.div>
          <BlurText
            text="Felippe constrói produtos com IA de ponta a ponta — do pipeline RAG à interface"
            delay={120}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 'clamp(26px, 2.6vw, 42px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--fg)' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 260, justifySelf: 'end', paddingRight: 'clamp(8px, 2vw, 32px)' }}>
          <BlurText
            text="Desenvolvedor Full-Stack com LLMs em produção: RAG, automações e aplicações web escaláveis — da arquitetura ao deploy."
            delay={60}
            animateBy="words"
            direction="top"
            stepDuration={0.3}
            style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--muted)' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            style={{ width: 'fit-content' }}
          >
            <SpecularButton href="#trabalhos" size="md">Ver projetos</SpecularButton>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1.2, ease: 'easeOut' }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 2, pointerEvents: 'none' }}
      >
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" style={{ animation: 'scroll-hint 1.8s ease-in-out infinite', display: 'block' }}>
          <path d="M2 2L10 10L18 2" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </header>
  );
}
