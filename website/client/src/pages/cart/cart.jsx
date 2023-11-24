import { useContext, useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ShopContext } from "../../context/shop-context";
import "./cart.css";

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
      <section className="cart section-p1">
        <table className="cart-table">
          <thead className="cart-head">
            <tr>
              <td>Remove</td>
              <td>Image</td>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>SubTotal</td>
            </tr>
          </thead>
          <tbody className="cart-items">
            {cartItems.map((product) => (
              <tr className="cart-row" key={product.id}>
                <td className="remove">
                  <button onClick={() => removeFromCart(product.id)}>
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </td>
                <td className="w-[70px] items-center justify-center flex">
                  <img
                    src={product.frontImg}
                    alt={product.productName}
                    className="h-[50px]"
                  />
                </td>
                <td className="pd">
                  {product.productName} - {product.color} ({product.size})
                </td>

                <td className="price">R {product.price}.00</td>
                <td className="qtn">
                  <button
                    onClick={() => {
                      const newQuantity = product.quantity - 1;
                      updateQuantity(product.id, newQuantity);
                    }}
                  >
                    -
                  </button>
                  <input id={product.id} value={product.quantity} readOnly />
                  <button onClick={() => addToCart(product)}>+</button>
                </td>
                <td className="sub">R {calculateSubTotal(product)}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="cart-add section-p1">
        <div className="subtotal">
          <h3>Cart Totals</h3>
          <table className="cart-summary">
            <tbody>
              <tr className="cart-add-row">
                <td>Cart SubTotals</td>
                <td className="cart-sub">R {cartSubTotal}.00</td>
              </tr>
              <tr className="cart-add-row">
                <td>Shipping</td>
                <td className="delivery">R {totalShipping}.00</td>
              </tr>
              <tr className="cart-add-row">
                <td>
                  <strong>Total</strong>
                </td>
                <td className="total">
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
