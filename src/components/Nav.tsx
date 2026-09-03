import { useLang } from '../contexts/LanguageContext';
import { useT } from '../i18n';
import { EMAIL } from '../data';
import { useRef } from 'react';

const HREFS = ['#trabalho', '#servicos', '#processo', '#faq'];

const pillStyle: React.CSSProperties = {
  position: 'relative', zIndex: 1,
  display: 'inline-flex', alignItems: 'center', gap: 6,
  border: '1px solid rgba(255,255,255,0.18)', borderRadius: 9999,
  padding: '7px 13px', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
  textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.78)',
  transition: 'color 200ms ease, border-color 200ms ease',
};

const langBtnStyle: React.CSSProperties = {
  position: 'relative', zIndex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
  padding: '7px 12px', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit',
  textTransform: 'inherit', letterSpacing: 'inherit', transition: 'color 200ms ease',
};

export default function Nav() {
  const { lang, setLang } = useLang();
  const t = useT();
  const pillsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  /* Sliding pill: tracks whichever nav item is hovered, morphing between them */
  const moveIndicator = (el: HTMLElement) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const group = pillsRef.current;
    const indicator = indicatorRef.current;
    if (!group || !indicator) return;
    const gRect = group.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    indicator.style.opacity = '1';
    indicator.style.width = eRect.width + 'px';
    indicator.style.transform = `translateX(${(eRect.left - gRect.left).toFixed(1)}px)`;
  };
  const hideIndicator = () => {
    if (indicatorRef.current) indicatorRef.current.style.opacity = '0';
  };

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

      <div
        ref={pillsRef}
        className="nav-pills"
        onMouseLeave={hideIndicator}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6 }}
      >
        <div
          ref={indicatorRef}
          className="nav-indicator"
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, height: '100%', width: 0,
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: 9999, opacity: 0, pointerEvents: 'none',
            transition: 'transform 420ms var(--ease-drawer), width 420ms var(--ease-drawer), opacity 200ms ease',
            willChange: 'transform, width',
          }}
        />
        {t.nav.items.map((label, i) => (
          <a
            key={label}
            href={HREFS[i]}
            data-pill=""
            onMouseEnter={e => moveIndicator(e.currentTarget)}
            style={pillStyle}
          >{label}</a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div
          role="group"
          aria-label="Idioma"
          style={{
            position: 'relative', display: 'inline-flex', alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.18)', borderRadius: 9999, padding: 2,
            fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '-0.01em',
          }}
        >
          <div className="lang-thumb" aria-hidden="true" style={{
            position: 'absolute', top: 2, bottom: 2, left: 2,
            width: 'calc(50% - 2px)', borderRadius: 9999,
            background: 'rgba(255,255,255,0.16)',
            transform: lang === 'en' ? 'translateX(100%)' : 'translateX(0)',
            transition: 'transform 380ms var(--ease-drawer)',
          }} />
          <button
            type="button"
            onClick={() => setLang('pt')}
            aria-pressed={lang === 'pt'}
            style={{ ...langBtnStyle, color: lang === 'pt' ? '#fff' : 'rgba(255,255,255,0.5)' }}
          >PT</button>
          <button
            type="button"
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
            style={{ ...langBtnStyle, color: lang === 'en' ? '#fff' : 'rgba(255,255,255,0.5)' }}
          >EN</button>
        </div>
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
