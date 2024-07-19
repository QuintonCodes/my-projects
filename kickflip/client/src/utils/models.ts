export interface Products {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  color: {
    name: string;
    class: string;
    inStock: boolean;
  };
  images: {
    name: string;
    src: string;
  }[];
  size: {
    name: string;
    inStock: boolean;
  }[];
}

export interface CartProduct {
  product?: Products;
  quantity: number;
  size: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}
