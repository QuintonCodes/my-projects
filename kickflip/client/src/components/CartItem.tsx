import { Trash2Icon } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { Products } from "../utils/models";

interface CartItem {
  product?: Products;
  quantity: number;
  size: string;
}

interface CartItemProps {
  item: CartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { dispatch } = useShop();

  const handleIncrement = () => {
    dispatch({
      type: "INCREMENT_QUANTITY",
      product: item.product,
      size: item.size,
    });
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch({
        type: "DECREMENT_QUANTITY",
        product: item.product,
        size: item.size,
      });
    }
  };

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      product: item.product,
      size: item.size,
    });
  };

  return (
    <li className="flex py-6 w-[90%] max-[1024px]:w-full text-white">
      <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-300 max-[450px]:h-28 max-[450px]:w-28">
        <img
          className="h-full w-full object-cover object-center"
          src={item.product?.images[0].src}
          alt={item.product?.name}
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between font-medium">
            <h4 className="max-[450px]:text-sm max-[450px]:break-all">
              {item.product?.name} ({item.size.toUpperCase()})
            </h4>
            <h5 className="max-[450px]:text-sm max-[450px]:break-all max-[1024px]:pl-2">
              R {item.product?.price}.00
            </h5>
          </div>
          <div className="flex gap-3">
            <p className="mt-1 text-sm">{item.product?.color.name}</p>
            <span
              aria-hidden="true"
              className={`h-6 w-6 rounded-full border border-black my-1 ${item.product?.color.class}`}
            />
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div>
            <button
              className="bg-transparent hover:text-[#7F1310] text-xl cursor-pointer border-none font-semibold max-[450px]:text-lg"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              value={item.quantity}
              readOnly
              className="bg-transparent text-lg border-none font-semibold py-[10px] text-center w-14 max-[450px]:text-base"
            />
            <button
              className="bg-transparent hover:text-[#7F1310] text-xl cursor-pointer border-none font-semibold max-[450px]:text-lg"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>

          <div className="flex mb-3">
            <Trash2Icon
              className="h-6 w-6 hover:text-[#7F1310] cursor-pointer transition-transform duration-300 hover:scale-110"
              onClick={handleRemove}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
