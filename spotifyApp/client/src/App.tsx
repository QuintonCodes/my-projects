import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, CircularProgress, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import { SnackbarProvider } from "./context/SnackBarContext";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ArtistListPage from "./pages/ArtistListPage";
import ArtistInfoPage from "./pages/ArtistInfoPage";
import DailyArtistPage from "./pages/DailyArtistPage";
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <SnackbarProvider>
            <Navbar />
            <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artists" element={<ArtistListPage />} />
                <Route path="/artists/:id" element={<ArtistInfoPage />} />
                <Route path="/daily-artist" element={<DailyArtistPage />} />
                <Route
                  path="*"
                  element={
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="80vh"
                    >
                      <CircularProgress />
                    </Box>
                  }
                />
              </Routes>
            </Container>
          </SnackbarProvider>
        </Router>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
