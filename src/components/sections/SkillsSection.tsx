import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import GlareHover from '../ui/GlareHover';
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiRust,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiThreedotjs,
  SiFramer,
  SiFastapi,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiDjango,
  SiGraphql,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiOpencv,
  SiHuggingface,
  SiScikitlearn,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiMariadb,
  SiRedis,
  SiFirebase,
  SiDocker,
  SiKubernetes,
  SiNginx,
  SiGithubactions,
  SiGit,
  SiGithub,
  SiElectron,
  SiQt,
  SiJupyter,
  SiPostman,
} from 'react-icons/si';

import { FaJava, FaAws } from 'react-icons/fa6';
import { VscVscode } from 'react-icons/vsc';

import {
  Cpu,
  Zap,
  Award,
  ExternalLink,
  CheckCircle2,
  Volume2,
  Database,
  Layers,
  Code2,
  Cloud,
  Brain,
  Palette,
  Package,
  GraduationCap,
  FileCheck,
  Medal,
  FileText,
  X,
  Clock,
  Sparkles,
} from 'lucide-react';

import styles from './SkillsSection.module.css';
import rawSpecializationCerts from '../../data/credentials/specialization_certificates.json';
import rawCourseCerts from '../../data/credentials/course_certificates.json';
import rawBadges from '../../data/credentials/badges.json';

interface TechItem {
  name: string;
  icon: React.ReactNode;
  color?: string;
}

interface CategoryGroup {
  id: string;
  title: string;
  emojiIcon: string;
  items: TechItem[];
}

interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills?: string[];
  link?: string;
  badgeUrl?: string;
  pdfUrl?: string;
  whatWasLearnt?: string[];
}

const GoogleLogoSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
    />
  </svg>
);

const MicrosoftLogoSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
    <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
    <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
    <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
  </svg>
);

const IbmLogoSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* IBM 8-bar logo — official horizontal stripe pattern */}
    <rect x="0"  y="4"  width="64" height="6"  fill="#0f62fe" rx="1"/>
    <rect x="8"  y="14" width="48" height="6"  fill="#0f62fe" rx="1"/>
    <rect x="8"  y="24" width="16" height="6"  fill="#0f62fe" rx="1"/>
    <rect x="40" y="24" width="16" height="6"  fill="#0f62fe" rx="1"/>
    <rect x="8"  y="34" width="16" height="6"  fill="#0f62fe" rx="1"/>
    <rect x="40" y="34" width="16" height="6"  fill="#0f62fe" rx="1"/>
    <rect x="8"  y="44" width="48" height="6"  fill="#0f62fe" rx="1"/>
    <rect x="0"  y="54" width="64" height="6"  fill="#0f62fe" rx="1"/>
  </svg>
);

function getCompanyLogo(issuer: string) {
  const lower = issuer.toLowerCase();
  if (lower.includes('google')) return <GoogleLogoSvg className={styles.companyBgLogo} />;
  if (lower.includes('microsoft')) return <MicrosoftLogoSvg className={styles.companyBgLogo} />;
  if (lower.includes('ibm')) return <IbmLogoSvg className={styles.companyBgLogo} />;
  return <Award className={styles.companyBgLogo} />;
}

function shortenSkillName(skill: string): string {
  const map: Record<string, string> = {
    'Retrieval-Augmented Generation': 'RAG',
    'Retrieval Augmented Generation': 'RAG',
    'Artificial Intelligence': 'AI',
    'Artificial Intelligence and Machine Learning (AI/ML)': 'AI/ML',
    'Machine Learning': 'ML',
    'Generative AI': 'Gen AI',
    'Large Language Models': 'LLMs',
    'Generative Adversarial Networks (GANs)': 'GANs',
    'Convolutional Neural Networks': 'CNNs',
    'Recurrent Neural Networks': 'RNNs',
    'Natural Language Processing': 'NLP',
    'Computer Vision': 'CV',
    'Deep Learning': 'DL',
    'Interactive Data Visualization': 'Data Viz',
    'Data Visualization': 'Data Viz',
    'Spreadsheet Software': 'Spreadsheets',
    'Bash (Scripting Language)': 'Bash',
    'Intrusion Detection and Prevention': 'IDPS',
    'Computer Security Incident Management': 'Incident Mgmt',
    'Cyber Threat Intelligence': 'Threat Intel',
    'Vulnerability Management': 'Vulnerability Mgmt',
    'Endpoint Detection and Response': 'EDR',
  };

  if (map[skill]) return map[skill];

  let cleaned = skill;
  cleaned = cleaned.replace(/Retrieval-Augmented Generation/gi, 'RAG');
  cleaned = cleaned.replace(/Artificial Intelligence/gi, 'AI');
  cleaned = cleaned.replace(/Machine Learning/gi, 'ML');
  return cleaned;
}

