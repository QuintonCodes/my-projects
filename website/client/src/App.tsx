import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import { ShopContextProvider } from "./context/ShopContext";

const CartPage = lazy(() => import("./pages/CartPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProductInfoPage = lazy(() => import("./pages/ProductInfoPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));

const App = () => {
  return (
    <ShopContextProvider>
      <Router>
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
                <CartPage />
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
                <ContactPage />
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
                <HomePage />
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
                <LoginPage />
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
                <ProductInfoPage />
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
                <RegisterPage />
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
                <ShopPage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </ShopContextProvider>
  );
};

export default App;
