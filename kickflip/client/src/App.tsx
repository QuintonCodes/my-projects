import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import MainLayout from "./components/MainLayout";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProductInfoPage from "./pages/ProductInfoPage";
import ShopPage from "./pages/ShopPage";
import store from "./features/store";
import ErrorPage from "./pages/ErrorPage";

const queryClient = new QueryClient();
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
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
