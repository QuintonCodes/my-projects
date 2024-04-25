import { FC, useContext } from "react";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { Artist } from "../utils/models";
import ArtistCard from "./ArtistCard";
import { handleListen } from "../utils/helper";
import { UserContext } from "../context/UserContext";

interface ArtistOfTheDayProps {
  artistOfTheDay: Artist | null;
  isLoading: boolean;
  error: string;
}

const ArtistOfTheDay: FC<ArtistOfTheDayProps> = ({
  artistOfTheDay,
  isLoading,
  error,
}) => {
  const userContext = useContext(UserContext);
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Artist of the day</h1>

      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : error || !userContext?.user ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error || "Please log in to view the artist of the day."}
        </Alert>
      ) : artistOfTheDay ? (
        <ArtistCard
          artist={artistOfTheDay}
          onListen={() => handleListen(artistOfTheDay.id)}
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

export default ArtistOfTheDay;
