import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "@mui/material";
import ItemList from "./ItemList";
import { formatDuration } from "../utils/helper";

export interface GenericListItem {
  durationMs?: number | undefined;
  id: string;
  image?: string;
  name: string;
}

interface GenericListProps<T extends GenericListItem> {
  items: T[] | undefined;
  itemType: "artist" | "track";
}

const GenericList: FC<GenericListProps<GenericListItem>> = ({
  items,
  itemType,
}) => {
  const navigate = useNavigate();

  return (
    <List sx={{ maxWidth: 520, width: "100%", paddingTop: "15px" }}>
      {items.map((item) => (
        <ItemList
          key={item.id}
          id={item.id}
          primary={item.name}
          secondary={
            itemType === "track" ? formatDuration(item.durationMs) : undefined
          }
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
