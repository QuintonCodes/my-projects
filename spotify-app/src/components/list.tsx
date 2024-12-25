"use client";

import { useRouter } from "next/router";
import React, { FC } from "react";
import ItemList from "./itemlist";

interface ItemList {
  durationMs?: number | undefined;
  id: string;
  image?: string;
  name: string;
}

interface ListProps<T extends ItemList> {
  items: T[] | undefined;
  itemType: "artist" | "track";
}

const List: FC<ListProps<ItemList>> = ({ items, itemType }) => {
  const router = useRouter();
  const currentPage = router.query.page || 1;

  const formatDuration = (durationMs: number | undefined) => {
    if (!durationMs) return "";
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {items?.map((item) => (
        <ItemList
          key={item.id}
          id={item.id}
          image={item.image}
          onClick={
            itemType === "track"
              ? undefined
              : () =>
                  router.push(
                    `/artists/followed?page=${currentPage}/${item.id}`
                  )
          }
          primary={item.name}
          secondary={
            itemType === "track" ? formatDuration(item.durationMs) : undefined
          }
        />
      ))}
    </div>
  );
};

export default List;
