export default function Nav() {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 48px', position: 'sticky', top: 0, zIndex: 20, background: 'rgba(250,249,247,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #eae6de' }}>
      <a href="#" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 23 }}>Felippe Ximenes</a>
      <div style={{ display: 'flex', gap: 34, fontSize: 14, fontWeight: 500, letterSpacing: '0.02em', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <a href="#trabalhos">Trabalhos</a>
        <a href="#servicos">Serviços</a>
        <a href="#processo">Processo</a>
        <a href="#faq">FAQ</a>
      </div>
      <a href="#contato" style={{ background: '#141414', color: '#faf9f7', padding: '11px 22px', borderRadius: 999, fontSize: 14, fontWeight: 500 }}>Fale comigo</a>
    </nav>
  );
}
