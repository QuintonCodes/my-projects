import { Fragment, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useUser } from "../hooks/useContext";
import AuthService from "../services/AuthService";
import { handleMenuClose } from "../utils/helper";

interface UserMenuProps {
  authService: ReturnType<typeof AuthService>;
}

const UserMenu = ({ authService }: UserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useUser();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => handleMenuClose(setAnchorEl);

  const handleSignIn = () => {
    authService.signIn();
  };

  const handleSignOut = async () => {
    await authService.signOut();
    handleClose();
  };

  const handleProfileClick = () => {
    const spotifyUri = `spotify:user:${user?.id}`;
    const fallbackUrl = `https://open.spotify.com/user/${user?.id}`;

    window.open(spotifyUri, "_blank");

    setTimeout(() => {
      if (window.confirm("Open web version instead?")) {
        window.open(fallbackUrl, "_blank");
      }
    }, 2000);

    handleClose();
  };

  return (
    <Fragment>
      <IconButton
        aria-controls="menu-appbar"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        edge="end"
        onClick={handleMenu}
        size="large"
      >
        {user ? (
          <img
            alt="Profile"
            src={user.image}
            style={{ width: 33, borderRadius: "50%" }}
          />
        ) : (
          <AccountCircleOutlinedIcon sx={{ fontSize: 33 }} />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        id="menu-appbar"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        {user ? (
          <div>
            <MenuItem onClick={handleProfileClick}>Your Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </div>
        ) : (
          <MenuItem onClick={handleSignIn}>Sign in</MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default UserMenu;
