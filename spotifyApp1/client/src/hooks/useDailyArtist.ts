import { useQuery } from "@tanstack/react-query";
import { fetchDailyArtist } from "../utils/api";
import { Artist } from "../utils/models";

const useDailyArtist = () => {
  return useQuery<Artist, Error>({
    queryKey: ["dailyArtist"],
    queryFn: () => fetchDailyArtist(),
    staleTime: 1000 * 60 * 60 * 6,
  });
};

export default useDailyArtist;
