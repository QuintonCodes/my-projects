import axios from "axios";
import { Products } from "./models";

const URL = "http://localhost:4000";

export const fetchProducts = async (): Promise<Products[]> => {
  const response = await axios.get(`${URL}/shop/products`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch products");
  }

  return response.data;
};

export const fetchProduct = async (
  productId: string | undefined
): Promise<Products> => {
  const response = await axios.get(`${URL}/shop/products/${productId}`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch product");
  }

  return response.data;
};

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${URL}/auth/register`, userData);

  if (response.status !== 200) {
    throw new Error("Registration failed");
  }

  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${URL}/auth/login`, {
    email,
    password,
  });

  if (response.status !== 200) {
    throw new Error("Login failed");
  }

  return response.data;
};
