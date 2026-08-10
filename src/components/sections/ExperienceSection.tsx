import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
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
    duration: '01 August 2025 - Present',
    location: 'Gurgaon, Haryana',
    type: 'onsite',
    isCurrent: true,
    description: [
      'Designed & developed PrashnaSetu © from concept to deployment & production support.',
      'Engineered a secure quiz management system for academic institutions featuring a proctored JavaFX desktop client, a mDNS Spring Boot server and a React-based companion and results web portal.',
      'Led development & pilot at BMU, resulting in 1,200+ downloads & active institutional adoption.',
      'Conducted 12,000+ evaluations among 1,500+ users with reliable & secure automated assessments.',
      'Spearheaded end-to-end software development initiatives, translating faculty requirements into system designs and delivering solutions through development, testing, documentation, deployment, iterative improvements and continued support.',
    ],
    accentHue: 185,
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'MetaInfoSci',
    duration: '01 September 2025 - 31 October 2025',
    location: 'Gurgaon, Haryana (Remote)',
    type: 'remote',
    description: [
      'Designed & implemented full-stack Django modules to extend core analytical features and data visualizations.',
      'Scaled platform responsiveness to support 500+ active researchers analyzing over 297K+ publications.',
      'Engineered a Node.js/Express CMS backend for landing assets and SMTP automation, offloading primary analytical servers.',
      "Extended Django's ingestion layer by building custom parser modules for Web of Science (WoS) and Scopus datasets, standardizing varied column schemas into a unified PostgreSQL schema.",
      'Implemented chunked Gzip uploads with server-side assembly to reliably ingest large datasets, bypassing network timeouts.',
    ],
    accentHue: 210,
  },
  {
    role: 'Software Developer Intern',
    company: 'CAD-CS',
    duration: '25 May 2025 - 25 July 2025',
    location: 'Gurgaon, Haryana',
    type: 'onsite',
    description: [
      'Developed SmartQuiz, a Java/JavaFX desktop quiz application designed for secure assessments and institutional use.',
      'Designed and implemented role-based authentication, secure local data storage with SQLite, and encrypted data handling to maintain assessment integrity.',
      'Developed anti-cheating mechanisms and other assessment-security features to support controlled examination environments.',
      'Built instructor dashboards for quiz creation, analytics, and performance reporting, alongside student interfaces for quiz attempts and real-time feedback.',
      'Managed the complete software development lifecycle, including requirements analysis, system design, development, testing, documentation and deployment.',
    ],
    accentHue: 160,
  },
  {
    role: 'Software Developer Intern',
    company: 'BlueStock FinTech',
    duration: '1 Feb 2025 - 28 Mar 2025',
    location: 'Remote',
    type: 'remote',
    description: [
      'Collaborated in a team to develop an IPO Web App with a secure backend using Node.js, Express.js, and MongoDB.',
      'Built RESTful APIs for authentication, IPO data, and investor management with secured with JWT-based authentication.',
      'Integrated PAN verification via Axios, improving data validation and fraud prevention.',
      'Utilized Postman for endpoint testing and debugging workflows.',
      'Managed source control via GitHub with branches, PRs, and project boards; attended daily standups and weekly reviews on Google Meet.',
      'Deployed the app on Render for demo and testing.',
    ],
    accentHue: 240,
  },
];

