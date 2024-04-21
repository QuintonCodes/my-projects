import axios from "axios";
import { Artist } from "./models";

export const fetchArtists = async (
  currentPage: number,
  itemsPerPage: number,
  signal: AbortSignal
): Promise<{ artists: Artist[]; total: number }> => {
  const offset = (currentPage - 1) * itemsPerPage;
  const response = await axios.get(
    `http://localhost:3000/artists/get_followed_artists?limit=${itemsPerPage}&offset=${offset}`,
    { withCredentials: true, signal: signal }
  );
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return {
    artists: response.data.artists,
    total: response.data.total,
  };
};

export const fetchArtistOfTheDay = async (): Promise<Artist> => {
  const response = await axios.get(
    "http://localhost:3000/artists/get_random_artist",
    {
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch artist of the day");
  }
  return response.data;
};
