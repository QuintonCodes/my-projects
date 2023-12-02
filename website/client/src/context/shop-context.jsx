import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ShopContext = createContext(null);

function ShopContextProvider(props) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingCartItem = cartItems.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.size === item.size &&
        cartItem.color === item.color
    );

    if (existingCartItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const contextValue = {
    addToCart,
    cartItems,
    removeFromCart,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}

ShopContextProvider.propTypes = {
  children: PropTypes.object,
};

export default ShopContextProvider;
