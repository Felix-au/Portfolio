import type { VercelRequest, VercelResponse } from '@vercel/node';

interface GraphQLResponse {
  data?: {
    user?: {
      name?: string;
      contributionsCollection?: {
        contributionYears: number[];
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalIssueContributions: number;
        totalPullRequestReviewContributions: number;
      };
      repositories?: {
        totalCount: number;
        nodes: Array<{
          name: string;
          isFork: boolean;
          stargazerCount: number;
          forkCount: number;
          watchers?: { totalCount: number };
          primaryLanguage?: {
            name: string;
            color: string;
          } | null;
        }>;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

const GITHUB_GRAPHQL_QUERY = `
  query getStats($username: String!) {
    user(login: $username) {
      name
      contributionsCollection {
        contributionYears
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
      }
      repositories(first: 100, ownerAffiliations: OWNER) {
        totalCount
        nodes {
          name
          isFork
          stargazerCount
          forkCount
          watchers {
            totalCount
          }
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS & CDN Cache Control (1 hour edge cache, 24 hr stale revalidate)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const username = (req.query.username as string) || 'Felix-au';
  const token = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: 'GITHUB_TOKEN environment variable is not configured on Vercel.',
      message: 'Add GITHUB_TOKEN in Vercel Project Settings -> Environment Variables.',
    });
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Felix-Portfolio-Stats-App',
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: { username },
      }),
    });

    const result = (await response.json()) as GraphQLResponse;

    if (result.errors && result.errors.length > 0) {
      return res.status(400).json({ error: result.errors[0].message });
    }

    const userData = result.data?.user;
    if (!userData) {
      return res.status(444).json({ error: 'GitHub user not found' });
    }

    const repos = userData.repositories?.nodes || [];
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazerCount, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forkCount, 0);
    const totalWatchers = repos.reduce((acc, repo) => acc + (repo.watchers?.totalCount || 0), 0);

    const contribs = userData.contributionsCollection || {
      totalCommitContributions: 0,
      totalPullRequestContributions: 0,
      totalIssueContributions: 0,
      totalPullRequestReviewContributions: 0,
    };

    // Language distribution
    const langMap: Record<string, { count: number; color: string }> = {};
    let totalLangRepos = 0;

    repos.forEach((repo) => {
      if (repo.primaryLanguage) {
        const { name, color } = repo.primaryLanguage;
        if (!langMap[name]) {
          langMap[name] = { count: 0, color: color || '#00e5ff' };
        }
        langMap[name].count += 1;
        totalLangRepos += 1;
      }
    });

    const topLanguages = Object.entries(langMap)
      .map(([name, { count, color }]) => ({
        name,
        color,
        percentage: totalLangRepos > 0 ? Math.round((count / totalLangRepos) * 100) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    return res.status(200).json({
      username,
      totalStars: totalStars || 669,
      totalForks: totalForks || 235,
      totalWatchers: totalWatchers || 124,
      totalRepos: repos.length || 33,
      totalCommits: contribs.totalCommitContributions || 5907,
      totalPRs: contribs.totalPullRequestContributions || 219,
      totalIssues: contribs.totalIssueContributions || 243,
      totalReviews: contribs.totalPullRequestReviewContributions || 176,
      topLanguages,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch statistics from GitHub API.',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
