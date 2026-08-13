import { motion } from 'motion/react';
import BlurText from './BlurText';
import SpecularButton from './SpecularButton';
import { useIsMobile, useRealVh } from '../hooks/hooks';
import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';
import { RESUME } from '../data';

const resumeLinkStyle = { display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, padding: '13px 22px', whiteSpace: 'nowrap' } as const;

const MASK = 'linear-gradient(to bottom, black 88%, transparent 100%)';
const MASK_DESKTOP = 'linear-gradient(to bottom, black 85%, transparent 100%)';
const IMG_SRC = '/upscalemedia-transformed.webp';
const ENTER = { duration: 0.95, ease: [0.22, 1, 0.36, 1] } as const;

const scrollHint = (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.8, duration: 1.2, ease: 'easeOut' }}
    style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 2, pointerEvents: 'none' }}
  >
    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" style={{ animation: 'scroll-hint 1.8s ease-in-out infinite', display: 'block' }}>
      <path d="M2 2L10 10L18 2" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </motion.div>
);

export default function Hero() {
  const isMobile = useIsMobile();
  const { lang } = useLang();
  const t = useT().hero;
  useRealVh();

  if (isMobile) {
    return (
      <header
        className="hero-noise"
        style={{ position: 'relative', minHeight: 'calc(var(--vh, 1vh) * 100 - 68px)', display: 'flex', flexDirection: 'column', background: '#161616' }}
      >
        {/* Portrait — em fluxo, ocupa o topo */}
        <div style={{ position: 'relative', height: 'calc(var(--vh, 1vh) * 46)', flexShrink: 0 }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', height: '100%', width: 'min(86vw, 360px)', maskImage: MASK, WebkitMaskImage: MASK }}>
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={ENTER}
              style={{ width: '100%', height: '100%' }}
            >
              <img src={IMG_SRC} alt="Felippe Ximenes" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </motion.div>
          </div>
        </div>

        {/* Conteúdo abaixo da imagem */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, padding: '0 24px 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: '8px 16px', fontSize: 14, color: 'rgba(255,255,255,0.7)', width: 'fit-content' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6436', boxShadow: '0 0 0 3px rgba(255,100,54,0.2)', animation: 'pulse-dot 2.5s ease-in-out infinite' }} />
            {t.badge}
          </motion.div>

          <BlurText
            as="h1"
            text={t.heading}
            delay={120}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: 'clamp(38px, 8vw, 58px)', lineHeight: 0.95, letterSpacing: '-0.01em', color: '#fff' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, width: '100%' }}
          >
            <SpecularButton href="#trabalhos" size="md">{t.cta}</SpecularButton>
            <a href={RESUME[lang]} download style={resumeLinkStyle}>↓ {t.resume}</a>
          </motion.div>
        </div>

        {scrollHint}
      </header>
    );
  }

  return (
    <header
      className="hero-noise"
      style={{ position: 'relative', minHeight: 'calc(100vh - 68px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingTop: 40, background: '#161616' }}
    >
      {/* Portrait desktop */}
      <div style={{ position: 'absolute', zIndex: 1, left: '50%', bottom: 0, transform: 'translateX(-50%)', aspectRatio: '1400 / 1476', maxHeight: '90vh', width: 'clamp(320px, 42vw, 680px)', maskImage: MASK_DESKTOP, WebkitMaskImage: MASK_DESKTOP }}>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={ENTER}
          style={{ width: '100%', height: '100%' }}
        >
          <img src={IMG_SRC} alt="Felippe Ximenes" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
        </motion.div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'end', padding: '0 48px 46px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 'clamp(0px, 3vw, 80px)', maxWidth: 'clamp(120px, 18vw, 380px)' }}>
          <motion.div
            initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: '8px 16px', fontSize: 14, color: 'rgba(255,255,255,0.7)', width: 'fit-content' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6436', boxShadow: '0 0 0 3px rgba(255,100,54,0.2)', animation: 'pulse-dot 2.5s ease-in-out infinite' }} />
            {t.badge}
          </motion.div>
          <BlurText
            as="h1"
            text={t.heading}
            delay={120}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: 'clamp(44px, 3.8vw, 64px)', lineHeight: 0.95, letterSpacing: '-0.01em', color: '#fff' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 'clamp(120px, 18vw, 260px)', justifySelf: 'end', paddingRight: 'clamp(8px, 2vw, 32px)' }}>
          <BlurText
            text={t.sub}
            delay={60}
            animateBy="words"
            direction="top"
            stepDuration={0.3}
            style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(255,255,255,0.55)' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14, width: 'fit-content' }}
          >
            <SpecularButton href="#trabalhos" size="md">{t.cta}</SpecularButton>
            <a href={RESUME[lang]} download style={resumeLinkStyle}>↓ {t.resume}</a>
          </motion.div>
        </div>
      </div>

      {scrollHint}
    </header>
  );
}
