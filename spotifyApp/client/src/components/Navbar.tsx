import React, { FC, Fragment, useState, useRef, useEffect } from "react";
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
import useArtists from "../hooks/useArtists";
import { Artist } from "../utils/models";

const Navbar: FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const timeoutRef = useRef<number | undefined>();

  const authService = useAuthService();
  const theme = useTheme();
  const isMediumScreenDown = useMediaQuery(theme.breakpoints.down("md"));

  const { data } = useArtists(1, 100);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const debouncedSetSearchQuery = (query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setSearchQuery(query);
    }, 300);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    debouncedSetSearchQuery(query);
  };

  const searchArtists = data?.artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (searchQuery.length > 2 && searchArtists) {
      setFilteredArtists(searchArtists);
    } else {
      setFilteredArtists([]);
    }
  }, [searchQuery, searchArtists]);

  useUserEffect();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
            onChange={handleSearchInputChange}
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
        <SearchResults isLoading={false} searchResults={filteredArtists} />
      )}
    </Fragment>
  );
};

export default Navbar;
