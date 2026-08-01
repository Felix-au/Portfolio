import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';

import styles from './SkillsSection.module.css';

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

const PROFESSIONAL_CERTS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    date: '2025',
    skills: ['Neural Networks', 'CNNs', 'RNNs', 'Transformers', 'Hyperparameter Tuning'],
    link: 'https://coursera.org',
  },
  {
    id: 'cert-2',
    title: 'AWS Certified Developer / Cloud Specialization',
    issuer: 'Amazon Web Services (AWS)',
    date: '2025',
    skills: ['Serverless', 'S3', 'Lambda', 'API Gateway', 'DynamoDB', 'EC2'],
    link: 'https://aws.amazon.com',
  },
  {
    id: 'cert-3',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    date: '2024',
    skills: ['React', 'JavaScript ES6+', 'UX/UI', 'State Management'],
    link: 'https://coursera.org',
  },
];

const OTHER_CERTS_BADGES: CertificationItem[] = [
  {
    id: 'badge-1',
    title: 'Google Cloud Skill Badges & Artifacts',
    issuer: 'Google Cloud Platform',
    date: '2024',
    skills: ['Vertex AI', 'BigQuery', 'Cloud Run', 'Kubernetes Engine'],
    link: 'https://cloud.google.com',
  },
  {
    id: 'badge-2',
    title: 'Hackathon Champion & Competitive Programming Badges',
    issuer: 'BML Munjal University & National Hackathons',
    date: '2024 - 2025',
    skills: ['System Architecture', 'Algorithms', 'Rapid Prototyping'],
  },
];

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

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'certifications'>('skills');
  const [certSubTab, setCertSubTab] = useState<'prof' | 'other'>('prof');
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  // One ref per skill card — used to fire the intro glare sweep
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasPlayedIntro = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionVisible(entry.isIntersecting);

        // On first entry, sweep glare across all cards in random order
        if (entry.isIntersecting && !hasPlayedIntro.current) {
          hasPlayedIntro.current = true;
          const n = SKILL_CATEGORIES.length;
          const indices = Array.from({ length: n }, (_, i) => i);
          // Fisher-Yates shuffle
          for (let i = n - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
          }
          indices.forEach((cardIdx, step) => {
            setTimeout(() => {
              const card = cardRefs.current[cardIdx];
              if (!card) return;
              card.classList.add('glare-intro');
              // Remove after animation duration (800ms) + small buffer
              setTimeout(() => card.classList.remove('glare-intro'), 900);
            }, step * 300);
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className={styles.section} ref={sectionRef}>
      {/* Vertical Side Rail – only visible when skills section is in view */}
      <nav className={`${styles.sideRail} ${sectionVisible ? styles.railVisible : ''}`}>
        <button
          className={`${styles.railBtn} ${activeTab === 'skills' ? styles.railActive : ''}`}
          onClick={() => setActiveTab('skills')}
          title="Skills & Expertise"
        >
          <Brain className={styles.railIcon} />
          <span className={styles.railLabel}>Skills & Expertise</span>
        </button>

        <button
          className={`${styles.railBtn} ${activeTab === 'certifications' ? styles.railActive : ''}`}
          onClick={() => setActiveTab('certifications')}
          title="Certifications & Badges"
        >
          <Award className={styles.railIcon} />
          <span className={styles.railLabel}>Certifications & Badges</span>
        </button>
      </nav>

      <div className={styles.container}>

        {/* TAB 1: SKILLS CONTENT */}
        {activeTab === 'skills' && (
          <div className={styles.skillsLayout}>
            <div className={styles.categoryGrid}>
              {SKILL_CATEGORIES.map((cat, catIdx) => (
                <GlareHover
                  key={cat.id}
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
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CERTIFICATIONS CONTENT */}
        {activeTab === 'certifications' && (
          <div className={styles.certsContainer}>
            {/* Certifications Sub-Tabs */}
            <div className={styles.subTabNav}>
              <button
                className={`${styles.subTabBtn} ${certSubTab === 'prof' ? styles.activeSubTab : ''}`}
                onClick={() => setCertSubTab('prof')}
              >
                Professional & Specialization Certificates
              </button>
              <button
                className={`${styles.subTabBtn} ${certSubTab === 'other' ? styles.activeSubTab : ''}`}
                onClick={() => setCertSubTab('other')}
              >
                Other Certificates & Badges
              </button>
            </div>

            {/* Sub-Tab 1: Professional Certificates */}
            {certSubTab === 'prof' && (
              <div className={styles.certGrid}>
                {PROFESSIONAL_CERTS.map((cert) => (
                  <div key={cert.id} className={styles.certCard}>
                    <div className={styles.certBadgeHeader}>
                      <Award className={styles.certBadgeIcon} />
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

                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.certLink}
                      >
                        Verify Credential <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Sub-Tab 2: Other Certificates & Badges */}
            {certSubTab === 'other' && (
              <div className={styles.certGrid}>
                {OTHER_CERTS_BADGES.map((badge) => (
                  <div key={badge.id} className={styles.certCard}>
                    <div className={styles.certBadgeHeader}>
                      <Award className={styles.certBadgeIconAlt} />
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
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
