import { User } from "@prisma/client";

export type ProductWithSeller = {
  id: string;
  name: string;
  description: string;
  imageUrl: string[];
  category: string;
  condition: "new" | "used_new" | "used_good" | "used_fair" | "for_parts";
  location?: string;
  deliveryOptions?: (
    | "pickup"
    | "courier"
    | "local_delivery"
    | "meet_in_person"
  )[];
  price: number;
  originalPrice?: number;
  views?: number;
  likes?: number;
  status: "active" | "sold" | "draft";
  brand?: string;
  model?: string;
  seller?: {
    id: string;
    storeName: string;
    storeDescription?: string | null;
    isVerified: boolean;
    rating: number;
    createdAt: Date;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatarUrl?: string | null;
    };
  };
  createdAt?: Date;
  updatedAt?: Date;
  reviews?: Review[];
};

export type Seller = {
  id: string;
  storeName: string;
  storeDescription?: string;
  contactEmail?: string;
  contactNumber?: string;
  location?: string;
  isVerified: boolean;
  rating: number;
  user: User;
};

export type Review = {
  id: string;
  user: string;
  rating: number;
  comment?: string;
  createdAt?: string | Date;
};
