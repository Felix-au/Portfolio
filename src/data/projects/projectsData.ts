export type ProjectCategory = 'websites' | 'applications' | 'ai-ml';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  accentColor: string;
  liveUrl?: string;
  githubUrl?: string;
  category: ProjectCategory;
  logoLight?: string;
  logoDark?: string;
}

export interface ProjectTab {
  id: ProjectCategory;
  label: string;
  emoji: string;
}

export const PROJECT_TABS: ProjectTab[] = [
  { id: 'websites', label: 'Websites', emoji: '🌐' },
  { id: 'applications', label: 'Applications', emoji: '💻' },
  { id: 'ai-ml', label: 'Gen AI, ML & DL', emoji: '🧠' },
];

export const PROJECTS: Project[] = [
  // ── Websites ──────────────────────────────────────────────
  {
    id: 'arenax',
    title: 'ArenaX',
    tagline: 'Multi-Sport Booking Platform',
    description:
      'Multi-sport access & arena booking platform connecting players with turf grounds, courts, and pools through flexible subscription passes across India.',
    techStack: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'PWA',
      'Sports Booking',
      'Local-First',
      'Subscription Platform',
      'Responsive Design'
    ],
    accentColor: '#00e5ff',
    liveUrl: 'https://arenax.felixau.in/',
    githubUrl: 'https://github.com/Felix-au/ArenaX',
    category: 'websites',
    logoLight: '/logos/arenax-light.png',
    logoDark: '/logos/arenax-dark.png',
  },
  {
    id: 'cursorx',
    title: 'CursorX',
    tagline: 'Interactive Cursor Effects Library',
    description:
      '20+ custom cursor effects for developers with live interactive previews, copy-paste code snippets, AI prompts, and a full config panel. Built with React + Canvas API.',
    techStack: [
      'React',
      'Canvas API',
      'Vite',
      'WebGL',
      'Web Animation',
      'UI Effects',
      'Developer Tools'
    ],
    accentColor: '#f59e0b',
    liveUrl: 'https://cursorx.felixau.in/',
    githubUrl: 'https://github.com/Felix-au/CursorX-Interactive-Cursor-Effects',
    category: 'websites',
    logoLight: '/logos/cursorx-light.png',
    logoDark: '/logos/cursorx-dark.png',
  },
  {
    id: '3d-constructs',
    title: '3D Constructs Library',
    tagline: 'WebGL Coordinate Distribution Vault',
    description:
      'A developer library and resource vault for getting pre-compiled 3D particle coordinate distributions to implement interactive 3D particle meshes (like brains, lightbulbs, helixes, and spheres) on their websites.',
    techStack: [
      'Next.js',
      'Three.js',
      'WebGL Canvas',
      'Creative Coding',
      'Particle Physics',
      'TypeScript'
    ],
    accentColor: '#10b981',
    liveUrl: 'https://3dconstructs.felixau.in/',
    githubUrl: 'https://github.com/Felix-au/3d-Constructs-Library',
    category: 'websites',
    logoLight: '/logos/3d-construct-light.png',
    logoDark: '/logos/3d-construct-dark.png',
  },
  {
    id: 'email-workspace',
    title: 'Email Workspace',
    tagline: 'Self-Hosted Domain Email Hub',
    description:
      'A lightweight, self-hosted custom domain email workspace template built on Next.js, NextAuth, and MongoDB, utilizing the Resend API to provide a cost-effective, multi-user alternative to enterprise business email hosting.',
    techStack: [
      'Next.js',
      'NextAuth',
      'MongoDB',
      'Resend API',
      'Email Client',
      'Self-Hosted',
      'Developer Tools'
    ],
    accentColor: '#10b981',
    liveUrl: 'https://email.felixau.in',
    githubUrl: 'https://github.com/Felix-au/Email-Workspace-Your-Mail-Your-Rules',
    category: 'websites',
    logoLight: '/logos/Email-Workspace-light.png',
    logoDark: '/logos/Email-Workspace-Dark.png',
  },
  {
    id: 'synczen-cloud',
    title: 'SyncZen Cloud',
    tagline: 'PMS & Hotel Check-in Portal',
    description:
      'A property management system (PMS) and hotel check-in dashboard built on Next.js 15, NextAuth v5, MongoDB, and Cloudinary. Features a 4-step check-in wizard, in-browser guest photo cropping, employee RBAC, and system-wide activity logs.',
    techStack: [
      'Next.js 15',
      'NextAuth v5',
      'MongoDB',
      'Cloudinary',
      'RBAC',
      'Activity Logs',
      'Framer Motion'
    ],
    accentColor: '#f97316',
    liveUrl: 'https://synczen.felixau.in',
    githubUrl: 'https://github.com/Felix-au/SyncZen-Cloud',
    category: 'websites',
    logoLight: '/logos/synczen-light.png',
    logoDark: '/logos/synczen-dark.png',
  },

  // ── Applications ──────────────────────────────────────────
  {
    id: 'sonixx',
    title: 'Sonixx',
    tagline: 'OS-Level Audio Routing',
    description:
      'Official landing website for Sonixx, a native Windows virtual audio router that captures per-app live audio and mic streams into a virtual mic for Discord, OBS, and games. Built with React 19, Vite 8 and WebGL Canvas.',
    techStack: [
      'React 19',
      'Vite',
      'WebGL Canvas',
      'Audio Mixer',
      'Audio Router',
      'Glassmorphism',
      'Streaming Tools'
    ],
    accentColor: '#ec4899',
    liveUrl: 'https://sonixx.felixau.in/',
    githubUrl: 'https://github.com/Felix-au/Sonixx-Website-Audio-Routing-and-Soundbaord',
    category: 'applications',
    logoLight: '/logos/sonixx-light.png',
    logoDark: '/logos/sonixx-dark.png',
  },
  {
    id: 'corvusx',
    title: 'CorvusX',
    tagline: 'Stealth Desktop AI Assistant',
    description:
      'Stealth desktop AI assistant & interactive web showcase for CorvusX built with React 19, TypeScript, and Vite. Features a 60 FPS 3D particle canvas engine and a simulated Windows desktop environment with a sandboxed JS execution engine.',
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      '3D Particles',
      'Desktop Simulator',
      'Code Sandbox',
      'GSAP',
      'Framer Motion'
    ],
    accentColor: '#ef4444',
    liveUrl: 'https://corvusx.felixau.in/',
    githubUrl: 'https://github.com/Felix-au/CorvusX-Website-Intelligence-in-the-Shadows',
    category: 'applications',
    logoLight: '/logos/corvusx-light.png',
    logoDark: '/logos/corvusx-dark.png',
  },
  {
    id: 'prashnasetu',
    title: 'PrashnaSetu',
    tagline: 'Secure Quiz Management Platform',
    description:
      'A secure, local-first quiz management system for academic institutions featuring a proctored JavaFX desktop client, an mDNS-discoverable Spring Boot local database server, and a React-based results web portal synced with MongoDB Atlas.',
    techStack: [
      'JavaFX',
      'Spring Boot',
      'React',
      'MongoDB Atlas',
      'Local-First',
      'mDNS Discovery',
      'MySQL'
    ],
    accentColor: '#3b82f6',
    liveUrl: 'https://prashnasetu.com',
    githubUrl: 'https://github.com/Felix-au/PrashnaSetu-Public',
    category: 'applications',
    logoLight: '/logos/prashnasetu-light.png',
    logoDark: '/logos/prashnasetu-dark.png',
  },

  // ── Gen AI, ML & DL ──────────────────────────────────────
  {
    id: 'cognitox',
    title: 'CognitoX',
    tagline: 'Unified Intelligence Workspace',
    description:
      'A unified intelligence workspace combining Canvas OCR, Sobel & Canny edge shaders, YouTube transcript analysis, and interactive Mermaid.js diagram compilation. Built on Next.js 15, Prisma, and MongoDB.',
    techStack: [
      'Next.js 15',
      'Prisma',
      'MongoDB',
      'Canvas OCR',
      'Edge Detection Shaders',
      'SSE Streaming',
      'Mermaid.js'
    ],
    accentColor: '#7c3aed',
    liveUrl: 'https://cognitox.felixau.in/',
    githubUrl: 'https://github.com/Felix-au/CognitoX-Unified-Intelligence',
    category: 'ai-ml',
    logoLight: '/logos/cognitox-light.png',
    logoDark: '/logos/cognitox-dark.png',
  },
  {
    id: 'omnikey',
    title: 'OmniKey AI',
    tagline: 'Unified LLM Gateway Proxy',
    description:
      'A self-hosted LLM proxy and failover gateway supporting OpenAI & Gemini compatible endpoints. Routes requests dynamically across 12+ LLM platforms with automatic fallback, key scheduling, rate-limit tracking and encrypted credential storage.',
    techStack: [
      'React',
      'Express',
      'TypeScript',
      'LLM Router',
      'AI Gateway',
      'Reverse Proxy',
      'Rate Limiting'
    ],
    accentColor: '#8b5cf6',
    liveUrl: 'https://omnikeyai.felixau.in',
    githubUrl: 'https://github.com/Felix-au/OmniKey-AI-Unified-Key-Manager',
    category: 'ai-ml',
    logoLight: '/logos/omnikey-light.png',
    logoDark: '/logos/omnikey-dark.png',
  },
];

/** Get projects filtered by category */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return PROJECTS.filter((p) => p.category === category);
}
