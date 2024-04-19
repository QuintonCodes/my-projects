import { useEffect, useState } from "react";
import { Artist } from "../utils/models";
import { fetchArtistOfTheDay } from "../utils/api";

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
