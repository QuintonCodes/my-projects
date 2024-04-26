import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { fetchDailyArtist } from "../utils/api";
import { Artist } from "../utils/models";

const useDailyArtist = () => {
  const [dailyArtist, setDailyArtist] = useState<Artist | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userContext = useContext(UserContext);

  useEffect(() => {
    const load = async () => {
      if (!userContext?.user) {
        setError("Please log in to view this content.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const data = await fetchDailyArtist();
        setDailyArtist(data);
      } catch (error) {
        console.error("Failed to fetch daily artist:", error);
        setError(`Failed to fetch daily artist: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [userContext?.user]);

  return {
    dailyArtist,
    isLoading,
    error,
  };
};

export default useDailyArtist;
