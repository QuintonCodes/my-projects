import { List, ListItem, ListItemText, styled } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface NavbarLinkProps {
  active?: boolean; // Include the active prop for styling
  isMediumScreenDown?: boolean;
}

const navigation = [
  { name: "Home", to: "/" },
  { name: "Artists", to: "/artists" },
  { name: "Daily Artist", to: "/daily-artist" },
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

export const NavLinks = ({ isMediumScreenDown }: NavbarLinkProps) => {
  const location = useLocation();
  return (
    <List sx={{ display: isMediumScreenDown ? "none" : "flex" }}>
      {navigation.map((item) => (
        <ListItem
          key={item.name}
          component={Link}
          to={item.to}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "transparent",
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
  );
};

export const DrawerEl = () => {
  const location = useLocation();
  return (
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
};
