import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArtists } from "../utils/api";
import { Artist } from "../utils/models";

const useArtists = (currentPage: number, itemsPerPage: number) => {
  return useQuery<{ artists: Artist[]; total: number }, Error>({
    queryKey: ["artists", currentPage, itemsPerPage],
    queryFn: () => fetchArtists(currentPage, itemsPerPage),
    staleTime: 1000 * 60 * 60 * 6,
  });
};

const useAllArtists = () => {
  const [allArtists, setAllArtists] = useState<Artist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const { data, isLoading, isFetching, isError, refetch } = useArtists(
    currentPage,
    itemsPerPage
  );

  useEffect(() => {
    if (data?.artists) {
      setAllArtists((prev) => [...prev, ...data.artists]);
    }
  }, [data]);

  useEffect(() => {
    if (data?.total && allArtists.length < data.total) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [allArtists, data?.total]);

  return { allArtists, isLoading, isFetching, isError, refetch };
};

export { useArtists, useAllArtists };
