import { useEffect, useState } from "react";
import ShopItem from "../components/ShopItem";
import { SelectItem } from "../components/ui/select";
import { Skeleton } from "../components/ui/skeleton";
import useProducts from "../hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import Filter from "../components/Filter";

const ShopPage = () => {
  const { data: products, isLoading: isProductsLoading } = useProducts();

  const [sortOption, setSortOption] = useState<string>("alphabetical");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchParams] = useSearchParams();

  const categoryFilter = searchParams.get("category") || "all";

  useEffect(() => {
    const filtered =
      categoryFilter === "all"
        ? products
        : products?.filter(
            (product) => product.category.toLowerCase() === categoryFilter
          );
    setFilteredProducts(filtered);
  }, [categoryFilter, products]);

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handleCategoryChange = (value: string) => {
    window.location.href = `/shop?category=${value}`;
  };

  const sortedProducts = filteredProducts?.slice().sort((a, b) => {
    if (sortOption === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "reverse") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

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
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-10">
          <Skeleton className="w-3/5 h-[500px] rounded-xl" />
          <Skeleton className="w-3/5 h-[500px] rounded-xl" />
          <Skeleton className="w-3/5 h-[500px] rounded-xl" />
          <Skeleton className="w-3/5 h-[500px] rounded-xl" />
        </div>
      ) : sortedProducts ? (
        <div className="grid grid-cols-3 justify-items-center gap-10">
          {sortedProducts.map((product) => (
            <ShopItem key={product.id} products={product} />
          ))}
        </div>
      ) : (
        <h2 className="text-2xl">Nothing Found</h2>
      )}
    </section>
  );
};

export default ShopPage;
