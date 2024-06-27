import { useParams } from "react-router-dom";
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
import { useState } from "react";

const ProductInfoPage = () => {
  const { id } = useParams();
  const { data: product } = useProduct(id);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <section className="my-5 ml-16">
      <div className="flex items-start max-[1024px]:flex-wrap">
        <ProductImages includeButtons={true} product={product} />

        <div className="lg:ml-[60px] min-w-[980px] max-[1024px]:ml-0 max-[450px]:mt-8">
          <h3 className="text-3xl font-semibold">
            {product?.name || "Product Name"}
          </h3>
          <h4 className="text-2xl mt-2">R {product?.price || "300.00"}</h4>
          <div className="flex flex-col mb-3">
            <h5 className="my-2">Select a colour</h5>
            <div className="mx-2">
              {product?.color.map((color) => (
                <label
                  key={color.name}
                  className={`relative -m-0.5 flex rounded-full p-0.5 cursor-pointer ${
                    selectedColor === color.name ? "border-2 border-black" : ""
                  }`}
                  onClick={() => handleColorSelect(color.name)}
                >
                  <span
                    aria-hidden="true"
                    className={`h-6 w-6 rounded-full ${color.class}`}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="w-1/5">
            <Select>
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

          <Button className="my-4 bg-[#292929] hover:bg-[#7F1310] hover:bg-opacity-90 hover:scale-110 transition duration-300">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoPage;
