import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useScrollProgress } from './hooks/hooks';
import { LanguageProvider } from './contexts/LanguageContext';
import Nav from './components/Nav';
import Hero from './components/Hero';

import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import Process from './components/Process';
import FaqSection from './components/FaqSection';
import LogoTicker from './components/LogoTicker';
import Footer from './components/Footer';

export default function App() {
  const progress = useScrollProgress();
  return (
    <LanguageProvider>
      <div style={{ position: 'fixed', top: 0, left: 0, height: 2, width: `${progress * 100}%`, background: 'var(--accent)', zIndex: 9998, transition: 'width 0.1s linear' }} />
      <Nav />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Process />
      <FaqSection />
      <LogoTicker />
      <Footer />
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  );
}
