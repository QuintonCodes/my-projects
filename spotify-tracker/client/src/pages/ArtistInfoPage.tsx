import { useParams } from "react-router-dom";
import AlertCard from "../components/AlertCard";
import ArtistImageSection from "../components/ArtistImageSection";
import Loading from "../components/Loading";
import GenericList from "../components/GenericList";
import useArtistsInfo from "../hooks/useArtistInfo";
import { useUser } from "../hooks/useContext";
import ArtistInfo from "../components/ArtistInfo";

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
        <div style={{ display: "flex", width: "100%" }}>
          <ArtistImageSection artist={artist} />
          <div style={{ width: "100%", padding: "0px 50px" }}>
            <ArtistInfo artist={artist} />
            <GenericList items={topTracks} itemType="track" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistInfoPage;
