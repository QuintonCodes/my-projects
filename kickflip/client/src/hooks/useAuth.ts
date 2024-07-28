import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
import authService from "../features/auth/authService";
import { login, logout } from "../features/auth/authSlice";
import { IUser } from "../utils/models";
import { useAppDispatch } from "./reduxHooks";

const useAuth = () => {
  const signIn = useSignIn();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        title: error.name,
        description: error.response?.data.message,
        duration: 3000,
      });
    } else if (error instanceof Error) {
      toast({ title: error.name, description: error.message, duration: 3000 });
    }
  };

  const { mutate: handleRegister, isPending: registerLoading } = useMutation({
    mutationFn: authService.registerUser,
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "You have successfully registered! Please log in.",
        duration: 3000,
      });
      navigate("/auth/login");
    },
    onError: handleError,
  });

  const { mutate: handleLogin, isPending: loginLoading } = useMutation({
    mutationFn: authService.loginUser,
    onSuccess: (data: IUser) => {
      if (data.token) {
        dispatch(
          login({
            user: {
              id: data.id,
              name: data.name,
              email: data.email,
              token: data.token,
            },
          })
        );
        signIn({
          auth: {
            token: data.token,
            type: "Bearer",
          },
          userState: {
            id: data.id,
            name: data.name,
            email: data.email,
          },
        });
        toast({
          title: "Login Successful",
          description: "You have successfully logged in!",
          duration: 3000,
        });
        navigate("/");
      }
    },
    onError: handleError,
  });

  const {
    mutate: handleUpdate,
    isPending: updateLoading,
    isError: updateError,
  } = useMutation({
    mutationFn: authService.updateUser,
    onSuccess: (data: IUser) => {
      dispatch(
        login({
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
            token: data.token,
          },
        })
      );
      toast({
        title: "Update Successful",
        description: "Your profile has been updated successfully.",
        duration: 3000,
      });
    },
    onError: handleError,
  });

  const handleLogout = async () => {
    signOut();
    dispatch(logout());

    toast({
      title: "Logout Successful",
      description: "You have successfully logged out!",
      duration: 3000,
    });
  };

  return {
    handleRegister,
    handleLogin,
    handleUpdate,
    handleLogout,
    loginLoading,
    registerLoading,
    updateLoading,
    updateError,
  };
};

export default useAuth;
