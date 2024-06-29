import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import AutoPlay from "embla-carousel-autoplay";
import { Products } from "../utils/models";

interface ProductImagesProps {
  product?: Products;
  includeButtons: boolean;
}

const ProductImages = ({
  includeButtons = false,
  product,
}: ProductImagesProps) => {
  const plugin = useRef(
    AutoPlay({
      delay: 3000,
    })
  );

  return (
    <Carousel
      className="w-full max-w-sm"
      plugins={!includeButtons ? [plugin.current] : undefined}
    >
      <CarouselContent>
        {product?.images.map((item) => (
          <CarouselItem key={item.src}>
            <div className="p-1">
              <Card className="bg-transparent border-none">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img src={item.src} alt={item.name} className="rounded-lg" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {includeButtons && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default ProductImages;
