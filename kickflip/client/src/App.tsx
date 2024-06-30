import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./components/MainLayout";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProductInfoPage from "./pages/ProductInfoPage";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import { ShopProvider } from "./context/ShopContext";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider>
        <RouterProvider router={router}></RouterProvider>
      </ShopProvider>
    </QueryClientProvider>
  );
};

export default App;
