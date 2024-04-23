import { useState, Fragment } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useUser } from "../context/UserContext";
import AuthService from "../services/AuthService";

interface UserMenuProps {
  authService: ReturnType<typeof AuthService>;
}

const UserMenu = ({ authService }: UserMenuProps) => {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = async () => {
    await authService.signIn();
  };

  const handleSignOut = async () => {
    const message = await authService.signOut();
    console.log(message); // Here you could use a snackbar to show messages
    handleClose();
  };

  const handleProfileClick = () => {
    window.open("https://www.spotify.com/account/overview/", "_blank");
    handleClose();
  };
  return (
    <Fragment>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {user ? (
          <img
            src={user.images[0].url}
            alt="Profile"
            style={{ width: 33, borderRadius: "50%" }}
          />
        ) : (
          <AccountCircleOutlinedIcon sx={{ fontSize: 33 }} />
        )}
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
        {user ? (
          <Fragment>
            <MenuItem onClick={handleProfileClick}>Your Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Fragment>
        ) : (
          <MenuItem onClick={handleSignIn}>Sign in</MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default UserMenu;
