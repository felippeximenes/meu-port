import SpecularButton from './SpecularButton';
import GooeyNav from './GooeyNav';
import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';
import './LangToggle.css';

const HREFS = ['#trabalhos', '#servicos', '#processo', '#faq'];

function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <div className="lang-toggle-wrap" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
      <img className="lang-flag" src="/flag-br.png" alt="PT" style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }} />
      <input
        id="lang-toggle"
        type="checkbox"
        className="lang-toggle-check"
        checked={lang === 'en'}
        onChange={toggle}
      />
      <label className="lang-switch" htmlFor="lang-toggle">
        <svg viewBox="0 0 212.4992 84.4688" overflow="visible">
          <path
            pathLength="360"
            fill="none"
            stroke="currentColor"
            d="M 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 A 42.24 42.24 90 0 0 84.4992 42.2496 A 42.24 42.24 90 0 0 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 L 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 A 42.24 42.24 90 0 0 128 42.2496 A 42.24 42.24 90 0 0 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 L 42.2496 0"
          />
        </svg>
      </label>
      <img className="lang-flag" src="/flag-us.png" alt="EN" style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }} />
    </div>
  );
}

export default function Nav() {
  const t = useT();
  const navItems = t.nav.items.map((label, i) => ({ label, href: HREFS[i] }));

  return (
    <nav className="nav-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 48px', position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}>
      <a href="#" className="nav-logo" style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 500, whiteSpace: 'nowrap' }}>Felippe Ximenes</a>
      <div className="nav-center" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ background: '#0E0D0C', borderRadius: 100, padding: '2px 6px', pointerEvents: 'auto', clipPath: 'inset(0 round 100px)' }}>
          <GooeyNav
            items={navItems}
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
      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <LangToggle />
        <SpecularButton href="#contato" size="sm">{t.nav.cta}</SpecularButton>
      </div>
    </nav>
  );
}