function formatCardSkills(rawSkills: string[] = []): string[] {
  const shortened = rawSkills.map(shortenSkillName);
  if (shortened.length <= 8) {
    return shortened;
  }
  const top7 = shortened.slice(0, 7);
  const extraCount = shortened.length - 7;
  return [...top7, `+${extraCount} more`];
}

function formatCertTitle(title: string): string {
  let formatted = title;
  formatted = formatted.replace(/\bGenerative\b/g, 'Gen');
  formatted = formatted.replace(/\bEngineering\b/g, 'Eng.');
  formatted = formatted.replace(/\band\b/g, '&');
  return formatted;
}

function distributeSkillStrings(skills: string[]): string[][] {
  if (skills.length === 0) return [];

  const hasExtra = skills.length > 0 && skills[skills.length - 1].startsWith('+');
  const extraBadge = hasExtra ? skills[skills.length - 1] : null;
  const regularSkills = hasExtra ? skills.slice(0, -1) : skills;

  // Sort regular skills descending by string length
  const sorted = [...regularSkills].sort((a, b) => b.length - a.length);

  const ROWS = 4;
  const rows: { items: string[]; totalLen: number }[] = Array.from({ length: ROWS }, () => ({
    items: [],
    totalLen: 0,
  }));

  // Distribute regular skills greedily to the row with the smallest current total character length
  sorted.forEach((skill) => {
    let minRowIndex = 0;
    for (let i = 1; i < ROWS; i++) {
      const effectiveLen = rows[i].totalLen + (i === 3 && extraBadge ? 8 : 0);
      const minEffectiveLen = rows[minRowIndex].totalLen + (minRowIndex === 3 && extraBadge ? 8 : 0);
      if (effectiveLen < minEffectiveLen) {
        minRowIndex = i;
      }
    }
    rows[minRowIndex].items.push(skill);
    rows[minRowIndex].totalLen += skill.length;
  });

  // Always append +N more badge as the final badge of the 4th row (bottom right)
  if (extraBadge) {
    rows[ROWS - 1].items.push(extraBadge);
  }

  return rows.map((r) => r.items).filter((items) => items.length > 0);
}

