import { motion } from 'motion/react';
import BlurText from './BlurText';
import SpecularButton from './SpecularButton';
export default function Hero() {
  return (
    <header className="hero-noise" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingTop: 40 }}>
      <div style={{ position: 'absolute', zIndex: 1, left: '50%', top: 0, transform: 'translateX(-50%)', height: '90vh', width: 'clamp(320px, 42vw, 680px)', maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)' }}>
        <img src="/upscalemedia-transformed.jpeg" alt="Felippe Ximenes" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
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
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(26px, 2.6vw, 42px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--fg)' }}
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
