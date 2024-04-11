import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { PRODUCTS } from "../utils/resources";
import { BaseProduct } from "../utils/models";
import ProductCard from "../components/ProductCard";

const ShopPage = () => {
  return (
    <>
      <Navbar />

      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {PRODUCTS.map((product: BaseProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ShopPage;