const SKILL_CATEGORIES: CategoryGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    emojiIcon: '🔤',
    items: [
      { name: 'Java', icon: <FaJava />, color: '#ed8b00' },
      { name: 'Python', icon: <SiPython />, color: '#3776ab' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178c6' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
      { name: 'C++', icon: <SiCplusplus />, color: '#00599c' },
      { name: 'Rust', icon: <SiRust />, color: '#000000' },
      { name: 'GLSL', icon: <Code2 />, color: '#5586a4' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#e34f26' },
      { name: 'CSS3', icon: <SiCss />, color: '#1572b6' },
      { name: 'SQL', icon: <Database />, color: '#336791' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    emojiIcon: '🎨',
    items: [
      { name: 'React', icon: <SiReact />, color: '#61dafb' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
      { name: 'Vite', icon: <SiVite />, color: '#646cff' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06b6d4' },
      { name: 'Three.js', icon: <SiThreedotjs />, color: '#000000' },
      { name: 'WebGL', icon: <Palette />, color: '#990000' },
      { name: 'Framer Motion', icon: <SiFramer />, color: '#0055ff' },
      { name: 'HTML Canvas', icon: <Layers />, color: '#e34f26' },
      { name: 'JavaFX', icon: <Package />, color: '#ed8b00' },
      { name: 'EJS', icon: <Code2 />, color: '#a91e50' },
    ],
  },
  {
    // Backend gains Nginx (web server) from dissolved Cloud section
    id: 'backend',
    title: 'Backend',
    emojiIcon: '⚙️',
    items: [
      { name: 'FastAPI', icon: <SiFastapi />, color: '#009688' },
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
      { name: 'Express.js', icon: <SiExpress />, color: '#000000' },
      { name: 'Spring Boot', icon: <SiSpringboot />, color: '#6db33f' },
      { name: 'Django', icon: <SiDjango />, color: '#092e20' },
      { name: 'RESTful APIs', icon: <Zap />, color: '#ffb703' },
      { name: 'GraphQL', icon: <SiGraphql />, color: '#e10098' },
      { name: 'WebSockets', icon: <Zap />, color: '#00e5ff' },
      { name: 'Nginx', icon: <SiNginx />, color: '#009639' },
    ],
  },
  {
    // Renamed from "AI & Machine Learning" → "Frameworks & Libraries"
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    emojiIcon: '🤖',
    items: [
      { name: 'PyTorch', icon: <SiPytorch />, color: '#ee4c2c' },
      { name: 'TensorFlow', icon: <SiTensorflow />, color: '#ff6f00' },
      { name: 'Keras', icon: <SiKeras />, color: '#d00000' },
      { name: 'OpenCV', icon: <SiOpencv />, color: '#5c3ee8' },
      { name: 'Hugging Face', icon: <SiHuggingface />, color: '#ffd21e' },
      { name: 'Scikit-Learn', icon: <SiScikitlearn />, color: '#f7931e' },
      { name: 'Win32 Koffi FFI', icon: <Cpu />, color: '#00a4ef' },
      { name: 'WASAPI', icon: <Volume2 />, color: '#00e5ff' },
    ],
  },
  {
    // Databases & Storage (cloud providers Vercel/Render/Railway removed)
    id: 'databases',
    title: 'Databases & Infrastructure',
    emojiIcon: '🗄️',
    items: [
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169e1' },
      { name: 'MongoDB Atlas', icon: <SiMongodb />, color: '#47a248' },
      { name: 'MySQL', icon: <SiMysql />, color: '#4479a1' },
      { name: 'SQLite', icon: <SiSqlite />, color: '#003b57' },
      { name: 'MariaDB', icon: <SiMariadb />, color: '#003545' },
      { name: 'Redis', icon: <SiRedis />, color: '#dc382d' },
      { name: 'Firebase', icon: <SiFirebase />, color: '#ffca28' },
      { name: 'Cloudinary CDN', icon: <Cloud />, color: '#3448c5' },
      { name: 'AWS', icon: <FaAws />, color: '#ff9900' },
      { name: 'Azure', icon: <Cloud />, color: '#0089d6' },
    ],
  },
  {
    // Tools gains Docker, Kubernetes, GitHub Actions from dissolved Cloud section
    id: 'tools',
    title: 'Tools & DevOps',
    emojiIcon: '🛠️',
    items: [
      { name: 'Git', icon: <SiGit />, color: '#f05032' },
      { name: 'GitHub', icon: <SiGithub />, color: '#181717' },
      { name: 'VS Code', icon: <VscVscode />, color: '#007acc' },
      { name: 'Docker', icon: <SiDocker />, color: '#2496ed' },
      { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326ce5' },
      { name: 'GitHub Actions', icon: <SiGithubactions />, color: '#2088ff' },
      { name: 'Electron', icon: <SiElectron />, color: '#47848f' },
      { name: 'Qt / PySide6', icon: <SiQt />, color: '#41cd52' },
      { name: 'Jupyter', icon: <SiJupyter />, color: '#f37626' },
      { name: 'Postman', icon: <SiPostman />, color: '#ff6c37' },
    ],
  },
];

const EXACT_SPEC_ORDER: Record<string, number> = {
  'Google Data Analytics Professional Certificate': 0,
  'Microsoft Generative AI Engineering Professional Certificate': 1,
  'Google Cybersecurity Professional Certificate': 2,
  'IBM RAG and Agentic AI Professional Certificate': 3,
  'Google AI Professional Certificate': 4,
  'Building AI Agents and Agentic Workflows Specialization': 5,
};

const sortedRawSpecializationCerts = [...rawSpecializationCerts].sort(
  (a, b) => (EXACT_SPEC_ORDER[a.name] ?? 99) - (EXACT_SPEC_ORDER[b.name] ?? 99)
);

const PROFESSIONAL_CERTS: CertificationItem[] = sortedRawSpecializationCerts.map((item, idx) => {
  let provider = 'Coursera';
  const nameLower = item.name.toLowerCase();
  if (nameLower.includes('google')) provider = 'Google';
  else if (nameLower.includes('microsoft')) provider = 'Microsoft';
  else if (
    nameLower.includes('ibm') ||
    nameLower.includes('building ai agents') ||
    nameLower.includes('agentic')
  ) {
    provider = 'IBM';
  }

  return {
    id: `spec-${idx}`,
    title: item.name,
    issuer: `${provider} Specialization`,
    date: `${item.duration_months} Month${item.duration_months > 1 ? 's' : ''}`,
    skills: item.skills,
    link: item.verification_url,
    pdfUrl: `/credentials/${item.pdf_path_relative_to_root}`,
    whatWasLearnt: item.what_was_learnt,
  };
});

const OTHER_CERTS: CertificationItem[] = rawCourseCerts.map((item, idx) => ({
  id: `course-${idx}`,
  title: item.name,
  issuer: item.provider || 'Coursera',
  date: 'Course Cert',
  skills: item.skills ? item.skills.slice(0, 6) : undefined,
  link: item.verification_url,
  pdfUrl: `/credentials/${item.pdf_path_relative_to_root}`,
}));

const BADGES_DATA: CertificationItem[] = rawBadges.map((badge, idx) => ({
  id: `badge-${idx}`,
  title: badge.name,
  issuer: 'Credly Verified',
  date: 'Digital Badge',
  skills: badge.skills ? badge.skills.slice(0, 5) : undefined,
  link: badge.verification_url,
  badgeUrl: `/credentials/${badge.image_path_relative_to_root}`,
  pdfUrl: `/credentials/${badge.pdf_path_relative_to_root}`,
}));

/**
 * Distributes items into exactly 3 rows.
 * - Rows with fewer items appear FIRST and get the longest-named badges.
 * - The largest row appears LAST and gets the shortest-named badges.
 * - Diff between any two row counts is at most 1.
 *
 * Example (10 items, base=2, extra=2):
 *   rowSizes = [2, 2, 3, 3]
 *   Row 0: 2 longest names
 *   Row 1: next 2 names
 *   Row 2: next 3 names
 *   Row 3: 3 shortest names
 */
function distributeItems(items: TechItem[]): TechItem[][] {
  const n = items.length;
  if (n === 0) return [];
  const ROWS = 4;
  const base = Math.floor(n / ROWS);
  const extra = n % ROWS;

  // Sort longest name → shortest name
  const sorted = [...items].sort((a, b) => b.name.length - a.name.length);

  // First (ROWS - extra) rows are the "small" rows (size = base)  → get longest names
  // Last extra rows are the "large" rows (size = base + 1)         → get shorter names
  const rowSizes = Array.from({ length: ROWS }, (_, i) =>
    i < ROWS - extra ? base : base + 1
  );

  const rows: TechItem[][] = [];
  let cursor = 0;
  for (const size of rowSizes) {
    rows.push(sorted.slice(cursor, cursor + size));
    cursor += size;
  }
  return rows;
}

const getSkillsCardVariants = (index: number): Variants => {
  const col = index % 3;
  let exitX = 0;
  let exitY = 0;
  let entryX = 0;
  let entryY = 0;

  if (col === 0) {
    // Left column slides out left, enters from left
    entryX = -150;
    exitX = -250;
  } else if (col === 2) {
    // Right column slides out right, enters from right
    entryX = 150;
    exitX = 250;
  } else {
    // Center column slides out down, enters from top
    entryY = -120;
    exitY = 180;
  }

  return {
    initial: { opacity: 0, x: entryX, y: entryY, scale: 0.95 },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    },
    exit: {
      opacity: 0,
      x: exitX,
      y: exitY,
      scale: 0.95,
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
    }
  };
};

const getCertCardVariants = (index: number): Variants => {
  const col = index % 3;
  let exitX = 0;
  let exitY = 0;
  let entryX = 0;
  let entryY = 0;

  if (col === 0) {
    // Left column slides out left, enters from left
    entryX = -150;
    exitX = -250;
  } else if (col === 2) {
    // Right column slides out right, enters from right
    entryX = 150;
    exitX = 250;
  } else {
    // Center column slides out down, enters from top
    entryY = -120;
    exitY = 180;
  }

  return {
    initial: { opacity: 0, x: entryX, y: entryY, scale: 0.95 },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    },
    exit: {
      opacity: 0,
      x: exitX,
      y: exitY,
      scale: 0.95,
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
    }
  };
};

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'certifications'>('skills');
  const [certSubTab, setCertSubTab] = useState<'spec' | 'other' | 'badges'>('spec');
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  // One ref per skill card — used to fire the intro glare sweep
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const certCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;
  const certSubTabRef = useRef(certSubTab);
  certSubTabRef.current = certSubTab;

  const glareInProgress = useRef(false);
  const certGlareInProgress = useRef(false);
  const [selectedCertModal, setSelectedCertModal] = useState<CertificationItem | null>(null);

  const fireSkillsGlareSweep = (delayMs = 150) => {
    glareInProgress.current = true;

    // Group A (0,2,4 = Languages, Backend, Databases)
    // Group B (1,3,5 = Frontend, Frameworks, Tools)
    const groupA = [0, 2, 4];
    const groupB = [1, 3, 5];
    const group = Math.random() < 0.5 ? groupA : groupB;

    setTimeout(() => {
      group.forEach((cardIdx, step) => {
        setTimeout(() => {
          const card = cardRefs.current[cardIdx];
          if (!card) return;
          card.classList.remove('glare-intro');
          void card.offsetWidth;
          requestAnimationFrame(() => {
            card.classList.add('glare-intro');
            setTimeout(() => card.classList.remove('glare-intro'), 950);
          });
        }, step * 250);
      });
      setTimeout(() => {
        glareInProgress.current = false;
      }, 3 * 250 + 1000);
    }, delayMs);
  };

  const fireSpecGlareSweep = (delayMs = 150) => {
    certGlareInProgress.current = true;

    // Group A (0,2,4 = Google Data Analytics, Google Cybersecurity, Google AI)
    // Group B (1,3,5 = Microsoft Gen AI, IBM RAG, Building AI Agents)
    const groupA = [0, 2, 4];
    const groupB = [1, 3, 5];
    const group = Math.random() < 0.5 ? groupA : groupB;

    setTimeout(() => {
      group.forEach((cardIdx, step) => {
        setTimeout(() => {
          const card = certCardRefs.current[cardIdx];
          if (!card) return;
          card.classList.remove('glare-intro');
          void card.offsetWidth;
          requestAnimationFrame(() => {
            card.classList.add('glare-intro');
            setTimeout(() => card.classList.remove('glare-intro'), 950);
          });
        }, step * 250);
      });
      setTimeout(() => {
        certGlareInProgress.current = false;
      }, 3 * 250 + 1000);
    }, delayMs);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCertModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Trigger glare sweep when activeTab or certSubTab changes
  useEffect(() => {
    if (!sectionVisible) return;
    glareInProgress.current = false;
    certGlareInProgress.current = false;

    if (activeTab === 'skills') {
      fireSkillsGlareSweep(550);
    } else if (activeTab === 'certifications' && certSubTab === 'spec') {
      fireSpecGlareSweep(550);
    }
  }, [activeTab, certSubTab, sectionVisible]);

  // IntersectionObserver for scroll-into-view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          if (activeTabRef.current === 'skills') {
            fireSkillsGlareSweep(200);
          } else if (activeTabRef.current === 'certifications' && certSubTabRef.current === 'spec') {
            fireSpecGlareSweep(200);
          }
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="credentials"
      className={`${styles.section} ${activeTab === 'certifications' ? styles.certSectionActive : ''}`}
      ref={sectionRef}
    >
      {/* Right rail: main tab switcher (Skills / Certifications) */}
      <nav className={`${styles.sideRail} ${sectionVisible ? styles.railVisible : ''}`}>
        <button
          className={`${styles.railBtn} ${activeTab === 'skills' ? styles.railActive : ''}`}
          onClick={() => setActiveTab('skills')}
          title="Skills & Expertise"
        >
          <Brain className={styles.railIcon} />
          <span className={styles.railLabel}>
            <span className={styles.desktopLabel}>Skills & Expertise</span>
            <span className={styles.mobileLabel}>Skills</span>
          </span>
        </button>

        <button
          className={`${styles.railBtn} ${activeTab === 'certifications' ? styles.railActive : ''}`}
          onClick={() => setActiveTab('certifications')}
          title="Certifications & Badges"
        >
          <Award className={styles.railIcon} />
          <span className={styles.railLabel}>
            <span className={styles.desktopLabel}>Certifications & Badges</span>
            <span className={styles.mobileLabel}>Certifications</span>
          </span>
        </button>
      </nav>

      {/* Left rail: cert sub-tabs — visible only on the Certifications tab */}
      {activeTab === 'certifications' && (
        <nav className={`${styles.certRail} ${sectionVisible ? styles.railVisible : ''}`}>
          <button
            className={`${styles.certRailBtn} ${certSubTab === 'spec' ? styles.certRailActive : ''}`}
            onClick={() => setCertSubTab('spec')}
            title="Specialization Certificates"
          >
            <GraduationCap className={styles.railIcon} />
            <span className={styles.certRailLabel}>Specialization</span>
          </button>

          <button
            className={`${styles.certRailBtn} ${certSubTab === 'other' ? styles.certRailActive : ''}`}
            onClick={() => setCertSubTab('other')}
            title="Other Certificates"
          >
            <FileCheck className={styles.railIcon} />
            <span className={styles.certRailLabel}>Other Certs</span>
          </button>

          <button
            className={`${styles.certRailBtn} ${certSubTab === 'badges' ? styles.certRailActive : ''}`}
            onClick={() => setCertSubTab('badges')}
            title="Badges"
          >
            <Medal className={styles.railIcon} />
            <span className={styles.certRailLabel}>Badges</span>
          </button>
        </nav>
      )}

      <motion.div layout className={styles.container}>
        <AnimatePresence mode="wait">
          {activeTab === 'skills' ? (
            <motion.div
              key="skills-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.skillsLayout}
            >
              <div className={styles.categoryGrid}>
                {SKILL_CATEGORIES.map((cat, catIdx) => {
                  const cardVariants = getSkillsCardVariants(catIdx);
                  return (
                    <motion.div
                      key={cat.id}
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ height: '100%' }}
                    >
                      <GlareHover
                        ref={(el) => { cardRefs.current[catIdx] = el; }}
                        width="100%"
                        height="100%"
                        background="transparent"
                        borderRadius="20px"
                        borderColor="transparent"
                        glareColor="#ffffff"
                        glareOpacity={0.1}
                        glareAngle={-30}
                        glareSize={300}
                        transitionDuration={800}
                        className={styles.categoryCard}
                      >
                        {/* Large emoji watermark in the background */}
                        <span className={styles.cardBgEmoji} aria-hidden="true">{cat.emojiIcon}</span>

                        {/* Badge rows – centered, balanced distribution */}
                        <div className={styles.techPillRows}>
                          {distributeItems(cat.items).map((row, rowIdx) => (
                            <div key={rowIdx} className={styles.techPillRow}>
                              {row.map((tech, i) => (
                                <div key={i} className={styles.techPill} title={tech.name}>
                                  <span
                                    className={styles.techIcon}
                                    style={{ color: tech.color || 'var(--accent)' }}
                                  >
                                    {tech.icon}
                                  </span>
                                  <span className={styles.techName}>{tech.name}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>

                        {/* Title centered at bottom — text only */}
                        <div className={styles.categoryHeader}>
                          <span className={styles.catTitle}>{cat.title}</span>
                        </div>
                      </GlareHover>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="certs-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.certsContainer}
            >
              <AnimatePresence mode="wait">
                {certSubTab === 'spec' && (
                  <motion.div
                    key="spec-subtab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.categoryGrid}
                  >
                    {PROFESSIONAL_CERTS.map((cert, certIdx) => {
                      const cardVariants = getCertCardVariants(certIdx);
                      return (
                        <motion.div
                          key={cert.id}
                          variants={cardVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          style={{ height: '100%' }}
                        >
                          <GlareHover
                            ref={(el) => { certCardRefs.current[certIdx] = el; }}
                            width="100%"
                            height="100%"
                            background="transparent"
                            borderRadius="20px"
                            borderColor="transparent"
                            glareColor="#ffffff"
                            glareOpacity={0.1}
                            glareAngle={-30}
                            glareSize={300}
                            transitionDuration={800}
                            className={styles.categoryCard}
                            onClick={() => setSelectedCertModal(cert)}
                          >
                            {/* Company Vector Logo watermark in background */}
                            {getCompanyLogo(cert.issuer)}

                            {/* Skills Learned Pills Grid */}
                            <div className={styles.techPillRows}>
                              {distributeSkillStrings(formatCardSkills(cert.skills || [])).map((row, rowIdx) => (
                                <div key={rowIdx} className={styles.techPillRow}>
                                  {row.map((skillName, i) => (
                                    <div
                                      key={i}
                                      className={`${styles.techPill} ${skillName.startsWith('+') ? styles.extraPill : ''}`}
                                      title={skillName}
                                    >
                                      <span className={styles.techIcon} style={{ color: 'var(--accent)' }}>
                                        {skillName.startsWith('+') ? <Sparkles size={12} /> : <CheckCircle2 size={12} />}
                                      </span>
                                      <span className={styles.techName}>{skillName}</span>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>

                            {/* Title centered at bottom — clean text matching Skills card */}
                            <div className={styles.categoryHeader}>
                              <span className={styles.catTitle}>{formatCertTitle(cert.title)}</span>
                            </div>
                          </GlareHover>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

                {certSubTab === 'other' && (
                  <motion.div
                    key="other-subtab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.certGrid}
                  >
                    {OTHER_CERTS.map((cert, certIdx) => (
                      <motion.div
                        key={cert.id}
                        variants={getCertCardVariants(certIdx)}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <div className={styles.certCard}>
                          <div className={styles.certBadgeHeader}>
                            <FileCheck className={styles.certBadgeIcon} />
                            <span className={styles.certDate}>{cert.date}</span>
                          </div>
                          <h4 className={styles.certTitle}>{cert.title}</h4>
                          <div className={styles.certIssuer}>{cert.issuer}</div>
                          {cert.skills && (
                            <div className={styles.certSkills}>
                              {cert.skills.map((s, idx) => (
                                <span key={idx} className={styles.certSkillTag}>
                                  <CheckCircle2 size={12} /> {s}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className={styles.certActions}>
                            {cert.link && (
                              <a href={cert.link} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                                Verify <ExternalLink size={14} />
                              </a>
                            )}
                            {cert.pdfUrl && (
                              <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.certPdfLink}>
                                PDF <FileText size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {certSubTab === 'badges' && (
                  <motion.div
                    key="badges-subtab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.certGrid}
                  >
                    {BADGES_DATA.map((badge, badgeIdx) => (
                      <motion.div
                        key={badge.id}
                        variants={getCertCardVariants(badgeIdx)}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <div className={styles.certCard}>
                          <div className={styles.certBadgeHeader}>
                            {badge.badgeUrl ? (
                              <img src={badge.badgeUrl} alt={badge.title} className={styles.badgeImg} />
                            ) : (
                              <Medal className={styles.certBadgeIconAlt} />
                            )}
                            <span className={styles.certDate}>{badge.date}</span>
                          </div>
                          <h4 className={styles.certTitle}>{badge.title}</h4>
                          <div className={styles.certIssuer}>{badge.issuer}</div>
                          {badge.skills && (
                            <div className={styles.certSkills}>
                              {badge.skills.map((s, idx) => (
                                <span key={idx} className={styles.certSkillTag}>
                                  <CheckCircle2 size={12} /> {s}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className={styles.certActions}>
                            {badge.link && (
                              <a href={badge.link} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                                Credly <ExternalLink size={14} />
                              </a>
                            )}
                            {badge.pdfUrl && (
                              <a href={badge.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.certPdfLink}>
                                PDF <FileText size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Specialization Detail Modal */}
      <AnimatePresence>
        {selectedCertModal && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertModal(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={styles.modalHeader}>
                <div>
                  <div className={styles.modalSubHeader}>
                    <span className={styles.modalIssuerBadge}>{selectedCertModal.issuer}</span>
                    <span className={styles.modalDurationBadge}>
                      <Clock size={12} /> {selectedCertModal.date}
                    </span>
                  </div>
                  <h3 className={styles.modalTitle}>{selectedCertModal.title}</h3>
                </div>
                <button
                  className={styles.modalCloseBtn}
                  onClick={() => setSelectedCertModal(null)}
                  title="Close Modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body Grid */}
              <div className={styles.modalGrid}>
                {/* Left Column: Embedded PDF Viewer */}
                <div className={styles.pdfContainer}>
                  {selectedCertModal.pdfUrl ? (
                    <iframe
                      src={selectedCertModal.pdfUrl}
                      title={selectedCertModal.title}
                      className={styles.pdfIframe}
                    />
                  ) : (
                    <div className={styles.noPdfPlaceholder}>
                      <FileText size={48} />
                      <span>PDF Document Preview Unavailable</span>
                    </div>
                  )}
                </div>

                {/* Right Column: Detailed Program Info */}
                <div className={styles.modalDetails}>
                  {/* Skills Gained Section */}
                  {selectedCertModal.skills && selectedCertModal.skills.length > 0 && (
                    <div>
                      <h4 className={styles.modalSectionTitle}>
                        <Sparkles size={14} style={{ color: 'var(--accent)' }} /> Skills Gained
                      </h4>
                      <div className={styles.skillsWrap}>
                        {selectedCertModal.skills.map((skill, sIdx) => (
                          <span key={sIdx} className={styles.modalSkillTag}>
                            <CheckCircle2 size={12} /> {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* What Was Learnt Section */}
                  {selectedCertModal.whatWasLearnt && selectedCertModal.whatWasLearnt.length > 0 && (
                    <div>
                      <h4 className={styles.modalSectionTitle}>
                        <CheckCircle2 size={14} style={{ color: 'var(--accent)' }} /> What Was Learnt
                      </h4>
                      <ul className={styles.learntList}>
                        {selectedCertModal.whatWasLearnt.map((bullet, bIdx) => (
                          <li key={bIdx} className={styles.learntItem}>
                            <span className={styles.bulletDot}>•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons Footer */}
                  <div className={styles.modalActions}>
                    {selectedCertModal.link && (
                      <a
                        href={selectedCertModal.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.modalVerifyBtn}
                      >
                        Verify Credential <ExternalLink size={14} />
                      </a>
                    )}
                    {selectedCertModal.pdfUrl && (
                      <a
                        href={selectedCertModal.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.modalPdfBtn}
                      >
                        Download PDF <FileText size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
