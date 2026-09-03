import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useT } from '../i18n';
import { EMAIL, LINKEDIN, GITHUB, INSTAGRAM } from '../data';
import { useReveal } from '../hooks/useReveal';
import TextType from './TextType';

const SECTION_HREFS = ['#trabalho', '#servicos', '#processo', '#faq'];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M7.5 10v6.2M7.5 7.3v.01" strokeLinecap="round" />
      <path d="M11.2 16.2V10M11.2 12.6c0-1.4 1-2.6 2.4-2.6s2.4.9 2.4 2.4v3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.3 5.5-5.9a4.5 4.5 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.9 5.4 3.2 5.4 3.2a4.2 4.2 0 0 0-.1 3.2A4.5 4.5 0 0 0 4 9.6c0 4.6 2.7 5.6 5.5 5.9-.6.6-.6 1.2-.5 2V21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ flexShrink: 0 }}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const fieldLabelStyle: React.CSSProperties = {
  display: 'block', marginBottom: 8,
  fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600,
  textTransform: 'uppercase', letterSpacing: '0.02em', color: '#a2a2a2',
};

const fieldStyle: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box', background: '#f8f8f8',
  border: '1px solid #dedce1', borderRadius: 10, padding: '11px 13px',
  fontFamily: 'var(--grot)', fontSize: 15, color: '#3c3a3e',
  outline: 'none', transition: 'border-color 160ms ease, background 160ms ease',
};

type Status = 'idle' | 'sending' | 'success' | 'error';

