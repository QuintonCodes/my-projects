import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import { useAllArtists } from "../hooks/useArtists";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import useFilteredArtists from "../hooks/useFilteredArtists";
import useUserEffect from "../hooks/useUserEffect";
import useAuthService from "../services/AuthService";
import { DrawerEl, NavLinks } from "./NavLinks";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import UserMenu from "./UserMenu";

const Navbar: FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const authService = useAuthService();
  const theme = useTheme();
  const isMediumScreenDown = useMediaQuery(theme.breakpoints.down("md"));

  const { allArtists, isLoading } = useAllArtists();

  const { searchQuery, handleSearchInputChange } = useDebouncedSearch();
  const filteredArtists = useFilteredArtists(allArtists, searchQuery);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useUserEffect();

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#1f1f1f",
          justifyContent: "center",
          minHeight: 90,
          width: "90vw",
        }}
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
        <SearchResults isLoading={isLoading} searchResults={filteredArtists} />
      )}
    </div>
  );
};

export default Navbar;
