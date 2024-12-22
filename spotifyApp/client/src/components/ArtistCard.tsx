import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Artist } from "../utils/models";
import Buttons from "./Buttons";

const ArtistCard = ({
  artist,
  onListen,
}: {
  artist: Artist;
  onListen: () => void;
}) => {
  return (
    <Card
      sx={{
        backgroundColor: "#1f1f1f",
        borderRadius: 3,
        maxWidth: 345,
      }}
    >
      <CardMedia
        alt={artist.name}
        component="img"
        image={artist.image || "default_image_url_here"}
      />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography color="#fff" variant="h5">
            {artist.name}
          </Typography>
          <Typography color="#fff" variant="body2">
            Monthly Followers: {artist.followers.toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Buttons onClick={onListen} text="Listen on Spotify" />
        </CardActions>
      </div>
    </Card>
  );
};

export default ArtistCard;
