import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { DecoderText } from '../ui/DecoderText';
import { useTheme } from '../../context/ThemeContext';
import styles from './ExperienceSection.module.css';

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  type: 'onsite' | 'remote' | 'hybrid';
  isCurrent?: boolean;
  description: string[];
  accentHue: number; // hsl hue for this card's color theme
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Co-Creator & Full Stack Developer',
    company: 'PrashnaSetu',
    duration: 'Aug 2025 - Present',
    location: 'Gurgaon, Haryana',
    type: 'onsite',
    isCurrent: true,
    description: [
      'Designed & developed PrashnaSetu from concept to deployment & production support.',
      'Engineered a secure quiz management system featuring a proctored JavaFX desktop client, a mDNS Spring Boot server and a React-based companion and results web portal.',
      'Led development & pilot at BMU, resulting in 1,200+ downloads & active institutional adoption.',
      'Conducted 12,000+ evaluations among 1,500+ users with reliable & secure automated assessments.',
      'Spearheaded end-to-end software development, translating faculty requirements into system designs and delivering solutions through development, testing, documentation, deployment and continued support.',
    ],
    accentHue: 185,
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'MetaInfoSci',
    duration: 'Sep 2025 - Oct 2025',
    location: 'Gurgaon, Haryana',
    type: 'remote',
    description: [
      'Designed & implemented full-stack Django modules to extend core analytical features and data visualizations.',
      'Scaled platform responsiveness to support 500+ active researchers analyzing over 297K+ publications.',
      'Engineered a Node.js/Express CMS backend for landing assets and SMTP automation.',
      "Extended Django's ingestion layer by building custom parser modules for Web of Science (WoS) and Scopus datasets.",
      'Implemented chunked Gzip uploads with server-side assembly to reliably ingest large datasets, bypassing network timeouts.',
    ],
    accentHue: 210,
  },
  {
    role: 'Software Developer Intern',
    company: 'CAD-CS',
    duration: 'May 2025 - Jul 2025',
    location: 'Gurgaon, Haryana',
    type: 'onsite',
    description: [
      'Developed SmartQuiz, a Java/JavaFX desktop quiz application designed for secure assessments and institutional use.',
      'Implemented role-based authentication, secure local data storage with SQLite and encrypted data handling.',
      'Developed anti-cheating mechanisms and assessment-security features for controlled examination environments.',
      'Built instructor dashboards for quiz creation, analytics, and reporting, alongside student interfaces for real-time feedback.',
      'Managed the complete SDLC: requirements analysis, system design, development, testing, documentation and deployment.',
    ],
    accentHue: 160,
  },
  {
    role: 'Software Developer Intern',
    company: 'BlueStock FinTech',
    duration: 'Feb 2025 - Mar 2025',
    location: 'Remote',
    type: 'remote',
    description: [
      'Collaborated in a team to develop an IPO Web App with a secure backend using Node.js, Express.js, and MongoDB.',
      'Built RESTful APIs for authentication, IPO data, and investor management secured with JWT-based authentication.',
      'Integrated PAN verification via Axios, improving data validation and fraud prevention.',
      'Managed source control via GitHub with branches, PRs, and project boards; daily standups and weekly reviews.',
      'Deployed the app on Render for demo and testing.',
    ],
    accentHue: 240,
  },
];

export const ExperienceSection: React.FC = () => {
  const { theme } = useTheme();
  const [sectionVisible, setSectionVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          {sectionVisible && (
            <DecoderText key={`${theme}-${sectionVisible}`} text="Experience" delay={300} />
          )}
        </h2>

        <div className={styles.expList}>
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              className={styles.expRow}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.13 }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Index number */}
              <div className={styles.expIndex}>
                <span
                  className={styles.indexNumber}
                  style={{ '--hue': exp.accentHue } as React.CSSProperties}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {idx < EXPERIENCES.length - 1 && (
                  <div
                    className={styles.indexLine}
                    style={{ '--hue': exp.accentHue } as React.CSSProperties}
                  />
                )}
              </div>

              {/* Card */}
              <div
                className={`${styles.expCard} ${hovered === idx ? styles.expCardHovered : ''}`}
                style={{ '--hue': exp.accentHue } as React.CSSProperties}
              >
                {/* Glow blob behind hovered card */}
                <div className={styles.cardGlow} style={{ '--hue': exp.accentHue } as React.CSSProperties} />

                {/* Top row: role + badge */}
                <div className={styles.cardTop}>
                  <h3 className={styles.cardRole}>{exp.role}</h3>
                  {exp.isCurrent && (
                    <span className={styles.activeBadge}>
                      <span className={styles.activeDot} />
                      Active
                    </span>
                  )}
                </div>

                {/* Company + meta */}
                <div className={styles.cardMeta}>
                  <span className={styles.cardCompany} style={{ '--hue': exp.accentHue } as React.CSSProperties}>
                    {exp.company}
                  </span>
                  <span className={styles.metaSep}>/</span>
                  <span className={styles.cardDuration}>
                    <Calendar size={11} style={{ marginRight: 4 }} />
                    {exp.duration}
                  </span>
                  <span className={styles.metaSep}>/</span>
                  <span className={styles.cardLocation}>
                    <MapPin size={11} style={{ marginRight: 4 }} />
                    {exp.location}
                  </span>
                  <span className={styles.typeChip} data-type={exp.type}>
                    {exp.type === 'onsite' ? 'On-site' : exp.type === 'remote' ? 'Remote' : 'Hybrid'}
                  </span>
                </div>


                {/* Divider */}
                <div className={styles.cardDivider} style={{ '--hue': exp.accentHue } as React.CSSProperties} />

                {/* Bullets */}
                <ul className={styles.bullets}>
                  {exp.description.map((pt, i) => (
                    <li key={i} className={styles.bullet}>
                      <span className={styles.bulletDot} style={{ '--hue': exp.accentHue } as React.CSSProperties} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
