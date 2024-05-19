import { fetchArtists } from "../utils/api";
import { Artist } from "../utils/models";
import { useQuery } from "@tanstack/react-query";

const useArtists = (currentPage: number, itemsPerPage: number) => {
  return useQuery<{ artists: Artist[]; total: number }, Error>({
    queryKey: ["artists", currentPage, itemsPerPage],
    queryFn: () => fetchArtists(currentPage, itemsPerPage),
    staleTime: 1000 * 60 * 60 * 6,
  });
};

export default useArtists;
