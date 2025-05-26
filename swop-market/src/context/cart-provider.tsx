import { createContext, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  seller?: string;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
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
              set({
                items: items.map((i) =>
                  i.id === item.id
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
                ),
              });
            } else {
              set({ items: [...items, item] });
            }
          },

          removeItem: (id) => {
            const { items } = get();
            set({ items: items.filter((item) => item.id !== id) });
          },

          updateQuantity: (id, quantity) => {
            const { items } = get();
            set({
              items: items.map((item) =>
                item.id === id ? { ...item, quantity } : item
              ),
            });
          },

          clearCart: () => {
            set({ items: [] });
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
  if (!store) throw new Error("CartProvider is missing");
  return useStore(store);
}
