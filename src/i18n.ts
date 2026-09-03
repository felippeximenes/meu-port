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
    badge: { pt: 'Disponível para projetos', en: 'Available for projects' },
    heading: {
      pt: 'Produto completo, do backend aos agentes de IA. Rodando de verdade em produção.',
      en: 'Full product, from backend to AI agents. Running for real in production.',
    },
    sub: {
      pt: 'Desenvolvimento full-stack e engenharia de IA: de APIs na AWS a pipelines RAG rodando em produção real.',
      en: 'Full-stack development and AI engineering: from AWS APIs to RAG pipelines running in real production.',
    },
  },
  sobre: {
    lede: {
      pt: 'Não me interessa parecer sofisticado. Me interessa que o produto funcione, do back-end aos agentes de IA.',
      en: "I'm not interested in looking sophisticated. I'm interested in the product actually working, from the back-end to the AI agents.",
    },
    bio: {
      pt: 'Desenvolvedor full-stack com foco em engenharia de IA: de APIs serverless na AWS a pipelines RAG rodando em produção real. Atuo com TypeScript, Python, React e infraestrutura AWS, entregando produtos completos do back-end aos agentes de IA.',
      en: 'Full-stack developer focused on AI engineering: from serverless APIs on AWS to RAG pipelines running in real production. I work with TypeScript, Python, React and AWS infrastructure, delivering complete products from the back-end to AI agents.',
    },
    yearsSuffix:    { pt: 'anos de experiência', en: 'years of experience' },
    languages:      { pt: 'Português · Inglês · Espanhol', en: 'Portuguese · English · Spanish' },
    factRole:       { pt: 'Papel', en: 'Role' },
    factFocus:      { pt: 'Foco', en: 'Focus' },
    factExperience: { pt: 'Experiência', en: 'Experience' },
    factLanguages:  { pt: 'Idiomas', en: 'Languages' },
    factBase:       { pt: 'Base', en: 'Based in' },
    downloadCV:    { pt: 'Baixar currículo', en: 'Download resume' },
    city:          { pt: 'Rio de Janeiro, Brasil', en: 'Rio de Janeiro, Brazil' },
  },
  projects: {
    label:    { pt: 'O que já construí',    en: "What I've built" },
    heading:  { pt: 'Projetos em destaque', en: 'Featured projects' },
    viewCase: { pt: 'Ver case ↗',           en: 'View case ↗' },
    viewAll:  { pt: 'Todos os projetos ↗',  en: 'All projects ↗' },
  },
  services: {
    label:         { pt: 'O que faço', en: 'What I do' },
    headingNormal: { pt: 'Construo o produto inteiro: do back-end aos agentes de IA que fazem a diferença de verdade.', en: 'I build the whole product: from back-end to the AI agents that make the real difference.' },
    available:     { pt: 'Disponível para projetos', en: 'Available for projects' },
  },
  process: {
    label:   { pt: 'Como trabalho', en: 'How I work' },
    heading: { pt: 'Como eu trabalho, da primeira conversa ao produto no ar.', en: 'How I work, from the first conversation to the live product.' },
  },
  faq: {
    label:   { pt: 'FAQ',                              en: 'FAQ' },
    heading: { pt: 'Respostas para as dúvidas mais comuns antes de começar.', en: 'Answers to the most common questions before we start.' },
    badge:   { pt: 'Estou aqui para ajudar',           en: "I'm here to help" },
  },
  experience: {
    label:   { pt: 'Experiência', en: 'Experience' },
    heading: { pt: 'Onde apliquei o que sei, do atendimento multilíngue a pipelines de IA em produção.', en: 'Where I put my skills, from multilingual service to AI pipelines in production.' },
    current: { pt: 'atual',       en: 'current' },
  },
  footer: {
    label:    { pt: 'Tem um projeto em movimento?',           en: 'Got a project in motion?' },
    ctaLine1: { pt: 'Vamos conversar,',       en: "Let's talk," },
    ctaLine2: { pt: 'e eu cuido do resto.',   en: "I'll handle the rest." },
    contactStart: { pt: 'Comece uma conversa', en: 'Start a conversation' },
    contactBased: { pt: 'Onde estou',          en: 'Based in' },
    formName:        { pt: 'Nome completo', en: 'Full name' },
    formNamePh:      { pt: 'Seu nome',      en: 'Your name' },
    formEmail:       { pt: 'E-mail',        en: 'Email address' },
    formEmailPh:     { pt: 'voce@email.com', en: 'you@email.com' },
    formMessage:     { pt: 'Como posso ajudar?', en: 'How can I help?' },
    formMessagePh:   { pt: 'Conte um pouco sobre o projeto…', en: 'Tell me about your project…' },
    formSubmit:      { pt: 'Enviar mensagem', en: 'Send message' },
    formSending:     { pt: 'Enviando…',      en: 'Sending…' },
    formSuccess:     { pt: 'Mensagem enviada. Respondo em breve!', en: 'Message sent. I’ll get back to you soon!' },
    formError:       { pt: 'Não consegui enviar. Tente de novo ou use o e-mail direto.', en: 'Couldn’t send it. Please try again or use the direct email.' },
    formThanks:      { pt: 'Obrigado pelo contato!', en: 'Thanks for reaching out!' },
    formSendAnother: { pt: 'Enviar outra mensagem', en: 'Send another message' },
    navItems: {
      pt: ['Trabalhos', 'Serviços', 'Processo', 'FAQ'],
      en: ['Work', 'Services', 'Process', 'FAQ'],
    },
    copyright: { pt: 'Rio de Janeiro, Brasil', en: 'Rio de Janeiro, Brazil' },
  },
};

