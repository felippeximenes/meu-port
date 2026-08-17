# Felippe Ximenes — Portfolio

Portfolio pessoal desenvolvido com React + TypeScript, focado em performance e animações fluidas!

## Stack

- **React 18** + **TypeScript** via Vite
- **Framer Motion** (`motion/react`) — animações de entrada e transições
- **GSAP** + ScrollTrigger — animações de scroll (Skills, Experience)
- **Three.js** + OGL — globo 3D interativo no footer
- **react-router-dom** — roteamento SPA
- **simple-icons** + **d3-geo** — ícones de tecnologias e projeção do globo

## Estrutura

```
src/
├── components/     # Hero, Nav, Projects, Skills, Experience, Services, Process, FaqSection, Footer
├── hooks/          # useReveal, usePinProgress, useIsMobile
├── data.ts         # Projetos, skills, FAQs e dados estáticos
└── index.css       # Tokens CSS + responsivo mobile
```

## Rodando localmente

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Features

- Layout responsivo (mobile-first a partir de 768px)
- Efeito sticky scroll na seção de projetos (desktop e mobile)
- Animações de entrada com Framer Motion e reveal por scroll com GSAP
- Globo 3D carregado com lazy load via IntersectionObserver
- Noise texture sutil no hero e seções escuras
