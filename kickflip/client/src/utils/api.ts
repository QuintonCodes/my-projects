import axios from "axios";
import Cookies from "js-cookie";
import { Products } from "./models";

const URL = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

const getRefreshToken = (): string | null => {
  return Cookies.get("refreshToken") || null;
};

const setAccessToken = (token: string): void => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const originalRequest = error.config;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${URL}/auth/refresh-token`,
            {},
            { withCredentials: true }
          );
          setAccessToken(response.data.accessToken);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const fetchProducts = async (): Promise<Products[]> => {
  try {
    const response = await axiosInstance.get("/shop/products");

    if (response.status !== 200) {
      throw new Error("Failed to fetch products");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProduct = async (
  productId: string | undefined
): Promise<Products> => {
  try {
    const response = await axiosInstance.get(`/shop/products/${productId}`);

    if (response.status !== 200) {
      throw new Error("Failed to fetch product");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);

    if (response.status !== 200) {
      throw new Error("Registration failed");
    }

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
