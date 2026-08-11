export type Lang = 'pt' | 'en';

export interface Project {
  n: string; name: string; tags: string[]; href: string;
  desc: string; img: string; site: string; video?: string;
}
export interface Service  { title: string; desc: string; chips: string[]; dark?: boolean; }
export interface Step     { n: string; title: string; desc: string; }
export interface Faq      { q: string; a: string; }
export interface Experience {
  company: string; role: string; period: string;
  current?: boolean; year: string; chips: string[]; highlights: string[];
}

export const EMAIL    = 'felippelpximenes@outlook.com';
export const LINKEDIN = 'https://www.linkedin.com/in/felippeximenes/';
export const GITHUB   = 'https://github.com/felippeximenes';

export const RESUME: Record<Lang, string> = {
  pt: '/cv/felippe-ximenes-cv-pt.pdf',
  en: '/cv/felippe-ximenes-resume-en.pdf',
};

/* ─── Projects ─────────────────────────────────────────────────────────── */
export const projects: Record<Lang, Project[]> = {
  pt: [
    {
      n: '01', name: 'Certara',
      tags: ['React · TypeScript', 'AWS Lambda · SAM', 'Stripe · RAG'],
      href: 'https://github.com/felippeximenes/certara-app',
      desc: 'SaaS freemium de preparação para certificações AWS (CLF-C02, SAA-C03, DVA-C02): questões geradas em tempo real via pipeline RAG (Amazon Titan Embed + Qdrant Cloud) com o modelo Nova no Bedrock, garantindo conteúdo sempre alinhado à documentação oficial. Inclui simulado de 65 questões com detecção de troca de aba, flashcards adaptativos ao histórico real do usuário, plano de estudos por IA e compartilhamento de resultado como imagem. Backend em 13 Lambdas Python (AWS SAM), autenticação Cognito + Google OAuth, assinaturas via Stripe, quotas anti-abuso com FingerprintJS e TTL automático no DynamoDB.',
      img: '/projects/certara2.png', site: 'certara.app', video: '/video/certara.mp4',
    },
    {
      n: '02', name: 'Certara Agent',
      tags: ['LangGraph · Agentic', 'AWS Lambda · SAM', 'RAG · Qdrant'],
      href: 'https://github.com/felippeximenes/certara-agent',
      desc: 'Assistente conversacional agentic construído com LangGraph: decompõe cada pergunta de certificação AWS em um plano de até 4 passos (RAG ou tool) e os executa em sequência: buscando teoria no Qdrant via RAG e consultando preços reais na AWS Price List API. Um segundo LLM com saída estruturada (Pydantic) resolve referências indiretas apenas quando o caminho determinístico falha, economizando custo. Estado persistido por thread via checkpointing Postgres (Neon), deploy serverless via AWS SAM com rate limiting no API Gateway e testes E2E contra o ambiente real com Playwright.',
      img: '/projects/certara.png', site: 'certara-agent', video: '/video/agent.webm',
    },
    {
      n: '03', name: 'EduTrack',
      tags: ['Node.js · Prisma · MySQL', 'React 19 · TypeScript', 'Playwright · PDF'],
      href: 'https://github.com/felippeximenes/edu-track',
      desc: 'LMS full-stack com autenticação JWT e RBAC em três papéis (aluno, instrutor, admin), com autorização aplicada em duas camadas: middleware de rota e checagem de posse diretamente na query do Prisma. Emite certificados em PDF com QR code de verificação pública ao concluir 100% do curso: valida conclusão por aulas distintas (groupBy), renderiza HTML com Playwright headless e disponibiliza rota pública para terceiros verificarem sem login. Validação de contrato de API com Zod, deploy multi-plataforma (frontend Vercel + backend e MySQL no Railway) com proxy reverso configurado para eliminar CORS.',
      img: '/projects/edutrack.png', site: 'edu-track-blond-eta.vercel.app', video: '/video/edutrack1.webm',
    },
    {
      n: '04', name: 'Moldz3D',
      tags: ['FastAPI · MongoDB', 'MercadoPago · Pix', 'React · WebGL2'],
      href: 'https://moldz3d.com.br',
      desc: 'E-commerce completo para venda de peças de impressão 3D com checkout 100% nativo via MercadoPago: Pix com QR code + polling, boleto e cartão com tokenização PCI-compliant, tudo sem redirecionar o cliente. Cálculo de frete real por CEP (Melhor Envio), e-mails transacionais (Resend), devoluções com estorno automático, newsletter via Mailchimp e painel admin com analytics reais via 8 queries HogQL paralelas ao PostHog. Proteção antibot Cloudflare Turnstile verificada no servidor, conformidade LGPD, shader GLSL no hero via WebGL2 puro. Stack: FastAPI assíncrono + MongoDB Atlas no Railway, React no Vercel.',
      img: '/projects/moldz2.png', site: 'moldz3d.com.br', video: '/video/moldz3d.webm',
    },
    {
      n: '05', name: 'Caminhos',
      tags: ['React · TypeScript', 'Framer Motion', 'Tailwind CSS v4'],
      href: 'https://quiet-bienenstitch-a8a314.netlify.app/',
      desc: 'Landing page de agência de viagens migrada de HTML/CSS vanilla para React + TypeScript + Tailwind CSS v4, com foco em motion design de alta qualidade: carrossel 3D com perspectiva CSS real e springs do Framer Motion, navbar com spotlight radial que segue o cursor, tilt 3D no hero por posição do mouse e micro-interações de toque/hover. Acessibilidade sistêmica: prefers-reduced-motion em todos os hooks, ARIA completo e navegação por teclado no carrossel, e rastreamento de leads via Google Tag Manager. Publicado no Netlify com deploy contínuo.',
      img: '/projects/travel2.png', site: 'netlify.app', video: '/video/caminhos.webm',
    },
  ],
  en: [
    {
      n: '01', name: 'Certara',
      tags: ['React · TypeScript', 'AWS Lambda · SAM', 'Stripe · RAG'],
      href: 'https://github.com/felippeximenes/certara-app',
      desc: 'Freemium SaaS for AWS certification prep (CLF-C02, SAA-C03, DVA-C02): questions generated in real time via RAG pipeline (Amazon Titan Embed + Qdrant Cloud) with the Nova model on Bedrock, always aligned with official documentation. Includes a 65-question exam with tab-switch detection, flashcards adaptive to real user history, AI-powered study plan, and result sharing as an image. Backend on 13 Python Lambdas (AWS SAM), Cognito + Google OAuth auth, Stripe subscriptions, anti-abuse quotas with FingerprintJS, and auto TTL on DynamoDB.',
      img: '/projects/certara2.png', site: 'certara.app', video: '/video/certara.mp4',
    },
    {
      n: '02', name: 'Certara Agent',
      tags: ['LangGraph · Agentic', 'AWS Lambda · SAM', 'RAG · Qdrant'],
      href: 'https://github.com/felippeximenes/certara-agent',
      desc: 'Agentic conversational assistant built with LangGraph: decomposes each AWS certification question into a plan of up to 4 steps (RAG or tool) and executes them in sequence: searching theory in Qdrant via RAG and querying real prices from the AWS Price List API. A second LLM with structured output (Pydantic) resolves indirect references only when the deterministic path fails, saving cost. State persisted per thread via Postgres checkpointing (Neon), serverless deploy via AWS SAM with API Gateway rate limiting, and E2E tests against the real environment with Playwright.',
      img: '/projects/certara.png', site: 'certara-agent', video: '/video/agent.webm',
    },
    {
      n: '03', name: 'EduTrack',
      tags: ['Node.js · Prisma · MySQL', 'React 19 · TypeScript', 'Playwright · PDF'],
      href: 'https://github.com/felippeximenes/edu-track',
      desc: 'Full-stack LMS with JWT auth and RBAC across three roles (student, instructor, admin), with authorization enforced in two layers: route middleware and ownership checks directly in Prisma queries. Issues PDF certificates with a public QR verification link upon 100% course completion: validates completion by distinct lessons (groupBy), renders HTML with headless Playwright, and exposes a public route for third-party verification without login. API contract validation with Zod, multi-platform deploy (frontend on Vercel + backend and MySQL on Railway) with reverse proxy configured to eliminate CORS.',
      img: '/projects/edutrack.png', site: 'edu-track-blond-eta.vercel.app', video: '/video/edutrack1.webm',
    },
    {
      n: '04', name: 'Moldz3D',
      tags: ['FastAPI · MongoDB', 'MercadoPago · Pix', 'React · WebGL2'],
      href: 'https://moldz3d.com.br',
      desc: 'Full e-commerce for 3D printing parts with 100% native checkout via MercadoPago: Pix with QR code + polling, boleto, and PCI-compliant card tokenization, all without redirecting the customer. Real shipping calculation by ZIP code (Melhor Envio), transactional emails (Resend), refunds with automatic reversal, newsletter via Mailchimp, and admin panel with real analytics via 8 parallel HogQL queries to PostHog. Cloudflare Turnstile antibot protection verified server-side, data compliance, GLSL shader in the hero via pure WebGL2. Stack: async FastAPI + MongoDB Atlas on Railway, React on Vercel.',
      img: '/projects/moldz2.png', site: 'moldz3d.com.br', video: '/video/moldz3d.webm',
    },
    {
      n: '05', name: 'Caminhos',
      tags: ['React · TypeScript', 'Framer Motion', 'Tailwind CSS v4'],
      href: 'https://quiet-bienenstitch-a8a314.netlify.app/',
      desc: 'Travel agency landing page migrated from vanilla HTML/CSS to React + TypeScript + Tailwind CSS v4, focused on high-quality motion design: 3D carousel with real CSS perspective and Framer Motion springs, navbar with radial spotlight that follows the cursor, 3D tilt in the hero by mouse position, and touch/hover micro-interactions. Systematic accessibility: prefers-reduced-motion on all hooks, full ARIA, and keyboard navigation in the carousel — and lead tracking via Google Tag Manager. Published on Netlify with continuous deploy.',
      img: '/projects/travel2.png', site: 'netlify.app', video: '/video/caminhos.webm',
    },
  ],
};