export const ExperienceSection: React.FC = () => {
  const { theme } = useTheme();
  const [sectionVisible, setSectionVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % EXPERIENCES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + EXPERIENCES.length) % EXPERIENCES.length);
  }, []);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  // Auto scroll timer (2.5 seconds hold)
  useEffect(() => {
    if (isPaused || !sectionVisible) return;
    const timer = setInterval(() => {
      handleNext();
    }, 2500);
    return () => clearInterval(timer);
  }, [handleNext, isPaused, sectionVisible]);

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          {sectionVisible && (
            <DecoderText key={`${theme}-${sectionVisible}`} text="Experience" delay={300} />
          )}
        </h2>

        {/* Top Company Selection Tabs */}
        <div className={styles.deckTabs}>
          {EXPERIENCES.map((item, idx) => (
            <button
              key={idx}
              className={`${styles.tabBtn} ${activeIndex === idx ? styles.tabBtnActive : ''}`}
              onClick={() => handleSelect(idx)}
              style={{ '--hue': item.accentHue } as React.CSSProperties}
            >
              <span className={styles.tabCompany}>{item.company}</span>
            </button>
          ))}
        </div>

        {/* 3D Cover Flow Stage */}
        <div
          className={styles.deckStage}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className={`${styles.stageArrow} ${styles.stageArrowLeft}`}
            onClick={handlePrev}
            aria-label="Previous card"
          >
            <ChevronLeft size={22} />
          </button>

          <div className={styles.deckTrack}>
            {EXPERIENCES.map((exp, idx) => {
              // Circular diff for infinite wrapping deck
              const numItems = EXPERIENCES.length;
              let diff = (idx - activeIndex) % numItems;
              if (diff > numItems / 2) diff -= numItems;
              if (diff < -numItems / 2) diff += numItems;

              const isActive = diff === 0;

              // Calculate 3D layout offset properties based on circular distance
              let xOffset = 0;
              let zOffset = 0;
              let rotateY = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 10;

              if (diff === 0) {
                xOffset = 0;
                zOffset = 0;
                rotateY = 0;
                scale = 1;
                opacity = 1;
                zIndex = 10;
              } else if (diff === -1) {
                xOffset = -260;
                zOffset = -140;
                rotateY = 22;
                scale = 0.85;
                opacity = 0.55;
                zIndex = 5;
              } else if (diff === 1) {
                xOffset = 260;
                zOffset = -140;
                rotateY = -22;
                scale = 0.85;
                opacity = 0.55;
                zIndex = 5;
              } else if (diff < -1) {
                xOffset = -420;
                zOffset = -260;
                rotateY = 35;
                scale = 0.72;
                opacity = 0.2;
                zIndex = 1;
              } else if (diff > 1) {
                xOffset = 420;
                zOffset = -260;
                rotateY = -35;
                scale = 0.72;
                opacity = 0.2;
                zIndex = 1;
              }

              return (
                <motion.div
                  key={idx}
                  className={`${styles.deckCard} ${isActive ? styles.deckCardActive : styles.deckCardSide}`}
                  onClick={() => handleSelect(idx)}
                  animate={{
                    x: xOffset,
                    z: zOffset,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 240,
                    damping: 25,
                    mass: 0.9,
                  }}
                  style={{
                    zIndex,
                    '--hue': exp.accentHue,
                  } as React.CSSProperties}
                >
                  {/* Glow Blob */}
                  <div className={styles.cardGlow} style={{ '--hue': exp.accentHue } as React.CSSProperties} />

                  {/* Header Row: Role, Active Badge */}
                  <div className={styles.cardHeaderRow}>
                    <h3 className={styles.cardRole}>{exp.role}</h3>
                    {exp.isCurrent && (
                      <span className={styles.activeBadge}>
                        <span className={styles.activeDot} />
                        Active
                      </span>
                    )}
                  </div>

                  {/* Company & Meta info */}
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCompany} style={{ '--hue': exp.accentHue } as React.CSSProperties}>
                      {exp.company}
                    </span>
                    <span className={styles.metaSep}>/</span>
                    <span className={styles.cardDuration}>
                      <Calendar size={12} style={{ marginRight: 4 }} />
                      {exp.duration}
                    </span>
                    <span className={styles.metaSep}>/</span>
                    <span className={styles.cardLocation}>
                      <MapPin size={12} style={{ marginRight: 4 }} />
                      {exp.location}
                    </span>
                    <span className={styles.typeChip} data-type={exp.type}>
                      {exp.type === 'onsite' ? 'On-site' : exp.type === 'remote' ? 'Remote' : 'Hybrid'}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className={styles.cardDivider} style={{ '--hue': exp.accentHue } as React.CSSProperties} />

                  {/* Bullets */}
                  <div className={styles.bulletsWrapper}>
                    <ul className={styles.bullets}>
                      {exp.description.map((pt, i) => (
                        <li key={i} className={styles.bullet}>
                          <span className={styles.bulletDot} style={{ '--hue': exp.accentHue } as React.CSSProperties} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {!isActive && <div className={styles.sideCardOverlay} />}
                </motion.div>
              );
            })}
          </div>

          <button
            className={`${styles.stageArrow} ${styles.stageArrowRight}`}
            onClick={handleNext}
            aria-label="Next card"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Indicator dots */}
        <div className={styles.deckPagination}>
          {EXPERIENCES.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${activeIndex === idx ? styles.dotActive : ''}`}
              onClick={() => handleSelect(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};