export function useT() {
  const { lang } = useLang();
  const p = <V,>(o: { pt: V; en: V }): V => o[lang];
  return {
    nav:        { items: T.nav.items[lang], cta: p(T.nav.cta) },
    hero:       { badge: p(T.hero.badge), heading: p(T.hero.heading), sub: p(T.hero.sub) },
    sobre:      {
      lede: p(T.sobre.lede), bio: p(T.sobre.bio), yearsSuffix: p(T.sobre.yearsSuffix),
      languages: p(T.sobre.languages),
      factRole: p(T.sobre.factRole), factFocus: p(T.sobre.factFocus), factExperience: p(T.sobre.factExperience),
      factLanguages: p(T.sobre.factLanguages), factBase: p(T.sobre.factBase),
      downloadCV: p(T.sobre.downloadCV), city: p(T.sobre.city),
    },
    projects:   { label: p(T.projects.label), heading: p(T.projects.heading), viewCase: p(T.projects.viewCase), viewAll: p(T.projects.viewAll) },
    services:   { label: p(T.services.label), headingNormal: p(T.services.headingNormal), available: p(T.services.available) },
    process:    { label: p(T.process.label), heading: p(T.process.heading) },
    faq:        { label: p(T.faq.label), heading: p(T.faq.heading), badge: p(T.faq.badge) },
    experience: { label: p(T.experience.label), heading: p(T.experience.heading), current: p(T.experience.current) },
    footer:     {
      label: p(T.footer.label), ctaLine1: p(T.footer.ctaLine1), ctaLine2: p(T.footer.ctaLine2),
      navItems: T.footer.navItems[lang], copyright: p(T.footer.copyright),
      contactStart: p(T.footer.contactStart), contactBased: p(T.footer.contactBased),
      formName: p(T.footer.formName), formNamePh: p(T.footer.formNamePh),
      formEmail: p(T.footer.formEmail), formEmailPh: p(T.footer.formEmailPh), formMessage: p(T.footer.formMessage),
      formMessagePh: p(T.footer.formMessagePh), formSubmit: p(T.footer.formSubmit), formSending: p(T.footer.formSending),
      formSuccess: p(T.footer.formSuccess), formError: p(T.footer.formError),
      formThanks: p(T.footer.formThanks), formSendAnother: p(T.footer.formSendAnother),
    },
  };
}
