import { useState, useEffect } from "react";
import { Artist } from "../utils/models";

const useFilteredArtists = (allArtists: Artist[], searchQuery: string) => {
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = allArtists.filter((artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArtists(filtered);
    } else {
      setFilteredArtists([]);
    }
  }, [searchQuery, allArtists]);

  return filteredArtists;
};

export default useFilteredArtists;
