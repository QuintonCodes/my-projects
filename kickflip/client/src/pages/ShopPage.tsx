import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Error from "../components/Error";
import Filter from "../components/Filter";
import ShopItem from "../components/ShopItem";
import { Skeleton } from "../components/ui/skeleton";
import useFilteredProducts from "../hooks/useFilteredProducts";
import useProducts from "../hooks/useProducts";
import useSortedProducts from "../hooks/useSortedProducts";

const ShopPage = () => {
  const [sortOption, setSortOption] = useState<string>("alphabetical");
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "all";

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useProducts({ category: categoryFilter });

  const filteredProducts = useFilteredProducts(products, categoryFilter);
  const sortedProducts = useSortedProducts(filteredProducts, sortOption);

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handleCategoryChange = (value: string) => {
    setSearchParams({ category: value });
  };

  return (
    <section className="bg-[#292929] text-center py-10 text-white min-h-[70vh]">
      <h2 className="font-bold pb-5 text-5xl">Shop All</h2>

      <div className="mb-5 w-2/6 text-white ml-12 flex gap-5">
        <Filter
          value={sortOption}
          onValueChange={handleSortChange}
          label="Sort by"
        >
          <Filter.FilterItem value="alphabetical">
            Alphabetical (A to Z)
          </Filter.FilterItem>
          <Filter.FilterItem value="reverse">
            Alphabetical (Z to A)
          </Filter.FilterItem>
        </Filter>

        <Filter
          value={categoryFilter}
          onValueChange={handleCategoryChange}
          label="Category Filters"
        >
          <Filter.FilterItem value="all">All</Filter.FilterItem>
          <Filter.FilterItem value="hoodies">Hoodies</Filter.FilterItem>
          <Filter.FilterItem value="t-shirts">T-Shirts</Filter.FilterItem>
          <Filter.FilterItem value="sweatshirts">Sweatshirts</Filter.FilterItem>
        </Filter>
      </div>

      {isProductsLoading ? (
        <div className="grid grid-cols-3 justify-items-center gap-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-4/5 h-[500px] rounded-xl" />
          ))}
        </div>
      ) : productsError ? (
        <div className="flex items-center justify-center">
          <Error productsError={productsError} />
        </div>
      ) : (
        <div className="grid grid-cols-3 justify-items-center gap-10">
          {sortedProducts.map((product) => (
            <ShopItem key={product.id} products={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ShopPage;
