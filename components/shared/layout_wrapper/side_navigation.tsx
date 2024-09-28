"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideNavigationElements } from "@/constants/side_navigation_elements";
import { LucideIcon, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui";
import { GetResourceByServerIdProps } from "@/types";

const SideNavigation: React.FC<GetResourceByServerIdProps> = ({ serverId }) => {
  return (
    <aside className="fixed bottom-0 top-16 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        {sideNavigationElements.map(({ name, Icon, path }, index) => {
          return (
            <AsideNavigationElement
              Icon={Icon}
              name={name}
              path={path}
              key={index}
              serverId={serverId}
            />
          );
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

interface AsideNavigationElementProps {
  name: string;
  Icon: LucideIcon;
  path: string;
  serverId: string;
}

const AsideNavigationElement: React.FC<AsideNavigationElementProps> = ({
  name,
  Icon,
  path,
  serverId,
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`/server/${serverId}/${path}`}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground ${
              checkUrlMatch(path, pathName)
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            } `}
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{name}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SideNavigation;
