import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';
import { EMAIL } from '../data';

const HREFS = ['#trabalho', '#servicos', '#processo', '#faq'];

const pillStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  border: '1px solid rgba(255,255,255,0.18)', borderRadius: 9999,
  padding: '7px 13px', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
  textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.78)',
  transition: 'color 200ms ease, border-color 200ms ease',
};

export default function Nav() {
  const { lang, toggle } = useLang();
  const t = useT();

  return (
    <nav style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 18, padding: '22px 24px',
    }}>
      <a href="#topo" style={{
        fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500,
        textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff',
      }}>Felippe Ximenes</a>

      <div className="nav-pills" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {t.nav.items.map((label, i) => (
          <a key={label} href={HREFS[i]} data-pill="" style={pillStyle}>{label}</a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          type="button"
          onClick={toggle}
          aria-label="Idioma"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'transparent', border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 9999, padding: '7px 12px', cursor: 'pointer',
            fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.5)',
          }}
        >
          <span style={{ color: lang === 'pt' ? '#fff' : 'rgba(255,255,255,0.5)', transition: 'color 180ms ease' }}>PT</span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
          <span style={{ color: lang === 'en' ? '#fff' : 'rgba(255,255,255,0.5)', transition: 'color 180ms ease' }}>EN</span>
        </button>
        <a
          href={`mailto:${EMAIL}`}
          data-cta=""
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(22,22,22,0.72)', border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 9999, padding: '8px 15px',
            fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#fff',
            backdropFilter: 'blur(5px)',
          }}
        >{t.nav.cta}</a>
      </div>
    </nav>
  );
}
