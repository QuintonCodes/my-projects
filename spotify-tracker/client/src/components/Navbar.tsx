import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

interface NavbarLinkProps {
  active?: boolean; // Include the active prop for styling
}

const navigation = [
  { name: "Home", to: "/", current: false },
  { name: "Artists", to: "/artists", current: false },
  { name: "Daily Artist", to: "/daily-artist", current: false },
];

const NavbarLink = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "active",
})<NavbarLinkProps>(({ active }) => ({
  "& span": {
    position: "relative",
    display: "block",
    color: active ? "#1DB954" : "#fff",
    transition: "color 0.5s",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  "& span::after": {
    background: "#1DB954",
    borderRadius: 5,
    bottom: -5,
    content: '""',
    height: 3,
    left: 0,
    position: "absolute",
    transform: active ? "scaleX(1)" : "scaleX(0)",
    transformOrigin: "right",
    transition: "transform 0.5s",
    width: "100%",
  },
  "&:hover span": {
    color: "#1DB954",
  },
  "&:hover span::after": {
    transform: "scaleX(1)",
  },
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const theme = useTheme();
  const isMediumScreenDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <List sx={{ bgcolor: "#1f1f1f", width: 250 }}>
      {navigation.map((item) => (
        <ListItem
          key={item.name}
          component={Link}
          to={item.to}
          sx={{
            "&:hover": {
              backgroundColor: "#1DB954",
              "& .MuiListItemText-primary": {
                color: "#000",
              },
            },
          }}
          selected={item.to === location.pathname}
        >
          <ListItemText
            primary={item.name}
            primaryTypographyProps={{ style: { color: "#fff" } }}
          />
        </ListItem>
      ))}
    </List>
  );

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
          <div>
            <List sx={{ display: isMediumScreenDown ? "none" : "flex" }}>
              {navigation.map((item) => (
                <ListItem
                  key={item.name}
                  component={Link}
                  to={item.to}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "transparent", // Prevent default background color on active
                    },
                    paddingX: 3,
                  }}
                  selected={item.to === location.pathname}
                >
                  <NavbarLink
                    primary={item.name}
                    active={item.to === location.pathname}
                  />
                </ListItem>
              ))}
            </List>
          </div>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircleOutlinedIcon sx={{ fontSize: 33 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Your Profile</MenuItem>
            <MenuItem onClick={handleClose}>Sign out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
