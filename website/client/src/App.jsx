import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/about/about";
import Cart from "./pages/cart/cart";
import Contact from "./pages/contact/contact";
import Footer from "./components/Footer";
import Home from "./pages/home/home";
import Navbar from "./components/Navbar";
import Shop from "./pages/shop/shop";
import ShopContextProvider from "./context/shop-context";
import SProduct from "./pages/shop/sproduct";

export default function App() {
  return (
    <>
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:productId" element={<SProduct />} />
          </Routes>
          <Footer />
        </Router>
      </ShopContextProvider>
    </>
  );
}