/* ─── Services ──────────────────────────────────────────────────────────── */
export const services: Record<Lang, Service[]> = {
  pt: [
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
  ],
  en: [
    {
      title: 'Back-end & Cloud',
      desc: 'I build the backbone of your product: APIs that handle pressure, serverless architecture on AWS (Lambda, DynamoDB, API Gateway), and infrastructure declared as code with SAM. From the endpoint to the IAM Role, everything versioned and reproducible with a single deploy.',
      chips: ['Node.js · NestJS', 'FastAPI · Python', 'AWS SAM · DynamoDB'],
    },
    {
      title: 'AI & LLM Engineering',
      desc: 'I put AI to work for real in your product. RAG pipelines with vector search (Qdrant, PGVector), agents with LangGraph, and Bedrock integration with guaranteed fallback for when the model fails.',
      chips: ['LangGraph · Agentic', 'Amazon Bedrock', 'Qdrant · PGVector'],
      dark: true,
    },
    {
      title: 'Full products',
      desc: 'From the initial conversation to the live product: modern front-end, solid back-end, real payments (Stripe, MercadoPago), admin panel with analytics, and data compliance. You get the repository, the infrastructure, and everything you need to run the project independently.',
      chips: ['React · TypeScript', 'Stripe · MercadoPago', 'Angular · Next.js'],
    },
  ],
};

