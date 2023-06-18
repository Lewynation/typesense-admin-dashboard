"use client";

import { useAppDispatch } from "@/redux/store/store";
import { removeCollection } from "@/redux/slices/search_api_key_acctions/search_api_key_actions";
import { Icons } from "ui";

function CollectionList({ items }: { items: string[] }) {
  const dispatch = useAppDispatch();
  const popCollection = (item: string) => {
    dispatch(removeCollection(item));
  };

  return (
    <>
      {items.map((item) => {
        return (
          <div
            key={item}
            className="flex items-center gap-2 font-lato font-bold text-base px-4 py-1 my-2 bg-gray-300 rounded-md"
          >
            <p className="">{item}</p>
            <Icons.Plus
              className="w-3 h-3 cursor-pointer"
              onClick={() => popCollection(item)}
            />
          </div>
        );
      })}
    </>
  );
}

export default CollectionList;
