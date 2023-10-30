import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BuyNowBtn from "../../components/BuyNowBtn";
import ShopNow from "../../components/ShopNow";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import "./sproduct.css";

function SProduct() {
  const { productId } = useParams();
  const product = PRODUCTS.find(
    (product) => product.id === parseInt(productId)
  );

  const { addToCart, cartItems, setCartItems } = useContext(ShopContext);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { color, price, frontImg, productName } = product;

  const existingCartItem = cartItems.find((item) => item.id === product.id);
  const initialQuantity = existingCartItem ? existingCartItem.quantity : 1;
  const initialSize = existingCartItem ? existingCartItem.size : "S";

  const [quantity, setQuantity] = useState(initialQuantity);
  const [size, setSize] = useState(initialSize);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    addToCart({ ...product, quantity: quantity + 1, size });
  };

  const handleBuyNow = () => {
    if (existingCartItem) {
      // Item is already in the cart, just update the quantity
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity, size };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      // Item is not in the cart, add it with initial quantity
      addToCart({ ...product, quantity, size });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1, size };
        }
        return item;
      });
      setQuantity(quantity - 1);
      setCartItems(updatedCartItems);
    } else {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    }
  };

  return (
    <section className="spro-section section-p1">
      <div className="spro">
        <div className="spro-img">
          <img src={frontImg} alt={productName} />
        </div>

        <div className="spro-details">
          <h4>{productName}</h4>
          <span>{color}</span>
          <h3>R {price}.00</h3>
          <select
            id="options"
            className="size"
            autoComplete="Select size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">X Large</option>
          </select>

          <div className="qtn-buttons">
            <button onClick={handleDecrement}>-</button>

            <input id={product.id} value={quantity} readOnly />
            <button onClick={handleIncrement}>+</button>
          </div>

          <Link to="/cart">
            <div className="spro-buy" onClick={handleBuyNow}>
              <BuyNowBtn />
            </div>
          </Link>

          <div className="spro-info">
            <h4>Product Details</h4>
            <p>
              Stay effortlessly stylish and comfortable with our classic Black
              Hoodie. Crafted with care and attention to detail, this versatile
              wardrobe essential is designed to keep you cozy while exuding an
              air of understated elegance.
            </p>
            <p>
              Made from a premium blend of high-quality cotton and soft
              polyester, the hoodie offers a luxuriously smooth feel against
              your skin. Its deep black hue is both timeless and adaptable,
              seamlessly integrating into any occasion.
            </p>
          </div>
        </div>
      </div>

      <div className="back-to-shop">
        <Link to="/shop">
          <ShopNow text="Back To Shop" />
        </Link>
      </div>
    </section>
  );
}

export default SProduct;
