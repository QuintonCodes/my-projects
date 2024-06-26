import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import AutoPlay from "embla-carousel-autoplay";

const ImageSlides = () => {
  const plugin = useRef(
    AutoPlay({
      delay: 3000,
    })
  );

  return (
    <Carousel className="w-full max-w-sm" plugins={[plugin.current]}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageSlides;
