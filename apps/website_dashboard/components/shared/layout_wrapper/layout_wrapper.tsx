import React from "react";
import TopNavigation from "./top_navigation";
import SideNavigation from "./side_navigation";
import AuthenticationCheckWrapper from "../authentication_check_wrapper/authentication_check_wrapper";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <AuthenticationCheckWrapper>
      <main className="z-50 min-h-screen overflow-x-hidden overflow-y-auto">
        <TopNavigation />
        <SideNavigation />
        <div className="p-6 mt-24 ml-0 md:ml-72">{children}</div>
      </main>
    </AuthenticationCheckWrapper>
  );
};

export default LayoutWrapper;
