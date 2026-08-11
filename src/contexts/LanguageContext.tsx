import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'pt' | 'en';

interface LangCtx { lang: Lang; toggle: () => void; }

const Ctx = createContext<LangCtx>({ lang: 'pt', toggle: () => {} });
const HTML_LANG: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };

const detectLang = (): Lang => navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang);
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);
  return (
    <Ctx.Provider value={{ lang, toggle: () => setLang(l => l === 'pt' ? 'en' : 'pt') }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
