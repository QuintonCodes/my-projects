import { List } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDuration } from "../utils/helper";
import ItemList from "./ItemList";

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
  const { page } = useParams();

  return (
    <List sx={{ maxWidth: 520, width: "100%", paddingTop: "15px" }}>
      {items?.map((item) => (
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
              : () => navigate(`/artists/${page}/${item.id}`)
          }
        />
      ))}
    </List>
  );
};

export default GenericList;
