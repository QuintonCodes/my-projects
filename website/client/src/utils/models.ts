export interface BaseProduct {
  id: string;
  name: string;
  images: string[];
  selectedSize: {
    name: string;
  };
  price: number;
  quantity: number;
  color: {
    name: string;
  }[];
}

export type ProductForDisplay = Pick<BaseProduct, "id" | "name" | "images">;

export type Flexible = Partial<BaseProduct>;
