import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DecoderText } from '../ui/DecoderText';
import profile from '../../config/profile';
import styles from './HeroIntro.module.css';

export const HeroIntro: React.FC = () => {
  const [disciplineIndex, setDisciplineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisciplineIndex((prev) => (prev + 1) % profile.disciplines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentDiscipline = profile.disciplines[disciplineIndex];

  return (
    <section className={styles.intro}>
      <header className={styles.text}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.name}
        >
          <DecoderText text={profile.name} delay={300} />
        </motion.h1>

        <div className={styles.title}>
          <div className={styles.row}>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={styles.word}
            >
              {profile.role}
            </motion.span>

            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              className={styles.line}
            />
          </div>

          <div className={styles.row} style={{ marginTop: '0.4rem' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentDiscipline}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className={styles.word}
                data-plus="true"
              >
                {currentDiscipline}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className={styles.scrollIndicator} aria-hidden="true" />
    </section>
  );
};
