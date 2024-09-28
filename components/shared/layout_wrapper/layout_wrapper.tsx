import React from "react";
import SideNavigation from "./side_navigation";

interface LayoutWrapperProps {
  children: React.ReactNode;
  serverId: string;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  serverId,
}) => {
  return (
    <>
      <SideNavigation serverId={serverId} />
      <div className="flex w-full flex-col overflow-x-hidden overflow-y-auto pl-14">
        {children}
      </div>
    </>
  );
};

export default LayoutWrapper;
