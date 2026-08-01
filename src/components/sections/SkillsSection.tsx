import React, { useState } from 'react';
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
  SiVercel,
  SiRender,
  SiRailway,
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
  Terminal,
  Shield,
  Zap,
  Award,
  ExternalLink,
  CheckCircle2,
  Sliders,
  Volume2,
  Database,
  Layers,
  Code2,
  Cloud,
  Wrench,
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
    ],
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    emojiIcon: '🤖',
    items: [
      { name: 'PyTorch', icon: <SiPytorch />, color: '#ee4c2c' },
      { name: 'TensorFlow', icon: <SiTensorflow />, color: '#ff6f00' },
      { name: 'Keras', icon: <SiKeras />, color: '#d00000' },
      { name: 'OpenCV', icon: <SiOpencv />, color: '#5c3ee8' },
      { name: 'Hugging Face', icon: <SiHuggingface />, color: '#ffd21e' },
      { name: 'Scikit-Learn', icon: <SiScikitlearn />, color: '#f7931e' },
    ],
  },
  {
    id: 'systems',
    title: 'Systems & OS Core',
    emojiIcon: '🖥️',
    items: [
      { name: 'Win32 Koffi FFI', icon: <Cpu />, color: '#00a4ef' },
      { name: 'WASAPI', icon: <Volume2 />, color: '#00e5ff' },
      { name: 'Pycaw FFI Wrapper', icon: <Sliders />, color: '#3776ab' },
      { name: 'C++ System Hooks', icon: <Terminal />, color: '#00599c' },
      { name: 'OpenJFX Containers', icon: <Shield />, color: '#ed8b00' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
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
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & Deployment',
    emojiIcon: '☁️',
    items: [
      { name: 'Vercel', icon: <SiVercel />, color: '#000000' },
      { name: 'Render', icon: <SiRender />, color: '#000000' },
      { name: 'Railway', icon: <SiRailway />, color: '#000000' },
      { name: 'AWS', icon: <FaAws />, color: '#ff9900' },
      { name: 'Azure', icon: <Cloud />, color: '#0089d6' },
      { name: 'Docker', icon: <SiDocker />, color: '#2496ed' },
      { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326ce5' },
      { name: 'Nginx', icon: <SiNginx />, color: '#009639' },
      { name: 'GitHub Actions', icon: <SiGithubactions />, color: '#2088ff' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Utilities',
    emojiIcon: '🛠️',
    items: [
      { name: 'Git', icon: <SiGit />, color: '#f05032' },
      { name: 'GitHub', icon: <SiGithub />, color: '#181717' },
      { name: 'VS Code', icon: <VscVscode />, color: '#007acc' },
      { name: 'Electron', icon: <SiElectron />, color: '#47848f' },
      { name: 'Qt / PySide6', icon: <SiQt />, color: '#41cd52' },
      { name: 'Jupyter', icon: <SiJupyter />, color: '#f37626' },
      { name: 'Postman', icon: <SiPostman />, color: '#ff6c37' },
      { name: 'Launch4J', icon: <Wrench />, color: '#ed8b00' },
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

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'certifications'>('skills');
  const [certSubTab, setCertSubTab] = useState<'prof' | 'other'>('prof');

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        {/* Header Title */}
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Skills & Certifications</h2>
          <p className={styles.sectionSubtitle}>
            Technical proficiency, full-stack capabilities, and verified professional certifications.
          </p>

          {/* Main Tabs */}
          <div className={styles.tabNav}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'skills' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <Brain className={styles.tabIcon} />
              Skills & Expertise
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === 'certifications' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('certifications')}
            >
              <Award className={styles.tabIcon} />
              Certifications & Badges
            </button>
          </div>
        </div>

        {/* TAB 1: SKILLS CONTENT (2 Rows x 4 Columns = 8 Categories) */}
        {activeTab === 'skills' && (
          <div className={styles.skillsLayout}>
            <div className={styles.categoryGrid}>
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className={styles.categoryCard}>
                  <div className={styles.categoryHeader}>
                    <span className={styles.catEmoji}>{cat.emojiIcon}</span>
                    <span className={styles.catTitle}>{cat.title}</span>
                  </div>

                  <div className={styles.techPillGrid}>
                    {cat.items.map((tech, i) => (
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
                </div>
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
