import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FC, useState } from "react";
import { useUser } from "../context/UserContext";
import AuthService from "../services/AuthService";
import { handleMenuClose } from "../utils/helper";

const UserMenu: FC<{ authService: ReturnType<typeof AuthService> }> = ({
  authService,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useUser();

  const handleClose = () => handleMenuClose(setAnchorEl);

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
    <div>
      <IconButton
        aria-controls="menu-appbar"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        edge="end"
        onClick={(e) => setAnchorEl(e.currentTarget)}
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
          <MenuItem onClick={() => authService.signIn()}>Sign in</MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default UserMenu;
