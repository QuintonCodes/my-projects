import { fetchTotalCommits } from "@/services/githubService";
import { useEffect, useState } from "react";

interface Stat {
  num: number;
  text: string;
}

const initialStats: Stat[] = [
  {
    num: 3,
    text: "Years of experience",
  },
  {
    num: 4,
    text: "Projects completed",
  },
  {
    num: 10,
    text: "Technologies mastered",
  },
  {
    num: 0,
    text: "Code commits",
  },
];

const useStats = () => {
  const [stats, setStats] = useState<Stat[]>(initialStats);

  useEffect(() => {
    const fetchData = async () => {
      const username = "QuintonCodes";
      const repos = ["My-Projects"];
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

      if (!token) {
        console.error("No GitHub token found");
        return;
      }

      try {
        const commitCount = await fetchTotalCommits(username, repos, token);

        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.text === "Code commits" ? { ...stat, num: commitCount } : stat
          )
        );
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      }
    };

    fetchData();
  }, []);

  return stats;
};

export default useStats;
