import { List, ListItem, ListItemText } from "@mui/material";
import { Artist } from "../utils/models";
import Loading from "./Loading";

interface SearchResultsProps {
  isLoading: boolean;
  searchResults: Artist[] | undefined;
}

const SearchResults = ({ isLoading, searchResults }: SearchResultsProps) => {
  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "90px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "50%",
        backgroundColor: "#424242",
        borderRadius: 8,
        boxShadow: "3px",
        zIndex: 1300,
      }}
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <Loading />
        </div>
      ) : (
        <List>
          {searchResults.map((artist) => (
            <ListItem key={artist.id} button>
              <ListItemText primary={artist.name} sx={{ color: "#fff" }} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default SearchResults;
