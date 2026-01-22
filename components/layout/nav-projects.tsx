"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavProjects({
  projects,
  serverId,
}: {
  serverId: string;
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
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
    <SidebarGroup>
      <SidebarGroupLabel className="font-mono">Main Actions</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name} className="my-0.5">
            <SidebarMenuButton
              asChild
              isActive={checkUrlMatch(item.url, pathName)}
            >
              <Link href={`/server/${serverId}/${item.url}`}>
                <item.icon />
                <span className="font-mono">{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
