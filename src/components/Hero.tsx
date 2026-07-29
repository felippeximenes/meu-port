import { motion } from 'motion/react';
import { useTilt } from '../hooks/hooks';
import BlurText from './BlurText';
import SpecularButton from './SpecularButton';

export default function Hero() {
  const tiltRef = useTilt<HTMLImageElement>(4);
  return (
    <header style={{ position: 'relative', minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingTop: 40 }}>
      {/* felippe3.png tem ~34% de espaço vazio acima da cabeça — recorta esse topo e ancora a foto no alto, como no site de referência */}
      <div style={{ position: 'absolute', zIndex: 1, left: '50%', top: 0, transform: 'translateX(-50%)', height: '90vh', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
        <img
          ref={tiltRef}
          src="/upscalemedia-transformed.jpeg"
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 'clamp(0px, 8vw, 120px)', maxWidth: 'clamp(240px, 32vw, 480px)' }}>
          <motion.div
            initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid var(--line)', borderRadius: 999, padding: '8px 16px', fontSize: 14, color: 'var(--muted)', width: 'fit-content' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1fae5e', boxShadow: '0 0 0 4px rgba(31,174,94,0.15)' }} />
            Disponível para projetos
          </motion.div>
          <BlurText
            text="Felippe constrói produtos com IA de ponta a ponta — do pipeline RAG à interface"
            delay={120}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 'clamp(22px, 2.2vw, 36px)', lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--fg)' }}
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
    </header>
  );
}
