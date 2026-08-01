import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  GitCommitHorizontal,
  GitPullRequest,
  FolderGit2,
  GitFork,
  Eye,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { fetchGitHubStats, type GitHubStatsData } from '../../services/githubStats';
import styles from './GitHubStatsSection.module.css';

// Animated CountUp component
const CountUpValue: React.FC<{ value: number; duration?: number }> = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalSteps = 60;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
};

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
        {/* Animated Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badgeRow}>
            <span className={styles.livePulseDot} />
            <span className={styles.badgeText}>LIVE GITHUB GRAPHQL SYNC</span>
          </div>

          <div className={styles.titleRow}>
            <motion.div
              className={styles.titleIconWrapper}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            >
              <svg className={styles.titleSvgIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.42 9.42 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5a10.03 10.03 0 0 0 3.9-16.57A10 10 0 0 0 12 2Z" />
              </svg>
            </motion.div>
            <h2 className={styles.title}>GitHub Open Source Impact</h2>
          </div>

          <p className={styles.subtitle}>
            Real-time activity & performance metrics aggregated directly via GitHub GraphQL.
          </p>
        </motion.div>

        {/* Primary Metric Cards Grid */}
        <div className={styles.metricsGrid}>
          {/* Card 1: Stars */}
          <motion.div
            className={styles.metricCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <div className={styles.cardGlowBg} />
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Stars Earned</span>
              <motion.div
                className={styles.iconCircle}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <Star className={styles.starIcon} />
              </motion.div>
            </div>
            <div className={styles.cardValue}>
              {loading ? '...' : <CountUpValue value={stats?.totalStars ?? 669} />}
            </div>
            <div className={styles.cardSubtext}>Total stars across open-source repos</div>
          </motion.div>

          {/* Card 2: Commits */}
          <motion.div
            className={styles.metricCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <div className={styles.cardGlowBg} />
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Lifetime Commits</span>
              <motion.div
                className={styles.iconCircle}
                animate={{ x: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              >
                <GitCommitHorizontal className={styles.commitIcon} />
              </motion.div>
            </div>
            <div className={styles.cardValue}>
              {loading ? '...' : <CountUpValue value={stats?.totalCommits ?? 5799} />}
            </div>
            <div className={styles.cardSubtext}>Pushed contributions to public & private repos</div>
          </motion.div>

          {/* Card 3: Pull Requests */}
          <motion.div
            className={styles.metricCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <div className={styles.cardGlowBg} />
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Pull Requests</span>
              <motion.div
                className={styles.iconCircle}
                animate={{ rotate: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <GitPullRequest className={styles.prIcon} />
              </motion.div>
            </div>
            <div className={styles.cardValue}>
              {loading ? '...' : <CountUpValue value={stats?.totalPRs ?? 219} />}
            </div>
            <div className={styles.cardSubtext}>Merged PRs and feature branches</div>
          </motion.div>

          {/* Card 4: Code Reviews */}
          <motion.div
            className={styles.metricCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <div className={styles.cardGlowBg} />
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Code Reviews</span>
              <motion.div
                className={styles.iconCircle}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              >
                <CheckCircle2 className={styles.reviewIcon} />
              </motion.div>
            </div>
            <div className={styles.cardValue}>
              {loading ? '...' : <CountUpValue value={stats?.totalReviews ?? 176} />}
            </div>
            <div className={styles.cardSubtext}>Peer reviews and quality checks</div>
          </motion.div>
        </div>

        {/* Secondary Highlights Row: Repos, Forks, Watchers, Followers */}
        <motion.div
          className={styles.secondaryGrid}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className={styles.miniCard}>
            <FolderGit2 className={styles.miniIcon} />
            <div className={styles.miniText}>
              <strong>{stats?.totalRepos ?? 33}</strong> Repositories
            </div>
          </div>

          <div className={styles.miniCard}>
            <GitFork className={styles.miniIcon} />
            <div className={styles.miniText}>
              <strong>{stats?.totalForks ?? 235}</strong> Forks Earned
            </div>
          </div>

          <div className={styles.miniCard}>
            <Eye className={styles.miniIcon} />
            <div className={styles.miniText}>
              <strong>{stats?.totalWatchers ?? 124}</strong> Watchers
            </div>
          </div>

          <div className={styles.miniCard}>
            <Users className={styles.miniIcon} />
            <div className={styles.miniText}>
              <strong>{stats?.followers ?? 73}</strong> Followers
            </div>
          </div>
        </motion.div>

        {/* Top Languages Breakdown */}
        {stats && stats.topLanguages && stats.topLanguages.length > 0 && (
          <motion.div
            className={styles.languagesCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className={styles.languagesHeaderRow}>
              <div className={styles.languagesHeaderTitle}>
                <Sparkles className={styles.sparkleIcon} />
                <span>Primary Language Distribution</span>
              </div>
              <span className={styles.langCountBadge}>{stats.topLanguages.length} Languages</span>
            </div>

            {/* Segmented color bar */}
            <div className={styles.langBar}>
              {stats.topLanguages.map((lang) => (
                <motion.div
                  key={lang.name}
                  className={styles.langSegment}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{ backgroundColor: lang.color }}
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
                    <strong>{lang.name}</strong> <span className={styles.percentText}>({lang.percentage}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
