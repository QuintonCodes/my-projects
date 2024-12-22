import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/SnackBarContext";
import useAuthService from "../services/AuthService";

const useUserEffect = () => {
  const navigate = useNavigate();

  const authService = useAuthService();
  const { showMessage } = useSnackbar();

  useEffect(() => {
    const handleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("code")) {
        try {
          await authService.fetchProfile();
          navigate("/", { replace: true });
          showMessage("Login successful", "success");
        } catch (error) {
          showMessage("Login failed", "error");
        }
      }
    };

    handleLogin();
  }, [authService, navigate, showMessage]);

  return null;
};

export default useUserEffect;
