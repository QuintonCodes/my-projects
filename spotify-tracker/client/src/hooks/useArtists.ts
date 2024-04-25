import { useState, useEffect, useContext } from "react";
import { fetchArtists } from "../utils/api";
import { Artist } from "../utils/models";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const useArtists = (currentPage: number, itemsPerPage: number) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      if (!userContext?.user) {
        setError("Please log in to view this content.");
        setIsLoading(false);
        return;
      }

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
        } else if (
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          setError("Authentication required. Please log in.");
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
  }, [currentPage, itemsPerPage, userContext?.user]);

  return { artists, isLoading, error, totalPages };
};

export default useArtists;
