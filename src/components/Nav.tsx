import SpecularButton from './SpecularButton';
import GooeyNav from './GooeyNav';

const NAV_ITEMS = [
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'FAQ', href: '#faq' },
];

export default function Nav() {
  return (
    <nav className="nav-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 48px', position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}>
      <a href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 500 }}>Felippe Ximenes</a>
      <div className="nav-center" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ background: '#0E0D0C', borderRadius: 100, padding: '2px 6px', pointerEvents: 'auto', clipPath: 'inset(0 round 100px)' }}>
          <GooeyNav
            items={NAV_ITEMS}
            particleCount={15}
            particleDistances={[30, 8]}
            particleR={60}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
      </div>
      <SpecularButton href="#contato" size="sm">Fale comigo</SpecularButton>
    </nav>
  );
}
