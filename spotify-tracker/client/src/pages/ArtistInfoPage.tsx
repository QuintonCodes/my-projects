import ArtistInfo from "../components/ArtistInfo";
import { useParams } from "react-router-dom";
import useArtistsInfo from "../hooks/useArtistInfo";
import { useEffect, FC } from "react";

const ArtistInfoPage: FC = () => {
  const { id } = useParams();
  const {
    artist,
    error: artistInfoError,
    isLoading: isArtistInfoLoading,
    topTracks,
  } = useArtistsInfo(id);

  useEffect(() => {
    if (!id) {
      return;
    }

    if (!artist && !artistInfoError && !isArtistInfoLoading) {
      useArtistsInfo(id);
    }
  }, [id, artist, artistInfoError, isArtistInfoLoading]);

  return (
    <div>
      <ArtistInfo
        artist={artist}
        error={artistInfoError}
        isLoading={isArtistInfoLoading}
        topTracks={topTracks}
      />
    </div>
  );
};

export default ArtistInfoPage;
