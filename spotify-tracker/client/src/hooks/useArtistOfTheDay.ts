import { useEffect, useState } from "react";
import { fetchArtistOfTheDay } from "../utils/api";
import { Artist } from "../utils/models";

const useArtistOfTheDay = () => {
  const [artistOfTheDay, setArtistOfTheDay] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchArtistOfTheDay();
        setArtistOfTheDay(data);
      } catch (error) {
        console.error("Failed to fetch artist of the day:", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return {
    artistOfTheDay,
    isLoading,
  };
};

export default useArtistOfTheDay;
