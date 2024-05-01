import { FC, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  CircularProgress,
  List,
  Pagination,
  TextField,
} from "@mui/material";
import { UserContext } from "../context/UserContext";
import { Artist } from "../utils/models";
import AlertCard from "./AlertCard";
import ItemList from "./ItemList";

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
  const [sortOrder, setSortOrder] = useState<string>(sortOptions[0].value);

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

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
        <AlertCard severity="error" title="Error" alertText={error} />
      ) : (
        <List
          sx={{
            maxWidth: 520,
            width: "100%",
          }}
        >
          {sortedArtists.map((artist) => (
            <ItemList
              key={artist.id}
              id={artist.id}
              primary={artist.name}
              image={artist.image}
              onClick={() => navigate(`/artists/${artist.id}`)}
            />
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
    </div>
  );
};

export default ArtistList;
