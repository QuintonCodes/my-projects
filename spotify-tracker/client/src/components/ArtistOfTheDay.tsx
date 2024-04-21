import { FC } from "react";
import {
  Alert,
  AlertTitle,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Artist } from "../utils/models";
import ArtistCard from "./ArtistCard";
import { handleListen } from "../utils/helper";

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
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backdropFilter: open ? "blur(4px)" : "none", // Change blur intensity as needed
            backgroundColor: "rgba(0,0,0,0.5)", // Optional: add a slight dark overlay
            pointerEvents: "none",
          },
        }}
        open={open}
        onClick={handleClose}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : artistOfTheDay ? (
            <ArtistCard
              artist={artistOfTheDay}
              onListen={() => handleListen(artistOfTheDay.id)}
            />
          ) : (
            <Alert severity="info">
              <AlertTitle>Sad news</AlertTitle>
              No artist available today
            </Alert>
          )}
        </div>
      </Backdrop>
    </div>
  );
};

export default ArtistOfTheDay;
