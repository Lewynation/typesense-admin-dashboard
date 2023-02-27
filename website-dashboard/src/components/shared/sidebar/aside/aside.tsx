import NavigationLink from "../navigationLink/navigationLink";
import { ReactComponent as ServerStatsIcon } from "./svgs/serverStats.svg";
import { ReactComponent as CollectionIcon } from "./svgs/collection.svg";
import { ReactComponent as APIKeyIcon } from "./svgs/key.svg";
import { ReactComponent as AliasesIcon } from "./svgs/alias.svg";
import SectionHeader from "../sectionHeader/sectionHeader";

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
    <>
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
    </>
  );
}

export default Aside;
