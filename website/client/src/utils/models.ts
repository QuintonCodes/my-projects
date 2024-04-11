export interface SizeOption {
  name: string;
  inStock: boolean;
}

export interface ColorOption {
  name: string;
  class: string;
}

export interface BaseProduct {
  id: number;
  name: string;
  price: number;
  color: ColorOption[];
  category: string;
  images: string[];
  quantity: number;
  size: SizeOption[];
  selectedSize: {
    name: string;
  };
  description: string;
}

export type ProductForDisplay = Pick<BaseProduct, "id" | "name" | "images">;

export type Flexible = Partial<BaseProduct>;
