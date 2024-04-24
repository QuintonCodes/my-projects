import { Fragment, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLinks, DrawerEl } from "./NavLinks";
import UserMenu from "./UserMenu";
import useUserEffect from "../hooks/useUserEffect";
import useAuthService from "../services/AuthService";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const authService = useAuthService();

  const theme = useTheme();
  const isMediumScreenDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useUserEffect();

  return (
    <Fragment>
      <AppBar
        position="static"
        sx={{ bgcolor: "#1f1f1f", minHeight: 80, justifyContent: "center" }}
      >
        <Toolbar>
          {/* Only display the menu icon if screen size is medium or smaller */}
          {isMediumScreenDown && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, paddingX: 5 }}
          >
            Vibe Voyage
          </Typography>
          <NavLinks isMediumScreenDown={isMediumScreenDown} />
          <UserMenu authService={authService} />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <DrawerEl />
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
