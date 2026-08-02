import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Globe, Monitor, Sparkles, Info } from 'lucide-react';
import CardSwap, { Card } from '../ui/CardSwap';
import { useTheme } from '../../context/ThemeContext';
import { DecoderText } from '../ui/DecoderText';
import projectsData from '../../data/projects/projects.json';
import styles from './ProjectsSection.module.css';

// SVG implementation of Github icon for 100% safety
const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.42 9.42 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5a10.03 10.03 0 0 0 3.9-16.57A10 10 0 0 0 12 2Z" />
  </svg>
);

type ProjectCategory = 'websites' | 'applications' | 'ai_ml_dl';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
}

export const ProjectsSection: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ProjectCategory>('websites');
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver for scroll tracking & sideRail activation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getCategoryTitle = (cat: ProjectCategory) => {
    switch (cat) {
      case 'websites':
        return 'Websites';
      case 'applications':
        return 'Applications';
      case 'ai_ml_dl':
        return 'Gen AI, ML & DL';
      default:
        return '';
    }
  };

  const getCategoryDescription = (cat: ProjectCategory) => {
    switch (cat) {
      case 'websites':
        return 'Custom web experiences built with modern frameworks and libraries, designed for optimal performance, smooth interactive animations, and responsive layouts.';
      case 'applications':
        return 'Desktop applications, CLI tools, and OS-level integrations designed to optimize productivity, control system events, or handle digital media synthesis.';
      case 'ai_ml_dl':
        return 'Intelligent systems, deep learning agents, prompt cache routers, and model integrations built to run on-device or scale across commercial APIs.';
      default:
        return '';
    }
  };

  const getCategoryProjects = (cat: ProjectCategory): Project[] => {
    return projectsData[cat] || [];
  };

  return (
    <section id="projects" className={styles.section} ref={sectionRef}>
      {/* Right rail: Project Tab Switcher */}
      <nav className={`${styles.sideRail} ${sectionVisible ? styles.railVisible : ''}`}>
        <button
          className={`${styles.railBtn} ${activeTab === 'websites' ? styles.railActive : ''}`}
          onClick={() => setActiveTab('websites')}
          title="Websites"
        >
          <Globe className={styles.railIcon} />
          <span className={styles.railLabel}>
            <span className={styles.desktopLabel}>Websites</span>
            <span className={styles.mobileLabel}>Web</span>
          </span>
        </button>

        <button
          className={`${styles.railBtn} ${activeTab === 'applications' ? styles.railActive : ''}`}
          onClick={() => setActiveTab('applications')}
          title="Applications"
        >
          <Monitor className={styles.railIcon} />
          <span className={styles.railLabel}>
            <span className={styles.desktopLabel}>Applications</span>
            <span className={styles.mobileLabel}>Apps</span>
          </span>
        </button>

        <button
          className={`${styles.railBtn} ${activeTab === 'ai_ml_dl' ? styles.railActive : ''}`}
          onClick={() => setActiveTab('ai_ml_dl')}
          title="Gen AI, ML & DL"
        >
          <Sparkles className={styles.railIcon} />
          <span className={styles.railLabel}>
            <span className={styles.desktopLabel}>Gen AI, ML & DL</span>
            <span className={styles.mobileLabel}>AI / ML</span>
          </span>
        </button>
      </nav>

      <motion.div layout className={styles.container}>
        <h2 className={styles.sectionTitle}>
          {sectionVisible && (
            <DecoderText key={`${theme}-${sectionVisible}`} text="Projects" delay={300} />
          )}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className={styles.projectsLayout}
          >
            {/* Left side: description */}
            <div className={styles.categoryInfo}>
              <h3 className={styles.categoryTitle}>{getCategoryTitle(activeTab)}</h3>
              <p className={styles.categoryDescription}>{getCategoryDescription(activeTab)}</p>
              
              <div className={styles.helperText}>
                <Info size={14} />
                <span>Hover card stack to pause animation</span>
              </div>
            </div>

            {/* Right side: CardSwap stack */}
            <div className={styles.cardSwapWrapper}>
              <CardSwap
                width="100%"
                height="100%"
                cardDistance={32}
                verticalDistance={38}
                delay={4500}
                pauseOnHover
                easing="elastic"
              >
                {getCategoryProjects(activeTab).map((proj) => (
                  <Card key={proj.id} className={styles.projectCard}>
                    <div className={styles.cardContent}>
                      <h4 className={styles.projectTitle}>{proj.title}</h4>
                      <p className={styles.projectDescription}>{proj.description}</p>
                      
                      <div className={styles.techStack}>
                        {proj.techStack.map((tech) => (
                          <span key={tech} className={styles.techTag}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className={styles.cardActions}>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionBtn}
                          >
                            <ExternalLink size={14} />
                            <span>Live Demo</span>
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionBtn}
                          >
                            <GithubIcon size={14} />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
