export interface Project {
  id: string
  title: string
  slug: string
  tags: string[]
  description: string
  bgClass: string
  year: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'LumeX',
    slug: 'lumex',
    tags: ['SaaS', 'Dashboard Design'],
    description:
      'LumeX is a powerful SaaS platform designed to streamline workflows and boost productivity through intuitive data visualization.',
    bgClass: 'bg--lumex',
    year: '2024',
  },
  {
    id: '2',
    title: 'Planza',
    slug: 'planza',
    tags: ['Framer Website'],
    description:
      'Planza is a modern project management platform built for creative teams who value clarity and collaboration.',
    bgClass: 'bg--planza',
    year: '2024',
  },
  {
    id: '3',
    title: 'Horizon Atlas',
    slug: 'horizon-atlas',
    tags: ['Travel', 'Web Design'],
    description:
      'Horizon Atlas is a travel discovery platform that connects wanderers with hidden gems around the world.',
    bgClass: 'bg--horizon',
    year: '2023',
  },
  {
    id: '4',
    title: 'NeuroSync',
    slug: 'neurosync',
    tags: ['Healthcare', 'Mobile App'],
    description:
      'NeuroSync is a healthcare mobile app helping users track and improve their mental wellness through evidence-based techniques.',
    bgClass: 'bg--neurosync',
    year: '2023',
  },
]
