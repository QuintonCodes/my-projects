import { useState, useEffect } from "react";
import { fetchArtists } from "../utils/api";
import { Artist } from "../utils/models";
import axios from "axios";

const useArtists = (currentPage: number, itemsPerPage: number) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchArtists(
          currentPage,
          itemsPerPage,
          controller.signal
        );
        setArtists(data.artists);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
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

  return { artists, isLoading, error, totalPages };
};

export default useArtists;
