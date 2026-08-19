import { useLang } from './contexts/LanguageContext';

const T = {
  nav: {
    items: {
      pt: ['Trabalhos', 'Serviços', 'Processo', 'FAQ'],
      en: ['Work', 'Services', 'Process', 'FAQ'],
    },
    cta: { pt: 'Fale comigo', en: 'Contact me' },
  },
  hero: {
    badge:     { pt: 'Disponível para projetos', en: 'Available for projects' },
    headline1: { pt: 'Sistemas que', en: 'Systems that' },
    headline2: { pt: 'se resolvem', en: 'run themselves' },
    heading:   {
      pt: 'Produto completo, do backend ao pixel. Com IA que funciona em produção.',
      en: 'Full product, from backend to pixel. With AI that works in production.',
    },
    sub: {
      pt: 'Desenvolvimento full-stack e engenharia de IA: de APIs na AWS a pipelines RAG rodando em produção real.',
      en: 'Full-stack development and AI engineering: from AWS APIs to RAG pipelines running in real production.',
    },
    cta:    { pt: 'Ver projetos', en: 'See projects' },
    resume: { pt: 'Baixar currículo', en: 'Download resume' },
  },
  sobre: {
    bio: {
      pt: 'Desenvolvedor full-stack com foco em engenharia de IA: de APIs serverless na AWS a pipelines RAG rodando em produção real. Atuo com TypeScript, Python, React e infraestrutura AWS, entregando produtos completos do back-end ao pixel.',
      en: 'Full-stack developer focused on AI engineering: from serverless APIs on AWS to RAG pipelines running in real production. I work with TypeScript, Python, React and AWS infrastructure, delivering complete products from the back-end to the pixel.',
    },
    availability: { pt: 'Desde 2022', en: 'Since 2022' },
    downloadCV:   { pt: 'Baixar currículo ↗', en: 'Download resume ↗' },
    city:         { pt: 'Rio de Janeiro, Brasil', en: 'Rio de Janeiro, Brazil' },
  },
  projects: {
    label:         { pt: 'O que já construí',      en: "What I've built" },
    heading:       { pt: 'Projetos em destaque',   en: 'Featured projects' },
    viewCase:      { pt: 'Ver case ↗',             en: 'View case ↗' },
    viewProject:   { pt: 'Ver projeto ↗',          en: 'View project ↗' },
    viewAll:       { pt: 'Todos os projetos ↗',    en: 'All projects ↗' },
    viewAllMobile: { pt: 'Ver todos ↗',            en: 'See all ↗' },
  },
  services: {
    label:          { pt: 'O que faço',     en: 'What I do' },
    headingNormal:  { pt: 'Construo o produto inteiro. Do back-end ao pixel, com IA generativa onde ela faz diferença de verdade.', en: 'I build the whole product. From back-end to pixel, with generative AI where it truly makes a difference.' },
    headingEm:      { pt: 'IA generativa',  en: 'generative AI' },
    headingEnd:     { pt: 'onde ela faz diferença de verdade.', en: 'where it truly makes a difference.' },
    available:      { pt: 'Disponível para projetos', en: 'Available for projects' },
    viewAiProjects: { pt: 'Ver projetos com IA ↗', en: 'See AI projects ↗' },
    featureLabel:   { pt: 'Em destaque',    en: 'Featured' },
  },
  process: {
    label:        { pt: 'Como trabalho',                              en: 'How I work' },
    headingStart: { pt: 'Como eu trabalho,',                          en: 'How I work,' },
    headingEnd:   { pt: 'da primeira conversa ao produto no ar.',     en: 'from the first conversation to the live product.' },
    heading:      { pt: 'Como eu trabalho, da primeira conversa ao produto no ar.', en: 'How I work, from the first conversation to the live product.' },
  },
  faq: {
    label:     { pt: 'FAQ',                              en: 'FAQ' },
    heading:   { pt: 'Respostas para as dúvidas mais comuns antes de começar.', en: 'Answers to the most common questions before we start.' },
    headingEm: { pt: 'mais comuns antes de começar.',    en: 'questions before we start.' },
    cta:       { pt: 'Me manda um email',                en: 'Send me an email' },
    badge:     { pt: 'Estou aqui para ajudar',           en: "I'm here to help" },
  },
  experience: {
    label:       { pt: 'Experiência',  en: 'Experience' },
    heading:     { pt: 'Onde apliquei o que sei, do atendimento multilíngue a pipelines de IA em produção.', en: 'Where I put my skills, from multilingual service to AI pipelines in production.' },
    headingBold: { pt: 'Onde apliquei', en: 'Where I put' },
    headingMid:  { pt: 'o que sei,',   en: 'my skills,' },
    headingPre:  { pt: 'do atendimento multilíngue a', en: 'from multilingual service to' },
    headingEm:   { pt: 'pipelines de IA', en: 'AI pipelines' },
    headingEnd:  { pt: 'em produção.', en: 'in production.' },
    current:     { pt: 'atual',        en: 'current' },
  },
  footer: {
    label:      { pt: 'Tem um projeto em movimento?', en: 'Got a project in motion?' },
    headingEm:  { pt: 'Vamos conversar,',             en: "Let's talk," },
    headingEnd: { pt: 'e eu cuido do resto.',         en: "I'll handle the rest." },
    cta:        { pt: 'Vamos conversar, e eu cuido do resto.', en: "Let's talk, I'll handle the rest." },
    navLabel:   { pt: 'Navegação',                    en: 'Navigation' },
    navItems: {
      pt: ['Trabalhos', 'Serviços', 'Processo', 'FAQ'],
      en: ['Work', 'Services', 'Process', 'FAQ'],
    },
    connect:    { pt: 'Conecte-se',                   en: 'Connect' },
    back:       { pt: 'Voltar',                       en: 'Back' },
    backToTop:  { pt: '↑ Topo da página',             en: '↑ Back to top' },
    copyright:  { pt: 'Rio de Janeiro, Brasil',       en: 'Rio de Janeiro, Brazil' },
    madeWith:   { pt: 'Feito com React & TypeScript', en: 'Made with React & TypeScript' },
  },
};

