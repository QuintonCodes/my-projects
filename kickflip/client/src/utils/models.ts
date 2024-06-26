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
  }[];
  images: {
    name: string;
    src: string;
  }[];
  size: {
    name: string;
    inStock: boolean;
  }[];
}
