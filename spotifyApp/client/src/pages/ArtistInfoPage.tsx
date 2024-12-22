import { useParams } from "react-router-dom";
import AlertCard from "../components/AlertCard";
import ArtistImage from "../components/ArtistImage";
import ArtistInfo from "../components/ArtistInfo";
import BackButton from "../components/BackButton";
import GenericList from "../components/GenericList";
import SkeletonUI from "../components/SkeletonUI";
import { useUser } from "../context/UserContext";
import useArtistsInfo from "../hooks/useArtistInfo";

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
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "row",
        padding: "12px",
      }}
    >
      <BackButton />
      {!user ? (
        <AlertCard
          severity="error"
          title="Error"
          alertText="Please log in to view this content."
        />
      ) : isArtistInfoLoading ? (
        <div style={{ display: "flex", width: "100%" }}>
          <SkeletonUI
            height={450}
            width={810}
            variant="rectangular"
            animation="wave"
          />
          <div style={{ width: "100%", padding: "0px 50px" }}>
            <SkeletonUI
              width={510}
              height={75}
              variant="text"
              animation="wave"
            />
            <SkeletonUI
              width={510}
              height={25}
              variant="text"
              animation="wave"
            />
            <SkeletonUI
              width={510}
              height={30}
              variant="text"
              animation="wave"
            />
            <SkeletonUI
              width={510}
              height={100}
              variant="rounded"
              animation="wave"
            />
            <SkeletonUI
              width={510}
              height={300}
              variant="rectangular"
              animation="wave"
            />
          </div>
        </div>
      ) : artistInfoError ? (
        <AlertCard
          severity="error"
          title="Error"
          alertText={artistInfoError?.message}
        />
      ) : (
        <div style={{ display: "flex", width: "100%" }}>
          <ArtistImage artist={artist} />
          <div style={{ width: "100%", padding: "0px 50px" }}>
            <ArtistInfo artist={artist} />
            <h3>Top Tracks:</h3>
            <GenericList items={topTracks} itemType="track" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistInfoPage;
