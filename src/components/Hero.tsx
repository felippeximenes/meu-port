import { useTilt } from '../hooks/hooks';

export default function Hero() {
  const tiltRef = useTilt<HTMLImageElement>(4);
  return (
    <header style={{ position: 'relative', minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingTop: 40 }}>
      {/* felippe3.png tem ~34% de espaço vazio acima da cabeça — recorta esse topo e ancora a foto no alto, como no site de referência */}
      <div style={{ position: 'absolute', zIndex: 1, left: '50%', top: '9vh', transform: 'translateX(-50%)', width: 'calc(84vh * 0.5625)', maxWidth: 472.5, height: '84vh', maxHeight: 840, overflow: 'hidden' }}>
        <img
          ref={tiltRef}
          src="/assets/felippe3.png"
          alt="Felippe Ximenes"
          style={{
            position: 'absolute', top: '-51.5%', left: 0, height: '151.5%', width: '100%', display: 'block',
            maskImage: 'linear-gradient(to bottom, black 88%, transparent 99%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 99%)',
            animation: 'fadeUp 1.1s ease both',
            transition: 'transform 0.25s ease',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', alignItems: 'end', gap: 48, padding: '0 48px 46px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeUp 0.9s ease both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid var(--line)', borderRadius: 999, padding: '8px 16px', fontSize: 14, color: 'var(--muted)', width: 'fit-content' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1fae5e', boxShadow: '0 0 0 4px rgba(31,174,94,0.15)' }} />
            Disponível para projetos
          </div>
          <h1 style={{ margin: 0, maxWidth: 360, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 'clamp(34px, 3.6vw, 54px)', lineHeight: 1.1, letterSpacing: '-0.01em', textWrap: 'balance', color: 'var(--fg)' }}>
            Felippe constrói produtos com IA de ponta a ponta — <em style={{ color: 'var(--purple)', fontStyle: 'normal' }}>do pipeline RAG à interface</em>
          </h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 300, justifySelf: 'end', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', borderRadius: 16, padding: '18px 20px', margin: '-18px -20px', animation: 'fadeUp 0.9s ease 0.15s both' }}>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--muted)', textWrap: 'pretty' }}>
            Desenvolvedor Full-Stack com LLMs em produção: RAG, automações e aplicações web escaláveis — da arquitetura ao deploy.
          </p>
          <a href="#trabalhos" style={{ background: 'var(--fg)', color: '#fff', padding: '15px 28px', borderRadius: 999, fontSize: 15, fontWeight: 500, width: 'fit-content' }}>Ver projetos</a>
        </div>
      </div>
    </header>
  );
}
