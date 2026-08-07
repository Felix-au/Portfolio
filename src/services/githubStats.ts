import staticStats from '../config/githubStats.json';

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
  followers?: number;
  topLanguages: LanguageStat[];
  repoStars?: Record<string, number>;
  isFallback?: boolean;
  error?: string;
}

export async function fetchGitHubStats(username = 'Felix-au'): Promise<GitHubStatsData> {
  // 1. Try Vercel Serverless Endpoint (/api/github-stats)
  try {
    const res = await fetch(`/api/github-stats?username=${username}`);
    if (res.ok) {
      const data = (await res.json()) as GitHubStatsData;
      if (!data.error) {
        return { ...data, isFallback: false };
      }
    }
  } catch {
    // Serverless endpoint unavailable in static local dev server mode
  }

  // 2. Return pre-compiled static JSON updated automatically by GitHub Actions
  return staticStats as GitHubStatsData;
}