/* ─── Process steps ─────────────────────────────────────────────────────── */
export const steps: Record<Lang, Step[]> = {
  pt: [
    { n: '01', title: 'Conversa inicial',  desc: 'Entendo o objetivo, o público e o que já existe. Sem compromisso: é onde alinhamos expectativas.' },
    { n: '02', title: 'Escopo & proposta', desc: 'Defino entregas, prazos e valores em uma proposta clara, sem surpresas no meio do caminho.' },
    { n: '03', title: 'Desenvolvimento',   desc: 'Construo em ciclos curtos, com entregas parciais para você acompanhar e ajustar a rota cedo.' },
    { n: '04', title: 'Entrega',           desc: 'Produto publicado, testado e documentado, com repositório, credenciais e tudo que é seu.' },
    { n: '05', title: 'Suporte',           desc: 'Período de ajustes incluso após a entrega, e manutenção contínua se o projeto pedir.' },
  ],
  en: [
    { n: '01', title: 'Initial conversation', desc: "I understand the goal, the audience, and what already exists. No commitment — it's where we align expectations." },
    { n: '02', title: 'Scope & proposal',     desc: 'I define deliverables, timelines, and pricing in a clear proposal, with no surprises along the way.' },
    { n: '03', title: 'Development',          desc: 'I build in short cycles, with partial deliveries so you can track progress and adjust early.' },
    { n: '04', title: 'Delivery',             desc: "Product published, tested, and documented, with repository, credentials, and everything that's yours." },
    { n: '05', title: 'Support',              desc: 'Adjustment period included after delivery, and ongoing maintenance if the project calls for it.' },
  ],
};

