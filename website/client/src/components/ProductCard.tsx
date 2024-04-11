import { FC } from "react";
import { Link } from "react-router-dom";
import { BaseProduct } from "../utils/models";

interface ProductCardProps {
  product: BaseProduct;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div key={product.id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75">
        <Link to={`shop/${product.name}/${product.id}`} key={product.id}>
          {product.images && product.images[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          )}
        </Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-base text-black">
            <a href={`shop/${product.name}/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          {product.color.map((color) => (
            <p key={color.name} className="mt-1 text-sm text-gray-500">
              {color.name}
            </p>
          ))}
        </div>
        <p className="text-base font-medium text-black">R {product.price}.00</p>
      </div>
    </div>
  );
};

export default ProductCard;