export function useT() {
  const { lang } = useLang();
  const p = <V,>(o: { pt: V; en: V }): V => o[lang];
  return {
    nav:        { items: T.nav.items[lang], cta: p(T.nav.cta) },
    hero:       { badge: p(T.hero.badge), headline1: p(T.hero.headline1), headline2: p(T.hero.headline2), heading: p(T.hero.heading), sub: p(T.hero.sub), cta: p(T.hero.cta), resume: p(T.hero.resume) },
    sobre:      { bio: p(T.sobre.bio), availability: p(T.sobre.availability), downloadCV: p(T.sobre.downloadCV), city: p(T.sobre.city) },
    projects:   { label: p(T.projects.label), heading: p(T.projects.heading), viewCase: p(T.projects.viewCase), viewProject: p(T.projects.viewProject), viewAll: p(T.projects.viewAll), viewAllMobile: p(T.projects.viewAllMobile) },
    services:   { label: p(T.services.label), headingNormal: p(T.services.headingNormal), headingEm: p(T.services.headingEm), headingEnd: p(T.services.headingEnd), available: p(T.services.available), viewAiProjects: p(T.services.viewAiProjects), featureLabel: p(T.services.featureLabel) },
    process:    { label: p(T.process.label), headingStart: p(T.process.headingStart), headingEnd: p(T.process.headingEnd), heading: p(T.process.heading) },
    faq:        { label: p(T.faq.label), heading: p(T.faq.heading), headingEm: p(T.faq.headingEm), cta: p(T.faq.cta), badge: p(T.faq.badge) },
    experience: { label: p(T.experience.label), heading: p(T.experience.heading), headingBold: p(T.experience.headingBold), headingMid: p(T.experience.headingMid), headingPre: p(T.experience.headingPre), headingEm: p(T.experience.headingEm), headingEnd: p(T.experience.headingEnd), current: p(T.experience.current) },
    footer:     { label: p(T.footer.label), cta: p(T.footer.cta), headingEm: p(T.footer.headingEm), headingEnd: p(T.footer.headingEnd), navLabel: p(T.footer.navLabel), navItems: T.footer.navItems[lang], connect: p(T.footer.connect), back: p(T.footer.back), backToTop: p(T.footer.backToTop), copyright: p(T.footer.copyright), madeWith: p(T.footer.madeWith) },
  };
}
