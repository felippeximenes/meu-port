type Lang = 'pt' | 'en';

interface Project {
  n: string; name: string; tags: string[]; href: string;
  desc: string; img: string; site: string; video?: string;
}
interface Service  { title: string; desc: string; chips: string[]; }
interface Step     { n: string; title: string; desc: string; }
interface Faq      { q: string; a: string; }
interface Experience {
  company: string; role: string; period: string;
  current?: boolean; year: string; chips: string[]; highlights: string[];
}

export const EMAIL     = 'felippelpximenes@outlook.com';
export const LINKEDIN  = 'https://www.linkedin.com/in/felippeximenes/';
export const GITHUB    = 'https://github.com/felippeximenes';
export const INSTAGRAM = 'https://www.instagram.com/felippidios/';

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
      desc: 'Plataforma SaaS para quem prepara as certificações AWS (CLF-C02, SAA-C03 e DVA-C02). As questões são geradas em tempo real por um pipeline RAG: a resposta sempre vem da documentação oficial mais recente, nunca de dados estáticos. Inclui simulado de 65 questões, flashcards que se adaptam ao histórico do usuário, plano de estudos por IA e compartilhamento de resultado. Back-end em 13 Lambdas Python (AWS SAM), Cognito + Google OAuth, assinaturas via Stripe e proteção anti-abuso com FingerprintJS.',
      img: '/projects/certara.png', site: 'certara.app', video: '/video/certara.mp4',
    },
    {
      n: '02', name: 'Certara Agent',
      tags: ['LangGraph · Agentic', 'AWS Lambda · SAM', 'RAG · Qdrant'],
      href: 'https://github.com/felippeximenes/certara-agent',
      desc: 'Assistente de estudos conversacional com arquitetura agentic via LangGraph. Para cada pergunta sobre certificação AWS, ele planeja os passos necessários (busca de teoria no Qdrant via RAG e consulta de preços reais na AWS Price List API) e os executa em sequência. Um segundo modelo com saída estruturada só entra quando a rota determinística falha, mantendo o custo baixo. Estado por sessão com Postgres (Neon), deploy serverless no AWS SAM e cobertura E2E com Playwright.',
      img: '/projects/certara-agent.png', site: 'certara-agent', video: '/video/agent.webm',
    },
    {
      n: '03', name: 'EduTrack',
      tags: ['Node.js · Prisma · MySQL', 'React 19 · TypeScript', 'Playwright · PDF'],
      href: 'https://edu-track-blond-eta.vercel.app',
      desc: 'Plataforma de ensino online com três perfis de acesso (aluno, instrutor e admin), com permissões verificadas em duas camadas: middleware de rota e checagem direta nas queries do Prisma. Ao concluir 100% do curso, o sistema emite automaticamente um certificado em PDF com QR code para verificação pública sem precisar de login. Deploy multi-plataforma (Vercel + Railway) com proxy reverso, contratos de API com Zod e autenticação JWT.',
      img: '/projects/edutrack.png', site: 'edu-track-blond-eta.vercel.app', video: '/video/edutrack1.webm',
    },
    {
      n: '04', name: 'Moldz3D',
      tags: ['FastAPI · MongoDB', 'MercadoPago · Pix', 'React · WebGL2'],
      href: 'https://moldz3d.com.br',
      desc: 'E-commerce para peças de impressão 3D com checkout 100% nativo (Pix, boleto e cartão com tokenização PCI) sem redirecionar o cliente para outra página. Calcula frete real por CEP (Melhor Envio), envia e-mails transacionais, processa estornos automaticamente e tem painel admin com analytics via PostHog. Proteção antibot com Cloudflare Turnstile, conformidade LGPD e shader GLSL renderizado com WebGL2 puro no hero. Stack: FastAPI + MongoDB Atlas no Railway, React no Vercel.',
      img: '/projects/moldz3d.png', site: 'moldz3d.com.br', video: '/video/moldz3d.webm',
    },
    {
      n: '05', name: 'Caminhos',
      tags: ['React · TypeScript', 'Framer Motion', 'Tailwind CSS v4'],
      href: 'https://quiet-bienenstitch-a8a314.netlify.app/',
      desc: 'Landing page de agência de viagens reescrita do zero em React + TypeScript + Tailwind CSS v4, com foco em motion design: carrossel 3D com perspectiva CSS e springs do Framer Motion, tilt 3D no hero que reage ao mouse e micro-interações de toque. Acessibilidade como padrão: prefers-reduced-motion em todos os hooks, ARIA completo e navegação por teclado no carrossel. Rastreamento de leads via Google Tag Manager e deploy contínuo no Netlify.',
      img: '/projects/caminhos.png', site: 'netlify.app', video: '/video/caminhos.webm',
    },
  ],
  en: [
    {
      n: '01', name: 'Certara',
      tags: ['React · TypeScript', 'AWS Lambda · SAM', 'Stripe · RAG'],
      href: 'https://github.com/felippeximenes/certara-app',
      desc: 'SaaS platform for engineers preparing for AWS certifications (CLF-C02, SAA-C03, DVA-C02). Questions are generated in real time through a RAG pipeline: answers always come from the latest official documentation, never from static data. Features a full 65-question exam, user-history-adaptive flashcards, an AI-generated study plan, and shareable results. Back-end on 13 Python Lambdas (AWS SAM), Cognito + Google OAuth auth, Stripe subscriptions, and FingerprintJS anti-abuse protection.',
      img: '/projects/certara.png', site: 'certara.app', video: '/video/certara.mp4',
    },
    {
      n: '02', name: 'Certara Agent',
      tags: ['LangGraph · Agentic', 'AWS Lambda · SAM', 'RAG · Qdrant'],
      href: 'https://github.com/felippeximenes/certara-agent',
      desc: 'Conversational study assistant with agentic architecture built on LangGraph. For each AWS certification question, it plans the necessary steps (searching theory in Qdrant via RAG and querying real prices from the AWS Price List API) and executes them in sequence. A second structured-output model only activates when the deterministic path fails, keeping costs low. Per-session state via Postgres (Neon), serverless deploy on AWS SAM, and E2E coverage with Playwright.',
      img: '/projects/certara-agent.png', site: 'certara-agent', video: '/video/agent.webm',
    },
    {
      n: '03', name: 'EduTrack',
      tags: ['Node.js · Prisma · MySQL', 'React 19 · TypeScript', 'Playwright · PDF'],
      href: 'https://edu-track-blond-eta.vercel.app',
      desc: 'Online learning platform with three access profiles (student, instructor, and admin) with permissions enforced in two layers: route middleware and direct Prisma query checks. Upon 100% course completion, the system automatically issues a PDF certificate with a QR code for public third-party verification without login. Multi-platform deploy (Vercel + Railway) with reverse proxy, Zod-validated API contracts, and JWT auth.',
      img: '/projects/edutrack.png', site: 'edu-track-blond-eta.vercel.app', video: '/video/edutrack1.webm',
    },
    {
      n: '04', name: 'Moldz3D',
      tags: ['FastAPI · MongoDB', 'MercadoPago · Pix', 'React · WebGL2'],
      href: 'https://moldz3d.com.br',
      desc: 'E-commerce for 3D printing parts with a fully native checkout (Pix, boleto, and PCI-compliant card tokenization) and no external redirect. Real shipping rates by ZIP code (Melhor Envio), transactional emails, automatic refund processing, and an admin panel with PostHog analytics. Cloudflare Turnstile antibot protection, data compliance, and a GLSL shader rendered with pure WebGL2 in the hero. Stack: FastAPI + MongoDB Atlas on Railway, React on Vercel.',
      img: '/projects/moldz3d.png', site: 'moldz3d.com.br', video: '/video/moldz3d.webm',
    },
    {
      n: '05', name: 'Caminhos',
      tags: ['React · TypeScript', 'Framer Motion', 'Tailwind CSS v4'],
      href: 'https://quiet-bienenstitch-a8a314.netlify.app/',
      desc: 'Travel agency landing page rebuilt from scratch in React + TypeScript + Tailwind CSS v4, with a focus on motion design: 3D carousel with real CSS perspective and Framer Motion springs, a hero 3D tilt that reacts to mouse position, and touch micro-interactions. Accessibility as standard: prefers-reduced-motion on all hooks, full ARIA, and keyboard navigation in the carousel. Lead tracking via Google Tag Manager and continuous deploy on Netlify.',
      img: '/projects/caminhos.png', site: 'netlify.app', video: '/video/caminhos.webm',
    },
  ],
};

