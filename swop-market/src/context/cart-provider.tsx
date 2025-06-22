import type { CartItem } from "@/lib/types/cart";
import { createContext, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  getCartTotal: () => number;
  fetchCartItems: () => void;
  initializeCart: () => void;
};

const CartContext = createContext<StoreApi<CartStore> | undefined>(undefined);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<CartStore>()(
      persist(
        (set, get) => ({
          items: [],

          addItem: (item) => {
            const { items } = get();
            const existingItem = items.find((i) => i.id === item.id);

            if (existingItem) {
              return;
            }

            set({ items: [...items, item] });
          },

          removeItem: (id) => {
            const { items } = get();
            set({ items: items.filter((item) => item.id !== id) });
          },

          clearCart: () => {
            set({ items: [] });
          },

          isInCart: (id) => {
            const { items } = get();
            return items.some((item) => item.id === id);
          },

          getCartTotal: () => {
            const { items } = get();
            return items.reduce((total, item) => total + Number(item.price), 0);
          },

          fetchCartItems: () => {
            // In a real app, you might fetch cart items from an API
            // For now, we'll just use the local state
            return;
          },

          initializeCart: () => {
            // This is handled by the persist middleware
            // But you could add additional initialization logic here
            return;
          },
        }),
        {
          name: "swopmarket-cart",
        }
      )
    )
  );

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
}

export function useCartStore() {
  const store = useContext(CartContext);
  if (!store)
    throw new Error("useCartStore must be used within a CartProvider");
  return useStore(store);
}
