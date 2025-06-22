// import { products } from "@/lib/products";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useProducts } from "./use-products";

export function useRelatedProducts(productId: string) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState(4);

  const { products, isLoading, error } = useProducts();

  const relatedProducts = useMemo(() => {
    return products.filter((product) => product.id !== productId).slice(0, 8);
  }, [productId, products]);

  const calcVisibleItems = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 4;
  }, []);

  useEffect(() => {
    const onResize = () => setVisibleItems(calcVisibleItems());
    onResize(); // initialise
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [calcVisibleItems]);

  const maxIndex = Math.max(0, relatedProducts.length - visibleItems);

  const prev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const next = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  return {
    relatedProducts,
    isLoading,
    error,
    containerRef,
    translateX: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
    canScrollLeft: currentIndex > 0,
    canScrollRight: currentIndex < maxIndex,
    prev,
    next,
  };
}
