import { useContext, useState, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { RadioGroup, Dialog, Transition } from "@headlessui/react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SProduct() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSizeDialogOpen, setIsSizeDialogOpen] = useState(!selectedSize);

  const { addToCart, cartItems, setCartItems } = useContext(ShopContext);
  const { productId } = useParams();
  const product = PRODUCTS.find(
    (product) => product.id === parseInt(productId)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const { price, name, description, color, size, images } = product;
  const existingCartItem = cartItems.find((item) => item.id === product.id);

  const handleBuyNow = () => {
    if (!selectedSize) {
      setIsSizeDialogOpen(true);
      return;
    }

    const updatedCartItem = { ...product, selectedSize: selectedSize };

    if (existingCartItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id ? updatedCartItem : item
        )
      );
    } else {
      addToCart(updatedCartItem);
    }
  };

  const nextSlide = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  const similarProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 2);

  return (
    <>
      <section className="my-5 mx-10">
        <div className="flex items-start mt-5 max-[1024px]:flex-wrap">
          <div className="h-[450px] relative text-center w-full max-[450px]:h-[350px]">
            <div className="relative">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${name} - ${index + 1}`}
                  className={
                    currentImageIndex === index
                      ? "hidden absolute transition-transform ease-linear duration-150 w-full h-[450px] active:block"
                      : ""
                  }
                />
              ))}
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

          <div className="pl-[30px] pt-[10px] max-w-[980px] max-[450px]:pl-0">
            <h3 className="text-3xl font-semibold">{name}</h3>
            <h4 className="text-2xl mt-2">R {price}.00</h4>
            {color.map((colorOption) => (
              <div key={colorOption.name} className="flex items-center">
                <h5 className="my-2">{colorOption.name}</h5>
                <RadioGroup className="mx-2">
                  <div>
                    <RadioGroup.Label
                      key={colorOption.name}
                      value={colorOption}
                      className="relative -m-0.5 flex items-center justify-center rounded-full p-0.5"
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          colorOption.class,
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
              <div className="grid grid-cols-4 gap-4 w-1/2 max-[450px]:w-full">
                {size.map((sizeOption) => (
                  <RadioGroup.Option
                    key={sizeOption.name}
                    value={sizeOption}
                    disabled={!sizeOption.inStock}
                    className={({ active }) =>
                      classNames(
                        sizeOption.inStock
                          ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                          : "cursor-not-allowed bg-gray-50 text-gray-200",
                        active ? "ring-2 ring-black" : "",
                        "group relative flex items-center justify-center rounded-md border py-6 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none flex-1"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <RadioGroup.Label as="span">
                          {sizeOption.name}
                        </RadioGroup.Label>
                        {sizeOption.inStock ? (
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

              <p>{description}</p>
            </div>

            <Link to="/cart">
              <div
                className="mt-5 flex w-2/12 items-center justify-center rounded-md border border-transparent bg-[#282828] px-8 py-3 text-base font-bold text-white hover:bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2 max-[450px]:w-1/3"
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
        <div className="flex items-center justify-center space-x-[10rem] mt-4 max-[450px]:flex-wrap max-[450px]:p-5 max-[450px]:space-x-0">
          {similarProducts.map((similarProduct) => (
            <div key={similarProduct.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200  group-hover:opacity-75">
                <Link to={`/shop/${similarProduct.id}`}>
                  {similarProduct && similarProduct.images && (
                    <img
                      src={similarProduct.images[0]}
                      alt={similarProduct.name}
                      className="h-full w-full object-cover object-center"
                    />
                  )}
                </Link>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-base text-black">
                    <Link to={`/shop/${similarProduct.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {similarProduct.name}
                    </Link>
                  </h3>
                  {similarProduct.color.map((colorOption) => (
                    <p
                      key={colorOption.name}
                      className="mt-1 text-sm text-gray-500"
                    >
                      {colorOption.name}
                    </p>
                  ))}
                </div>
                <p className="text-base font-medium text-black">
                  R {similarProduct.price}.00
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Transition appear show={isSizeDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          open={isSizeDialogOpen}
          onClose={() => setIsSizeDialogOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Select a size
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      No size is selected so please select a size of your choice
                      before adding the item to the cart.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setIsSizeDialogOpen(false)}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default SProduct;
