import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
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

const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Co-Creator & Full Stack Developer',
    company: 'PrashnaSetu',
    duration: '01 August 2025 - Present',
    location: 'Gurgaon, Haryana',
    description: [
      'Designed & developed PrashnaSetu © from concept to deployment & production support.',
      'Engineered a secure quiz management system for academic institutions featuring a proctored JavaFX desktop client, a mDNS Spring Boot server and a React-based companion and results web portal.',
      'Led development & pilot at BMU, resulting in 1,200+ downloads & active institutional adoption.',
      'Conducted 12,000+ evaluations among 1,500+ users with reliable & secure automated assessments.',
      'Spearheaded end-to-end software development initiatives, translating faculty requirements into system designs and delivering solutions through development, testing, documentation, deployment, iterative improvements and continued support.'
    ]
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'MetaInfoSci',
    duration: '01 September 2025 - 31 October 2025',
    location: 'Gurgaon, Haryana (Remote)',
    description: [
      'Designed & implemented full-stack Django modules to extend core analytical features and data visualizations.',
      'Scaled platform responsiveness to support 500+ active researchers analyzing over 297K+ publications.',
      'Engineered a Node.js/Express CMS backend for landing assets and SMTP automation, offloading primary analytical servers.',
      'Extended Django\'s ingestion layer by building custom parser modules for Web of Science (WoS) and Scopus datasets, standardizing varied column schemas into a unified PostgreSQL schema.',
      'Implemented chunked Gzip uploads with server-side assembly to reliably ingest large datasets, bypassing network timeouts.'
    ]
  },
  {
    role: 'Software Developer Intern',
    company: 'Center for Advanced Data and Computational Science (CAD-CS)',
    duration: '25 May 2025 - 25 July 2025',
    location: 'Gurgaon, Haryana',
    description: [
      'Developed SmartQuiz, a Java/JavaFX desktop quiz application designed for secure assessments and institutional use.',
      'Designed and implemented role-based authentication, secure local data storage with SQLite, and encrypted data handling to maintain assessment integrity.',
      'Developed anti-cheating mechanisms and other assessment-security features to support controlled examination environments.',
      'Built instructor dashboards for quiz creation, analytics, and performance reporting, alongside student interfaces for quiz attempts and real-time feedback.',
      'Managed the complete software development lifecycle, including requirements analysis, system design, development, testing, documentation and deployment.'
    ]
  },
  {
    role: 'Software Developer Intern',
    company: 'BlueStock FinTech',
    duration: '1 Feb 2025 - 28 Mar 2025',
    location: 'Remote',
    description: [
      'Collaborated in a team to develop an IPO Web App with a secure backend using Node.js, Express.js, and MongoDB.',
      'Built RESTful APIs for authentication, IPO data, and investor management with secured with JWT-based authentication.',
      'Integrated PAN verification via Axios, improving data validation and fraud prevention.',
      'Utilized Postman for endpoint testing and debugging workflows.',
      'Managed source control via GitHub with branches, PRs, and project boards; attended daily standups and weekly reviews on Google Meet.',
      'Deployed the app on Render for demo and testing.'
    ]
  }
];

export const ExperienceSection: React.FC = () => {
  const { theme } = useTheme();
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          {sectionVisible && (
            <DecoderText key={`${theme}-${sectionVisible}`} text="Experience" delay={300} />
          )}
        </h2>

        <div className={styles.timeline}>
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              className={styles.timelineItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className={styles.timelineBadge}>
                <Briefcase size={16} />
              </div>
              <div className={styles.timelineCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <span className={styles.duration}>
                    <Calendar size={12} style={{ marginRight: '4px' }} />
                    {exp.duration}
                  </span>
                </div>
                <div className={styles.cardSubHeader}>
                  <span className={styles.company}>{exp.company}</span>
                  <span className={styles.location}>
                    <MapPin size={12} style={{ marginRight: '4px' }} />
                    {exp.location}
                  </span>
                </div>
                <ul className={styles.descriptionList}>
                  {exp.description.map((point, pIdx) => (
                    <li key={pIdx} className={styles.descriptionPoint}>
                      {point}
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
