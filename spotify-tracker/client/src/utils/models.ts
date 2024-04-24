export interface Artist {
  id: string;
  name: string;
  image: string | null;
  monthlyFollowers: number;
}

export interface UserProfile {
  display_name: string;
  id: string;
  image: string;
}
