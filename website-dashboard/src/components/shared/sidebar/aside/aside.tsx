import NavigationLink from "../navigationLink/navigationLink";
import { ReactComponent as ServerStatsIcon } from "./svgs/serverStats.svg";
import { ReactComponent as CollectionIcon } from "./svgs/collection.svg";
import { ReactComponent as APIKeyIcon } from "./svgs/key.svg";
import { ReactComponent as AliasesIcon } from "./svgs/alias.svg";
import SectionHeader from "../sectionHeader/sectionHeader";
import { ReactComponent as MoonIcon } from "./svgs/moon.svg";

const links = [
  {
    name: "Server Stats",
    svg: ServerStatsIcon,
    link: "/",
  },
  {
    name: "Collections",
    svg: CollectionIcon,
    link: "/collections",
  },
  {
    name: "Api Keys",
    svg: APIKeyIcon,
    link: "/api-keys",
  },
  {
    name: "Aliases",
    svg: AliasesIcon,
    link: "/aliases",
  },
];

function Aside() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div>
        <SectionHeader title="MAIN" />
        {links.map((link) => {
          return (
            <NavigationLink
              key={link.name}
              linkName={link.name}
              Icon={link.svg}
              link={link.link}
            />
          );
        })}
        <SectionHeader title="OTHERS" />
      </div>
      <div className="">
        <MoonIcon className="border-2 w-10 h-10 rounded-full p-2 cursor-pointer mb-4" />
        <div className="font-lato flex items-center justify-center -ml-8 font-bold text-sm mb-2">
          Ocluse
        </div>
      </div>
    </div>
  );
}

export default Aside;
