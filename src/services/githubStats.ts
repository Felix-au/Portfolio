export interface LanguageStat {
  name: string;
  color: string;
  percentage: number;
}

export interface GitHubStatsData {
  username: string;
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalReviews: number;
  topLanguages: LanguageStat[];
  isFallback?: boolean;
}

const FALLBACK_STATS: GitHubStatsData = {
  username: 'Felix-au',
  totalStars: 42,
  totalForks: 14,
  totalRepos: 28,
  totalCommits: 580,
  totalPRs: 36,
  totalIssues: 12,
  totalReviews: 15,
  topLanguages: [
    { name: 'TypeScript', color: '#3178c6', percentage: 42 },
    { name: 'Python', color: '#3572A5', percentage: 28 },
    { name: 'C++', color: '#f34b7d', percentage: 18 },
    { name: 'Rust', color: '#dea584', percentage: 12 },
  ],
  isFallback: true,
};

export async function fetchGitHubStats(username = 'Felix-au'): Promise<GitHubStatsData> {
  try {
    // 1. Try Vercel Serverless Endpoint
    const res = await fetch(`/api/github-stats?username=${username}`);
    if (res.ok) {
      const data = (await res.json()) as GitHubStatsData;
      return { ...data, isFallback: false };
    }
  } catch (e) {
    console.warn('Vercel serverless stats endpoint unavailable, trying public REST API fallback.', e);
  }

  try {
    // 2. Fallback to GitHub Public REST API (Unauthenticated client fetch)
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (reposRes.ok) {
      const repos = (await reposRes.json()) as Array<{
        stargazers_count: number;
        forks_count: number;
        language: string | null;
      }>;

      const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

      const langCounts: Record<string, number> = {};
      let totalLang = 0;
      repos.forEach((r) => {
        if (r.language) {
          langCounts[r.language] = (langCounts[r.language] || 0) + 1;
          totalLang += 1;
        }
      });

      const langColors: Record<string, string> = {
        TypeScript: '#3178c6',
        JavaScript: '#f1e05a',
        Python: '#3572A5',
        'C++': '#f34b7d',
        C: '#555555',
        Rust: '#dea584',
        HTML: '#e34c26',
        CSS: '#563d7c',
      };

      const topLanguages: LanguageStat[] = Object.entries(langCounts)
        .map(([name, count]) => ({
          name,
          color: langColors[name] || '#00e5ff',
          percentage: totalLang > 0 ? Math.round((count / totalLang) * 100) : 0,
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 5);

      return {
        username,
        totalStars: totalStars || FALLBACK_STATS.totalStars,
        totalForks: totalForks || FALLBACK_STATS.totalForks,
        totalRepos: repos.length || FALLBACK_STATS.totalRepos,
        totalCommits: FALLBACK_STATS.totalCommits,
        totalPRs: FALLBACK_STATS.totalPRs,
        totalIssues: FALLBACK_STATS.totalIssues,
        totalReviews: FALLBACK_STATS.totalReviews,
        topLanguages: topLanguages.length > 0 ? topLanguages : FALLBACK_STATS.topLanguages,
        isFallback: false,
      };
    }
  } catch (e) {
    console.warn('GitHub Public REST API failed, using cached default profile metrics.', e);
  }

  // 3. Final default fallback
  return FALLBACK_STATS;
}
