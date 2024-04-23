import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import AuthService from "../services/AuthService";

const useUserEffect = () => {
  const location = useLocation();
  const authService = AuthService();
  const { login } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      const message = await authService.fetchProfile();
      console.log(message);
    };

    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("login") === "success") {
      fetchProfile();
    }
  }, [location.search, login, authService]);

  return null;
};

export default useUserEffect;
