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
} from "@mui/material";
import { Artist } from "../utils/models";

interface ArtistListProps {
  artists: Artist[];
  error: string;
  isLoading: boolean;
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
  currentPage,
  handlePageChange,
}) => {
  const [sortOrder, setSortOrder] = useState(sortOptions[0].value);

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
        count={10}
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          paddingY: 5,
        }}
        size="large"
        color="primary"
      />
    </div>
  );
};

export default ArtistList;
