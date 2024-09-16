import {
  FileStack,
  Key,
  Library,
  LineChart,
  ShieldBan,
  SlidersHorizontal,
} from "lucide-react";

export const sideNavigationElements = [
  {
    name: "Collections",
    Icon: Library,
    path: "collections",
  },
  {
    name: "API Keys",
    Icon: Key,
    path: "api-keys",
  },
  {
    name: "Aliases",
    Icon: FileStack,
    path: "aliases",
  },
  {
    name: "Analytics Rules",
    Icon: LineChart,
    path: "analytics-rules",
  },
  {
    name: "Search Presets",
    Icon: SlidersHorizontal,
    path: "search-presets",
  },
  {
    name: "Stop Words",
    Icon: ShieldBan,
    path: "stop-words",
  },
];
