import { FC, useContext } from "react";
import { Box, CircularProgress, List, Typography } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { Artist, Track } from "../utils/models";
import AlertCard from "./AlertCard";
import ItemList from "./ItemList";

interface ArtistInfoProps {
  artist: Artist | null;
  error: string;
  isLoading: boolean;
  topTracks: Track[];
}

const ArtistInfo: FC<ArtistInfoProps> = ({
  artist,
  error,
  isLoading,
  topTracks,
}) => {
  const userContext = useContext(UserContext);

  return (
    <div>
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : error || !userContext?.user ? (
        <AlertCard severity="error" title="Error" alertText={error} />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 400,
              backgroundImage: `url(${artist?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              paddingLeft: 2,
              paddingBottom: 2,
            }}
          >
            <Box sx={{ padding: 2 }}>
              <Typography variant="h2" color="white">
                {artist?.name}
              </Typography>
              <Typography variant="body2" color="white">
                Followers: {artist?.followers}
              </Typography>
            </Box>
          </Box>
          <List
            sx={{
              maxWidth: 520,
              width: "100%",
              marginTop: 10,
            }}
          >
            {topTracks.map((track) => (
              <ItemList
                key={track.id}
                id={track.id}
                primary={track.name}
                secondary={track.durationMs?.toString()}
                image={track.image}
              />
            ))}
          </List>
        </Box>
      )}
    </div>
  );
};

export default ArtistInfo;
