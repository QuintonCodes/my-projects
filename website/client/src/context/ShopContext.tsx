import React, { createContext, useState, useEffect } from "react";

interface CartItem {
  id: string;
  quantity: number;
  selectedSize: { name: string };
  color: [{ name: string }];
}

interface ShopContextType {
  addToCart: (item: CartItem) => void;
  cartItems: CartItem[];
  removeFromCart: (itemId: string) => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updateCartItemQuantity: (itemId: string, newQuantity: number) => void;
}

export const ShopContext = createContext<ShopContextType | null>(null);

interface ShopContextProviderProps {
  children: React.ReactNode;
}

export const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  const initialCartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const existingCartItem = cartItems.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.selectedSize.name === item.selectedSize.name &&
        cartItem.color[0].name === item.color[0].name
    );

    if (existingCartItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.selectedSize.name === item.selectedSize.name &&
          cartItem.color[0].name === item.color[0].name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  const contextValue = {
    addToCart,
    cartItems,
    removeFromCart,
    setCartItems,
    updateCartItemQuantity,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
