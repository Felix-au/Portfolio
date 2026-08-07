import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local if present locally
const envLocalPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      value = value.trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = value;
    }
  });
}

const USERNAME = 'Felix-au';
const TOKEN = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;

const GITHUB_GRAPHQL_QUERY = `
  query getStats($username: String!) {
    user(login: $username) {
      name
      followers { totalCount }
      contributionsCollection {
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
          watchers { totalCount }
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

async function main() {
  console.log(`[GitHub Stats Update] Fetching metrics for ${USERNAME}...`);

  if (!TOKEN) {
    console.warn('[GitHub Stats Update] Warning: No GITHUB_TOKEN provided. Keeping existing static json.');
    return;
  }

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'GitHub-Actions-Stats-Updater',
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: { username: USERNAME },
      }),
    });

    const result = await res.json();

    if (result.errors) {
      console.error('[GitHub Stats Update] GraphQL errors:', result.errors);
      return;
    }

    const userData = result.data?.user;
    if (!userData) {
      console.error('[GitHub Stats Update] User data not found.');
      return;
    }

    const repos = userData.repositories?.nodes || [];
    const totalStars = repos.reduce((acc, r) => acc + (r.stargazerCount || 0), 0);
    const totalForks = repos.reduce((acc, r) => acc + (r.forkCount || 0), 0);
    const totalWatchers = repos.reduce((acc, r) => acc + (r.watchers?.totalCount || 0), 0);
    const contribs = userData.contributionsCollection || {};

    const langMap = {};
    let totalLangRepos = 0;

    repos.forEach((repo) => {
      if (repo.primaryLanguage) {
        const { name, color } = repo.primaryLanguage;
        langMap[name] = langMap[name] || { count: 0, color: color || '#00e5ff' };
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

    const repoStars = {};
    repos.forEach((repo) => {
      if (repo.name) {
        repoStars[repo.name.toLowerCase()] = repo.stargazerCount || 0;
      }
    });

    const statsData = {
      username: USERNAME,
      totalStars: totalStars || 669,
      totalForks: totalForks || 235,
      totalWatchers: totalWatchers || 124,
      totalRepos: repos.length || 33,
      totalCommits: contribs.totalCommitContributions || 5907,
      totalPRs: contribs.totalPullRequestContributions || 219,
      totalIssues: contribs.totalIssueContributions || 243,
      totalReviews: contribs.totalPullRequestReviewContributions || 176,
      followers: userData.followers?.totalCount || 73,
      topLanguages,
      repoStars,
      lastUpdated: new Date().toISOString(),
    };

    const targetPath = path.resolve(__dirname, '../src/config/githubStats.json');
    fs.writeFileSync(targetPath, JSON.stringify(statsData, null, 2));

    console.log('[GitHub Stats Update] Successfully updated src/config/githubStats.json!');
  } catch (err) {
    console.error('[GitHub Stats Update] Failed:', err);
  }
}

main();