/* ─── Services ──────────────────────────────────────────────────────────── */
export const services: Record<Lang, Service[]> = {
  pt: [
    {
      title: 'Back-end & Cloud',
      desc: 'Construo a base técnica do seu produto: APIs sólidas, arquitetura serverless na AWS (Lambda, DynamoDB, API Gateway) e infraestrutura declarada como código com SAM. Do endpoint à política de acesso, tudo versionado, testado e reproduzível com um único deploy.',
      chips: ['Node.js · NestJS', 'FastAPI · Python', 'AWS SAM · DynamoDB'],
    },
    {
      title: 'Engenharia de IA & LLM',
      desc: 'IA que vai além do chatbot. Pipelines RAG com busca vetorial (Qdrant, PGVector), agentes que tomam decisões com LangGraph e integração ao Amazon Bedrock com fallback para quando o modelo falha. O objetivo é que o produto funcione, não que pareça usar IA.',
      chips: ['LangGraph · Agentic', 'Amazon Bedrock', 'Qdrant · PGVector'],
    },
    {
      title: 'Produtos completos',
      desc: 'Da conversa inicial ao produto publicado: front-end em React, back-end sólido, pagamentos reais (Stripe, MercadoPago), painel admin com analytics e conformidade com a LGPD. Você fica com o repositório, a infraestrutura e tudo que precisa para continuar o projeto com autonomia.',
      chips: ['React · TypeScript', 'Stripe · MercadoPago', 'Angular · Next.js'],
    },
  ],
  en: [
    {
      title: 'Back-end & Cloud',
      desc: 'I build the technical foundation of your product: solid APIs, serverless architecture on AWS (Lambda, DynamoDB, API Gateway), and infrastructure as code with SAM. From the endpoint to the access policy, everything versioned, tested, and reproducible with a single deploy.',
      chips: ['Node.js · NestJS', 'FastAPI · Python', 'AWS SAM · DynamoDB'],
    },
    {
      title: 'AI & LLM Engineering',
      desc: "AI that goes beyond the chatbot. RAG pipelines with vector search (Qdrant, PGVector), decision-making agents with LangGraph, and Amazon Bedrock integration with a fallback for when the model fails. The goal is for the product to work, not just to look like it uses AI.",
      chips: ['LangGraph · Agentic', 'Amazon Bedrock', 'Qdrant · PGVector'],
    },
    {
      title: 'Full products',
      desc: 'From the initial conversation to the live product: React front-end, solid back-end, real payments (Stripe, MercadoPago), admin panel with analytics, and data compliance. You walk away with the repository, the infrastructure, and everything you need to keep the project running independently.',
      chips: ['React · TypeScript', 'Stripe · MercadoPago', 'Angular · Next.js'],
    },
  ],
};

