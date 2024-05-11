import { FC, Fragment, useState } from "react";
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerEl, NavLinks } from "./NavLinks";
import UserMenu from "./UserMenu";
import useUserEffect from "../hooks/useUserEffect";
import useAuthService from "../services/AuthService";

const Navbar: FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
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
        sx={{ bgcolor: "#1f1f1f", justifyContent: "center", minHeight: 80 }}
      >
        <Toolbar>
          {isMediumScreenDown && (
            <IconButton
              aria-label="open drawer"
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
          <Typography
            component="div"
            variant="h6"
            sx={{ flexGrow: 1, paddingX: 5 }}
          >
            Vibe Voyage
          </Typography>
          <NavLinks isMediumScreenDown={isMediumScreenDown} />
          <UserMenu authService={authService} />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" onClose={handleDrawerToggle} open={mobileOpen}>
        <DrawerEl />
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
