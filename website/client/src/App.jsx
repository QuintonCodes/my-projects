import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import ShopContextProvider from "./context/ShopContext";

const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./pages/Contact"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Shop = lazy(() => import("./pages/Shop"));
const Sproduct = lazy(() => import("./pages/Sproduct"));

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
                  <Sproduct />
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
                  <Signup />
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
