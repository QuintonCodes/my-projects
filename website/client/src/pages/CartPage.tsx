import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CartButtons from "../components/ui/cart/CartButtons";
import CartItem from "../components/ui/cart/CartItem";
import CartSummary from "../components/ui/cart/CartSummary";
import { ShopContext } from "../context/ShopContext";
import {
  calculateShipping,
  calculateSubTotal,
  calculateTotalCost,
  updateProductQuantity,
} from "../utils/cartUtils";
import { BaseProduct } from "../utils/models";

interface ShopContextType {
  addToCart: (product: BaseProduct) => void;
  cartItems: BaseProduct[];
  removeFromCart: (productId: number) => void;
  setCartItems: (items: BaseProduct[]) => void;
}

const CartPage = () => {
  const [cartSubTotal, setCartSubTotal] = useState<number>(0);
  const [totalShipping, setTotalShipping] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const { addToCart, cartItems, removeFromCart, setCartItems } =
    useContext(ShopContext);

  useEffect(() => {
    const subtotal = calculateSubTotal(cartItems);
    const shipping = calculateShipping(cartItems);

    setCartSubTotal(subtotal);
    setTotalShipping(shipping);
    setTotalCost(calculateTotalCost(subtotal, shipping));
  }, [cartItems]);

  function updateQuantity(productId: number, newQuantity: number) {
    const updatedCartItems = updateProductQuantity(
      cartItems,
      productId,
      newQuantity
    );
    setCartItems(updatedCartItems);
  }

  return (
    <>
      <Navbar />

      <section className="my-5 mx-10 grid grid-cols-2 max-[1024px]:min-h-[60vh]  items-center max-[1024px]:flex max-[1024px]:flex-wrap">
        <div className="my-5 max-[1024px]:w-full">
          <h3 className="mb-5 font-semibold">Shopping Cart</h3>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul role="list" className="-my-6 divide-y divide-gray-300">
              {cartItems.map((product: BaseProduct) => (
                <CartItem
                  key={product.id}
                  product={product}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="border-[2px] border-solid border-black mb-[30px] p-[30px] w-full">
          <h3 className="font-semibold">Cart Totals</h3>
          <CartSummary
            cartSubTotal={cartSubTotal}
            totalShipping={totalShipping}
            totalCost={totalCost}
          />

          <CartButtons payText="Pay" linkText="Back To Shop" />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CartPage;