/* ─── FAQs ──────────────────────────────────────────────────────────────── */
export const faqs: Record<Lang, Faq[]> = {
  pt: [
    { q: 'Qual é o prazo típico de um projeto?', a: 'Depende do escopo: uma landing page leva de 1 a 2 semanas; aplicações completas com back-end e integrações costumam levar de 4 a 8 semanas. Depois da primeira conversa envio um cronograma detalhado.' },
    { q: 'Você trabalha com quais tecnologias?', a: 'Python e TypeScript/JavaScript: React, Angular e Next.js no front; Node.js/NestJS e FastAPI no back; AWS (Lambda, Bedrock, DynamoDB, SAM), MongoDB, PostgreSQL e bancos vetoriais (Qdrant, PGVector). Em IA: pipelines RAG, agentes com LangGraph, embeddings e LLMs em produção via Amazon Bedrock.' },
    { q: 'O que você precisa para começar?', a: 'Uma conversa sobre o objetivo do projeto, referências que você gosta e o que já existe (marca, conteúdo, sistemas). A partir daí eu monto escopo e proposta.' },
    { q: 'Você oferece suporte após a entrega?', a: 'Sim. Todo projeto inclui um período de suporte para ajustes e correções, e podemos combinar manutenção contínua se fizer sentido.' },
    { q: 'Qual a melhor forma de falar com você?', a: 'Email: felippelpximenes@outlook.com. Também estou no LinkedIn e no GitHub, os links estão no rodapé.' },
  ],
  en: [
    { q: 'What is the typical timeline for a project?', a: 'It depends on the scope: a landing page takes 1 to 2 weeks; complete applications with back-end and integrations usually take 4 to 8 weeks. After our first conversation I send a detailed timeline.' },
    { q: 'What technologies do you work with?', a: 'Python and TypeScript/JavaScript: React, Angular, and Next.js on the front; Node.js/NestJS and FastAPI on the back; AWS (Lambda, Bedrock, DynamoDB, SAM), MongoDB, PostgreSQL, and vector databases (Qdrant, PGVector). In AI: RAG pipelines, agents with LangGraph, embeddings, and LLMs in production via Amazon Bedrock.' },
    { q: 'What do you need to get started?', a: 'A conversation about the project goal, references you like, and what already exists (brand, content, systems). From there I put together the scope and proposal.' },
    { q: 'Do you offer support after delivery?', a: 'Yes. Every project includes a support period for adjustments and fixes, and we can arrange ongoing maintenance if it makes sense.' },
    { q: "What's the best way to reach you?", a: 'Email: felippelpximenes@outlook.com. Also on LinkedIn and GitHub — links are in the footer.' },
  ],
};

