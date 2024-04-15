import { FC, useEffect, useState } from "react";

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
        const response = await fetch(
          "http://127.0.0.1:5000/get_followed_artists",
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Artist[] = await response.json();
        setArtists(data);
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
            <li key={index}>{artist.name}</li>
          ))}
        </ul>
      )}
      <button
        onClick={() => (window.location.href = "http://127.0.0.1:5000/logout")}
      >
        Logout
      </button>
    </div>
  );
};

export default App;
