import axios, { AxiosError } from "axios";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/auth/register", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        toast({
          title: "Registration Successful",
          description: "You have successfully registered! Please log in.",
          duration: 3000,
        });
        navigate("/auth/login");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      if (response.status === 200 && response.data.token) {
        signIn({
          auth: {
            token: response.data.token,
            type: "Bearer",
          },
          userState: {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
          },
        });
        toast({
          title: "Login Successful",
          description: "You have successfully logged in!",
          duration: 3000,
        });
        navigate("/");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    name: string,
    email: string,
    setDetails: (
      value: React.SetStateAction<{
        name: string;
        email: string;
      }>
    ) => void
  ) => {
    try {
      setLoading(true);
      const response = await axios.put("http://localhost:4000/auth/me", {
        name,
        email,
      });
      if (response.status === 201) {
        setDetails({
          name: response.data.name,
          email: response.data.email,
        });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setError("");
      setLoading(false);
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      setError(error.response?.data.message);
      toast({
        title: error.name,
        description: error.response?.data.message,
        duration: 3000,
      });
    } else if (error instanceof Error) {
      setError(error.message);
      toast({ title: error.name, description: error.message, duration: 3000 });
    }
  };

  return { handleRegister, handleLogin, handleUpdate, loading, error };
};

export default useAuth;
