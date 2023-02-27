import { NavLink } from "react-router-dom";

interface Props {
  linkName: string;
  Icon: React.FC;
  link: string;
}

function NavigationLink({ linkName, Icon, link }: Props) {
  return (
    <NavLink
      to={link}
      className={(navData) =>
        navData.isActive
          ? "flex items-center px-2 p-1 my-2 bg-[#f1f0fe] cursor-pointer rounded-md"
          : "flex items-center px-2 p-1 my-2 hover:bg-[#f1f0fe] cursor-pointer rounded-md"
      }
    >
      <div className="flex items-center ">
        <Icon />
        <p className="pl-3 font-lato text-sm">{linkName}</p>
      </div>
    </NavLink>
  );
}

export default NavigationLink;
