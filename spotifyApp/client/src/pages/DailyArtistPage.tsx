import AlertCard from "../components/AlertCard";
import ArtistCard from "../components/ArtistCard";
import SkeletonUI from "../components/SkeletonUI";
import { useUser } from "../context/UserContext";
import useDailyArtist from "../hooks/useDailyArtist";
import { handleListen } from "../utils/helper";

const DailyArtistPage = () => {
  const {
    data: dailyArtist,
    error: artistError,
    isLoading: isArtistLoading,
  } = useDailyArtist();
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
      <h1>Artist of the Day</h1>
      {!user ? (
        <AlertCard
          severity="error"
          title="Error"
          alertText="Please log in to view this content."
        />
      ) : isArtistLoading ? (
        <SkeletonUI
          height={495}
          width={345}
          animation="wave"
          variant="rounded"
        />
      ) : artistError ? (
        <AlertCard
          severity="error"
          title="Error"
          alertText={artistError?.message}
        />
      ) : dailyArtist ? (
        <ArtistCard
          artist={dailyArtist}
          onListen={() => handleListen(dailyArtist.id)}
        />
      ) : (
        <AlertCard
          severity="info"
          title="No Artist Today"
          alertText="Unfortunately, there is no artist available today."
        />
      )}
    </div>
  );
};

export default DailyArtistPage;
