import { createContext, useContext, useState, ReactNode } from "react";
import { loginUser, registerUser } from "../utils/api";
import { useToast } from "../components/ui/use-toast";

interface User {
  username: string;
  email: string;
}

interface UserContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await loginUser(email, password);
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      toast({
        title: "Login Successful",
        description: "You have successfully logged in!",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials.",
        duration: 2000,
      });
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await registerUser({ username, email, password });
      toast({
        title: "Registration Successful",
        description: "You can now log in.",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        duration: 2000,
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logout Successful",
      description: "You have successfully logged out.",
      duration: 2000,
    });
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
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
