import { useParams } from "react-router-dom";
import AlertCard from "../components/AlertCard";
import ArtistImageSection from "../components/ArtistImageSection";
import Loading from "../components/Loading";
import GenericList from "../components/GenericList";
import useArtistsInfo from "../hooks/useArtistInfo";
import { useUser } from "../hooks/useContext";

const ArtistInfoPage = () => {
  const { id } = useParams();
  const {
    artist,
    error: artistInfoError,
    isLoading: isArtistInfoLoading,
    topTracks,
  } = useArtistsInfo(id);
  const { user } = useUser();

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      {isArtistInfoLoading ? (
        <Loading />
      ) : artistInfoError || !user ? (
        <AlertCard severity="error" title="Error" alertText={artistInfoError} />
      ) : (
        <>
          <ArtistImageSection artist={artist} />
          <GenericList items={topTracks} itemType="track" />
        </>
      )}
    </div>
  );
};

export default ArtistInfoPage;
