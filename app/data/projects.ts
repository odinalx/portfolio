export type Project = {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  githubUrl?: string;
  featured?: boolean;
  techs: { name: string; iconSrc: string }[];
};

const nextStack = [
  { name: 'Next.js', iconSrc: '/nextdotjs.svg' },
  { name: 'React', iconSrc: '/react.svg' },
  { name: 'TypeScript', iconSrc: '/typescript.svg' },
  { name: 'Tailwind', iconSrc: '/tailwindcss.svg' },
  { name: 'Docker', iconSrc: '/docker.svg' },
];

export const projects: Project[] = [
  {
    slug: 'organizy',
    title: 'Organizy',
    description:
      'A project management SaaS platform with kanban boards, drag & drop task management, data visualizations, and team collaboration tools.',
    imageSrc: '/organizy.png',
    imageAlt: 'Preview Organizy',
    href: 'https://organizy.fr',
    featured: true,
    techs: [
      { name: 'Vue 3', iconSrc: '/vuedotjs.svg' },
      { name: 'TypeScript', iconSrc: '/typescript.svg' },
      { name: 'FastAPI', iconSrc: '/fastapi.svg' },
      { name: 'Tailwind', iconSrc: '/tailwindcss.svg' },
      { name: 'Docker', iconSrc: '/docker.svg' },
    ],
  },
  {
    slug: 'nen-destiny',
    title: 'Nen Destiny',
    description:
      'A Hunter x Hunter life simulator: take the Hunter exam, awaken your Nen, draw one of 66 named Hatsu and let 450+ branching events seal your fate. Fully client-side, bilingual FR/EN.',
    imageSrc: '/nendestiny.webp',
    imageAlt: 'Preview Nen Destiny',
    href: 'https://nendestiny.odinalx.dev',
    featured: true,
    techs: nextStack,
  },
  {
    slug: 'soul-destiny',
    title: 'Soul Destiny',
    description:
      'A Bleach life simulator: live for centuries as a Shinigami, Hollow, Quincy or Human, with 280+ named powers, 57 achievements and a shareable life card.',
    imageSrc: '/souldestiny.webp',
    imageAlt: 'Preview Soul Destiny',
    href: 'https://souldestiny.odinalx.dev',
    techs: nextStack,
  },
  {
    slug: 'skillzy',
    title: 'Skillzy',
    description:
      'An AI-powered skill tracking and learning platform with Gemini integration, Stripe billing, and full internationalization support.',
    imageSrc: '/skillzy.webp',
    imageAlt: 'Preview Skillzy',
    href: 'https://skillzy.fr',
    techs: [
      { name: 'Vue 3', iconSrc: '/vuedotjs.svg' },
      { name: 'TypeScript', iconSrc: '/typescript.svg' },
      { name: 'FastAPI', iconSrc: '/fastapi.svg' },
      { name: 'Tailwind', iconSrc: '/tailwindcss.svg' },
      { name: 'Docker', iconSrc: '/docker.svg' },
    ],
  },
  {
    slug: 'portfolio-v2',
    title: 'Portfolio V2',
    description:
      'This portfolio — designed and built from scratch with fluid animations, a custom cursor, and a focus on performance and user experience.',
    imageSrc: '/portfolio.png',
    imageAlt: 'Preview Portfolio V2',
    href: 'https://odinalx.fr',
    githubUrl: 'https://github.com/odinalx/portfolio',
    featured: true,
    techs: [
      { name: 'Next.js', iconSrc: '/nextdotjs.svg' },
      { name: 'React', iconSrc: '/react.svg' },
      { name: 'TypeScript', iconSrc: '/typescript.svg' },
      { name: 'Tailwind', iconSrc: '/tailwindcss.svg' },
    ],
  },
  {
    slug: 'secret-santa',
    title: 'SecretSanta',
    description:
      'A modern web application for organizing Secret Santa gift exchanges with friends, family, or colleagues.',
    imageSrc: '/secret-santa.webp',
    imageAlt: 'Preview Secret-Santa',
    href: 'https://secretsanta.lorisalex.com/',
    githubUrl: 'https://github.com/odinalx/SecretSanta',
    techs: [
      { name: 'Docker', iconSrc: '/docker.svg' },
      { name: 'Next.js', iconSrc: '/nextdotjs.svg' },
      { name: 'Tailwind', iconSrc: '/tailwindcss.svg' },
    ],
  },
  {
    slug: 'slv-app',
    title: 'SLV App',
    description:
      'Final-year project: development of a management website for an association overseeing around fifteen sports and leisure sections.',
    imageSrc: '/test.png',
    imageAlt: 'Preview SLV App',
    githubUrl: 'https://github.com/odinalx/Projet-tutore',
    techs: [
      { name: 'Vue.JS', iconSrc: '/vuedotjs.svg' },
      { name: 'Tailwind', iconSrc: '/tailwindcss.svg' },
      { name: 'PHP', iconSrc: '/php.svg' },
    ],
  },
  {
    slug: 'portfolio-v1',
    title: 'Portfolio V1',
    description:
      'First iteration of my portfolio, created as part of an academic project.',
    imageSrc: '/test.png',
    imageAlt: 'Preview Portfolio V1',
    githubUrl: 'https://github.com/odinalx/PortfolioV1',
    techs: [
      { name: 'Next.js', iconSrc: '/nextdotjs.svg' },
      { name: 'Tailwind', iconSrc: '/tailwindcss.svg' },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
