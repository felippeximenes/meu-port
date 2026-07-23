export interface Project {
  n: string;
  name: string;
  tags: string[];
  href: string;
  desc: string;
  img: string;
  site: string;
}

export interface Service {
  title: string;
  desc: string;
  chips: string[];
  dark?: boolean;
}

export interface Step { n: string; title: string; desc: string; }
export interface Faq { q: string; a: string; }

export const EMAIL = 'felippelpximenes@outlook.com';
export const LINKEDIN = 'https://www.linkedin.com/in/felippeximenes/';
export const GITHUB = 'https://github.com/felippeximenes';

export const projects: Project[] = [
  {
    n: '01', name: 'Certara', tags: ['React', 'Amazon Bedrock'],
    href: 'https://github.com/felippeximenes/certara-app',
    desc: 'Plataforma de preparação para certificações AWS: quizzes com questões geradas por IA (Bedrock), simulados, flashcards e plano de estudos personalizado.',
    img: '/projects/certara2.png',
    site: 'certara.app'
  },
  {
    n: '02', name: 'Certara Agent', tags: ['LangGraph · RAG', 'AWS Lambda'],
    href: 'https://github.com/felippeximenes/certara-agent',
    desc: 'Agente conversacional multi-etapas (LangGraph) para prep de certificação AWS — pipeline RAG com Qdrant, tool calling na AWS Price List API real e deploy serverless via SAM.',
    img: '/projects/certara.png',
    site: 'certara-agent'
  },
  {
    n: '03', name: 'EduTrack', tags: ['Node.js', 'React 19'],
    href: 'https://github.com/felippeximenes/edu-track',
    desc: 'LMS completo com controle de acesso por papel para alunos, instrutores e administradores — certificados em PDF verificáveis por QR code.',
    img: '/projects/edutrack.png',
    site: 'edutrack.app'
  },
  {
    n: '04', name: 'Moldz3D', tags: ['E-commerce', 'Full Stack'],
    href: 'https://moldz3d.com.br',
    desc: 'Loja de modelos 3D digitais com painel admin construído do zero — gestão de produtos com drag-and-drop, pedidos com etiqueta de rastreio, cupons, newsletter e popups.',
    img: '/projects/moldz2.png',
    site: 'moldz3d.com.br'
  },
  {
    n: '05', name: 'Caminhos', tags: ['Landing Page', 'GTM · GA4'],
    href: 'https://quiet-bienenstitch-a8a314.netlify.app/',
    desc: 'Landing page de viagens responsiva com animações de scroll via IntersectionObserver, formulário de inscrição e tracking profissional com Google Tag Manager + GA4.',
    img: '/projects/travel2.png',
    site: 'caminhos.app'
  }
];

export const services: Service[] = [
  {
    title: 'Back-end & Cloud',
    desc: 'APIs REST e arquitetura serverless na AWS: Lambda, API Gateway, DynamoDB e infraestrutura como código com SAM.',
    chips: ['Node.js / NestJS', 'FastAPI', 'AWS']
  },
  {
    title: 'Engenharia de IA & LLM',
    desc: 'Pipelines RAG, busca vetorial e deploy de LLMs em produção — com estratégias de confiabilidade e fallback.',
    chips: ['RAG', 'Amazon Bedrock', 'PGVector / Qdrant'],
    dark: true
  },
  {
    title: 'Produtos completos',
    desc: 'MVPs e SaaS de ponta a ponta, da arquitetura à implantação — incluindo billing, automações e dashboards.',
    chips: ['React / Next.js', 'Angular', 'Stripe']
  }
];

export const steps: Step[] = [
  { n: '01', title: 'Conversa inicial', desc: 'Entendo o objetivo, o público e o que já existe. Sem compromisso — é onde alinhamos expectativas.' },
  { n: '02', title: 'Escopo & proposta', desc: 'Defino entregas, prazos e valores em uma proposta clara, sem surpresas no meio do caminho.' },
  { n: '03', title: 'Desenvolvimento', desc: 'Construo em ciclos curtos, com entregas parciais para você acompanhar e ajustar a rota cedo.' },
  { n: '04', title: 'Entrega', desc: 'Produto publicado, testado e documentado — com repositório, credenciais e tudo que é seu.' },
  { n: '05', title: 'Suporte', desc: 'Período de ajustes incluso após a entrega, e manutenção contínua se o projeto pedir.' }
];

export const faqs: Faq[] = [
  { q: 'Qual é o prazo típico de um projeto?', a: 'Depende do escopo: uma landing page leva de 1 a 2 semanas; aplicações completas com back-end costumam levar de 4 a 8 semanas. Depois da primeira conversa envio um cronograma detalhado.' },
  { q: 'Você trabalha com quais tecnologias?', a: 'Python e TypeScript/JavaScript: React, Angular e Next.js no front; Node.js/NestJS e FastAPI no back; AWS (Lambda, Bedrock, DynamoDB), PostgreSQL e bancos vetoriais. Em IA: pipelines RAG, embeddings e deploy de LLMs em produção.' },
  { q: 'O que você precisa para começar?', a: 'Uma conversa sobre o objetivo do projeto, referências que você gosta e o que já existe (marca, conteúdo, sistemas). A partir daí eu monto escopo e proposta.' },
  { q: 'Você oferece suporte após a entrega?', a: 'Sim. Todo projeto inclui um período de suporte para ajustes e correções, e podemos combinar manutenção contínua se fizer sentido.' },
  { q: 'Qual a melhor forma de falar com você?', a: 'Email: felippelpximenes@outlook.com. Também estou no LinkedIn e no GitHub — os links estão no rodapé.' }
];
