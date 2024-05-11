import { Box, Rating, Typography } from "@mui/material";
import { Artist } from "../utils/models";

interface ArtistInfoProps {
  artist: Artist | null;
}

const ArtistInfo = ({ artist }: ArtistInfoProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "white",
      }}
    >
      <Typography variant="h2">{artist?.name}</Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1">
          Followers: {artist?.followers.toLocaleString()}
        </Typography>
        <div style={{ display: "flex" }}>
          <Rating
            name="artist-rating"
            value={artist ? artist.popularity / 20 : 0}
            precision={0.01}
            readOnly
            sx={{ paddingX: 2 }}
          />
          <Typography>{artist?.popularity}/100</Typography>
        </div>
      </div>
    </Box>
  );
};

export default ArtistInfo;
