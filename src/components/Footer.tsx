import { EMAIL, LINKEDIN, GITHUB } from '../data';
import { useReveal } from '../hooks/hooks';

export default function Footer() {
  const { ref, style } = useReveal<HTMLHeadingElement>();
  return (
    <footer id="contato" style={{ background: '#121110', color: '#faf9f7', borderRadius: '32px 32px 0 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '110px 48px 40px', textAlign: 'center' }}>
      <h2 ref={ref} style={{ ...style, margin: '0 auto', fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(44px, 6.5vw, 110px)', lineHeight: 1.05, maxWidth: 1000 }}>
        <em style={{ color: '#7a756c' }}>Vamos conversar?</em><br />Eu cuido do resto.
      </h2>
      <div style={{ marginTop: 40 }}>
        <a href={`mailto:${EMAIL}`} style={{ display: 'inline-block', background: '#faf9f7', color: '#141414', padding: '16px 32px', borderRadius: 999, fontSize: 15, fontWeight: 600 }}>{EMAIL}</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 28, borderTop: '1px solid #2a2825', fontSize: 13, color: '#7a756c' }}>
        <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 15 }}>Felippe Ximenes © 2026 — Rio de Janeiro, Brasil</span>
        <div style={{ display: 'flex', gap: 28 }}>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          <a href="#">↑ Voltar ao topo</a>
        </div>
      </div>
    </footer>
  );
}
