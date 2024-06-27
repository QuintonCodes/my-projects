import { Link } from "react-router-dom";
import { Products } from "../utils/models";
import { Card, CardContent, CardFooter } from "./ui/card";
import { cn } from "../lib/utils";

interface ShopItemProps {
  products: Products;
}

const ShopItem = ({ products }: ShopItemProps) => {
  return (
    <Card className="w-3/5 transform transition-transform duration-300 hover:scale-105 cursor-pointer bg-transparent">
      <CardContent className="flex aspect-square items-center justify-center p-6 rounded-lg">
        <Link to={`/shop/${products.name}`}>
          <img
            src={products.images[0].src}
            alt={products.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-lg"
          />
        </Link>
      </CardContent>
      <CardFooter className="mt-4 flex justify-between text-white">
        <div>
          <h3 className="text-base text-wrap">
            <Link to={`/shop/${products.name}`}>
              <span aria-hidden="true" className="inset-0" />
              {products.name}
            </Link>
          </h3>

          <div className="flex gap-3 py-2">
            {products.color.map((color) => (
              <span
                aria-hidden="true"
                key={color.name}
                className={cn(
                  color.class,
                  "h-6 w-6 rounded-full border border-black"
                )}
              />
            ))}
          </div>
        </div>
        <p className="text-base font-medium">R {products.price}.00</p>
      </CardFooter>
    </Card>
  );
};

export default ShopItem;
