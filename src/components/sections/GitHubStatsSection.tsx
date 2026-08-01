import React, { useEffect, useState } from 'react';
import { fetchGitHubStats, type GitHubStatsData } from '../../services/githubStats';
import styles from './GitHubStatsSection.module.css';

export const GitHubStatsSection: React.FC = () => {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubStats('Felix-au').then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="github-stats" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <svg className={styles.titleIcon} viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.42 9.42 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5a10.03 10.03 0 0 0 3.9-16.57A10 10 0 0 0 12 2Z" />
            </svg>
            <h2 className={styles.title}>GitHub Activity & Statistics</h2>
          </div>
          <p className={styles.subtitle}>
            Live metrics aggregated securely via GitHub GraphQL API.
          </p>
        </div>

        {/* 4 Primary Metric Cards */}
        <div className={styles.metricsGrid}>
          {/* Total Stars */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Stars Earned</span>
              <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <div className={styles.cardValue}>
              {loading ? '...' : (stats?.totalStars ?? 0)}
            </div>
          </div>

          {/* Total Commits / Contributions */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Contributions</span>
              <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
            <div className={styles.cardValue}>
              {loading ? '...' : (stats?.totalCommits ?? 0)}
            </div>
          </div>

          {/* Pull Requests & Reviews */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>PRs & Reviews</span>
              <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.59L8.41 12 9.83 10.58l3.17 3.18 6.41-6.42L20.83 8.76z" />
              </svg>
            </div>
            <div className={styles.cardValue}>
              {loading ? '...' : (stats ? stats.totalPRs + stats.totalReviews : 0)}
            </div>
          </div>

          {/* Public Repositories */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Repositories</span>
              <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
              </svg>
            </div>
            <div className={styles.cardValue}>
              {loading ? '...' : (stats?.totalRepos ?? 0)}
            </div>
          </div>
        </div>

        {/* Top Languages Breakdown */}
        {stats && stats.topLanguages && stats.topLanguages.length > 0 && (
          <div className={styles.languagesCard}>
            <div className={styles.languagesHeader}>Most Used Languages</div>

            {/* Segmented color bar */}
            <div className={styles.langBar}>
              {stats.topLanguages.map((lang) => (
                <div
                  key={lang.name}
                  className={styles.langSegment}
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                  }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Legend */}
            <div className={styles.langLegend}>
              {stats.topLanguages.map((lang) => (
                <div key={lang.name} className={styles.legendItem}>
                  <span className={styles.dot} style={{ backgroundColor: lang.color }} />
                  <span>
                    <strong>{lang.name}</strong> ({lang.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
