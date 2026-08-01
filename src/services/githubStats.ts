export interface LanguageStat {
  name: string;
  color: string;
  percentage: number;
}

export interface GitHubStatsData {
  username: string;
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  totalRepos: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalReviews: number;
  topLanguages: LanguageStat[];
  isFallback?: boolean;
}

const DEFAULT_METRICS: GitHubStatsData = {
  username: 'Felix-au',
  totalStars: 669,
  totalForks: 235,
  totalWatchers: 124,
  totalRepos: 33,
  totalCommits: 5907,
  totalPRs: 219,
  totalIssues: 243,
  totalReviews: 176,
  topLanguages: [
    { name: 'TypeScript', color: '#3178c6', percentage: 34 },
    { name: 'JavaScript', color: '#f1e05a', percentage: 31 },
    { name: 'Python', color: '#3572A5', percentage: 13 },
    { name: 'Java', color: '#b07219', percentage: 9 },
  ],
  isFallback: true,
};

export async function fetchGitHubStats(username = 'Felix-au'): Promise<GitHubStatsData> {
  // 1. Fetch from Vercel Serverless Function (/api/github-stats)
  // Token is read strictly on server side via process.env.GITHUB_TOKEN
  try {
    const res = await fetch(`/api/github-stats?username=${username}`);
    if (res.ok) {
      const data = (await res.json()) as GitHubStatsData;
      if (!data.error) {
        return { ...data, isFallback: false };
      }
    }
  } catch {
    // Endpoint unavailable in local static vite dev server mode
  }

  // 2. Unauthenticated GitHub Public REST API Fallback
  try {
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (reposRes.ok) {
      const repos = (await reposRes.json()) as Array<{
        stargazers_count: number;
        forks_count: number;
        watchers_count: number;
        language: string | null;
      }>;

      const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);
      const totalWatchers = repos.reduce((acc, r) => acc + (r.watchers_count || 0), 0);

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
        totalStars: totalStars || DEFAULT_METRICS.totalStars,
        totalForks: totalForks || DEFAULT_METRICS.totalForks,
        totalWatchers: totalWatchers || DEFAULT_METRICS.totalWatchers,
        totalRepos: repos.length || DEFAULT_METRICS.totalRepos,
        totalCommits: DEFAULT_METRICS.totalCommits,
        totalPRs: DEFAULT_METRICS.totalPRs,
        totalIssues: DEFAULT_METRICS.totalIssues,
        totalReviews: DEFAULT_METRICS.totalReviews,
        topLanguages: topLanguages.length > 0 ? topLanguages : DEFAULT_METRICS.topLanguages,
        isFallback: false,
      };
    }
  } catch {
    // Default metrics
  }

  // 3. Authenticated profile metrics fallback
  return DEFAULT_METRICS;
}
