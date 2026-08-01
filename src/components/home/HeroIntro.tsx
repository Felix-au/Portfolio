import React, { useState, useEffect } from 'react';
import { DecoderText } from '../ui/DecoderText';
import profile from '../../config/profile';
import styles from './HeroIntro.module.css';

export const HeroIntro: React.FC = () => {
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
        <h1 className={styles.name} data-visible={visible}>
          <DecoderText text={profile.name} delay={500} />
        </h1>

        <h2 className={styles.title}>
          <div className={styles.row}>
            <span className={styles.word} style={{ '--delay': '200ms' } as React.CSSProperties}>
              {profile.role}
            </span>
            <span className={styles.line} />
          </div>

          <div className={styles.row}>
            <span
              key={currentDiscipline}
              className={styles.word}
              data-plus="true"
              style={{ '--delay': '200ms' } as React.CSSProperties}
            >
              {currentDiscipline}
            </span>
          </div>
        </h2>
      </header>

      <div className={styles.scrollIndicator} aria-hidden="true" />
    </section>
  );
};
