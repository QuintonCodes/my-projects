import { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";

interface Artist {
  name: string;
  image: string | null;
}

const App: FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/get_followed_artists",
          { withCredentials: true }
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        setArtists(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occured");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

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
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
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
    </div>
  );
};

export default App;
