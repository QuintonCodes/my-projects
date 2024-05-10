import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "@mui/material";
import ItemList from "./ItemList";

interface GenericListItem {
  id: string;
  name: string;
  image?: string;
  durationMs?: number;
}

interface GenericListProps<T extends GenericListItem> {
  items: T[];
  itemType: "artist" | "track";
}

const GenericList: FC<GenericListProps<GenericListItem>> = ({
  items,
  itemType,
}) => {
  const navigate = useNavigate();
  return (
    <List sx={{ maxWidth: 520, width: "100%" }}>
      {items.map((item) => (
        <ItemList
          key={item.id}
          id={item.id}
          primary={item.name}
          secondary={itemType === "track" ? `${item.durationMs}` : undefined}
          image={item.image}
          onClick={
            itemType === "track"
              ? undefined
              : () => navigate(`/artists/${item.id}`)
          }
        />
      ))}
    </List>
  );
};

export default GenericList;
