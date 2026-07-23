import { EMAIL, LINKEDIN, GITHUB } from '../data';
import { useReveal } from '../hooks/hooks';

export default function Footer() {
  const { ref, style } = useReveal<HTMLHeadingElement>();
  return (
    <footer id="contato" className="noise-bg" style={{ color: '#fff', borderRadius: '32px 32px 0 0', padding: '110px 48px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <span style={{
          width: 64, height: 64, borderRadius: '50%', marginBottom: 28,
          background: 'radial-gradient(circle at 32% 32%, #b794f6, var(--purple) 60%, #4c1d95 100%)',
          boxShadow: '0 0 40px rgba(124,58,237,0.45)'
        }} />
        <h2 ref={ref} style={{ ...style, margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: 'clamp(34px, 4.5vw, 60px)', lineHeight: 1.1, maxWidth: 760 }}>
          <em style={{ color: '#8b8890', fontStyle: 'normal' }}>Vamos conversar,</em> e eu cuido do resto.
        </h2>
        <a href={`mailto:${EMAIL}`} style={{ marginTop: 32, display: 'inline-block', background: '#fff', color: 'var(--fg)', padding: '16px 32px', borderRadius: 999, fontSize: 15, fontWeight: 600 }}>{EMAIL}</a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 64, justifyContent: 'center', marginTop: 96, paddingBottom: 56 }}>
        <div>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a7780', marginBottom: 14 }}>Navegação</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <a href="#trabalhos">Trabalhos</a>
            <a href="#servicos">Serviços</a>
            <a href="#processo">Processo</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a7780', marginBottom: 14 }}>Conecte-se</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
            <a href={`mailto:${EMAIL}`}>Email</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a7780', marginBottom: 14 }}>Voltar</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <a href="#">↑ Topo da página</a>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0', borderTop: '1px solid var(--dark-line)', fontSize: 13, color: '#7a7780' }}>
        <span>Felippe Ximenes © 2026 — Rio de Janeiro, Brasil</span>
        <span>Feito com React &amp; TypeScript</span>
      </div>
    </footer>
  );
}
