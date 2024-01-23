import { FC } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

interface Product {
  id: string;
  name: string;
  images: string[];
  selectedSize: {
    name: string;
  };
  price: number;
  quantity: number;
  color: [
    {
      name: string;
    }
  ];
}

interface CartItemProps {
  product: Product;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartItem: FC<CartItemProps> = ({
  product,
  addToCart,
  updateQuantity,
  removeFromCart,
}) => {
  return (
    <li className="flex py-6 w-[90%] max-[1024px]:w-full">
      <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-300 max-[450px]:h-28 max-[450px]:w-28">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between font-medium text-gray-900">
            <h4 className="max-[450px]:text-sm max-[450px]:break-all">
              {product.name} ({product.selectedSize.name})
            </h4>
            <h5 className="max-[450px]:text-sm max-[450px]:break-all max-[1024px]:pl-2">
              R {product.price}.00
            </h5>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.color[0].name}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div>
            <button
              onClick={() => updateQuantity(product.id, product.quantity - 1)}
              className="bg-transparent text-xl cursor-pointer border-none font-semibold max-[450px]:text-lg"
            >
              -
            </button>
            <input
              id={product.id}
              value={product.quantity}
              readOnly
              className="bg-transparent text-lg border-none font-semibold py-[10px] pr-[5px] pl-[15px] w-10 max-[450px]:text-base"
            />
            <button
              onClick={() => addToCart(product)}
              className="bg-transparent text-xl cursor-pointer border-none font-semibold max-[450px]:text-lg"
            >
              +
            </button>
          </div>

          <div className="flex mb-3">
            <button
              onClick={() => removeFromCart(product.id)}
              className="bg-transparent border-none cursor-pointer"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
