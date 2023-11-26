import { useContext, useEffect, useState } from "react";
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
    if (product.price * product.quantity >= 900) {
      return 0;
    } else {
      return product.price * 0.25 * product.quantity;
    }
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
    <>
      <section className="overflow-x-auto my-5 mx-10">
        <table className="border-collapse table-fixed whitespace-nowrap w-full">
          <thead className="border-[2px] border-solid border-black border-l-0 border-r-0">
            <tr>
              <td className="font-bold py-[18px] uppercase text-center w-[100px]">
                Remove
              </td>
              <td className="font-bold py-[18px] uppercase text-center w-[100px]">
                Image
              </td>
              <td className="font-bold py-[18px] uppercase text-center w-[200px]">
                Product
              </td>
              <td className="font-bold py-[18px] uppercase text-center w-[150px]">
                Price
              </td>
              <td className="font-bold py-[18px] uppercase text-center w-[150px]">
                Quantity
              </td>
              <td className="font-bold py-[18px] uppercase text-center w-[150px]">
                SubTotal
              </td>
            </tr>
          </thead>
          <tbody className="cart-items">
            {cartItems.map((product) => (
              <tr key={product.id}>
                <td className="pt-[15px] text-center w-[100px]">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-transparent border-none cursor-pointer"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </td>
                <td className="w-[100px] items-center justify-center flex pt-[15px] text-center">
                  <img
                    src={product.frontImg}
                    alt={product.productName}
                    className="h-[50px]"
                  />
                </td>
                <td className="pt-[15px] text-center w-[200px]">
                  {product.productName} - {product.color} ({product.size})
                </td>

                <td className="pt-[15px] text-center w-[150px]">
                  R {product.price}.00
                </td>
                <td className="pt-[15px] text-center w-[150px]">
                  <button
                    onClick={() => {
                      const newQuantity = product.quantity - 1;
                      updateQuantity(product.id, newQuantity);
                    }}
                    className="bg-transparent text-xl cursor-pointer border-none font-semibold"
                  >
                    -
                  </button>
                  <input
                    id={product.id}
                    value={product.quantity}
                    readOnly
                    className="bg-transparent text-lg border-none font-semibold py-[10px] pr-[5px] pl-[15px] w-10"
                  />
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-transparent text-xl cursor-pointer border-none font-semibold"
                  >
                    +
                  </button>
                </td>
                <td className="pt-[15px] text-center w-[150px]">
                  R {calculateSubTotal(product)}.00
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="my-5 mx-10">
        <div className="border-[2px] border-solid border-black mb-[30px] p-[30px] w-1/2">
          <h3>Cart Totals</h3>
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

          <button
            id="Btn"
            className="items-center bg-[#0f0f0f] border-none text-white cursor-pointer flex font-semibold gap-2 h-10 justify-center overflow-hidden relative w-32 before:bg-white shadow-[5px_5px_10px_#0000001a] duration-300 active:duration-300 active:translate-x-[5px] active:translate-y-[5px] before:rounded-[50%] before:content-[''] before:h-[130px] before:-left-full before:mix-blend-difference before:absolute before:top-0 before:duration-300 before:w-[130px] hover:before:rounded-none hover:before:translate-x-[100%] hover:before:translate-y-[-50%] hover:before:duration-300"
          >
            Pay
            <svg className="w-4" viewBox="0 0 576 512">
              <path
                className="fill-white"
                d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"
              ></path>
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}

export default Cart;
