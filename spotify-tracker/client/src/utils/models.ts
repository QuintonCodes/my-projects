export interface Artist {
  id: string;
  image: string | null;
  monthlyFollowers: number;
  name: string;
}

export interface UserProfile {
  display_name: string;
  id: string;
  image: string;
}
