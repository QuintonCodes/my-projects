import { Link } from "react-router-dom";
import { PRODUCTS } from "../../products";

function Shop() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75">
                <Link to={`shop/${product.id}`} key={product.id}>
                  <img
                    src={product.frontImg}
                    alt={product.productName}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </Link>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-base text-black">
                    <a href={`shop/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.productName}
                    </a>
                  </h3>
                  {product.color.map((color) => (
                    <p key={color.name} className="mt-1 text-sm text-gray-500">
                      {color.name}
                    </p>
                  ))}
                </div>
                <p className="text-base font-medium text-black">
                  R {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
