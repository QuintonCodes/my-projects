import { FC } from "react";
import { PRODUCTS } from "../../../utils/resources";
import { BaseProduct } from "../../../utils/models";
import ProductCard from "./ProductCard";

interface SimilarProductsProps {
  product: BaseProduct;
}

const SimilarProducts: FC<SimilarProductsProps> = ({ product }) => {
  const similarProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 2);

  return (
    <section className="my-5 mx-10">
      <h2 className="flex items-center justify-center max-[450px]:text-4xl">
        Similiar Products
      </h2>
      <div className="flex items-center justify-center space-x-[10rem] mt-4 max-[450px]:flex-wrap max-[450px]:p-5 max-[450px]:space-x-0 max-[1024px]:space-x-[5rem]">
        {similarProducts.map((similarProduct) => (
          <ProductCard key={similarProduct.id} product={similarProduct} />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
