import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";

interface ItemListProps {
  id: string;
  primary: string;
  secondary?: string;
  image?: string | null;
  onClick?: () => void;
}

const ItemList = ({
  id,
  primary,
  secondary,
  image,
  onClick,
}: ItemListProps) => {
  return (
    <ListItem
      key={id}
      sx={{
        bgcolor: "#424242",
        borderRadius: "10px",
        boxShadow: 3,
        marginBottom: 1,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 6,
          cursor: "pointer",
          transform: "scale(1.05)",
          "& .MuiListItemButton-root": {
            display: "flex",
          },
        },
      }}
    >
      <ListItemAvatar>
        <Avatar alt={primary} src={image || undefined} />
      </ListItemAvatar>
      <ListItemText primary={primary} />
      {secondary && (
        <ListItemText
          primary={secondary}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        />
      )}
      {onClick && (
        <ListItemButton
          onClick={onClick}
          sx={{ display: "none", flexGrow: 0, borderRadius: "10px" }}
        >
          View
        </ListItemButton>
      )}
    </ListItem>
  );
};

export default ItemList;
