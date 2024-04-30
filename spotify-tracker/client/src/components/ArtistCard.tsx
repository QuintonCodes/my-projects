import { FC } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Artist } from "../utils/models";

interface ArtistCardProps {
  artist: Artist;
  includeListenButton?: boolean;
  onListen?: () => void;
}

const ArtistCard: FC<ArtistCardProps> = ({
  artist,
  includeListenButton = false,
  onListen,
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
          {includeListenButton && (
            <Button
              onClick={onListen}
              size="small"
              sx={{
                borderRadius: 3,
                color: "#fff",
                fontSize: 16,
                padding: 1.25,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1DB954",
                },
              }}
            >
              Listen on Spotify
            </Button>
          )}
        </CardActions>
      </div>
    </Card>
  );
};

export default ArtistCard;
