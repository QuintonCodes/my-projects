import { initialStats, projectsData, skills } from "@/lib/data";
import { StatsProps } from "@/lib/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserRepos = async (username: string): Promise<string[]> => {
  const response = await axios.get(`/api/github?username=${username}`);
  return response.data.repositories || [];
};

const fetchTotalCommits = async (
  username: string,
  repo: string
): Promise<number> => {
  const response = await axios.get(
    `/api/github?username=${username}&repo=${repo}`
  );
  return response.data.totalCommits || 0;
};

export const useStats = () => {
  const username = "QuintonCodes";

  const { data: repositories = [] } = useQuery({
    queryKey: ["githubRepos", username],
    queryFn: () => fetchUserRepos(username),
    staleTime: 1000 * 60 * 60, // Data is considered fresh for 1 hour
    enabled: !!username,
  });

  const commitQueries = useQueries({
    queries: repositories.map((repo) => ({
      queryKey: ["githubCommits", username, repo],
      queryFn: () => fetchTotalCommits(username, repo),
      staleTime: 1000 * 60 * 60,
      refetchInterval: 1000 * 60 * 15, // Refetch every 15 minutes
      enabled: !!username && repositories.length > 0,
      placeholderData: 0,
    })),
  });

  const totalCommits = commitQueries.reduce(
    (sum, query) => sum + (query.data || 0),
    0
  );

  const projectCount = projectsData.length;
  const techCount = skills.skillList.length;

  const stats: StatsProps[] = initialStats.map((stat) => {
    switch (stat.text) {
      case "Projects completed":
        return { ...stat, num: projectCount };
      case "Technologies mastered":
        return { ...stat, num: techCount };
      case "Code commits":
        return { ...stat, num: totalCommits };
      default:
        return stat;
    }
  });

  return stats;
};
