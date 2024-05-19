import axios from "axios";
import { Artist, Track } from "./models";

const URL = "http://localhost:3000/artists";

export const fetchArtist = async (
  artistId: string | null | undefined
): Promise<Artist | null> => {
  const response = await axios.get(`${URL}/${artistId}`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch artist");
  }

  return response.data;
};

export const fetchArtistTopTracks = async (
  artistId: string | null | undefined
): Promise<Track[]> => {
  const response = await axios.get(`${URL}/${artistId}/top_tracks`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Failed to get artist`s top tracks");
  }

  return response.data;
};

export const fetchArtists = async (
  currentPage: number,
  itemsPerPage: number
): Promise<{ artists: Artist[]; total: number }> => {
  const offset = (currentPage - 1) * itemsPerPage;

  const response = await axios.get(
    `${URL}/get_followed_artists?limit=${itemsPerPage}&offset=${offset}`,
    { withCredentials: true }
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch followed artists");
  }

  return {
    artists: response.data.artists,
    total: response.data.total,
  };
};

export const fetchDailyArtist = async (): Promise<Artist> => {
  const response = await axios.get(`${URL}/get_random_artist`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch artist of the day");
  }

  return response.data;
};
