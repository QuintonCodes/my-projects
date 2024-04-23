import axios from "axios";
import { useUser } from "../context/UserContext";

const BASE_URL = "http://localhost:3000/auth";

const AuthService = () => {
  const { login, logout } = useUser();

  const signIn = () => {
    window.open(`${BASE_URL}/login`, "_blank");
  };

  const signOut = async () => {
    try {
      await axios.get(`${BASE_URL}/logout`);
      logout();
      return "Logged out successfully";
    } catch (error) {
      console.error("Error signing out", error);
      return "Logout failed";
    }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/profile`);
      login(data);
      return "Login Successful";
    } catch (error) {
      console.error("Not logged in", error);
      return "Login failed";
    }
  };

  return { signIn, signOut, fetchProfile };
};

export default AuthService;
