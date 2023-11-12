import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PayBtn from "../../components/PayBtn";
import ShopNow from "../../components/ShopNow";
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
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#000000" }}
                      size="lg"
                    />
                  </button>
                </td>
                <td className="img">
                  <img src={product.frontImg} alt={product.productName} />
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
          <PayBtn />
        </div>
      </section>
      <section className="back-to-shop">
        <Link to="/shop">
          <ShopNow text="Back To Shop" />
        </Link>
      </section>
    </>
  );
}

export default Cart;
