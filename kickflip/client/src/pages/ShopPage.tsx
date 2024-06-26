import ShopItem from "../components/ShopItem";
import useProducts from "../hooks/useProducts";

const ShopPage = () => {
  const { data: products } = useProducts();

  return (
    <div className="bg-[#4b4b4b] text-center py-10">
      <h2 className="font-bold pb-5 text-5xl">Shop All</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-10">
        {products?.map((product) => (
          <ShopItem key={product.id} products={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
