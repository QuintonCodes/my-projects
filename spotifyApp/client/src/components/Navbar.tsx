import React, { FC, Fragment, useState, useCallback } from "react";
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
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import useUserEffect from "../hooks/useUserEffect";
import useAuthService from "../services/AuthService";
import useSearchArtist from "../hooks/useSearchArtist";

const Navbar: FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const authService = useAuthService();

  const theme = useTheme();
  const isMediumScreenDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: number;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => func(...args), wait);
    };
  };

  const debouncedSetSearchQuery = useCallback(
    debounce((query: string) => setSearchQuery(query), 300),
    []
  );

  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    debouncedSetSearchQuery(query);
  };

  useUserEffect();

  const { data: searchResults, isLoading } = useSearchArtist(searchQuery);

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
          <Typography component="div" variant="h6" sx={{ paddingX: 5 }}>
            Vibe Voyage
          </Typography>
          <SearchBar
            searchQuery={searchQuery}
            onChange={() => handleSearchInputChange}
            isMediumScreenDown={isMediumScreenDown}
          />
          <NavLinks isMediumScreenDown={isMediumScreenDown} />
          <UserMenu authService={authService} />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" onClose={handleDrawerToggle} open={mobileOpen}>
        <DrawerEl />
      </Drawer>
      {searchQuery.length > 2 && (
        <SearchResults isLoading={isLoading} searchResults={searchResults} />
      )}
    </Fragment>
  );
};

export default Navbar;
