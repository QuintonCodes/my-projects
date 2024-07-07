import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/auth",
  withCredentials: true,
});

interface UserResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

// Register user
const register = async (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<void> => {
  const response = await axiosInstance.post("/register", userData);
  return response.data;
};

// Login user
const login = async (userData: {
  email: string;
  password: string;
}): Promise<UserResponse> => {
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
