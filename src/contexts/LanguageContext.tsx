import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'pt' | 'en';

interface LangCtx { lang: Lang; toggle: () => void; setLang: (l: Lang) => void; }

const Ctx = createContext<LangCtx>({ lang: 'pt', toggle: () => {}, setLang: () => {} });
const HTML_LANG: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };

const getInitialLang = (): Lang => {
  try {
    const stored = localStorage.getItem('fx-portfolio-lang');
    if (stored === 'pt' || stored === 'en') return stored;
  } catch {}
  return 'pt';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('fx-portfolio-lang', l); } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);

  return (
    <Ctx.Provider value={{ lang, toggle: () => setLang(lang === 'pt' ? 'en' : 'pt'), setLang }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
