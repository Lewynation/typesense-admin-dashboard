"use client";

import * as React from "react";
import {
  BookType,
  FileStack,
  FlaskConical,
  Key,
  Languages,
  Library,
  LineChart,
  ShieldBan,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { NavProjects } from "@/components/layout/nav-projects";
import { TeamSwitcher } from "@/components/layout/team_switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavThemeToggle } from "./nav_bottom";

const data = {
  projects: [
    {
      name: "Collections",
      url: "collections",
      icon: Library,
    },
    {
      name: "API Keys",
      url: "api-keys",
      icon: Key,
    },
    {
      name: "Aliases",
      url: "aliases",
      icon: FileStack,
    },
    {
      name: "Analytics Rules",
      url: "analytics-rules",
      icon: LineChart,
    },
    {
      name: "Search Presets",
      url: "search-presets",
      icon: SlidersHorizontal,
    },
    {
      name: "Stop Words",
      url: "stop-words",
      icon: ShieldBan,
    },
    {
      name: "Stemming",
      url: "stemming",
      icon: BookType,
    },
    {
      name: "Conversation Models",
      url: "conversation-models",
      icon: Sparkles,
    },
    {
      name: "NL Search Models",
      url: "nl-search-models",
      icon: Languages,
    },
    // {
    //   name: "Playground",
    //   url: "playground",
    //   icon: FlaskConical,
    // },
  ],
};

export function AppSidebar({
  serverId,
  ...props
}: React.ComponentProps<typeof Sidebar> & { serverId: string }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} serverId={serverId} />
      </SidebarContent>
      <SidebarFooter>
        <NavThemeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
