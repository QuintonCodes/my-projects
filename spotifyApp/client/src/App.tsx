import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { SnackbarProvider } from "./context/SnackBarContext";
import { UserProvider } from "./context/UserContext";
import ArtistInfoPage from "./pages/ArtistInfoPage";
import ArtistListPage from "./pages/ArtistListPage";
import DailyArtistPage from "./pages/DailyArtistPage";
import HomePage from "./pages/HomePage";

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
        path: "/artists/:page",
        element: <ArtistListPage />,
      },
      {
        path: "/artists/:page/:id",
        element: <ArtistInfoPage />,
      },
      {
        path: "/daily-artist",
        element: <DailyArtistPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
