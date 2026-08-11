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
    badge:   { pt: 'Disponível para projetos', en: 'Available for projects' },
    heading: {
      pt: 'Produto completo, do backend ao pixel. Com IA que funciona em produção.',
      en: 'Full product, from backend to pixel. With AI that works in production.',
    },
    sub: {
      pt: 'Full-Stack Developer com LLMs em produção. RAG, automações e aplicações web escaláveis, da arquitetura ao deploy.',
      en: 'Full-Stack Developer with LLMs in production. RAG, automations, and scalable web apps — from architecture to deploy.',
    },
    cta: { pt: 'Ver projetos', en: 'See projects' },
  },
  projects: {
    label:         { pt: 'O que já construí',      en: "What I've built" },
    heading:       { pt: 'Projetos em destaque',   en: 'Featured projects' },
    viewProject:   { pt: 'Ver projeto ↗',          en: 'View project ↗' },
    viewAll:       { pt: 'Todos os projetos ↗',    en: 'All projects ↗' },
    viewAllMobile: { pt: 'Ver todos ↗',            en: 'See all ↗' },
  },
  services: {
    label:          { pt: 'O que faço',     en: 'What I do' },
    headingNormal:  { pt: 'Construo o produto inteiro. Do back-end ao pixel, com', en: 'I build the whole product. From back-end to pixel, with' },
    headingEm:      { pt: 'IA generativa',  en: 'generative AI' },
    headingEnd:     { pt: 'onde ela faz diferença de verdade.', en: 'where it truly makes a difference.' },
    viewAiProjects: { pt: 'Ver projetos com IA ↗', en: 'See AI projects ↗' },
    featureLabel:   { pt: 'Em destaque',    en: 'Featured' },
  },
  process: {
    label:       { pt: 'Como trabalho',               en: 'How I work' },
    headingStart:{ pt: 'Um processo simples e claro,', en: 'A simple, clear process,' },
    headingEnd:  { pt: 'da primeira conversa à entrega final.', en: 'from the first conversation to the final delivery.' },
  },
  faq: {
    label:     { pt: 'FAQ',                            en: 'FAQ' },
    heading:   { pt: 'Respostas para as dúvidas',      en: 'Answers to the most common' },
    headingEm: { pt: 'mais comuns antes de começar.',  en: 'questions before we start.' },
    cta:       { pt: 'Me mande um email',              en: 'Send me an email' },
    badge:     { pt: 'Estou aqui para ajudar',         en: "I'm here to help" },
  },
  skills: {
    label: { pt: 'Stack', en: 'Stack' },
    categories: {
      pt: ['Frontend', 'Backend', 'Cloud & IA', 'Data & Infra'],
      en: ['Frontend', 'Backend', 'Cloud & AI', 'Data & Infra'],
    },
  },
  experience: {
    label:       { pt: 'Experiência',            en: 'Experience' },
    headingBold: { pt: 'Onde apliquei',          en: 'Where I put' },
    headingMid:  { pt: 'o que sei,',             en: 'my skills,' },
    headingPre:  { pt: 'do atendimento multilíngue a', en: 'from multilingual service to' },
    headingEm:   { pt: 'pipelines de IA',        en: 'AI pipelines' },
    headingEnd:  { pt: 'em produção.',            en: 'in production.' },
    current:     { pt: 'atual',                  en: 'current' },
  },
  footer: {
    headingEm:  { pt: 'Vamos conversar,',         en: "Let's talk," },
    headingEnd: { pt: 'e eu cuido do resto.',     en: "I'll handle the rest." },
    navLabel:   { pt: 'Navegação',                en: 'Navigation' },
    navItems: {
      pt: ['Trabalhos', 'Serviços', 'Processo', 'FAQ'],
      en: ['Work', 'Services', 'Process', 'FAQ'],
    },
    connect:    { pt: 'Conecte-se',               en: 'Connect' },
    back:       { pt: 'Voltar',                   en: 'Back' },
    backToTop:  { pt: '↑ Topo da página',         en: '↑ Back to top' },
    copyright:  { pt: 'Rio de Janeiro, Brasil',   en: 'Rio de Janeiro, Brazil' },
    madeWith:   { pt: 'Feito com React & TypeScript', en: 'Made with React & TypeScript' },
  },
};

export function useT() {
  const { lang } = useLang();
  const p = <V,>(o: { pt: V; en: V }): V => o[lang];
  return {
    nav:        { items: T.nav.items[lang],             cta: p(T.nav.cta) },
    hero:       { badge: p(T.hero.badge), heading: p(T.hero.heading), sub: p(T.hero.sub), cta: p(T.hero.cta) },
    projects:   { label: p(T.projects.label), heading: p(T.projects.heading), viewProject: p(T.projects.viewProject), viewAll: p(T.projects.viewAll), viewAllMobile: p(T.projects.viewAllMobile) },
    services:   { label: p(T.services.label), headingNormal: p(T.services.headingNormal), headingEm: p(T.services.headingEm), headingEnd: p(T.services.headingEnd), viewAiProjects: p(T.services.viewAiProjects), featureLabel: p(T.services.featureLabel) },
    process:    { label: p(T.process.label), headingStart: p(T.process.headingStart), headingEnd: p(T.process.headingEnd) },
    faq:        { label: p(T.faq.label), heading: p(T.faq.heading), headingEm: p(T.faq.headingEm), cta: p(T.faq.cta), badge: p(T.faq.badge) },
    skills:     { label: p(T.skills.label), categories: T.skills.categories[lang] },
    experience: { label: p(T.experience.label), headingBold: p(T.experience.headingBold), headingMid: p(T.experience.headingMid), headingPre: p(T.experience.headingPre), headingEm: p(T.experience.headingEm), headingEnd: p(T.experience.headingEnd), current: p(T.experience.current) },
    footer:     { headingEm: p(T.footer.headingEm), headingEnd: p(T.footer.headingEnd), navLabel: p(T.footer.navLabel), navItems: T.footer.navItems[lang], connect: p(T.footer.connect), back: p(T.footer.back), backToTop: p(T.footer.backToTop), copyright: p(T.footer.copyright), madeWith: p(T.footer.madeWith) },
  };
}
