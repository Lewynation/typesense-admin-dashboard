import React from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import Button from "../../components/shared/button/button";
import { ReactComponent as DeleteIcon } from "./svgs/trash.svg";
import BASEPATH from "../../constants/baseURL";

interface IndexNav {
  queryString: string;
  navigationName: string;
}

function Index() {
  const { collectionName } = useParams();
  const indexNav: IndexNav[] = [
    { navigationName: "Query", queryString: "query" },
    { navigationName: "Schema", queryString: "schema" },
    { navigationName: "Curations", queryString: "curations" },
    { navigationName: "Add doc", queryString: "add-doc" },
    { navigationName: "Synonyms", queryString: "synonyms" },
  ];

  const deleteCollection = () => {
    console.log("delete collection");
  };

  return (
    <div className="w-full h-full p-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold font-lato mb-3">
          <Link to={`${BASEPATH}/collections`}>
            <span className="text-gray-400 dark:text-gray-300">
              {" Collection "}
            </span>
          </Link>
          <span className="text-gray-400">{"  >  "}</span>
          <span className="dark:text-gray-400">{collectionName}</span>
        </h1>
        <Button
          onClick={deleteCollection}
          text="Drop Collection"
          Icon={DeleteIcon}
        />
      </div>
      <div className="flex gap-4">
        {indexNav.map((nav) => {
          return (
            <div key={nav.queryString} className="mb-3 font-bold font-lato">
              <NavLink
                to={`${BASEPATH}/collections/${collectionName}/${nav.queryString}`}
                className={(navData) =>
                  navData.isActive
                    ? "text-[#4c3ded] underline underline-offset-8"
                    : "text-gray-400"
                }
              >
                {nav.navigationName}
              </NavLink>
            </div>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}

export default Index;
