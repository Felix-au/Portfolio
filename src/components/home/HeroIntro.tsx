import React, { useState, useEffect } from 'react';
import { DecoderText } from '../ui/DecoderText';
import profile from '../../config/profile';
import { useTheme } from '../../context/ThemeContext';
import { fetchGitHubStats, type GitHubStatsData } from '../../services/githubStats';
import styles from './HeroIntro.module.css';

export const HeroIntro: React.FC = () => {
  const { theme } = useTheme();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [prevDisciplineIndex, setPrevDisciplineIndex] = useState<number | null>(null);
  const [stats, setStats] = useState<GitHubStatsData | null>(null);

  useEffect(() => {
    setDisciplineIndex(0);
    setPrevDisciplineIndex(null);
  }, [theme]);

  useEffect(() => {
    fetchGitHubStats('Felix-au').then((data) => {
      setStats(data);
    });
  }, []);

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

            <div className={styles.lineWrapper}>
              {/* Above the line: Stars, Commits, Forks, Watched */}
              <div className={styles.lineStatsAbove}>
                <span className={styles.statItem} title="Stars Earned">
                  ⭐ <strong>{stats ? stats.totalStars : 669}</strong> Stars
                </span>
                <span className={styles.statDot}>•</span>
                <span className={styles.statItem} title="Lifetime Commits">
                  🔨 <strong>{stats ? stats.totalCommits.toLocaleString() : '5,907'}</strong> Commits
                </span>
                <span className={styles.statDot}>•</span>
                <span className={styles.statItem} title="Forks Earned">
                  🍴 <strong>{stats ? stats.totalForks : 235}</strong> Forks
                </span>
                <span className={styles.statDot}>•</span>
                <span className={styles.statItem} title="Watched Repositories">
                  👁️ <strong>27</strong> Watched
                </span>
              </div>

              {/* Undisturbed horizontal line */}
              <span className={styles.line} />

              {/* Below the line: PRs, Code Reviews, Issues, Followers */}
              <div className={styles.lineStatsBelow}>
                <span className={styles.statItem} title="Pull Requests Created">
                  🔀 <strong>{stats ? stats.totalPRs : 219}</strong> PRs
                </span>
                <span className={styles.statDot}>•</span>
                <span className={styles.statItem} title="Code Reviews Performed">
                  👀 <strong>{stats ? stats.totalReviews : 176}</strong> Reviews
                </span>
                <span className={styles.statDot}>•</span>
                <span className={styles.statItem} title="Issues Opened">
                  🐛 <strong>{stats ? stats.totalIssues : 243}</strong> Issues
                </span>
                <span className={styles.statDot}>•</span>
                <span className={styles.statItem} title="GitHub Followers">
                  👥 <strong>73</strong> Followers
                </span>
              </div>
            </div>
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

        {/* Bio Description */}
        <div className={styles.bio}>
          <p>
            I'm a Software Engineer, AI Developer & Systems Programmer passionate about building performance-driven desktop applications, optimizing low-latency LLM pipelines, scalable web services, & intelligent systems. I’ve engineered production-ready enterprise platforms ranging from secure assessment portals (
            <a href="https://prashnasetu.com" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              PrashnaSetu
            </a>
            ) & AI model hosting & unified API gateway (
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
            ) and desktop assistants (
            <a href="https://corvusx.felixau.in/" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              CorvusX
            </a>
            ).
          </p>

          <p>
            Beyond enterprise systems, I build open-source developer tools and graphics libraries, featuring projects like{' '}
            <a href="https://cursorx.felixau.in/" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              CursorX
            </a>
            ,{' '}
            <a href="https://3dconstructs.felixau.in/" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              3D Constructs Library
            </a>
            ,{' '}
            <a href="https://github.com/Felix-au/AlgoBuddy" target="_blank" rel="noopener noreferrer" className={styles.bioLink}>
              AlgoBuddy
            </a>
            {' '}and more.
          </p>
        </div>
      </header>
    </section>
  );
};
