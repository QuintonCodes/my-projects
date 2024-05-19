import { fetchDailyArtist } from "../utils/api";
import { Artist } from "../utils/models";
import { useQuery } from "@tanstack/react-query";

const useDailyArtist = () => {
  return useQuery<Artist, Error>({
    queryKey: ["dailyArtist"],
    queryFn: () => fetchDailyArtist(),
    staleTime: 1000 * 60 * 60 * 6,
  });
};

export default useDailyArtist;
