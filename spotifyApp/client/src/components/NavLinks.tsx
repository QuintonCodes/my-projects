import { List, ListItem, ListItemText, styled } from "@mui/material";
import { FC } from "react";
import {
  // Link,
  useLocation,
} from "react-router-dom";

interface NavbarLinkProps {
  active?: boolean;
  isMediumScreenDown?: boolean;
}

const navigation = [
  { name: "Home", to: "/" },
  { name: "Artists", to: "/artists/1" },
  { name: "Daily Artist", to: "/daily-artist" },
];

const NavbarLink = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "active",
})<NavbarLinkProps>(({ active }) => ({
  "& span": {
    color: active ? "#1DB954" : "#fff",
    display: "block",
    position: "relative",
    textOverflow: "ellipsis",
    transition: "color 0.5s",
    whiteSpace: "nowrap",
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

export const DrawerEl: FC = () => {
  const location = useLocation();

  return (
    <List sx={{ bgcolor: "#1f1f1f", width: 250 }}>
      {navigation.map((item) => (
        <ListItem
          // component={Link}
          dir={item.to}
          key={item.name}
          // to={item.to}
          onSelect={() => item.to === location.pathname}
          sx={{
            "&:hover": {
              backgroundColor: "#1DB954",
              "& .MuiListItemText-primary": {
                color: "#000",
              },
            },
          }}
          // selected={item.to === location.pathname}
        >
          <ListItemText
            primary={item.name}
            slotProps={{
              secondary: {
                style: {
                  color: "#fff",
                },
              },
            }}
            // primaryTypographyProps={{ style: { color: "#fff" } }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export const NavLinks: FC<NavbarLinkProps> = ({ isMediumScreenDown }) => {
  const location = useLocation();

  return (
    <List sx={{ display: isMediumScreenDown ? "none" : "flex" }}>
      {navigation.map((item) => (
        <ListItem
          // component={Link}
          dir={item.to}
          key={item.name}
          // to={item.to}
          onSelect={() => item.to === location.pathname}
          sx={{
            paddingX: 3,
            "&.Mui-selected": {
              backgroundColor: "transparent",
            },
          }}
          // selected={item.to === location.pathname}
        >
          <NavbarLink
            active={item.to === location.pathname}
            primary={item.name}
          />
        </ListItem>
      ))}
    </List>
  );
};
