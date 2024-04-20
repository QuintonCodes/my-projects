import { FC } from "react";
import {
  Alert,
  AlertTitle,
  Button,
  Backdrop,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Artist } from "../utils/models";

interface ArtistOfTheDayProps {
  artistOfTheDay: Artist | null;
  isLoading: boolean;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const ArtistOfTheDay: FC<ArtistOfTheDayProps> = ({
  artistOfTheDay,
  isLoading,
  open,
  handleOpen,
  handleClose,
}) => {
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
      <Button
        onClick={handleOpen}
        size="large"
        sx={{ textTransform: "none", color: "#fff", fontSize: 16 }}
      >
        Show
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : artistOfTheDay ? (
          <Card
            sx={{
              maxWidth: 325,
              borderRadius: 3,
              backgroundColor: "#1f1f1f",
            }}
          >
            <CardMedia
              component="img"
              height="100"
              image={artistOfTheDay.image || "default_image_url_here"}
              alt={artistOfTheDay.name}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography variant="h5" color="#fff">
                  {artistOfTheDay.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  sx={{
                    textTransform: "none",
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  Okay
                </Button>
              </CardActions>
            </div>
          </Card>
        ) : (
          <Alert severity="error">
            <AlertTitle>Sad news</AlertTitle>
            No artist of the day found
          </Alert>
        )}
      </Backdrop>
    </div>
  );
};

export default ArtistOfTheDay;
