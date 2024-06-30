import { useState } from "react";
import ShopItem from "../components/ShopItem";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Skeleton } from "../components/ui/skeleton";
import useProducts from "../hooks/useProducts";

const ShopPage = () => {
  const { data: products, isLoading: isProductsLoading } = useProducts();
  const [sortOption, setSortOption] = useState<string>("alphabetical");

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const sortedProducts = products?.slice().sort((a, b) => {
    if (sortOption === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "reverse") {
      return b.name.localeCompare(a.name);
    } else if (sortOption === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <section className="bg-[#292929] text-center py-10 text-white min-h-[70vh]">
      <h2 className="font-bold pb-5 text-5xl">Shop All</h2>

      <div className="mb-5 w-1/5 text-black ml-10">
        <Select value={sortOption} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Options</SelectLabel>
              <SelectItem value="alphabetical">
                Alphabetical (A to Z)
              </SelectItem>
              <SelectItem value="reverse">Alphabetical (Z to A)</SelectItem>
              <SelectItem value="category">By Category</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
