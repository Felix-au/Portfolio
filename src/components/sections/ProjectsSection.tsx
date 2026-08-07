import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Globe, Monitor, Brain } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import CardSwap, { Card } from '../ui/CardSwap';
import {
  PROJECT_TABS,
  getProjectsByCategory,
  type ProjectCategory,
  type Project,
} from '../../data/projects/projectsData';
import { useTheme } from '../../context/ThemeContext';
import styles from './ProjectsSection.module.css';

const ACCENT_PALETTES = [
  { dark: '#00e5ff', light: '#00a3c4' }, // Cyan
  { dark: '#a855f7', light: '#7c3aed' }, // Purple
  { dark: '#10b981', light: '#059669' }, // Green
  { dark: '#ff4b91', light: '#db2777' }, // Rose
  { dark: '#ffb300', light: '#d97706' }, // Amber
];

const getProjectAccent = (index: number, theme: 'light' | 'dark'): string => {
  const palette = ACCENT_PALETTES[index % ACCENT_PALETTES.length];
  return theme === 'dark' ? palette.dark : palette.light;
};

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('websites');
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  const projects = getProjectsByCategory(activeTab);
  const activeProject: Project | undefined = projects[activeProjectIdx];

  // Reset active project when switching tabs
  useEffect(() => {
    setActiveProjectIdx(0);
  }, [activeTab]);

  // IntersectionObserver for rail visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = useCallback(
    (idx: number) => {
      if (idx >= 0 && idx < projects.length) {
        setActiveProjectIdx(idx);
      }
    },
    [projects.length],
  );

  const getTabIcon = (tabId: ProjectCategory) => {
    switch (tabId) {
      case 'websites':
        return <Globe className={styles.railIcon} />;
      case 'applications':
        return <Monitor className={styles.railIcon} />;
      case 'ai-ml':
        return <Brain className={styles.railIcon} />;
    }
  };

  return (
    <section id="projects" className={styles.section} ref={sectionRef}>
      {/* Right Side Rail — Tab Navigation (desktop) */}
      <nav className={`${styles.sideRail} ${sectionVisible ? styles.railVisible : ''}`}>
        {PROJECT_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.railBtn} ${activeTab === tab.id ? styles.railActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
            title={tab.label}
          >
            {getTabIcon(tab.id)}
            <span className={styles.railLabel}>{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.container}>
        {/* Mobile Tab Bar (shown on small screens) */}
        <div className={styles.mobileTabBar}>
          {PROJECT_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.mobileTabBtn} ${activeTab === tab.id ? styles.mobileTabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={styles.splitLayout}
          >
            {/* ─── Left Column: Project Detail Panel ─── */}
            <div className={styles.detailPanel}>
              <AnimatePresence mode="wait">
                {activeProject && (
                  <motion.div
                    key={activeProject.id}
                    className={styles.detailInner}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <span
                      className={styles.projectTagline}
                      style={{ color: getProjectAccent(activeProjectIdx, theme) }}
                    >
                      {activeProject.tagline}
                    </span>

                    <h2 className={styles.projectTitle}>{activeProject.title}</h2>

                    <p className={styles.projectDescription}>
                      {activeProject.description}
                    </p>

                    <div className={styles.techRow}>
                      {activeProject.techStack.map((tech) => (
                        <span key={tech} className={styles.techPill}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={styles.actionRow}>
                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                      {activeProject.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
                        >
                          <SiGithub size={14} />
                          Source Code
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ─── Right Column: CardSwap Stack ─── */}
            <div className={styles.cardSwapCol}>
              <CardSwap
                cardDistance={62}
                verticalDistance={68}
                delay={5000}
                pauseOnHover
                width={525}
                height={400}
                skewAmount={5}
                easing="elastic"
                onCardClick={handleCardClick}
              >
                {projects.map((project, i) => (
                  <Card key={project.id}>
                    <div className={styles.projectCard}>
                      {/* Accent bar at card top */}
                      <div
                        className={styles.cardAccent}
                        style={{
                          background: `linear-gradient(90deg, ${getProjectAccent(i, theme)}, ${getProjectAccent(i, theme)}88)`,
                        }}
                      />

                      {/* Large index watermark */}
                      <span className={styles.cardIndex}>
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* Card content (bottom-aligned) */}
                      <div className="card-content-wrap">
                        <h3 className={styles.cardTitle}>{project.title}</h3>
                        <p className={styles.cardTagline}>{project.tagline}</p>
                        <div className={styles.cardTechRow}>
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span key={tech} className={styles.cardTechBadge}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
