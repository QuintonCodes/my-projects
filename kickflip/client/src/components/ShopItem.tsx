import { Link } from "lucide-react";
import { Products } from "../utils/models";
import { Card, CardContent, CardFooter } from "./ui/card";

interface ShopItemProps {
  products: Products;
}

const ShopItem = ({ products }: ShopItemProps) => {
  return (
    <Card className="w-3/5 transform transition-transform duration-300 hover:scale-105 cursor-pointer bg-transparent border-transparent">
      <CardContent className="flex aspect-square items-center justify-center p-6 bg-card rounded-lg">
        <Link to={`shop/${products.name}`}>
          <img
            src={products.images[0].src}
            alt={products.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </Link>
      </CardContent>
      <CardFooter className="mt-4 flex justify-between">
        <div>
          <h3 className="text-base text-black">
            <a href="/shop/product">
              <span aria-hidden="true" className="inset-0" />
              {products.name}
            </a>
          </h3>

          {products.color.map((color) => (
            <p className="mt-1 text-sm text-gray-500">{color.name}</p>
          ))}
        </div>
        <p className="text-base font-medium text-black">
          R {products.price}.00
        </p>
      </CardFooter>
    </Card>
  );
};

export default ShopItem;
