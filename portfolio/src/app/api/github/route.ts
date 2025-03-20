import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const GITHUB_API_BASE_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
};

const fetchUserRepos = async (username: string): Promise<string[]> => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}/repos`,
      { headers }
    );
    return response.data.map((repo: { name: string }) => repo.name);
  } catch (error) {
    throw new Error(`Failed to fetch repositories: ${error}`);
  }
};

const fetchTotalCommits = async (
  username: string,
  repo: string
): Promise<number> => {
  let totalCommits = 0;
  let page = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE_URL}/repos/${username}/${repo}/commits?per_page=100&page=${page}`,
        { headers }
      );

      if (response.status !== 200)
        throw new Error(`Failed to fetch commits for ${repo}`);

      const commitsOnPage = response.data;
      if (Array.isArray(commitsOnPage)) {
        totalCommits += commitsOnPage.length;
        hasMorePages = commitsOnPage.length === 100;
        page++;
      } else {
        hasMorePages = false;
      }
    } catch (error) {
      throw new Error(`Error fetching commits for ${repo}: ${error}`);
    }
  }

  return totalCommits;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const repo = searchParams.get("repo");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    if (repo) {
      const totalCommits = await fetchTotalCommits(username, repo);
      return NextResponse.json({ totalCommits });
    } else {
      const repositories = await fetchUserRepos(username);
      return NextResponse.json({ repositories });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error || "An error occurred" },
      { status: 500 }
    );
  }
}
