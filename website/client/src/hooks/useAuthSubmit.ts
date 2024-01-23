import axios from "axios";
import { useNavigate } from "react-router-dom";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

interface AuthParams {
  email: string;
  password: string;
  isLogin: boolean;
  username?: string;
}

export function useAuthSubmit() {
  const navigate = useNavigate();

  return async ({
    email,
    password,
    isLogin,
    username = "",
  }: AuthParams): Promise<void> => {
    try {
      const urlPath = isLogin ? "/api/users/login" : "/api/users/register";
      const payload = isLogin
        ? { email, password }
        : { email, password, username };

      const { data } = await axiosInstance.post<string>(urlPath, payload);

      console.log(data);

      if (data == "Success") {
        const navigateTo = isLogin ? "/" : "/login";
        navigate(navigateTo);
      } else {
        console.log("Error:", data);
      }
    } catch (error) {
      console.error(error);
    }
  };
}
