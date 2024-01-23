import { FC } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../../products";

interface ColorOption {
  name: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  color: ColorOption[];
}

interface SimilarProductsProps {
  product: Product;
}

const SimilarProducts: FC<SimilarProductsProps> = ({ product }) => {
  const similarProducts = PRODUCTS.filter(
    (p: Product) => p.category === product.category && p.id !== product.id
  ).slice(0, 2);

  return (
    <section className="my-5 mx-10">
      <h2 className="flex items-center justify-center max-[450px]:text-4xl">
        Similiar Products
      </h2>
      <div className="flex items-center justify-center space-x-[10rem] mt-4 max-[450px]:flex-wrap max-[450px]:p-5 max-[450px]:space-x-0 max-[1024px]:space-x-[5rem]">
        {similarProducts.map((similarProduct: Product) => (
          <div key={similarProduct.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200  group-hover:opacity-75">
              <Link to={`/shop/${similarProduct.name}/${similarProduct.id}`}>
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
                  <Link
                    to={`/shop/${similarProduct.name}/${similarProduct.id}`}
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {similarProduct.name}
                  </Link>
                </h3>
                {similarProduct.color.map((colorOption: ColorOption) => (
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
  );
};

export default SimilarProducts;
