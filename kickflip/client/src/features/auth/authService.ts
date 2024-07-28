import axios from "axios";
import { ILogin, IRegister, IUpdate, IUser } from "../../utils/models";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/auth",
  withCredentials: true,
});

const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
};

const authService = {
  registerUser: async (userData: IRegister): Promise<void> => {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
  },
  loginUser: async (userData: ILogin): Promise<IUser> => {
    const response = await axiosInstance.post("/login", userData);
    return response.data;
  },
  updateUser: async (userData: IUpdate): Promise<IUser> => {
    const token = getCookie("_auth");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axiosInstance.put("/me", userData, config);
    return response.data;
  },
};

export default authService;
