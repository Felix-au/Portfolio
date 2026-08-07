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
  description: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Software Developer',
    company: 'Self-Employed / Freelance',
    duration: '2023 - Present',
    location: 'Remote',
    description: 'Developing high-performance full-stack web applications and offline desktop utility engines. Leveraging Electron, React, Node.js, and Python to deliver tailored local-first and generative AI solutions.',
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Tech Solutions Inc.',
    duration: '2022 - 2023',
    location: 'On-site',
    description: 'Assisted in building secure assessment platforms and microservice routing APIs. Optimised database pipelines using Spring Boot, Hibernate, and MySQL.',
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
                <p className={styles.description}>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
