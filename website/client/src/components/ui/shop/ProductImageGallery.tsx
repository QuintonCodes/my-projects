import { useState, FC } from "react";

interface Product {
  name: string;
  images: string[];
}

interface ProductImageGalleryProps {
  product: Product;
}

const ProductImageGallery: FC<ProductImageGalleryProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="h-[500px] relative text-center w-full max-[450px]:h-[350px] md:mb-6">
      <div className="relative max-[1024px]:flex max-[1024px]:justify-center max-[1024px]:items-center">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.name} - ${index + 1}`}
            className={
              index === currentImageIndex
                ? "hidden absolute transition-transform ease-in-out w-full h-[450px] active:block"
                : ""
            }
          />
        ))}
      </div>

      <div className="flex justify-between">
        <button
          className="border-2 border-black rounded-lg w-[50px]"
          onClick={prevSlide}
        >
          Prev
        </button>
        <button
          className="border-2 border-black rounded-lg w-[50px]"
          onClick={nextSlide}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductImageGallery;
