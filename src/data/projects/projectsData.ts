export type ProjectCategory = 'websites' | 'applications' | 'ai-ml';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  accentColor?: string;
  liveUrl?: string;
  githubUrl?: string;
  category: ProjectCategory;
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
    id: 'prashnasetu',
    title: 'PrashnaSetu',
    tagline: 'Secure Assessment Portal',
    description:
      'Enterprise-grade examination platform powering secure online assessments for educational institutions. Features real-time proctoring, randomized question banks, and detailed analytics dashboards.',
    techStack: ['Next.js', 'PostgreSQL', 'JWT', 'Tailwind CSS', 'Prisma'],
    accentColor: '#6366f1', // Specified!
    liveUrl: 'https://prashnasetu.com',
    category: 'websites',
  },
  {
    id: 'omnikey-web',
    title: 'OmniKey AI',
    tagline: 'AI Model Hosting & Unified API Gateway',
    description:
      'Centralized platform for hosting, managing, and accessing multiple AI models through a single API gateway. Features usage analytics, rate limiting, and multi-tenant key management.',
    techStack: ['React', 'FastAPI', 'Redis', 'Docker', 'Stripe'],
    liveUrl: 'https://omnikeyai.felixau.in',
    githubUrl: 'https://github.com/Felix-au/OmniKey-AI',
    category: 'websites',
  },
  {
    id: 'portfolio',
    title: 'Felix Au Portfolio',
    tagline: 'Interactive 3D Portfolio',
    description:
      'This portfolio site featuring custom WebGL displacement sphere shaders, Katakana glyph decoding text effects, scroll-snap navigation, and a modular project showcase architecture.',
    techStack: ['React', 'Three.js', 'GLSL', 'Vite', 'Framer Motion'],
    liveUrl: 'https://felixau.in',
    githubUrl: 'https://github.com/Felix-au/Portfolio',
    category: 'websites',
  },
  {
    id: 'cursorx-landing',
    title: 'CursorX',
    tagline: 'Custom Cursor Effects Library',
    description:
      'Showcase site for CursorX — a plug-and-play cursor effects library. Demonstrates magnetic, spotlight, trail, and parallax cursor modes with interactive playgrounds.',
    techStack: ['Vanilla JS', 'Canvas API', 'CSS Animations', 'Vite'],
    liveUrl: 'https://cursorx.felixau.in',
    githubUrl: 'https://github.com/Felix-au/CursorX',
    category: 'websites',
  },
  {
    id: '3d-constructs',
    title: '3D Constructs Library',
    tagline: 'Interactive 3D Graphics Documentation',
    description:
      'Documentation and demo site for the 3D Constructs library. Features live WebGL previews, interactive code editors, and comprehensive API reference pages.',
    techStack: ['Next.js', 'Three.js', 'MDX', 'TypeScript'],
    liveUrl: 'https://3dconstructs.felixau.in',
    githubUrl: 'https://github.com/Felix-au/3D-Constructs',
    category: 'websites',
  },

  // ── Applications ──────────────────────────────────────────
  {
    id: 'sonixx',
    title: 'Sonixx',
    tagline: 'OS-Level Audio Management',
    description:
      'Windows desktop utility for advanced audio routing, per-application volume control, and system-wide equalization. Interfaces directly with WASAPI for zero-latency audio processing.',
    techStack: ['Electron', 'WASAPI', 'C++', 'Node.js', 'Win32 API'],
    accentColor: '#ec4899', // Specified!
    liveUrl: 'https://sonixx.felixau.in',
    githubUrl: 'https://github.com/Felix-au/Sonixx',
    category: 'applications',
  },
  {
    id: 'corvusx',
    title: 'CorvusX',
    tagline: 'AI-Powered Desktop Assistant',
    description:
      'Intelligent desktop assistant with voice commands, contextual awareness, and multi-model AI integration. Features system control, file management, and natural language task execution.',
    techStack: ['Python', 'PySide6', 'OpenAI', 'Whisper', 'SQLite'],
    liveUrl: 'https://corvusx.felixau.in',
    githubUrl: 'https://github.com/Felix-au/CorvusX',
    category: 'applications',
  },
  {
    id: 'mousex',
    title: 'MouseX',
    tagline: 'Absolute Mouse Control Utility',
    description:
      'Precision mouse control tool for Windows providing absolute positioning, custom acceleration curves, and multi-monitor coordinate mapping via low-level Win32 hooks.',
    techStack: ['C++', 'Win32 API', 'Koffi FFI', 'Node.js'],
    githubUrl: 'https://github.com/Felix-au/MouseX-Absolute-Mouse-Control',
    category: 'applications',
  },
  {
    id: 'deskx',
    title: 'DeskX',
    tagline: 'Live Wallpaper Engine',
    description:
      'Dynamic live wallpaper engine for Windows desktops. Supports WebGL shaders, video wallpapers, and interactive HTML5 backgrounds rendered behind desktop icons.',
    techStack: ['Electron', 'WebGL', 'Win32 API', 'GLSL', 'FFmpeg'],
    githubUrl: 'https://github.com/Felix-au/DeskX-Wallpaper-Engine',
    category: 'applications',
  },
  {
    id: 'algobuddy',
    title: 'AlgoBuddy',
    tagline: 'Algorithm Visualization Tool',
    description:
      'Interactive algorithm visualization and learning platform. Animates sorting, searching, graph traversal, and dynamic programming algorithms step-by-step with complexity analysis.',
    techStack: ['Java', 'JavaFX', 'Graph Theory', 'CSS'],
    githubUrl: 'https://github.com/Felix-au/AlgoBuddy',
    category: 'applications',
  },

  // ── Gen AI, ML & DL ──────────────────────────────────────
  {
    id: 'omnikey-engine',
    title: 'OmniKey AI Engine',
    tagline: 'Multi-Model LLM Inference Pipeline',
    description:
      'High-performance inference server supporting multiple LLM architectures with dynamic batching, quantization, and streaming responses. Optimized for low-latency production deployments.',
    techStack: ['PyTorch', 'FastAPI', 'CUDA', 'Docker', 'Redis'],
    githubUrl: 'https://github.com/Felix-au/OmniKey-AI',
    category: 'ai-ml',
  },
  {
    id: 'neuralstylex',
    title: 'NeuralStyleX',
    tagline: 'Real-Time Neural Style Transfer',
    description:
      'GPU-accelerated neural style transfer application with real-time preview. Implements adaptive instance normalization and supports custom style images with adjustable intensity.',
    techStack: ['TensorFlow', 'OpenCV', 'Flask', 'WebSocket', 'CUDA'],
    githubUrl: 'https://github.com/Felix-au/NeuralStyleX',
    category: 'ai-ml',
  },
  {
    id: 'visionlab',
    title: 'VisionLab',
    tagline: 'Computer Vision Experiment Suite',
    description:
      'Computer vision research toolkit with pre-trained model zoo, custom training pipelines, and real-time inference demos. Includes object detection, segmentation, and pose estimation.',
    techStack: ['PyTorch', 'Hugging Face', 'Jupyter', 'OpenCV', 'Gradio'],
    githubUrl: 'https://github.com/Felix-au/VisionLab',
    category: 'ai-ml',
  },
  {
    id: 'sentimentscope',
    title: 'SentimentScope',
    tagline: 'NLP Sentiment Analysis Dashboard',
    description:
      'End-to-end sentiment analysis platform with social media data ingestion, multi-language support, and interactive visualization dashboards showing real-time sentiment trends.',
    techStack: ['Scikit-Learn', 'Pandas', 'Streamlit', 'spaCy', 'Plotly'],
    githubUrl: 'https://github.com/Felix-au/SentimentScope',
    category: 'ai-ml',
  },
  {
    id: 'ganforge',
    title: 'GANForge',
    tagline: 'GAN Image Generation Toolkit',
    description:
      'Generative adversarial network toolkit for high-resolution image synthesis. Implements DCGAN, StyleGAN, and conditional GAN architectures with experiment tracking and model comparison.',
    techStack: ['PyTorch', 'DCGAN', 'W&B', 'NumPy', 'Matplotlib'],
    githubUrl: 'https://github.com/Felix-au/GANForge',
    category: 'ai-ml',
  },
];

/** Get projects filtered by category */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return PROJECTS.filter((p) => p.category === category);
}
