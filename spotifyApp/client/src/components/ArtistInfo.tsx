import { Verified } from "@mui/icons-material";
import { Grid2, Rating, Typography } from "@mui/material";
import { Artist } from "../utils/models";
import GenreCard from "./GenreCard";

const ArtistInfo = ({ artist }: { artist: Artist | null | undefined }) => {
  return (
    <div
      style={{
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
      <Grid2 container gap={2} sx={{ width: "100%" }}>
        {artist?.genres.map((genre, index) => (
          <GenreCard id={index} genre={genre} key={index} />
        ))}
      </Grid2>
    </div>
  );
};

export default ArtistInfo;
