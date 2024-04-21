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
  onListen: () => void;
  includeViewButton?: boolean; // Optional prop to render a view button
  onClose?: () => void;
}

const ArtistCard: FC<ArtistCardProps> = ({
  artist,
  includeViewButton = false,
  onListen,
  onClose,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        backgroundColor: "#1f1f1f",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={artist.image || "default_image_url_here"}
        alt={artist.name}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="#fff">
            {artist.name}
          </Typography>
          <Typography variant="body2" color="#fff">
            Monthly Followers: {artist.monthlyFollowers.toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          {includeViewButton && (
            <Button
              size="small"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: 16,
                "&:hover": {
                  backgroundColor: "#1DB954",
                },
                borderRadius: 3,
                padding: 1.25,
              }}
              onClick={onClose}
            >
              View
            </Button>
          )}
          <Button
            size="small"
            sx={{
              textTransform: "none",
              color: "#fff",
              fontSize: 16,
              "&:hover": {
                backgroundColor: "#1DB954",
              },
              borderRadius: 3,
              padding: 1.25,
            }}
            onClick={onListen}
          >
            Listen on Spotify
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default ArtistCard;
