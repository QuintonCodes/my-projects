import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { SelectItem } from "../components/ui/select";
import Filter from "../components/Filter";
import Message from "../components/Message";
import ProductImages from "../components/ProductImages";
import useProduct from "../hooks/useProduct";
import { cn } from "../lib/utils";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addToCart } from "../features/cart/cartSlice";

const ProductInfoPage = () => {
  const [selectedSize, setSelectedSize] = useState<string>("s");
  const [showMessage, setShowMessage] = useState(false);

  const { id } = useParams();
  const { data: product } = useProduct(id);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleAddToCart = () => {
    if (!user) {
      setShowMessage(true);
      return;
    }

    dispatch(addToCart({ product, size: selectedSize }));
    setShowMessage(true);
  };

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <section className="pt-10 px-16 bg-[#292929] min-h-[60vh]">
      <div className="flex items-start max-[1024px]:flex-wrap">
        <ProductImages includeButtons={true} product={product} />

        <div className="lg:ml-[60px] min-w-[980px] max-[1024px]:ml-0 max-[450px]:mt-8 text-white">
          <h3 className="text-3xl font-semibold">{product?.name}</h3>
          <h4 className="text-2xl mt-2">R {product?.price}.00</h4>
          <div className="flex my-4">
            <h5>{product?.color.name}</h5>
            <div className="mx-2 relative">
              <span
                aria-hidden="true"
                className={cn(
                  "h-6 w-6 rounded-full border border-black absolute",
                  product?.color.class
                )}
              />
            </div>
          </div>

          <div className="w-1/5 text-white">
            <Filter
              value={selectedSize}
              onValueChange={handleSizeChange}
              label="Sizes"
            >
              {product?.size.map((size) => (
                <SelectItem
                  key={size.name}
                  value={size.name.toLowerCase()}
                  className="cursor-pointer"
                >
                  {size.name}
                </SelectItem>
              ))}
            </Filter>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full hover:underline-offset-2"
          >
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                This product is made by KickFlip
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="details">
              <AccordionTrigger>Details</AccordionTrigger>
              <AccordionContent>75% Cotton and 25% Wool</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button
            className="my-4 bg-[#D6D6D6] hover:bg-[#7F1310] hover:bg-opacity-90 hover:scale-110 transition duration-300 text-black hover:text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>

          {showMessage && !user && (
            <Message
              title="Feature Not Available"
              description="You need to be logged in to add items to the cart."
              cancelButton={true}
              location="/auth/signup"
              actionText="Signup"
              onClose={handleCloseMessage}
            />
          )}
          {showMessage && user && (
            <Message
              title="Successfully added to cart !"
              description={`Your ${product?.name} has been added to your cart. You can
                  checkout or continue shopping now.`}
              cancelButton={true}
              location="/cart"
              actionText="Go to Cart"
              onClose={handleCloseMessage}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductInfoPage;
