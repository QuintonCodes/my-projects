import { useMemo } from "react";
import { Artist } from "../utils/models";

const useSortArtists = (artists: Artist[], sortOrder: string) => {
  return useMemo(() => {
    return [...artists].sort((a, b) => {
      if (sortOrder === "az") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [artists, sortOrder]);
};

export default useSortArtists;
