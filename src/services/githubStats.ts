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

const DEFAULT_METRICS: GitHubStatsData = {
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

const GITHUB_GRAPHQL_QUERY = `
  query getStats($username: String!) {
    user(login: $username) {
      name
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
      }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
        nodes {
          name
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

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
    // Vercel API endpoint not active in static dev server mode
  }

  // 2. Try Client-Side GraphQL using VITE_GITHUB_TOKEN from .env.local (if available)
  const envToken = import.meta.env.VITE_GITHUB_TOKEN;
  if (envToken && envToken !== 'your_github_token_here') {
    try {
      const gqlRes = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${envToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GITHUB_GRAPHQL_QUERY,
          variables: { username },
        }),
      });

      if (gqlRes.ok) {
        const result = await gqlRes.json();
        const userData = result?.data?.user;
        if (userData) {
          const repos = userData.repositories?.nodes || [];
          const totalStars = repos.reduce((acc: number, r: { stargazerCount: number }) => acc + r.stargazerCount, 0);
          const totalForks = repos.reduce((acc: number, r: { forkCount: number }) => acc + r.forkCount, 0);
          const contribs = userData.contributionsCollection || {};

          const langMap: Record<string, { count: number; color: string }> = {};
          let totalLang = 0;
          repos.forEach((repo: { primaryLanguage?: { name: string; color: string } }) => {
            if (repo.primaryLanguage) {
              const { name, color } = repo.primaryLanguage;
              langMap[name] = langMap[name] || { count: 0, color: color || '#00e5ff' };
              langMap[name].count += 1;
              totalLang += 1;
            }
          });

          const topLanguages: LanguageStat[] = Object.entries(langMap)
            .map(([name, { count, color }]) => ({
              name,
              color,
              percentage: totalLang > 0 ? Math.round((count / totalLang) * 100) : 0,
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5);

          return {
            username,
            totalStars,
            totalForks,
            totalRepos: repos.length,
            totalCommits: contribs.totalCommitContributions || 0,
            totalPRs: contribs.totalPullRequestContributions || 0,
            totalIssues: contribs.totalIssueContributions || 0,
            totalReviews: contribs.totalPullRequestReviewContributions || 0,
            topLanguages,
            isFallback: false,
          };
        }
      }
    } catch {
      // Fallback below
    }
  }

  // 3. Fallback to GitHub Public REST API (Unauthenticated)
  try {
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
        totalStars: totalStars || DEFAULT_METRICS.totalStars,
        totalForks: totalForks || DEFAULT_METRICS.totalForks,
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
    // Return defaults below
  }

  // 4. Default metrics
  return DEFAULT_METRICS;
}
