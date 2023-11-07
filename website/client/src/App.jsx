import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ShopContextProvider from "./context/shop-context";

const About = lazy(() => import("./pages/about/about"));
const Cart = lazy(() => import("./pages/cart/cart"));
const Contact = lazy(() => import("./pages/contact/contact"));
const Home = lazy(() => import("./pages/home/home"));
const Shop = lazy(() => import("./pages/shop/shop"));
const SProduct = lazy(() => import("./pages/shop/sproduct"));
const Login = lazy(() => import("./pages/login/login"));

export default function App() {
  return (
    <>
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/about"
              element={
                <Suspense
                  fallback={
                    <div className="loading-app">
                      <Loader />
                    </div>
                  }
                >
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense
                  fallback={
                    <div className="loading-app">
                      <Loader />
                    </div>
                  }
                >
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense
                  fallback={
                    <div className="loading-app">
                      <Loader />
                    </div>
                  }
                >
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <Suspense
                  fallback={
                    <div className="loading-app">
                      <Loader />
                    </div>
                  }
                >
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/shop"
              element={
                <Suspense
                  fallback={
                    <div className="loading-app">
                      <Loader />
                    </div>
                  }
                >
                  <Shop />
                </Suspense>
              }
            />
            <Route
              path="/shop/:productId"
              element={
                <Suspense
                  fallback={
                    <div className="loading-app">
                      <Loader />
                    </div>
                  }
                >
                  <SProduct />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense
                  fallback={
                    <div className="loading-app">
                      <Loader />
                    </div>
                  }
                >
                  <Login />
                </Suspense>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </ShopContextProvider>
    </>
  );
}
