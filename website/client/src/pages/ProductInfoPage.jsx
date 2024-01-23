import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Modal from "../components/ui/shop/Modal";
import ProductDetails from "../components/ui/shop/ProductDetails";
import ProductImageGallery from "../components/ui/shop/ProductImageGallery";
import SimilarProducts from "../components/ui/shop/SimilarProducts";
import { ShopContext } from "../context/ShopContext";
import { PRODUCTS } from "../products";

const ProductInfoPage = () => {
  const [isSizeDialogOpen, setIsSizeDialogOpen] = useState(true);
  const { addToCart, cartItems, setCartItems } = useContext(ShopContext);
  const { productId } = useParams();
  const product = PRODUCTS.find(
    (product) => product.id === parseInt(productId)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navbar />

      <section className="my-5 mx-10">
        <div className="flex items-start max-[1024px]:flex-wrap">
          <ProductImageGallery product={product} />

          <ProductDetails
            addToCart={addToCart}
            cartItems={cartItems}
            product={product}
            setCartItems={setCartItems}
            setIsSizeDialogOpen={setIsSizeDialogOpen}
          />
        </div>
      </section>

      <SimilarProducts product={product} />

      <Modal
        isSizeDialogOpen={isSizeDialogOpen}
        setIsSizeDialogOpen={setIsSizeDialogOpen}
      />

      <Footer />
    </>
  );
};

export default ProductInfoPage;
