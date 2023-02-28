import React from "react";

function CurationsListTitle() {
  const titles = ["Query", "Match", "Includes", "Excludes", "Actions"];

  return (
    <div className="grid grid-cols-5 gap-4 px-3 border-b-2 pb-1">
      {titles.map((title) => {
        if (title === "Query") {
          return (
            <div key={title}>
              <p className="font-lato text-xs text-gray-400">{title}</p>
            </div>
          );
        }
        return (
          <div key={title} className="flex items-center justify-center">
            <p className="font-lato text-xs text-gray-400">{title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CurationsListTitle;