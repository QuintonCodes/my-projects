import { FC, useState, useMemo } from "react";
import {
  Alert,
  AlertTitle,
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Autocomplete,
  TextField,
  Backdrop,
} from "@mui/material";
import { Artist } from "../utils/models";
import ArtistCard from "./ArtistCard";
import { handleClose, handleListen, handleOpen } from "../utils/helper";

interface ArtistListProps {
  artists: Artist[];
  error: string;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const sortOptions = [
  { label: "A to Z", value: "az" },
  { label: "Z to A", value: "za" },
];

const ArtistList: FC<ArtistListProps> = ({
  artists,
  error,
  isLoading,
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  const [sortOrder, setSortOrder] = useState(sortOptions[0].value);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => handleOpen(setOpen);
  const handleCloseModal = () => handleClose(setOpen);

  const sortedArtists = useMemo(() => {
    return [...artists].sort((a, b) => {
      if (sortOrder === "az") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [artists, sortOrder]);

  const handleArtistClick = (artist: Artist) => {
    setSelectedArtist(artist);
    handleOpenModal();
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Followed Artists</h1>
      <Autocomplete
        id="sort-artists"
        options={sortOptions}
        getOptionLabel={(option) => option.label}
        value={sortOptions.find((option) => option.value === sortOrder)}
        onChange={(event, newValue) => {
          if (newValue) {
            setSortOrder(newValue.value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Sort by"
            sx={{
              ".MuiOutlinedInput-root": {
                color: "#fff",
                bgcolor: "#333",
                "& fieldset": { borderColor: "#777" },
                "&:hover fieldset": { borderColor: "#bbb" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          />
        )}
        sx={{
          width: 300,
          marginBottom: 2,
          ".MuiAutocomplete-inputRoot": { color: "white" },
          ".MuiInputLabel-root": { color: "white" },
        }}
      />
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : error ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : (
        <List
          sx={{
            width: "100%",
            maxWidth: 520,
          }}
        >
          {sortedArtists.map((artist, index) => (
            <ListItem
              key={index}
              onClick={() => handleArtistClick(artist)}
              sx={{
                bgcolor: "#424242",
                marginBottom: 1,
                borderRadius: "10px",
                boxShadow: 3,
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                  cursor: "pointer",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar src={artist.image || undefined} alt={artist.name} />
              </ListItemAvatar>
              <ListItemText primary={artist.name} />
            </ListItem>
          ))}
        </List>
      )}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          paddingY: 5,
        }}
        size="large"
        color="primary"
      />
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
        onClick={handleCloseModal}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          {selectedArtist && (
            <ArtistCard
              artist={selectedArtist}
              includeCloseButton={true}
              onListen={() => handleListen(selectedArtist.id)}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </Backdrop>
    </div>
  );
};

export default ArtistList;
