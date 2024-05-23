import { useQuery } from "@tanstack/react-query";
import { fetchArtist, fetchArtistTopTracks } from "../utils/api";
import { Artist, Track } from "../utils/models";

const useArtistsInfo = (artistId: string | null | undefined) => {
  const artistQuery = useQuery<Artist | null, Error>({
    queryKey: ["artist", artistId],
    queryFn: () => fetchArtist(artistId),
    staleTime: 1000 * 60 * 60 * 6,
    enabled: !!artistId,
  });

  const topTracksQuery = useQuery<Track[], Error>({
    queryKey: ["topTracks", artistId],
    queryFn: () => fetchArtistTopTracks(artistId),
    staleTime: 1000 * 60 * 60 * 6,
    enabled: !!artistId,
  });

  return {
    artist: artistQuery.data,
    topTracks: topTracksQuery.data,
    error: artistQuery.error || topTracksQuery.error,
    isLoading: artistQuery.isLoading || topTracksQuery.isLoading,
  };
};

export default useArtistsInfo;
