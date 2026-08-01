import React, { useState, useEffect } from 'react';
import { DecoderText } from '../ui/DecoderText';
import profile from '../../config/profile';
import { useTheme } from '../../context/ThemeContext';
import styles from './HeroIntro.module.css';

export const HeroIntro: React.FC = () => {
  const { theme } = useTheme();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [prevDisciplineIndex, setPrevDisciplineIndex] = useState<number | null>(null);

  useEffect(() => {
    setDisciplineIndex(0);
    setPrevDisciplineIndex(null);
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisciplineIndex((prev) => {
        setPrevDisciplineIndex(prev);
        return (prev + 1) % profile.disciplines.length;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [theme]);

  const currentDiscipline = profile.disciplines[disciplineIndex];
  const previousDiscipline =
    prevDisciplineIndex !== null && prevDisciplineIndex !== disciplineIndex
      ? profile.disciplines[prevDisciplineIndex]
      : null;

  return (
    <section className={styles.intro}>
      <header key={theme} className={styles.text}>
        <h1 className={styles.name} data-visible="true">
          <DecoderText text={profile.name} delay={300} />
        </h1>

        <h2 className={styles.title}>
          <div className={styles.row}>
            <span className={styles.word} style={{ '--delay': '200ms' } as React.CSSProperties}>
              {profile.role}
            </span>
            <span className={styles.line} />
          </div>

          <div className={styles.subRoleRow}>
            {previousDiscipline && (
              <span
                key={`prev-${theme}-${previousDiscipline}`}
                className={styles.word}
                data-plus="true"
                data-status="exiting"
              >
                {previousDiscipline}
              </span>
            )}

            <span
              key={`${theme}-${currentDiscipline}`}
              className={styles.word}
              data-plus="true"
              data-status="entering"
              style={{ '--delay': prevDisciplineIndex === null ? '1100ms' : '0ms' } as React.CSSProperties}
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
