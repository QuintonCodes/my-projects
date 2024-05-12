import { useQuery } from "@tanstack/react-query";
import { Artist } from "../utils/models";
import { fetchSearchArtist } from "../utils/api";

const useSearchArtist = (query: string) => {
  return useQuery<Artist[], Error>({
    queryKey: ["searchArtist", { query }],
    queryFn: () => fetchSearchArtist(query),
    enabled: query.length > 2,
  });
};

export default useSearchArtist;
