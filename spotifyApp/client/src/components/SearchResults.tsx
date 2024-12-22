import { List, ListItem, ListItemText } from "@mui/material";
import { Artist } from "../utils/models";
import Loading from "./Loading";

const SearchResults = ({
  isLoading,
  searchResults,
}: {
  isLoading: boolean;
  searchResults: Artist[] | undefined;
}) => {
  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "#424242",
        borderRadius: 8,
        boxShadow: "3px",
        left: "50%",
        position: "absolute",
        top: "90px",
        transform: "translateX(-50%)",
        width: "50%",
        zIndex: 1300,
      }}
    >
      {isLoading ? (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: "100px",
            justifyContent: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        <List>
          {searchResults.map((artist) => (
            <ListItem key={artist.id}>
              <ListItemText primary={artist.name} sx={{ color: "#fff" }} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default SearchResults;