/* ─── Process steps ─────────────────────────────────────────────────────── */
export const steps: Record<Lang, Step[]> = {
  pt: [
    { n: '01', title: 'Conversa inicial',  desc: 'Entendo o objetivo, o público e o que já existe. Sem compromisso: é onde alinhamos expectativas antes de qualquer proposta.' },
    { n: '02', title: 'Escopo & proposta', desc: 'Defino entregas, prazos e valores numa proposta clara. Sem surpresas no meio do caminho.' },
    { n: '03', title: 'Desenvolvimento',   desc: 'Desenvolvo em ciclos curtos, com entregas parciais para você acompanhar e ajustar antes que vire problema.' },
    { n: '04', title: 'Entrega',           desc: 'Produto publicado, testado e documentado. Você fica com o repositório, as credenciais e tudo que é seu.' },
    { n: '05', title: 'Suporte',           desc: 'Um período de ajustes está incluso na entrega. Podemos combinar manutenção contínua se o projeto pedir.' },
  ],
  en: [
    { n: '01', title: 'Initial conversation', desc: "I understand the goal, the audience, and what already exists. No commitment: it's where we align expectations before any proposal." },
    { n: '02', title: 'Scope & proposal',     desc: 'I define deliverables, timelines, and pricing in a clear proposal. No surprise items midway.' },
    { n: '03', title: 'Development',          desc: 'I develop in short cycles with partial deliveries so you can track progress and adjust before it becomes a problem.' },
    { n: '04', title: 'Delivery',             desc: "Product published, tested, and documented. You walk away with the repository, credentials, and everything that's yours." },
    { n: '05', title: 'Support',              desc: 'An adjustment period is already included in the delivery. We can arrange ongoing maintenance if the project calls for it.' },
  ],
};

