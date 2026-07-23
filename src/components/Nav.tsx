export default function Nav() {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 48px', position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}>
      <a href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 500 }}>Felippe Ximenes</a>
      <div style={{ display: 'flex', gap: 34, fontSize: 14, fontWeight: 500, letterSpacing: '0.02em', color: 'var(--muted)', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <a href="#trabalhos">Trabalhos</a>
        <a href="#servicos">Serviços</a>
        <a href="#processo">Processo</a>
        <a href="#faq">FAQ</a>
      </div>
      <a href="#contato" style={{ background: 'var(--fg)', color: '#fff', padding: '11px 22px', borderRadius: 999, fontSize: 14, fontWeight: 500 }}>Fale comigo</a>
    </nav>
  );
}
