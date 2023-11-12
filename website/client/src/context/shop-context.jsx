import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ShopContext = createContext(null);

function ShopContextProvider(props) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingCartItem) {
      // If the item exists, increase its quantity
      setCartItems((prevCartItems) => {
        return prevCartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      });
    } else {
      // If the item is not in the cart, add it with a quantity of 1
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
