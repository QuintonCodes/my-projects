import { Box, Grid, Rating, Typography } from "@mui/material";
import { Verified } from "@mui/icons-material";
import { Artist } from "../utils/models";
import GenreCard from "./GenreCard";

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
      <div style={{ display: "flex" }}>
        <Verified sx={{ color: "#2196f3" }} />
        <Typography variant="body1" sx={{ paddingLeft: 1 }}>
          Verified Artist
        </Typography>
      </div>
      <Typography variant="h2">{artist?.name}</Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1">
          Followers: {artist?.followers.toLocaleString()}
        </Typography>
        <div style={{ display: "flex" }}>
          <Rating
            name="artist-rating"
            value={artist ? artist.popularity / 20 : 0}
            precision={0.1}
            readOnly
            sx={{ paddingX: 2 }}
          />
          <Typography>{artist?.popularity}/100</Typography>
        </div>
      </div>
      <h3>Genres:</h3>
      <Grid container gap={2} sx={{ width: "100%" }}>
        {artist?.genres.map((genre, index) => (
          <GenreCard id={index} genre={genre} key={index}/>
        ))}
      </Grid>
    </Box>
  );
};

export default ArtistInfo;
