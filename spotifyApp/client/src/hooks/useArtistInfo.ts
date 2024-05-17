import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Artist, Track } from "../utils/models";
import { fetchArtist, fetchArtistTopTracks } from "../utils/api";

const useArtistsInfo = (artistId: string | undefined) => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userContext = useContext(UserContext);

  useEffect(() => {
    const load = async () => {
      if (!userContext?.user) {
        setError("Please log in to view this content.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const artistData = await fetchArtist(artistId);
        const topTracks = await fetchArtistTopTracks(artistId);
        setArtist(artistData);
        setTopTracks(topTracks);
      } catch (error) {
        console.error("Failed to fetch artist:", error);
        setError(`Failed to fetch artist: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [userContext?.user]);

  return { artist, topTracks, error, isLoading };
};

export default useArtistsInfo;
