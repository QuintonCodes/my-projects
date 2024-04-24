import { useMemo } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useSnackbar } from "../hooks/useSnackBar";

const BASE_URL = "http://localhost:3000/auth";

const useAuthService = () => {
  const { login, logout } = useUser();
  const { showMessage } = useSnackbar();

  const authService = useMemo(
    () => ({
      signIn: () => {
        window.open(`${BASE_URL}/login`);
      },

      signOut: async () => {
        try {
          await axios.get(`${BASE_URL}/logout`);
          logout();
          showMessage("Logged out successfully", "success");
        } catch (error) {
          console.error("Error signing out", error);
          showMessage("Logout failed", "error");
        }
      },

      fetchProfile: async () => {
        try {
          const response = await axios.get(`${BASE_URL}/profile`);
          login(response.data);
          showMessage("Profile fetched successfully", "success");
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              console.error("Error fetching profile", error.response.data);
              showMessage(
                `Error fetching profile: ${error.response.data.message}`,
                "error"
              );
            } else if (error.request) {
              console.error(
                "Error fetching profile, no response:",
                error.request
              );
              showMessage(
                "Error fetching profile, server did not respond",
                "error"
              );
            } else {
              console.error("Error setting up profile request:", error.message);
              showMessage("Error fetching profile", "error");
            }
          } else {
            console.error("Unexpected error:", error);
            showMessage("An unexpected error occurred", "error");
          }
        }
      },
    }),
    [login, logout, showMessage]
  );

  return authService;
};

export default useAuthService;
