export interface IProducts {
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

export interface ICartProduct {
  product?: IProducts;
  quantity: number;
  size: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUpdate {
  name: string;
  email: string;
}
