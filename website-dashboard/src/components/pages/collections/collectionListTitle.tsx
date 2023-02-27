import clsx from "clsx";

function CollectionListTitle() {
  const className = clsx("font-lato text-xs text-gray-400");
  const titles: string[] = [
    "Collection Name",
    "Documents No",
    "Schema Fields",
    "Created At",
  ];

  return (
    <div className="grid grid-cols-4 gap-4 px-3 border-b-2 pb-1">
      {titles.map((title) => {
        if (title === "Collection Name") {
          return (
            <div key={title} className="">
              <p className={className}>{title}</p>
            </div>
          );
        }

        return (
          <div key={title} className="flex items-center justify-center">
            <p className={className}>{title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CollectionListTitle;
