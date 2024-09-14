"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideNavigationElements } from "@/constants/side_navigation_elements";

const SideNavigation = () => {
  return (
    <aside className="fixed left-0 h-full p-6 mt-24 hidden md:block border-r-[1px] border-gray-300 w-72 bg-white">
      {sideNavigationElements.map(({ elements, title }, index) => {
        return (
          <AsideNavigationElement
            key={index}
            title={title}
            elements={elements}
          />
        );
      })}
    </aside>
  );
};

interface AsideNavigationElementProps {
  title: string;
  elements: {
    name: string;
    Icon: React.FC;
    path: string;
  }[];
}

const AsideNavigationElement: React.FC<AsideNavigationElementProps> = ({
  title,
  elements,
}) => {
  const pathName = usePathname();

  const checkUrlMatch = (url: string, path: string): boolean => {
    if (path === "/" && url === "/") {
      return true;
    }
    if (url !== "/") {
      if (path.includes(url)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  return (
    <div className="">
      <h1 className="text-xl font-semibold font-oswald">{title}</h1>
      <div className="my-3">
        {elements.map(({ name, Icon, path }, index) => {
          return (
            <Link href={path} key={index}>
              <div
                className={`flex items-center my-1 gap-3 py-1 px-3 rounded-lg hover:bg-black hover:text-white ${
                  checkUrlMatch(path, pathName)
                    ? "bg-black text-white"
                    : "bg-transparent"
                }`}
              >
                <Icon />
                <p className="text-base font-oswald">{name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavigation;
