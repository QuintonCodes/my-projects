import React, { createContext, useState, useEffect } from "react";
import { BaseProduct } from "../utils/models";

interface ShopContextType {
  addToCart: (item: BaseProduct) => void;
  cartItems: BaseProduct[];
  removeFromCart: (itemId: string) => void;
  setCartItems: React.Dispatch<React.SetStateAction<BaseProduct[]>>;
  updateCartItemQuantity: (itemId: string, newQuantity: number) => void;
}

const defaultContextValue: ShopContextType = {
  addToCart: () => {},
  cartItems: [],
  removeFromCart: () => {},
  setCartItems: () => {},
  updateCartItemQuantity: () => {},
};

export const ShopContext = createContext<ShopContextType>(defaultContextValue);

interface ShopContextProviderProps {
  children: React.ReactNode;
}

export const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  const initialCartItems: BaseProduct[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  const [cartItems, setCartItems] = useState<BaseProduct[]>(initialCartItems);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: BaseProduct) => {
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
