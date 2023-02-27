import React from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

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

  return (
    <div className="w-full h-full p-5">
      <h1 className="text-xl font-bold font-lato mb-3">
        <Link to="/collections">
          <span className="text-gray-400">{" Collection "}</span>
        </Link>
        <span className="text-gray-400">{"  >  "}</span>
        <span>{collectionName}</span>
      </h1>
      <div className="flex gap-4">
        {indexNav.map((nav) => {
          return (
            <div key={nav.queryString} className="mb-3 font-bold font-lato">
              <NavLink
                to={`/collections/${collectionName}/${nav.queryString}`}
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
