import { projectsData, skillsData } from "@/data/info-data";
import { fetchTotalCommits } from "@/services/githubService";
import { useQuery } from "@tanstack/react-query";

interface Stat {
  num: number;
  text: string;
}

const initialStats: Stat[] = [
  {
    num: 3,
    text: "Years of coding experience",
  },
  {
    num: 0,
    text: "Projects completed",
  },
  {
    num: 0,
    text: "Technologies mastered",
  },
  {
    num: 0,
    text: "Code commits",
  },
];

const useStats = () => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

  const { data: commitCount = 0 } = useQuery({
    queryKey: [
      "githubCommits",
      { username: "QuintonCodes", repos: ["My-Projects"] },
    ],
    queryFn: async () => {
      const username = "QuintonCodes";
      const repos = ["My-Projects"];
      return await fetchTotalCommits(username, repos, token);
    },
    staleTime: 1000 * 60 * 60, // Data is considered fresh for 1 hour
    enabled: !!token,
    refetchInterval: 1000 * 60 * 25,
    placeholderData: 0,
  });

  const projectCount = projectsData.length;
  const techCount = skillsData.skillList.length;

  const stats: Stat[] = initialStats.map((stat) => {
    switch (stat.text) {
      case "Projects completed":
        return { ...stat, num: projectCount };
      case "Technologies mastered":
        return { ...stat, num: techCount };
      case "Code commits":
        return { ...stat, num: commitCount };
      default:
        return stat;
    }
  });

  return stats;
};

export default useStats;
