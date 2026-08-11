import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'pt' | 'en';

interface LangCtx { lang: Lang; toggle: () => void; }

const Ctx = createContext<LangCtx>({ lang: 'pt', toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt');
  return (
    <Ctx.Provider value={{ lang, toggle: () => setLang(l => l === 'pt' ? 'en' : 'pt') }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
