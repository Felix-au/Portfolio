import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  Rows3,
  LayoutList,
  PanelTop,
  AlignLeft,
} from 'lucide-react';
import { DecoderText } from '../ui/DecoderText';
import { useTheme } from '../../context/ThemeContext';
import styles from './ExperienceSection.module.css';

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

type LayoutMode = 'timeline' | 'accordion' | 'cards' | 'tabs' | 'resume';

const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Co-Creator & Full Stack Developer',
    company: 'PrashnaSetu',
    duration: '01 August 2025 - Present',
    location: 'Gurgaon, Haryana',
    description: [
      'Designed & developed PrashnaSetu from concept to deployment & production support.',
      'Engineered a secure quiz management system featuring a proctored JavaFX desktop client, a mDNS Spring Boot server and a React-based companion and results web portal.',
      'Led development & pilot at BMU, resulting in 1,200+ downloads & active institutional adoption.',
      'Conducted 12,000+ evaluations among 1,500+ users with reliable & secure automated assessments.',
      'Spearheaded end-to-end software development, translating faculty requirements into system designs and delivering solutions through development, testing, documentation, deployment, iterative improvements and continued support.',
    ],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'MetaInfoSci',
    duration: '01 September 2025 - 31 October 2025',
    location: 'Gurgaon, Haryana (Remote)',
    description: [
      'Designed & implemented full-stack Django modules to extend core analytical features and data visualizations.',
      'Scaled platform responsiveness to support 500+ active researchers analyzing over 297K+ publications.',
      'Engineered a Node.js/Express CMS backend for landing assets and SMTP automation.',
      "Extended Django's ingestion layer by building custom parser modules for Web of Science (WoS) and Scopus datasets.",
      'Implemented chunked Gzip uploads with server-side assembly to reliably ingest large datasets, bypassing network timeouts.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'Center for Advanced Data and Computational Science (CAD-CS)',
    duration: '25 May 2025 - 25 July 2025',
    location: 'Gurgaon, Haryana',
    description: [
      'Developed SmartQuiz, a Java/JavaFX desktop quiz application designed for secure assessments and institutional use.',
      'Designed and implemented role-based authentication, secure local data storage with SQLite, and encrypted data handling.',
      'Developed anti-cheating mechanisms and assessment-security features for controlled examination environments.',
      'Built instructor dashboards for quiz creation, analytics, and reporting, alongside student interfaces for quiz attempts and real-time feedback.',
      'Managed the complete SDLC: requirements analysis, system design, development, testing, documentation and deployment.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'BlueStock FinTech',
    duration: '1 Feb 2025 - 28 Mar 2025',
    location: 'Remote',
    description: [
      'Collaborated in a team to develop an IPO Web App with a secure backend using Node.js, Express.js, and MongoDB.',
      'Built RESTful APIs for authentication, IPO data, and investor management secured with JWT-based authentication.',
      'Integrated PAN verification via Axios, improving data validation and fraud prevention.',
      'Utilized Postman for endpoint testing and debugging workflows.',
      'Managed source control via GitHub with branches, PRs, and project boards; daily standups and weekly reviews on Google Meet.',
      'Deployed the app on Render for demo and testing.',
    ],
  },
];

const LAYOUTS: { key: LayoutMode; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { key: 'timeline',  label: 'Timeline',  Icon: Rows3 },
  { key: 'accordion', label: 'Accordion', Icon: LayoutList },
  { key: 'tabs',      label: 'Tabs',      Icon: PanelTop },
  { key: 'cards',     label: 'Cards',     Icon: Briefcase },
  { key: 'resume',    label: 'Resume',    Icon: AlignLeft },
];

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className={styles.descriptionList}>
    {items.map((pt, i) => (
      <li key={i} className={styles.descriptionPoint}>{pt}</li>
    ))}
  </ul>
);

const TimelineLayout: React.FC = () => (
  <div className={styles.timeline}>
    {EXPERIENCES.map((exp, idx) => (
      <motion.div
        key={idx}
        className={styles.timelineItem}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: idx * 0.12 }}
      >
        <div className={styles.timelineBadge}><Briefcase size={14} /></div>
        <div className={styles.timelineCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.role}>{exp.role}</h3>
            <span className={styles.duration}>
              <Calendar size={12} style={{ marginRight: 4 }} />{exp.duration}
            </span>
          </div>
          <div className={styles.cardSubHeader}>
            <span className={styles.company}>{exp.company}</span>
            <span className={styles.location}>
              <MapPin size={12} style={{ marginRight: 4 }} />{exp.location}
            </span>
          </div>
          <BulletList items={exp.description} />
        </div>
      </motion.div>
    ))}
  </div>
);

