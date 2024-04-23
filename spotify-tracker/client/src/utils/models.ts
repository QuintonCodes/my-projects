export interface Artist {
  id: string;
  name: string;
  image: string | null;
  monthlyFollowers: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  images: Array<{
    url: string;
  }>;
}
