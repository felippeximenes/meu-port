export interface Project {
  n: string;
  name: string;
  tags: string[];
  href: string;
  desc: string;
  img: string;
  site: string;
  video?: string;
}

export interface Service {
  title: string;
  desc: string;
  chips: string[];
  dark?: boolean;
}

export interface Step { n: string; title: string; desc: string; }
export interface Faq { q: string; a: string; }

export interface Experience {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  year: string;
  chips: string[];
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Neocoder',
    role: 'Desenvolvedor Web',
    period: 'Abr 2026 – presente',
    current: true,
    year: '2026',
    chips: ['n8n', 'Make.com', 'Pipedrive', 'Uptime'],
    highlights: [
      'Automações com agentes IA via n8n integradas a fluxos de trabalho internos',
      'Dashboards automatizados no Notion via Make.com e integração CRM Pipedrive',
      'Monitoramento de uptime e performance de aplicações em produção',
    ],
  },
  {
    company: 'Zosia AI',
    role: 'Desenvolvedor Full Stack Jr',
    period: 'Out 2025 – presente',
    current: true,
    year: '2025',
    chips: ['FastAPI', 'RAG', 'PGVector', 'NestJS', 'Angular 17', 'Playwright'],
    highlights: [
      'Pipeline RAG em produção com embeddings vetoriais e busca semântica via PGVector',
      'Estratégia de fallback garantindo zero downtime em caso de falha no LLM',
      'Suítes E2E cobrindo todo o pipeline RAG com Playwright',
    ],
  },
  {
    company: 'Freelancer',
    role: 'Desenvolvedor Full Stack',
    period: 'Jun 2024 – Nov 2025',
    year: '2024',
    chips: ['React', 'Netlify Functions', 'Pipedrive', 'GTM · GA4'],
    highlights: [
      'Sites e aplicações responsivas ponta a ponta para clientes de pequenas empresas',
      'Integração CRM Pipedrive via serverless com criação automática de negócios',
      'Pipelines CI/CD na Netlify com gestão de variáveis e estratégia de branches',
    ],
  },
  {
    company: 'Trem do Corcovado',
    role: 'Agente de Bilheteria Bilíngue',
    period: 'Dez 2022 – Jul 2024',
    year: '2022',
    chips: ['Trilíngue', 'Alto volume'],
    highlights: [
      'Atendimento em português, inglês e espanhol a visitantes internacionais',
      'Operação de sistemas de bilheteria e pagamento em ambiente de alto volume',
    ],
  },
];

export const EMAIL = 'felippelpximenes@outlook.com';
export const LINKEDIN = 'https://www.linkedin.com/in/felippeximenes/';
export const GITHUB = 'https://github.com/felippeximenes';

export const projects: Project[] = [
  {
    n: '01',
    name: 'Certara',
    tags: ['React · TypeScript', 'AWS Lambda · SAM', 'Stripe · RAG'],
    href: 'https://github.com/felippeximenes/certara-app',
    desc: 'SaaS freemium de preparação para certificações AWS (CLF-C02, SAA-C03, DVA-C02): questões geradas em tempo real via pipeline RAG — Amazon Titan Embed + Qdrant Cloud — com o modelo Nova no Bedrock, garantindo conteúdo sempre alinhado à documentação oficial. Inclui simulado de 65 questões com detecção de troca de aba, flashcards adaptativos ao histórico real do usuário, plano de estudos por IA e compartilhamento de resultado como imagem. Backend em 13 Lambdas Python (AWS SAM), autenticação Cognito + Google OAuth, assinaturas via Stripe, quotas anti-abuso com FingerprintJS e TTL automático no DynamoDB.',
    img: '/projects/certara2.png',
    site: 'certara.app',
    video: '/video/certara.mp4',
  },
  {
    n: '02',
    name: 'Certara Agent',
    tags: ['LangGraph · Agentic', 'AWS Lambda · SAM', 'RAG · Qdrant'],
    href: 'https://github.com/felippeximenes/certara-agent',
    desc: 'Assistente conversacional agentic construído com LangGraph: decompõe cada pergunta de certificação AWS em um plano de até 4 passos (RAG ou tool) e os executa em sequência — buscando teoria no Qdrant via RAG e consultando preços reais na AWS Price List API. Um segundo LLM com saída estruturada (Pydantic) resolve referências indiretas apenas quando o caminho determinístico falha, economizando custo. Estado persistido por thread via checkpointing Postgres (Neon), deploy serverless via AWS SAM com rate limiting no API Gateway e testes E2E contra o ambiente real com Playwright.',
    img: '/projects/certara.png',
    site: 'certara-agent',
    video: '/video/agent.webm',
  },
  {
    n: '03',
    name: 'EduTrack',
    tags: ['Node.js · Prisma · MySQL', 'React 19 · TypeScript', 'Playwright · PDF'],
    href: 'https://github.com/felippeximenes/edu-track',
    desc: 'LMS full-stack com autenticação JWT e RBAC em três papéis (aluno, instrutor, admin) — autorização aplicada em duas camadas: middleware de rota e checagem de posse diretamente na query do Prisma. Emite certificados em PDF com QR code de verificação pública ao concluir 100% do curso: valida conclusão por aulas distintas (groupBy), renderiza HTML com Playwright headless e disponibiliza rota pública para terceiros verificarem sem login. Validação de contrato de API com Zod, deploy multi-plataforma (frontend Vercel + backend e MySQL no Railway) com proxy reverso configurado para eliminar CORS.',
    img: '/projects/edutrack.png',
    site: 'edu-track-blond-eta.vercel.app',
    video: '/video/edutrack1.webm',
  },
  {
    n: '04',
    name: 'Moldz3D',
    tags: ['FastAPI · MongoDB', 'MercadoPago · Pix', 'React · WebGL2'],
    href: 'https://moldz3d.com.br',
    desc: 'E-commerce completo para venda de peças de impressão 3D com checkout 100% nativo via MercadoPago — Pix com QR code + polling, boleto e cartão com tokenização PCI-compliant, tudo sem redirecionar o cliente. Cálculo de frete real por CEP (Melhor Envio), e-mails transacionais (Resend), devoluções com estorno automático, newsletter via Mailchimp e painel admin com analytics reais via 8 queries HogQL paralelas ao PostHog. Proteção antibot Cloudflare Turnstile verificada no servidor, conformidade LGPD, shader GLSL no hero via WebGL2 puro. Stack: FastAPI assíncrono + MongoDB Atlas no Railway, React no Vercel.',
    img: '/projects/moldz2.png',
    site: 'moldz3d.com.br',
    video: '/video/moldz3d.webm',
  },
  {
    n: '05',
    name: 'Caminhos',
    tags: ['React · TypeScript', 'Framer Motion', 'Tailwind CSS v4'],
    href: 'https://quiet-bienenstitch-a8a314.netlify.app/',
    desc: 'Landing page de agência de viagens migrada de HTML/CSS vanilla para React + TypeScript + Tailwind CSS v4, com foco em motion design de alta qualidade: carrossel 3D com perspectiva CSS real e springs do Framer Motion, navbar com spotlight radial que segue o cursor, tilt 3D no hero por posição do mouse e micro-interações de toque/hover. Acessibilidade sistêmica — prefers-reduced-motion em todos os hooks, ARIA completo e navegação por teclado no carrossel — e rastreamento de leads via Google Tag Manager. Publicado no Netlify com deploy contínuo.',
    img: '/projects/travel2.png',
    site: 'netlify.app',
    video: '/video/caminhos.webm',
  }
];

