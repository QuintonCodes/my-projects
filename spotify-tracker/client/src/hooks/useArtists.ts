import { useState, useEffect } from "react";
import { fetchArtists } from "../utils/api";
import { Artist } from "../utils/models";
import axios from "axios";

const useArtists = (currentPage: number, itemsPerPage: number) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setIsLoading(true);

      try {
        const data = await fetchArtists(
          currentPage,
          itemsPerPage,
          controller.signal
        );
        setArtists(data);
      } catch (error: unknown) {
        if (axios.isCancel(error)) {
          console.log("Fetch cancelled");
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occured");
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();

    return () => {
      controller.abort();
    };
  }, [currentPage, itemsPerPage]);

  return { artists, isLoading, error };
};

export default useArtists;
