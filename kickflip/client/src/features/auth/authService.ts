import axios from "axios";
import { Login, Register, User } from "../../utils/models";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/auth",
  withCredentials: true,
});

// Register user
const register = async (userData: Register): Promise<void> => {
  const response = await axiosInstance.post("/register", userData);
  return response.data;
};

// Login user
const login = async (userData: Login): Promise<User> => {
  const response = await axiosInstance.post("/login", userData);
  return response.data;
};

// Logout user
const logout = async (): Promise<void> => {
  await axiosInstance.post("/logout");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
