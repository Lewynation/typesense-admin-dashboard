import { removeCollection } from "../../../../../redux/slices/searchAPIKeyActions/serachAPIKeyActions";
import { useAppDispatch } from "../../../../../redux/store/store";
import { ReactComponent as PlusIcon } from "./svgs/x-lg.svg";

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
            <PlusIcon
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