/* ─── FAQs ──────────────────────────────────────────────────────────────── */
export const faqs: Record<Lang, Faq[]> = {
  pt: [
    { q: 'Qual é o prazo típico de um projeto?', a: 'Depende do escopo: uma landing page leva de 1 a 2 semanas; aplicações completas com back-end e integrações costumam levar de 4 a 8 semanas. Depois da primeira conversa envio um cronograma detalhado.' },
    { q: 'Com quais tecnologias você trabalha?', a: 'No front, com React, Angular e Next.js. No back, com Node.js/NestJS e FastAPI em Python. Na infra, com AWS (Lambda, Bedrock, DynamoDB, SAM), MongoDB, PostgreSQL e bancos vetoriais (Qdrant, PGVector). Em IA, com pipelines RAG, agentes com LangGraph e LLMs via Amazon Bedrock.' },
    { q: 'O que você precisa para começar?', a: 'Uma conversa sobre o objetivo do projeto, referências que você gosta e o que já existe (marca, conteúdo, sistemas). A partir daí eu monto escopo e proposta.' },
    { q: 'Você oferece suporte após a entrega?', a: 'Sim. Todo projeto inclui um período de suporte para ajustes e correções. Podemos combinar manutenção contínua se fizer sentido.' },
    { q: 'Qual a melhor forma de falar com você?', a: 'Email: felippelpximenes@outlook.com. Também estou no LinkedIn e no GitHub; os links estão no rodapé.' },
  ],
  en: [
    { q: 'What is the typical timeline for a project?', a: 'It depends on the scope: a landing page takes 1 to 2 weeks; complete applications with back-end and integrations usually take 4 to 8 weeks. After our first conversation I send a detailed timeline.' },
    { q: 'What technologies do you work with?', a: 'On the front, React, Angular, and Next.js. On the back, Node.js/NestJS and FastAPI in Python. On infrastructure, AWS (Lambda, Bedrock, DynamoDB, SAM), MongoDB, PostgreSQL, and vector databases (Qdrant, PGVector). In AI, RAG pipelines, agents with LangGraph, and LLMs via Amazon Bedrock.' },
    { q: 'What do you need to get started?', a: 'A conversation about the project goal, references you like, and what already exists (brand, content, systems). From there I put together the scope and proposal.' },
    { q: 'Do you offer support after delivery?', a: 'Yes. Every project includes a support period for adjustments and fixes. We can arrange ongoing maintenance if it makes sense.' },
    { q: "What's the best way to reach you?", a: 'Email: felippelpximenes@outlook.com. Also on LinkedIn and GitHub; links are in the footer.' },
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
        'Automações com agentes de IA via n8n conectadas diretamente aos fluxos internos da empresa',
        'Dashboards automáticos no Notion via Make.com e integração CRM Pipedrive para visibilidade em tempo real',
        'Monitoramento de uptime e alertas proativos para aplicações em produção',
      ],
    },
    {
      company: 'Zosia AI', role: 'Desenvolvedor Full Stack Jr',
      period: 'Out 2025 – presente', current: true, year: '2025',
      chips: ['FastAPI', 'RAG', 'PGVector', 'NestJS', 'Angular 17', 'Playwright'],
      highlights: [
        'Pipeline RAG em produção com embeddings e busca semântica via PGVector para respostas contextualizadas',
        'Arquitetura de fallback garantindo continuidade do serviço mesmo em caso de falha no LLM',
        'Cobertura E2E do pipeline completo de IA com Playwright, validando comportamento real em produção',
      ],
    },
    {
      company: 'Freelancer', role: 'Desenvolvedor Full Stack',
      period: 'Jun 2024 – Nov 2025', year: '2024',
      chips: ['React', 'Netlify Functions', 'Pipedrive', 'GTM · GA4'],
      highlights: [
        'Criação de sites e aplicações responsivas do zero para clientes de pequenas empresas',
        'Integração CRM Pipedrive via Netlify Functions: leads do site criados automaticamente como negócios no CRM',
        'Deploy automatizado com Netlify CI/CD, gestão de variáveis de ambiente e estratégia de branches',
      ],
    },
    {
      company: 'Trem do Corcovado', role: 'Agente de Bilheteria Bilíngue',
      period: 'Dez 2022 – Jul 2024', year: '2022',
      chips: ['Trilíngue', 'Alto volume'],
      highlights: [
        'Atendimento trilíngue a visitantes internacionais (português, inglês e espanhol)',
        'Operação de sistemas de bilheteria e pagamentos em ambiente de alto fluxo no Corcovado',
      ],
    },
  ],
  en: [
    {
      company: 'Neocoder', role: 'Web Developer',
      period: 'Apr 2026 – present', current: true, year: '2026',
      chips: ['n8n', 'Make.com', 'Pipedrive', 'Uptime'],
      highlights: [
        'AI agent automations via n8n connected directly to internal company workflows',
        'Automated Notion dashboards via Make.com and Pipedrive CRM integration for real-time visibility',
        'Uptime monitoring and proactive alerts for production applications',
      ],
    },
    {
      company: 'Zosia AI', role: 'Full Stack Developer Jr',
      period: 'Oct 2025 – present', current: true, year: '2025',
      chips: ['FastAPI', 'RAG', 'PGVector', 'NestJS', 'Angular 17', 'Playwright'],
      highlights: [
        'Production RAG pipeline with embeddings and semantic search via PGVector for contextualized responses',
        'Fallback architecture ensuring service continuity even on LLM failure',
        'Full E2E coverage of the AI pipeline with Playwright, validating real production behavior',
      ],
    },
    {
      company: 'Freelancer', role: 'Full Stack Developer',
      period: 'Jun 2024 – Nov 2025', year: '2024',
      chips: ['React', 'Netlify Functions', 'Pipedrive', 'GTM · GA4'],
      highlights: [
        'Built responsive sites and applications from scratch for small business clients',
        'Pipedrive CRM integration via Netlify Functions: site leads automatically created as CRM deals',
        'Automated deploy with Netlify CI/CD, environment variable management, and branching strategy',
      ],
    },
    {
      company: 'Trem do Corcovado', role: 'Bilingual Box Office Agent',
      period: 'Dec 2022 – Jul 2024', year: '2022',
      chips: ['Trilingual', 'High volume'],
      highlights: [
        'Trilingual customer service for international visitors (Portuguese, English, and Spanish)',
        'Ticketing and payment system operations in a high-volume environment at Corcovado',
      ],
    },
  ],
};
