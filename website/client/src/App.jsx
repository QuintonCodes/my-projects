import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import ShopContextProvider from "./context/shop-context";

const Cart = lazy(() => import("./pages/cart/cart"));
const Contact = lazy(() => import("./pages/contact/contact"));
const Home = lazy(() => import("./pages/home/home"));
const Login = lazy(() => import("./pages/login/login"));
const Register = lazy(() => import("./pages/login/register"));
const Shop = lazy(() => import("./pages/shop/shop"));
const SProduct = lazy(() => import("./pages/shop/sproduct"));

export default function App() {
  return (
    <>
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/cart"
              element={
                <Suspense
                  fallback={
                    <div className="items-center flex h-screen justify-center w-full">
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
                    <div className="items-center flex h-screen justify-center w-full">
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
                    <div className="items-center flex h-screen justify-center w-full">
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
                    <div className="items-center flex h-screen justify-center w-full">
                      <Loader />
                    </div>
                  }
                >
                  <Shop />
                </Suspense>
              }
            />
            <Route
              path="/shop/:productName/:productId"
              element={
                <Suspense
                  fallback={
                    <div className="items-center flex h-screen justify-center w-full">
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
                    <div className="items-center flex h-screen justify-center w-full">
                      <Loader />
                    </div>
                  }
                >
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense
                  fallback={
                    <div className="items-center flex h-screen justify-center w-full">
                      <Loader />
                    </div>
                  }
                >
                  <Register />
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
