import ShopItem from "../components/ShopItem";
import { Skeleton } from "../components/ui/skeleton";
import useProducts from "../hooks/useProducts";

const ShopPage = () => {
  const { data: products, isLoading: isProductsLoading } = useProducts();

  console.log("Products data:", products);
  const productList = Array.isArray(products) ? products : [];

  return (
    <section className="bg-[#292929] text-center py-10 text-white min-h-[70vh]">
      <h2 className="font-bold pb-5 text-5xl">Shop All</h2>
      {isProductsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-10">
          <Skeleton className="w-3/5 h-[500px] rounded-xl" />
          <Skeleton className="w-3/5 h-[500px] rounded-xl" />
          <Skeleton className="w-3/5 h-[500px] rounded-xl" />
          <Skeleton className="w-3/5 h-[500px] rounded-xl" />
        </div>
      ) : productList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-10">
          {productList.map((product) => (
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
