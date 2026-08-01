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
    }, 3500);

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

        {/* Bio Description & Expertise */}
        <div className={styles.bio}>
          <p>
            I'm a Software Engineer, AI Developer & Systems Programmer passionate about building highly polished, performance-driven desktop applications, scalable web services, and intelligent systems. My work spans full-stack engineering, multimodal AI deployment at scale, and cloud-native infrastructure.
          </p>

          <p>
            Currently pursuing a B.Tech in Computer Science Engineering at BML Munjal University (CGPA: 8.15), I’ve engineered production-ready enterprise platforms ranging from secure academic assessment portals (
            <a href="https://prashnasetu.com" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              PrashnaSetu
            </a>
            ) and AI model hosting & unified API gateways (
            <a href="https://omnikeyai.felixau.in" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              OmniKey AI
            </a>
            ) to OS-level Windows utilities (
            <a href="https://sonixx.felixau.in/" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              Sonixx
            </a>
            ,{' '}
            <a href="https://github.com/Felix-au/MouseX-Absolute-Mouse-Control" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              MouseX
            </a>
            ,{' '}
            <a href="https://github.com/Felix-au/DeskX-Wallpaper-Engine" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              DeskX
            </a>
            ) and desktop intelligence suites (
            <a href="https://corvusx.felixau.in/" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              CorvusX
            </a>
            ).
          </p>

          <p>
            Beyond enterprise systems, I actively build open-source developer tools and interactive graphics libraries including{' '}
            <a href="https://cursorx.felixau.in/" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              CursorX
            </a>
            ,{' '}
            <a href="https://3dconstructs.felixau.in/" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              3D Constructs Library
            </a>
            , and{' '}
            <a href="https://github.com/Felix-au/AlgoBuddy" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              AlgoBuddy
            </a>
            .
          </p>

          <p>
            I enjoy solving complex engineering challenges—whether optimizing low-latency LLM pipelines, scaling backend services, or architecting developer infrastructure.
          </p>

          <div className={styles.expertise}>
            <div className={styles.expertiseHeader}>🧠 Core Areas of Expertise</div>
            <div className={styles.expertiseItem}>
              🚀 <strong>Full-Stack Engineering:</strong> React, Next.js, FastAPI, Node.js, Spring Boot, Django
            </div>
            <div className={styles.expertiseItem}>
              🖥️ <strong>Systems Programming & Windows Core:</strong> Win32 FFI, WASAPI, and OS-level hooks
            </div>
            <div className={styles.expertiseItem}>
              🤖 <strong>Agentic AI, NLP, RAG, LLM Applications & Multimodal Systems</strong>
            </div>
            <div className={styles.expertiseItem}>
              ☁️ <strong>Cloud & DevOps:</strong> AWS, Azure, Docker, Kubernetes, Redis, Kafka
            </div>
            <div className={styles.expertiseItem}>
              🗄️ <strong>Databases & Storage:</strong> MySQL, MongoDB Atlas, PostgreSQL, MariaDB, Firebase
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};
