import { FC, useContext } from "react";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import ArtistCard from "./ArtistCard";
import { UserContext } from "../context/UserContext";
import { handleListen } from "../utils/helper";
import { Artist } from "../utils/models";

interface DailyArtistProps {
  dailyArtist: Artist | null;
  error: string;
  isLoading: boolean;
}

const DailyArtist: FC<DailyArtistProps> = ({
  dailyArtist,
  error,
  isLoading,
}) => {
  const userContext = useContext(UserContext);

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

      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : error || !userContext?.user ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : dailyArtist ? (
        <ArtistCard
          artist={dailyArtist}
          includeListenButton={true}
          onListen={() => handleListen(dailyArtist.id)}
        />
      ) : (
        <Alert severity="info">
          <AlertTitle>No Artist Today</AlertTitle>
          Unfortunately, there is no artist available today.
        </Alert>
      )}
    </div>
  );
};

export default DailyArtist;