/* ─── Experiences ───────────────────────────────────────────────────────── */
export const experiences: Record<Lang, Experience[]> = {
  pt: [
    {
      company: 'Neocoder', role: 'Desenvolvedor Web',
      period: 'Abr 2026 – presente', current: true, year: '2026',
      chips: ['n8n', 'Make.com', 'Pipedrive', 'Uptime'],
      highlights: [
        'Automações com agentes IA via n8n integradas a fluxos de trabalho internos',
        'Dashboards automatizados no Notion via Make.com e integração CRM Pipedrive',
        'Monitoramento de uptime e performance de aplicações em produção',
      ],
    },
    {
      company: 'Zosia AI', role: 'Desenvolvedor Full Stack Jr',
      period: 'Out 2025 – presente', current: true, year: '2025',
      chips: ['FastAPI', 'RAG', 'PGVector', 'NestJS', 'Angular 17', 'Playwright'],
      highlights: [
        'Pipeline RAG em produção com embeddings vetoriais e busca semântica via PGVector',
        'Estratégia de fallback garantindo zero downtime em caso de falha no LLM',
        'Suítes E2E cobrindo todo o pipeline RAG com Playwright',
      ],
    },
    {
      company: 'Freelancer', role: 'Desenvolvedor Full Stack',
      period: 'Jun 2024 – Nov 2025', year: '2024',
      chips: ['React', 'Netlify Functions', 'Pipedrive', 'GTM · GA4'],
      highlights: [
        'Sites e aplicações responsivas ponta a ponta para clientes de pequenas empresas',
        'Integração CRM Pipedrive via serverless com criação automática de negócios',
        'Pipelines CI/CD na Netlify com gestão de variáveis e estratégia de branches',
      ],
    },
    {
      company: 'Trem do Corcovado', role: 'Agente de Bilheteria Bilíngue',
      period: 'Dez 2022 – Jul 2024', year: '2022',
      chips: ['Trilíngue', 'Alto volume'],
      highlights: [
        'Atendimento em português, inglês e espanhol a visitantes internacionais',
        'Operação de sistemas de bilheteria e pagamento em ambiente de alto volume',
      ],
    },
  ],
  en: [
    {
      company: 'Neocoder', role: 'Web Developer',
      period: 'Apr 2026 – present', current: true, year: '2026',
      chips: ['n8n', 'Make.com', 'Pipedrive', 'Uptime'],
      highlights: [
        'AI agent automations via n8n integrated into internal workflows',
        'Automated dashboards in Notion via Make.com and Pipedrive CRM integration',
        'Uptime and performance monitoring of production applications',
      ],
    },
    {
      company: 'Zosia AI', role: 'Full Stack Developer Jr',
      period: 'Oct 2025 – present', current: true, year: '2025',
      chips: ['FastAPI', 'RAG', 'PGVector', 'NestJS', 'Angular 17', 'Playwright'],
      highlights: [
        'Production RAG pipeline with vector embeddings and semantic search via PGVector',
        'Fallback strategy ensuring zero downtime on LLM failure',
        'E2E test suites covering the full RAG pipeline with Playwright',
      ],
    },
    {
      company: 'Freelancer', role: 'Full Stack Developer',
      period: 'Jun 2024 – Nov 2025', year: '2024',
      chips: ['React', 'Netlify Functions', 'Pipedrive', 'GTM · GA4'],
      highlights: [
        'End-to-end responsive sites and applications for small business clients',
        'Pipedrive CRM integration via serverless with automatic deal creation',
        'CI/CD pipelines on Netlify with variable management and branching strategy',
      ],
    },
    {
      company: 'Trem do Corcovado', role: 'Bilingual Box Office Agent',
      period: 'Dec 2022 – Jul 2024', year: '2022',
      chips: ['Trilingual', 'High volume'],
      highlights: [
        'Customer service in Portuguese, English, and Spanish for international visitors',
        'Ticketing and payment systems operation in a high-volume environment',
      ],
    },
  ],
};
