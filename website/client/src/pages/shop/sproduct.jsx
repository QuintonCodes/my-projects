import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";

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

  const handleDecrement = () => {
    if (quantity > 1) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCartItems(
        cartItems.filter((item) => item.id !== product.id || item.size !== size)
      );
    }
  };

  const handleBuyNow = () => {
    const updatedCartItem = { ...product, quantity, size };

    if (existingCartItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      addToCart(updatedCartItem);
    }
  };

  const nextSlide = () => {
    setCurrentImageIndex((currentImageIndex + 1) % 2);
  };

  const prevSlide = () => {
    setCurrentImageIndex((currentImageIndex - 1 + 2) % 2);
  };

  const similiarProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 2);

  return (
    <>
      <section className="my-5 mx-10">
        <div className="flex items-start mt-5">
          <div className="h-[450px] relative text-center w-[450px]">
            <div className="relative">
              {product && product.frontImg && product.backImg && (
                <>
                  <img
                    src={product.frontImg}
                    alt={productName}
                    className={
                      currentImageIndex === 0
                        ? "hidden absolute transition-transform ease-linear duration-150 w-full active:block"
                        : ""
                    }
                  />
                  <img
                    src={product.backImg}
                    alt={productName}
                    className={
                      currentImageIndex === 1
                        ? "hidden absolute transition-transform ease-linear duration-150 w-full active:block"
                        : ""
                    }
                  />
                </>
              )}
            </div>

            <div className="flex justify-between relative -mt-[55%]">
              <ChevronLeftIcon
                onClick={prevSlide}
                className="h-6 w-6 cursor-pointer"
              />
              <ChevronRightIcon
                onClick={nextSlide}
                className="h-6 w-6 cursor-pointer"
              />
            </div>
          </div>

          <div className="pl-[30px] pt-[10px]">
            <h3 className="text-3xl font-semibold">{productName}</h3>
            <h4 className="text-2xl mt-2">R {price}.00</h4>
            <h5 className="my-2">{color}</h5>
            <select
              id="options"
              className="bg-transparent border-black border-solid border-2 rounded-[5px] block cursor-pointer font-semibold text-[15px] mb-[10px] py-[5px] px-[10px]"
              autoComplete="Select size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="S" className="font-normal text-[15px]">
                Small
              </option>
              <option value="M" className="font-normal text-[15px]">
                Medium
              </option>
              <option value="L" className="font-normal text-[15px]">
                Large
              </option>
              <option value="XL" className="font-normal text-[15px]">
                X Large
              </option>
            </select>

            <div className="qtn-buttons">
              <button
                onClick={handleDecrement}
                className="bg-transparent border-none cursor-pointer text-lg font-semibold"
              >
                -
              </button>

              <input
                id={product.id}
                value={quantity}
                readOnly
                className="bg-transparent rounded-[5px] font-semibold text-base h-[47px] py-[10px] pl-[15px] pr-[5px] w-[50px]"
              />
              <button
                onClick={handleIncrement}
                className="bg-transparent border-none cursor-pointer text-lg font-semibold"
              >
                +
              </button>
            </div>

            <div className="sproduct-info">
              <h4 className="font-bold">Product Details</h4>
              <p>
                Stay effortlessly stylish and comfortable with our classic Black
                Hoodie. Crafted with care and attention to detail, this
                versatile wardrobe essential is designed to keep you cozy while
                exuding an air of understated elegance. Made from a premium
                blend of high-quality cotton and soft polyester, the hoodie
                offers a luxuriously smooth feel against your skin. Its deep
                black hue is both timeless and adaptable, seamlessly integrating
                into any occasion.
              </p>
            </div>

            <Link to="/cart">
              <div
                className="mt-5 flex w-2/12 items-center justify-center rounded-md border border-transparent bg-[#282828] px-8 py-3 text-base font-bold text-white hover:bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2"
                onClick={handleBuyNow}
              >
                Buy
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="my-5">
        <h2 className="flex items-center justify-center">Similiar Products</h2>
        <div className="flex items-center justify-center space-x-[10rem] mt-4">
          {similiarProducts.map((similiarProduct) => (
            <div key={similiarProduct.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200  group-hover:opacity-75">
                <Link to={`/shop/${similiarProduct.id}`}>
                  <img
                    src={similiarProduct.frontImg}
                    alt={similiarProduct.productName}
                    className="h-full w-full object-cover object-center"
                  />
                </Link>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-base text-black">
                    <a href={`/shop/${similiarProduct.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.productName}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-base font-medium text-black">
                  R {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default SProduct;