function SuccessPanel({ onReset }: { onReset: () => void }) {
  const t = useT();
  const panelRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (panelRef.current) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: reduced ? 0 : 0.45, ease: 'power2.out' });
    }
    if (checkRef.current && !reduced) {
      const len = checkRef.current.getTotalLength();
      gsap.set(checkRef.current, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(checkRef.current, { strokeDashoffset: 0, duration: 0.5, delay: 0.15, ease: 'power2.out' });
    }
  }, []);

  return (
    <div ref={panelRef} style={{
      background: '#fff', border: '1px solid #e4e2e6', borderRadius: 20, padding: '48px 28px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12,
    }}>
      <span style={{
        width: 56, height: 56, borderRadius: '50%', background: '#f1f1f1',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
          <path ref={checkRef} d="M5 12.5l4.5 4.5L19 7" stroke="var(--ember)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h3 style={{ margin: 0, fontFamily: 'var(--grot)', fontWeight: 600, fontSize: 22, color: '#161616' }}>{t.footer.formThanks}</h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: '#7b7a7c', maxWidth: 280 }}>{t.footer.formSuccess}</p>
      <button
        type="button"
        onClick={onReset}
        style={{
          marginTop: 10, background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: '0.02em', color: '#161616', borderBottom: '1px solid #c9c7cc',
        }}
      >
        {t.footer.formSendAnother}
      </button>
    </div>
  );
}

function ContactForm() {
  const t = useT();
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const btnRef = useRef<HTMLButtonElement>(null);
  const magneticEnabled = useRef(false);

  useEffect(() => {
    magneticEnabled.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handleBtnMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magneticEnabled.current || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.22;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.4;
    btnRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const handleBtnLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = '';
  };

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues(v => ({ ...v, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `Novo contato pelo portfólio — ${values.name}`,
          from_name: 'Portfólio — Felippe Ximenes',
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setValues({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <SuccessPanel onReset={() => setStatus('idle')} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-reveal=""
      className="contact-form"
      style={{
        background: '#fff', border: '1px solid #e4e2e6', borderRadius: 20,
        padding: 28, display: 'flex', flexDirection: 'column', gap: 18,
      }}
    >
      {/* Honeypot: hidden from real visitors, bots tend to fill every field */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

      <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={fieldLabelStyle} htmlFor="cf-name">{t.footer.formName}</label>
          <input
            id="cf-name" name="name" type="text" required
            placeholder={t.footer.formNamePh}
            value={values.name} onChange={set('name')}
            className="contact-input" style={fieldStyle}
          />
        </div>
        <div>
          <label style={fieldLabelStyle} htmlFor="cf-email">{t.footer.formEmail}</label>
          <input
            id="cf-email" name="email" type="email" required
            placeholder={t.footer.formEmailPh}
            value={values.email} onChange={set('email')}
            className="contact-input" style={fieldStyle}
          />
        </div>
      </div>

      <div>
        <label style={fieldLabelStyle} htmlFor="cf-message">{t.footer.formMessage}</label>
        <textarea
          id="cf-message" name="message" required rows={4}
          placeholder={t.footer.formMessagePh}
          value={values.message} onChange={set('message')}
          className="contact-input" style={{ ...fieldStyle, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.45 }}
        />
      </div>

      <button
        ref={btnRef}
        type="submit"
        data-cta=""
        className="contact-submit-btn"
        disabled={status === 'sending'}
        onMouseMove={handleBtnMove}
        onMouseLeave={handleBtnLeave}
        style={{
          background: '#161616', color: '#fff', border: 'none', borderRadius: 10,
          padding: '13px 20px', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '-0.01em', cursor: status === 'sending' ? 'default' : 'pointer',
          opacity: status === 'sending' ? 0.6 : 1,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        {status === 'sending' ? t.footer.formSending : t.footer.formSubmit}
        {status !== 'sending' && <ArrowIcon />}
      </button>

      {status === 'error' && (
        <p role="alert" style={{ margin: 0, fontSize: 13, color: 'var(--ember)' }}>{t.footer.formError}</p>
      )}
    </form>
  );
}

export default function Footer() {
  const t = useT();
  const revealRef = useReveal<HTMLDivElement>();
  const [line1Done, setLine1Done] = useState(false);

  return (
    <footer id="contato" style={{ background: '#f8f8f8', padding: '110px 24px 30px' }}>
      <div ref={revealRef} style={{ maxWidth: 1200, margin: '0 auto', borderTop: '1px solid #c9c7cc', paddingTop: 32 }}>
        <div className="contact-columns" style={{
          display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 48,
          alignItems: 'start',
        }}>
          {/* Left: badge, two-tone headline, contact rows, availability */}
          <div data-reveal="" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <span style={{
              display: 'inline-flex', width: 'fit-content', background: '#f1f1f1', borderRadius: 9999,
              padding: '6px 12px', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.02em', color: '#7b7a7c',
            }}>
              {t.footer.label}
            </span>

            <h2 style={{
              margin: 0, fontFamily: 'var(--grot)', fontWeight: 600,
              fontSize: 'clamp(30px,3.6vw,50px)', lineHeight: 1.04, letterSpacing: '-0.03em',
            }}>
              <TextType
                text={t.footer.ctaLine1}
                startOnVisible
                showCursor={!line1Done}
                cursorCharacter="_"
                typingSpeed={45}
                color="#161616"
                onSentenceComplete={() => setLine1Done(true)}
              />
              {line1Done && (
                <TextType text={` ${t.footer.ctaLine2}`} typingSpeed={45} color="#c9c7cc" cursorCharacter="_" />
              )}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <span style={fieldLabelStyle}>{t.footer.contactStart}</span>
                <a href={`mailto:${EMAIL}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 6,
                  fontFamily: 'var(--grot)', fontWeight: 600, fontSize: 18, color: '#161616',
                  paddingBottom: 3, borderBottom: '1px solid #c9c7cc', transition: 'border-color 200ms ease',
                }}>
                  <MailIcon />{EMAIL}
                </a>
              </div>
              <div>
                <span style={fieldLabelStyle}>{t.footer.contactBased}</span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 6,
                  fontFamily: 'var(--grot)', fontWeight: 600, fontSize: 18, color: '#161616',
                  paddingBottom: 3, borderBottom: '1px solid #c9c7cc',
                }}>
                  <PinIcon />{t.sobre.city}
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #dedce1', paddingTop: 20 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#3c3a3e' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember)', flexShrink: 0 }} />
                {t.services.available}
              </span>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>

      {/* Dark closing band: identity mark, nav, social, status — bleeds full width */}
      <div className="footer-dark-band" style={{ background: '#161616', padding: '64px 24px 30px' }}>
        <div style={{ maxWidth: 620, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
          <img src="/brand/fx-mono-ember.png" alt="FX" width={40} height={40} style={{ display: 'block' }} />
          <span style={{
            fontFamily: 'var(--hero-font)', fontWeight: 400, textTransform: 'uppercase',
            fontSize: 22, letterSpacing: '0.01em', color: '#fff',
          }}>Felippe Ximenes</span>
          <p style={{ margin: 0, maxWidth: 460, fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,0.42)' }}>
            {t.hero.sub}
          </p>
        </div>

        <nav style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px 40px', marginTop: 48,
          fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.02em', color: 'rgba(255,255,255,0.5)',
        }}>
          {t.footer.navItems.map((item, i) => (
            <a key={item} href={SECTION_HREFS[i]} style={{ color: 'inherit', transition: 'color 200ms ease' }}>{item}</a>
          ))}
        </nav>

        <div style={{ maxWidth: 1200, margin: '32px auto 0', borderTop: '1px solid rgba(255,255,255,0.1)' }} />

        <div style={{ display: 'flex', justifyContent: 'center', gap: 26, marginTop: 32, color: 'rgba(255,255,255,0.55)' }}>
          <a href={LINKEDIN}  target="_blank" rel="noopener" aria-label="LinkedIn"  style={{ color: 'inherit', transition: 'color 200ms ease' }}><LinkedInIcon /></a>
          <a href={GITHUB}    target="_blank" rel="noopener" aria-label="GitHub"    style={{ color: 'inherit', transition: 'color 200ms ease' }}><GithubIcon /></a>
          <a href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram" style={{ color: 'inherit', transition: 'color 200ms ease' }}><InstagramIcon /></a>
        </div>

        <div style={{ maxWidth: 1200, margin: '32px auto 0', borderTop: '1px solid rgba(255,255,255,0.1)' }} />

        <div style={{
          maxWidth: 1200, margin: '24px auto 0', display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 12,
          fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.01em', color: 'rgba(255,255,255,0.35)',
        }}>
          <span>© {new Date().getFullYear()} · {t.footer.copyright}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember)', flexShrink: 0 }} />
            {t.services.available}
          </span>
        </div>
      </div>
    </footer>
  );
}