const AccordionLayout: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={styles.accordionList}>
      {EXPERIENCES.map((exp, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className={`${styles.accordionItem} ${isOpen ? styles.accordionOpen : ''}`}>
            <button className={styles.accordionTrigger} onClick={() => setOpen(isOpen ? null : idx)}>
              <div className={styles.accordionLeft}>
                <span className={styles.accordionDot} />
                <div>
                  <div className={styles.accordionRole}>{exp.role}</div>
                  <div className={styles.accordionMeta}>
                    <span className={styles.company}>{exp.company}</span>
                    <span className={styles.accordionSep}>&middot;</span>
                    <span className={styles.location}>
                      <MapPin size={11} style={{ marginRight: 3 }} />{exp.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.accordionRight}>
                <span className={styles.duration}>
                  <Calendar size={11} style={{ marginRight: 4 }} />{exp.duration}
                </span>
                <ChevronDown size={18} className={`${styles.accordionChevron} ${isOpen ? styles.accordionChevronOpen : ''}`} />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className={styles.accordionBody}
                >
                  <BulletList items={exp.description} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const TabsLayout: React.FC = () => {
  const [active, setActive] = useState(0);
  const exp = EXPERIENCES[active];
  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.tabsBar}>
        {EXPERIENCES.map((e, i) => (
          <button
            key={i}
            className={`${styles.tabButton} ${active === i ? styles.tabButtonActive : ''}`}
            onClick={() => setActive(i)}
          >
            {e.company}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className={styles.tabsPanel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <div className={styles.tabsPanelHeader}>
            <div>
              <h3 className={styles.role}>{exp.role}</h3>
              <span className={styles.company}>{exp.company}</span>
            </div>
            <div className={styles.tabsPanelMeta}>
              <span className={styles.duration}>
                <Calendar size={12} style={{ marginRight: 4 }} />{exp.duration}
              </span>
              <span className={styles.location}>
                <MapPin size={12} style={{ marginRight: 4 }} />{exp.location}
              </span>
            </div>
          </div>
          <BulletList items={exp.description} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CardsLayout: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className={styles.cardsTrack}>
      {EXPERIENCES.map((exp, idx) => {
        const isExp = expanded === idx;
        return (
          <motion.div
            key={idx}
            className={`${styles.card} ${isExp ? styles.cardExpanded : ''}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            onClick={() => setExpanded(isExp ? null : idx)}
          >
            <div className={styles.cardTop}>
              <div className={styles.cardIndex}>0{idx + 1}</div>
              <div className={styles.cardTopMeta}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.company}>{exp.company}</span>
                <div className={styles.cardTopSub}>
                  <span className={styles.duration}>
                    <Calendar size={11} style={{ marginRight: 3 }} />{exp.duration}
                  </span>
                  <span className={styles.location}>
                    <MapPin size={11} style={{ marginRight: 3 }} />{exp.location}
                  </span>
                </div>
              </div>
              <ChevronDown size={18} className={`${styles.accordionChevron} ${isExp ? styles.accordionChevronOpen : ''}`} />
            </div>
            <AnimatePresence initial={false}>
              {isExp && (
                <motion.div
                  key="details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={styles.cardDetails}
                >
                  <BulletList items={exp.description} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

const ResumeLayout: React.FC = () => (
  <div className={styles.resumeList}>
    {EXPERIENCES.map((exp, idx) => (
      <motion.div
        key={idx}
        className={styles.resumeRow}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.1 }}
      >
        <div className={styles.resumeHeader}>
          <div className={styles.resumeLeft}>
            <span className={styles.resumeRole}>{exp.role}</span>
            <span className={styles.resumeSep}>@</span>
            <span className={styles.company}>{exp.company}</span>
          </div>
          <div className={styles.resumeRight}>
            <span className={styles.duration}>
              <Calendar size={11} style={{ marginRight: 3 }} />{exp.duration}
            </span>
            <span className={styles.location}>
              <MapPin size={11} style={{ marginRight: 3 }} />{exp.location}
            </span>
          </div>
        </div>
        <BulletList items={exp.description} />
        {idx < EXPERIENCES.length - 1 && <div className={styles.resumeDivider} />}
      </motion.div>
    ))}
  </div>
);

export const ExperienceSection: React.FC = () => {
  const { theme } = useTheme();
  const [sectionVisible, setSectionVisible] = useState(false);
  const [layout, setLayout] = useState<LayoutMode>('timeline');
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

  const renderLayout = () => {
    switch (layout) {
      case 'timeline':  return <TimelineLayout />;
      case 'accordion': return <AccordionLayout />;
      case 'tabs':      return <TabsLayout />;
      case 'cards':     return <CardsLayout />;
      case 'resume':    return <ResumeLayout />;
    }
  };

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          {sectionVisible && (
            <DecoderText key={`${theme}-${sectionVisible}`} text="Experience" delay={300} />
          )}
        </h2>

        <div className={styles.layoutSwitcher}>
          {LAYOUTS.map(({ key, label, Icon }) => (
            <button
              key={key}
              className={`${styles.layoutBtn} ${layout === key ? styles.layoutBtnActive : ''}`}
              onClick={() => setLayout(key)}
              title={label}
            >
              <Icon size={15} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={layout}
            className={styles.layoutArea}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {renderLayout()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
