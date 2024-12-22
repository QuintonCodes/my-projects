import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface ItemListProps {
  id: string;
  image?: string | null;
  onClick?: () => void;
  primary: string;
  secondary?: string;
}

const ItemList = ({
  id,
  image,
  onClick,
  primary,
  secondary,
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
        <Avatar
          alt={primary}
          src={image || undefined}
          variant="rounded"
          sx={{ width: 45, height: 45, borderRadius: "8px" }}
        />
      </ListItemAvatar>
      <ListItemText primary={primary} sx={{ paddingLeft: "5px" }} />
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
