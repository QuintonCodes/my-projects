import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { SelectItem } from "../components/ui/select";
import { Skeleton } from "../components/ui/skeleton";
import ShopItem from "../components/ShopItem";
import Filter from "../components/Filter";
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
          <SelectItem value="alphabetical" className="cursor-pointer">
            Alphabetical (A to Z)
          </SelectItem>
          <SelectItem value="reverse" className="cursor-pointer">
            Alphabetical (Z to A)
          </SelectItem>
        </Filter>

        <Filter
          value={categoryFilter}
          onValueChange={handleCategoryChange}
          label="Category Filters"
        >
          <SelectItem value="all" className="cursor-pointer">
            All
          </SelectItem>
          <SelectItem value="hoodies" className="cursor-pointer">
            Hoodies
          </SelectItem>
          <SelectItem value="t-shirts" className="cursor-pointer">
            T-Shirts
          </SelectItem>
          <SelectItem value="sweatshirts" className="cursor-pointer">
            Sweatshirts
          </SelectItem>
        </Filter>
      </div>

      {isProductsLoading ? (
        <div className="grid grid-cols-3 justify-items-center gap-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-4/5 h-[500px] rounded-xl" />
          ))}
        </div>
      ) : productsError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{productsError.message}</AlertDescription>
        </Alert>
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
