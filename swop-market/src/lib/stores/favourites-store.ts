import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavouritesStore {
  favourites: string[];
  addToFavourites: (productId: string) => void;
  removeFromFavourites: (productId: string) => void;
  isFavourite: (productId: string) => boolean;
  clearFavourites: () => void;
}

export const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      favourites: [],
      addToFavourites: (productId) =>
        set((state) => ({
          favourites: state.favourites.includes(productId)
            ? state.favourites
            : [...state.favourites, productId],
        })),
      removeFromFavourites: (productId) =>
        set((state) => ({
          favourites: state.favourites.filter((id) => id !== productId),
        })),
      isFavourite: (productId) => get().favourites.includes(productId),
      clearFavourites: () => set({ favourites: [] }),
    }),
    {
      name: "favourites-storage",
    }
  )
);
