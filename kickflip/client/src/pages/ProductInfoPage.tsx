import { Link, useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import ProductImages from "../components/ProductImages";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "../lib/utils";
import { useShop } from "../context/ShopContext";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

const ProductInfoPage = () => {
  const { id } = useParams();
  const { data: product } = useProduct(id);
  const { dispatch } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>("s");

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", product, size: selectedSize });
  };

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
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

          <div className="w-1/5 text-black">
            <Select value={selectedSize} onValueChange={handleSizeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sizes</SelectLabel>
                  {product?.size.map((size) => (
                    <SelectItem key={size.name} value={size.name.toLowerCase()}>
                      {size.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="my-4 bg-[#D6D6D6] hover:bg-[#7F1310] hover:bg-opacity-90 hover:scale-110 transition duration-300 text-black hover:text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#292929]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[#7F1310]">
                  Successfully added to cart !
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white">
                  Your {product?.name} has been added to your cart. You can
                  checkout or continue shopping now.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent text-white hover:text-black">
                  Cancel
                </AlertDialogCancel>
                <Link to="/cart">
                  <AlertDialogAction className="bg-[#D6D6D6] text-black hover:bg-[#7F1310] hover:text-white">
                    Go to Cart
                  </AlertDialogAction>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoPage;
