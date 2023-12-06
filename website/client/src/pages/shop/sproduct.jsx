import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { RadioGroup } from "@headlessui/react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SProduct() {
  const [selectedSize, setSelectedSize] = useState("S");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addToCart, cartItems, setCartItems } = useContext(ShopContext);
  const { productId } = useParams();
  const product = PRODUCTS.find(
    (product) => product.id === parseInt(productId)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const { price, productName } = product;
  const existingCartItem = cartItems.find((item) => item.id === product.id);

  const handleBuyNow = () => {
    const updatedCartItem = { ...product };

    if (existingCartItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id ? { ...item } : item
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
          <div className="h-[450px] relative text-center w-full">
            <div className="relative">
              {product && product.frontImg && product.backImg && (
                <>
                  <img
                    src={product.backImg}
                    alt={productName}
                    className={
                      currentImageIndex === 0
                        ? "hidden absolute transition-transform ease-linear duration-150 w-full h-[450px] active:block"
                        : ""
                    }
                  />
                  <img
                    src={product.frontImg}
                    alt={productName}
                    className={
                      currentImageIndex === 1
                        ? "hidden absolute transition-transform ease-linear duration-150 w-full h-[450px] active:block"
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

          <div className="pl-[30px] pt-[10px] max-w-[980px]">
            <h3 className="text-3xl font-semibold">{productName}</h3>
            <h4 className="text-2xl mt-2">R {price}.00</h4>
            {product.color.map((c) => (
              <div key={c.name} className="flex items-center">
                <h5 className="my-2">{c.name}</h5>
                <RadioGroup className="mx-2">
                  <div>
                    <RadioGroup.Label
                      key={c.name}
                      value={c}
                      className="relative -m-0.5 flex items-center justify-center rounded-full p-0.5"
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          c.class,
                          "h-6 w-6 rounded-full border border-black border-opacity-10"
                        )}
                      />
                    </RadioGroup.Label>
                  </div>
                </RadioGroup>
              </div>
            ))}

            <RadioGroup
              value={selectedSize}
              onChange={setSelectedSize}
              className="my-4"
            >
              <RadioGroup.Label className="sr-only">
                Choose a size
              </RadioGroup.Label>
              <div className="grid grid-cols-4 gap-4 w-1/2">
                {product.size.map((s) => (
                  <RadioGroup.Option
                    key={s.name}
                    value={s}
                    disabled={!s.inStock}
                    className={({ active }) =>
                      classNames(
                        s.inStock
                          ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                          : "cursor-not-allowed bg-gray-50 text-gray-200",
                        active ? "ring-2 ring-black" : "",
                        "group relative flex items-center justify-center rounded-md border py-6 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none flex-1"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <RadioGroup.Label as="span">{s.name}</RadioGroup.Label>
                        {s.inStock ? (
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked ? "border-black" : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-md"
                            )}
                            aria-hidden="true"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              stroke="currentColor"
                            >
                              <line
                                x1={0}
                                y1={100}
                                x2={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

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
                    <Link to={`/shop/${similiarProduct.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {similiarProduct.productName}
                    </Link>
                  </h3>
                  {similiarProduct.color.map((color) => (
                    <p key={color.name} className="mt-1 text-sm text-gray-500">
                      {color.name}
                    </p>
                  ))}
                </div>
                <p className="text-base font-medium text-black">
                  R {similiarProduct.price}
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
