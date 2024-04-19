import { useState, useEffect } from "react";
import { Artist } from "../utils/models";
import { fetchArtists } from "../utils/api";

const useArtists = (currentPage: number, itemsPerPage: number) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchArtists(currentPage, itemsPerPage);
        setArtists(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occured");
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [currentPage, itemsPerPage]);

  return { artists, isLoading, error };
};

export default useArtists;
