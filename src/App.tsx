import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LanguageProvider } from './contexts/LanguageContext';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SobreSection from './components/SobreSection';
import Projects from './components/Projects';
import Services from './components/Services';
import Process from './components/Process';
import Experience from './components/Experience';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <Preloader />
      <Nav />
      <Hero />
      <SobreSection />
      <Projects />
      <Services />
      <Process />
      <Experience />
      <FaqSection />
      <Footer />
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  );
}
