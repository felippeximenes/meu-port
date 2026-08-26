import { useT } from '../i18n';
import { EMAIL, LINKEDIN, GITHUB, INSTAGRAM } from '../data';
import { useReveal } from '../hooks/useReveal';

const SECTION_HREFS = ['#trabalho', '#servicos', '#processo', '#faq'];

export default function Footer() {
  const t = useT();
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <footer id="contato" style={{ background: '#f8f8f8', padding: '110px 24px 30px' }}>
      <div ref={revealRef} style={{ maxWidth: 1200, margin: '0 auto', borderTop: '1px solid #c9c7cc', paddingTop: 32 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#a2a2a2' }}>
          {t.footer.label}
        </span>
        <a
          href={`mailto:${EMAIL}`}
          data-cta=""
          data-reveal=""
          style={{
            display: 'inline-block', marginTop: 24, maxWidth: 1000,
            fontSize: 'clamp(36px,6vw,82px)', lineHeight: 0.9, letterSpacing: '-0.06em',
            color: '#3c3a3e',
            transition: 'color 200ms ease, transform 160ms var(--ease-out), opacity 620ms var(--ease-out)',
          }}
        >
          {t.footer.cta}
        </a>
      </div>

      {/* Bottom columns */}
      <div className="footer-bottom" style={{
        maxWidth: 1200, margin: '96px auto 0',
        display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: 32,
        borderTop: '1px solid #c9c7cc', paddingTop: 28,
        fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
        textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#a2a2a2',
      }}>
        {/* Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ color: '#3c3a3e' }}>Felippe Ximenes</span>
          <a href={`mailto:${EMAIL}`} style={{ color: '#3c3a3e' }}>{EMAIL}</a>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {t.footer.navItems.map((item, i) => (
            <a key={item} href={SECTION_HREFS[i]}>{item}</a>
          ))}
        </div>

        {/* Social */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
          <a href={GITHUB}   target="_blank" rel="noopener">GitHub</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener">Instagram</a>
        </div>

        {/* Location + availability */}
        <div className="footer-last-col" style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          <span>{t.footer.copyright}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#3c3a3e' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember)' }} />
            {t.services.available}
          </span>
        </div>
      </div>
    </footer>
  );
}
