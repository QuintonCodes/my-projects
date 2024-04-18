import { FC, useEffect, useState } from "react";
import axios from "axios";

interface Artist {
  name: string;
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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Followed Artists</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {artists.map((artist, index) => (
            <li key={index} style={{ color: "white" }}>
              {artist.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
