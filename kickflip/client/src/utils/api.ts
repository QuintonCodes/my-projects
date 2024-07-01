import axios from "axios";
import { Products } from "./models";

const URL = "http://localhost:4000/shop";

export const fetchProducts = async (): Promise<Products[]> => {
  const response = await axios.get(`${URL}/products`, {
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
  const response = await axios.get(`${URL}/products/${productId}`, {
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
  const response = await axios.post(
    "http://localhost:4000/auth/register",
    userData
  );
  if (response.status !== 200) {
    throw new Error("Registration failed");
  }
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:4000/auth/login", {
    email,
    password,
  });
  if (response.status !== 200) {
    throw new Error("Login failed");
  }
  return response.data;
};
