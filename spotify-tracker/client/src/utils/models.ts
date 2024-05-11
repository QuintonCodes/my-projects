export interface Track {
  id: string;
  name: string;
  image: string | undefined;
  durationMs: number;
}

export interface Artist {
  id: string;
  name: string;
  image: string | undefined;
  followers: number;
  popularity: number;
  genres: string[];
  tracks: Track[];
}

export interface UserProfile {
  display_name: string;
  id: string;
  image: string;
}
