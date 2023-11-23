import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import "./sproduct.css";

function SProduct() {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addToCart, cartItems, setCartItems } = useContext(ShopContext);

  const { productId } = useParams();
  const product = PRODUCTS.find(
    (product) => product.id === parseInt(productId)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const { color, price, productName } = product;

  const existingCartItem = cartItems.find((item) => item.id === product.id);

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

  const nextSlide = () => {
    setCurrentImageIndex((currentImageIndex + 1) % 2);
  };

  const prevSlide = () => {
    setCurrentImageIndex((currentImageIndex - 1 + 2) % 2);
  };

  return (
    <section className="spro-section section-p1">
      <div className="flex items-start mt-5">
        <div className="spro-img">
          <div className="slide-container">
            <div className="slides">
              {product && product.frontImg && product.backImg && (
                <>
                  <img
                    src={product.frontImg}
                    alt={productName}
                    className={currentImageIndex === 0 ? "active" : ""}
                  />
                  <img
                    src={product.backImg}
                    alt={productName}
                    className={currentImageIndex === 1 ? "active" : ""}
                  />
                </>
              )}
            </div>

            <div className="slider-controls">
              <ChevronLeftIcon onClick={prevSlide} className="h-6 w-6" />
              <ChevronRightIcon onClick={nextSlide} className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="spro-details">
          <h3 className="text-3xl font-semibold">{productName}</h3>
          <h4 className="text-2xl mt-2">R {price}.00</h4>
          <h5 className="my-2">{color}</h5>
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

          <Link to="/cart">
            <div
              className="mt-5 flex w-2/12 items-center justify-center rounded-md border border-transparent bg-[#282828] px-8 py-3 text-base font-medium text-white hover:bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2"
              onClick={handleBuyNow}
            >
              Buy
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SProduct;
