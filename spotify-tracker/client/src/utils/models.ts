export interface Artist {
  id: string;
  name: string;
  image: string | null;
  followers: number;
  popularity: number;
  genres: string[];
}

export interface UserProfile {
  display_name: string;
  id: string;
  image: string;
}
