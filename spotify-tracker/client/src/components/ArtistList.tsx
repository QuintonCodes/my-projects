import { FC } from "react";
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
} from "@mui/material";
import { Artist } from "../utils/models";

interface ArtistListProps {
  artists: Artist[];
  error: string;
  isLoading: boolean;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const ArtistList: FC<ArtistListProps> = ({
  artists,
  error,
  isLoading,
  currentPage,
  handlePageChange,
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
      <h1>Followed Artists</h1>
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
          {artists.map((artist, index) => (
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
