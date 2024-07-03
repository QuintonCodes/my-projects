import { createContext, useContext, useState, ReactNode } from "react";
import { loginUser } from "../utils/api";
import { useShop } from "./ShopContext";

interface User {
  username: string;
  email: string;
}

interface UserContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const { dispatch } = useShop();

  const login = async (email: string, password: string) => {
    const loggedInUser = await loginUser(email, password);
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      dispatch({ type: "LOAD_CART", items: JSON.parse(savedCartItems) });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems");
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
