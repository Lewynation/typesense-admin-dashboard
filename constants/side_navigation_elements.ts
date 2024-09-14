import {
  AliasIcon,
  CollectionIcon,
  KeyIcon,
  ServerStatsIcon,
} from "@/assets/svgs";

export const sideNavigationElements = [
  {
    title: "Main",
    elements: [
      {
        name: "Server stats",
        Icon: ServerStatsIcon,
        path: "/",
      },
      {
        name: "Collections",
        Icon: CollectionIcon,
        path: "/collections",
      },
      {
        name: "Api Keys",
        Icon: KeyIcon,
        path: "/api-keys",
      },
      {
        name: "Aliases",
        Icon: AliasIcon,
        path: "/aliases",
      },
    ],
  },
];
