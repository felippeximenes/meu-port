import ThreeScene from './ThreeScene';
import { useParallax } from '../hooks/hooks';

export default function Hero() {
  const backdropRef = useParallax<HTMLDivElement>(0.25, 'translateX(-50%)');
  return (
    <header style={{ position: 'relative', height: 'calc(100vh - 78px)', minHeight: 560, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
      <ThreeScene />

      <div ref={backdropRef} style={{ position: 'absolute', top: '16vh', left: '50%', transform: 'translateX(-50%)', fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(90px, 14vw, 220px)', lineHeight: 1, color: '#e8e4dd', whiteSpace: 'nowrap', userSelect: 'none', zIndex: 0 }}>
        full stack
      </div>

      {/* Halo radial quente atrás da foto */}
      <div style={{ position: 'absolute', zIndex: 1, left: '46%', bottom: '8vh', transform: 'translateX(-50%)', width: 'clamp(320px, 38vw, 620px)', height: 'clamp(320px, 38vw, 620px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,220,196,0.55) 0%, rgba(232,220,196,0.18) 50%, transparent 72%)', filter: 'blur(18px)', pointerEvents: 'none' }} />

      {/* Sombra elíptica no chão */}
      <div style={{ position: 'absolute', zIndex: 1, left: '46%', bottom: '-2vh', transform: 'translateX(-50%)', width: 'clamp(180px, 22vw, 360px)', height: 40, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(60,50,40,0.18) 0%, transparent 70%)', filter: 'blur(8px)', pointerEvents: 'none' }} />

      <img
        src="/assets/felippe2.png"
        alt="Felippe Ximenes"
        style={{
          position: 'absolute', zIndex: 2,
          left: '46%', bottom: '-4vh',
          transform: 'translateX(-50%)',
          height: '82vh', width: 'auto', display: 'block',
          maskImage: 'linear-gradient(to bottom, black 65%, rgba(0,0,0,0.55) 84%, transparent 97%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 65%, rgba(0,0,0,0.55) 84%, transparent 97%)',
          filter: 'contrast(1.04) saturate(1.05) sepia(0.08) brightness(1.02)',
          animation: 'fadeUp 1.1s ease both',
        }}
      />

      <div style={{ position: 'relative', zIndex: 3, display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', alignItems: 'end', gap: 48, padding: '0 48px 46px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeUp 0.9s ease both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #e4e0d8', borderRadius: 999, padding: '8px 16px', fontSize: 14, color: '#444', width: 'fit-content' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1fae5e', boxShadow: '0 0 0 4px rgba(31,174,94,0.15)' }} />
            Disponível para projetos
          </div>
          <h1 style={{ margin: 0, fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(38px, 4.4vw, 64px)', lineHeight: 1.06, letterSpacing: '-0.01em', textWrap: 'balance' }}>
            Felippe constrói produtos com IA de ponta a ponta — <em>do pipeline RAG à interface</em>
          </h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 300, justifySelf: 'end', background: 'rgba(250,249,247,0.82)', backdropFilter: 'blur(10px)', borderRadius: 16, padding: '18px 20px', margin: '-18px -20px', animation: 'fadeUp 0.9s ease 0.15s both' }}>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: '#3d3d3d', textWrap: 'pretty' }}>
            Desenvolvedor Full-Stack com LLMs em produção: RAG, automações e aplicações web escaláveis — da arquitetura ao deploy.
          </p>
          <a href="#trabalhos" style={{ background: '#141414', color: '#faf9f7', padding: '15px 28px', borderRadius: 999, fontSize: 15, fontWeight: 500, width: 'fit-content' }}>Ver projetos</a>
        </div>
      </div>
    </header>
  );
}
