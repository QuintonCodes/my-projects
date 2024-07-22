import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import store from "./features/store";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ProductInfoPage from "./pages/ProductInfoPage";
import ShopPage from "./pages/ShopPage";

const queryClient = new QueryClient();
const auth = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/:id",
        element: <ProductInfoPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/auth/:tab",
        element: <AuthPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider store={auth}>
        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
