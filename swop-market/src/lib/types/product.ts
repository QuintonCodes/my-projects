export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller: string;
  category: string;
  condition: string;
  location: string;
  createdAt: string;
  originalPrice?: number;
  stock?: number;
  brand?: string;
  model?: string;
  reviews?: Review[];
};

type Review = {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
};
