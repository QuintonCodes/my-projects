import { useEffect, useState, useContext } from "react";
import { fetchArtistOfTheDay } from "../utils/api";
import { Artist } from "../utils/models";
import { UserContext } from "../context/UserContext";

const useArtistOfTheDay = () => {
  const [artistOfTheDay, setArtistOfTheDay] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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
        const data = await fetchArtistOfTheDay();
        setArtistOfTheDay(data);
      } catch (error) {
        console.error("Failed to fetch artist of the day:", error);
        setError(`Failed to fetch artist of the day: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [userContext?.user]);

  return {
    artistOfTheDay,
    isLoading,
    error,
  };
};

export default useArtistOfTheDay;
