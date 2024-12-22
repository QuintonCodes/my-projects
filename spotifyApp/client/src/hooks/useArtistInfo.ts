import { useQuery } from "@tanstack/react-query";
import { fetchArtist, fetchArtistTopTracks } from "../utils/api";
import { Artist, Track } from "../utils/models";

const useArtistsInfo = (artistId: string | null | undefined) => {
  const artistQuery = useQuery<Artist | null, Error>({
    enabled: !!artistId,
    queryKey: ["artist", artistId],
    queryFn: () => fetchArtist(artistId),
    staleTime: 1000 * 60 * 60 * 6,
  });

  const topTracksQuery = useQuery<Track[], Error>({
    enabled: !!artistId,
    queryKey: ["topTracks", artistId],
    queryFn: () => fetchArtistTopTracks(artistId),
    staleTime: 1000 * 60 * 60 * 6,
  });

  return {
    artist: artistQuery.data,
    error: artistQuery.error || topTracksQuery.error,
    isLoading: artistQuery.isLoading || topTracksQuery.isLoading,
    topTracks: topTracksQuery.data,
  };
};

export default useArtistsInfo;
