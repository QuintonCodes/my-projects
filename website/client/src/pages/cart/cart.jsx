import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ShopContext } from "../../context/shop-context";

function Cart() {
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [totalShipping, setTotalShipping] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const { addToCart, cartItems, removeFromCart, setCartItems } =
    useContext(ShopContext);

  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.id === productId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    }
  }

  function calculateSubTotal(product) {
    return product.price * product.quantity;
  }

  const calculateShipping = (product) => {
    return product.price * 0.25 * product.quantity;
  };

  useEffect(() => {
    const subtotal = cartItems.reduce(
      (total, product) => total + calculateSubTotal(product),
      0
    );
    setCartSubTotal(subtotal);

    const shipping = cartItems.reduce(
      (total, product) => total + calculateShipping(product),
      0
    );
    setTotalShipping(shipping);

    setTotalCost(subtotal + shipping);
  }, [cartItems]);

  return (
    <section className="my-5 mx-10 grid grid-cols-2 max-[1024px]:min-h-[60vh]  items-center max-[1024px]:flex max-[1024px]:flex-wrap">
      <div className="my-5 max-[1024px]:w-full">
        <h3 className="mb-5 font-semibold">Shopping Cart</h3>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul role="list" className="-my-6 divide-y divide-gray-300">
            {cartItems.map((product) => (
              <li
                key={product.id}
                className="flex py-6 w-[90%] max-[1024px]:w-full"
              >
                <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-300 max-[450px]:h-28 max-[450px]:w-28">
                  <img
                    src={product.images[0]}
                    alt=""
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
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color[0].name}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div>
                      <button
                        onClick={() => {
                          const newQuantity = product.quantity - 1;
                          updateQuantity(product.id, newQuantity);
                        }}
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
            ))}
          </ul>
        )}
      </div>

      <div className="border-[2px] border-solid border-black mb-[30px] p-[30px] w-full">
        <h3 className="font-semibold">Cart Totals</h3>
        <table className="border-collapse mb-5 w-full">
          <tbody>
            <tr>
              <td className="border border-solid border-black p-[10px] w-1/2">
                Cart SubTotals
              </td>
              <td className="border border-solid border-black p-[10px] w-1/2">
                R {cartSubTotal}.00
              </td>
            </tr>
            <tr>
              <td className="border border-solid border-black p-[10px] w-1/2">
                Shipping
              </td>
              <td className="border border-solid border-black p-[10px] w-1/2">
                R {totalShipping}.00
              </td>
            </tr>
            <tr>
              <td className="border border-solid border-black p-[10px] w-1/2">
                <strong>Total</strong>
              </td>
              <td className="border border-solid border-black p-[10px] w-1/2">
                <strong>R {totalCost}.00</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-around max-[450px]:flex-col max-[450px]:items-center">
          <button
            id="Btn"
            className="items-center bg-[#0f0f0f] border-none text-white cursor-pointer flex font-semibold gap-2 h-10 justify-center overflow-hidden relative w-[130px] before:bg-white shadow-[5px_5px_10px_#0000001a] duration-300 active:duration-300 active:translate-x-[5px] active:translate-y-[5px] before:rounded-[50%] before:content-[''] before:h-[130px] before:-left-full before:mix-blend-difference before:absolute before:top-0 before:duration-300 before:w-[130px] hover:before:rounded-none hover:before:translate-x-[100%] hover:before:translate-y-[-50%] hover:before:duration-300"
          >
            Pay
            <svg className="w-4" viewBox="0 0 576 512">
              <path
                className="fill-white"
                d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"
              ></path>
            </svg>
          </button>
          <p>OR</p>

          <Link to="/shop">
            <button className="rounded border-2 border-black h-10 font-semibold p-2 hover:bg-black hover:text-white transition ease-in-out duration-300 max-[450px]:text-sm max-[450px]:h-11">
              Back To Shop
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
