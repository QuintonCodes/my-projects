import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import useAuthService from "../services/AuthService";

const useUserEffect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authService = useAuthService();
  const { login } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      const message = await authService.fetchProfile();
      console.log(message);
    };

    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("login") === "success") {
      fetchProfile();
      navigate(location.pathname);
    }
  }, [location, navigate, login, authService]);

  return null;
};

export default useUserEffect;
