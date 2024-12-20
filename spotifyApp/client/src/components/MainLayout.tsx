import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
