import { FC, useContext, useMemo, useState } from "react";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Avatar,
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  TextField,
} from "@mui/material";
import ArtistCard from "./ArtistCard";
import { UserContext } from "../context/UserContext";
import { handleClose, handleListen, handleOpen } from "../utils/helper";
import { Artist } from "../utils/models";

interface ArtistListProps {
  artists: Artist[];
  currentPage: number;
  error: string;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  isLoading: boolean;
  totalPages: number;
}

const sortOptions = [
  { label: "A to Z", value: "az" },
  { label: "Z to A", value: "za" },
];

const ArtistList: FC<ArtistListProps> = ({
  artists,
  currentPage,
  error,
  handlePageChange,
  isLoading,
  totalPages,
}) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>(sortOptions[0].value);

  const userContext = useContext(UserContext);

  const handleCloseModal = () => handleClose(setOpen);
  const handleOpenModal = () => handleOpen(setOpen);

  const handleArtistClick = (artist: Artist) => {
    setSelectedArtist(artist);
    handleOpenModal();
  };

  const sortedArtists = useMemo(() => {
    return [...artists].sort((a, b) => {
      if (sortOrder === "az") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [artists, sortOrder]);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <h1>Followed Artists</h1>
      <Autocomplete
        getOptionLabel={(option) => option.label}
        id="sort-artists"
        onChange={(event, newValue) => {
          if (newValue) {
            setSortOrder(newValue.value);
          }
        }}
        options={sortOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Sort by"
            sx={{
              ".MuiOutlinedInput-root": {
                bgcolor: "#333",
                color: "#fff",
                "& fieldset": { borderColor: "#777" },
                "&:hover fieldset": { borderColor: "#bbb" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          />
        )}
        sx={{
          marginBottom: 2,
          width: 300,
          ".MuiAutocomplete-inputRoot": { color: "white" },
          ".MuiInputLabel-root": { color: "white" },
        }}
        value={sortOptions.find((option) => option.value === sortOrder)}
      />
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : error || !userContext?.user ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : (
        <List
          sx={{
            maxWidth: 520,
            width: "100%",
          }}
        >
          {sortedArtists.map((artist, index) => (
            <ListItem
              key={index}
              onClick={() => handleArtistClick(artist)}
              sx={{
                bgcolor: "#424242",
                borderRadius: "10px",
                boxShadow: 3,
                marginBottom: 1,
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: 6,
                  cursor: "pointer",
                  transform: "scale(1.05)",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar alt={artist.name} src={artist.image || undefined} />
              </ListItemAvatar>
              <ListItemText primary={artist.name} />
            </ListItem>
          ))}
        </List>
      )}
      <Pagination
        count={totalPages || 10}
        onChange={handlePageChange}
        page={currentPage}
        size="large"
        sx={{
          paddingY: 5,
          "& .MuiPaginationItem-root": {
            color: "white",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "rgba(79, 227, 131, 0.7)",
            color: "#fff",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#1DB954",
            color: "white",
          },
        }}
      />
      <Backdrop
        onClick={handleCloseModal}
        open={open}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          "&::before": {
            backdropFilter: open ? "blur(4px)" : "none",
            backgroundColor: "rgba(0,0,0,0.5)",
            bottom: 0,
            content: '""',
            left: 0,
            pointerEvents: "none",
            position: "absolute",
            right: 0,
            top: 0,
          },
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          {selectedArtist && (
            <ArtistCard
              artist={selectedArtist}
              includeViewButton={true}
              onClose={handleCloseModal}
              onListen={() => handleListen(selectedArtist.id)}
            />
          )}
        </div>
      </Backdrop>
    </div>
  );
};

export default ArtistList;
