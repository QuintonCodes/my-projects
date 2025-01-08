const GITHUB_API_BASE_URL = "https://api.github.com";

export const fetchTotalCommits = async (
  username: string,
  repos: string[],
  token: string
): Promise<number> => {
  let totalCommits = 0;

  for (const repo of repos) {
    const response = await fetch(
      `${GITHUB_API_BASE_URL}/repos/${username}/${repo}/commits`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch commits for ${repo}: HTTP ${response.status} - ${
          response.statusText || "Unknown error"
        }`
      );
      continue;
    }

    const commits = await response.json();
    totalCommits += commits.length;
  }

  return totalCommits;
};