export const services: Service[] = [
  {
    title: 'Back-end & Cloud',
    desc: 'Construo a espinha dorsal do seu produto: APIs que aguentam pressão, arquitetura serverless na AWS (Lambda, DynamoDB, API Gateway) e infraestrutura declarada como código com SAM. Do endpoint à IAM Role, tudo versionado e reproduzível com um único deploy.',
    chips: ['Node.js · NestJS', 'FastAPI · Python', 'AWS SAM · DynamoDB'],
  },
  {
    title: 'Engenharia de IA & LLM',
    desc: 'Coloco IA para trabalhar de verdade no seu produto. Pipelines RAG com busca vetorial (Qdrant, PGVector), agentes com LangGraph e integração ao Bedrock com fallback garantido para quando o modelo falha.',
    chips: ['LangGraph · Agentic', 'Amazon Bedrock', 'Qdrant · PGVector'],
    dark: true,
  },
  {
    title: 'Produtos completos',
    desc: 'Da conversa inicial ao produto no ar: front-end moderno, back-end sólido, pagamentos reais (Stripe, MercadoPago), painel admin com analytics e conformidade com a LGPD. Você recebe o repositório, a infraestrutura e tudo que precisa para tocar o projeto com autonomia.',
    chips: ['React · TypeScript', 'Stripe · MercadoPago', 'Angular · Next.js'],
  },
];

export const steps: Step[] = [
  { n: '01', title: 'Conversa inicial', desc: 'Entendo o objetivo, o público e o que já existe. Sem compromisso — é onde alinhamos expectativas.' },
  { n: '02', title: 'Escopo & proposta', desc: 'Defino entregas, prazos e valores em uma proposta clara, sem surpresas no meio do caminho.' },
  { n: '03', title: 'Desenvolvimento', desc: 'Construo em ciclos curtos, com entregas parciais para você acompanhar e ajustar a rota cedo.' },
  { n: '04', title: 'Entrega', desc: 'Produto publicado, testado e documentado — com repositório, credenciais e tudo que é seu.' },
  { n: '05', title: 'Suporte', desc: 'Período de ajustes incluso após a entrega, e manutenção contínua se o projeto pedir.' },
];

export const faqs: Faq[] = [
  { q: 'Qual é o prazo típico de um projeto?', a: 'Depende do escopo: uma landing page leva de 1 a 2 semanas; aplicações completas com back-end e integrações costumam levar de 4 a 8 semanas. Depois da primeira conversa envio um cronograma detalhado.' },
  { q: 'Você trabalha com quais tecnologias?', a: 'Python e TypeScript/JavaScript: React, Angular e Next.js no front; Node.js/NestJS e FastAPI no back; AWS (Lambda, Bedrock, DynamoDB, SAM), MongoDB, PostgreSQL e bancos vetoriais (Qdrant, PGVector). Em IA: pipelines RAG, agentes com LangGraph, embeddings e LLMs em produção via Amazon Bedrock.' },
  { q: 'O que você precisa para começar?', a: 'Uma conversa sobre o objetivo do projeto, referências que você gosta e o que já existe (marca, conteúdo, sistemas). A partir daí eu monto escopo e proposta.' },
  { q: 'Você oferece suporte após a entrega?', a: 'Sim. Todo projeto inclui um período de suporte para ajustes e correções, e podemos combinar manutenção contínua se fizer sentido.' },
  { q: 'Qual a melhor forma de falar com você?', a: 'Email: felippelpximenes@outlook.com. Também estou no LinkedIn e no GitHub — os links estão no rodapé.' },
];
