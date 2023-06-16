import { LoginView } from "@/components/pages/login";
import { usePathname } from "next/navigation";
import React from "react";
import TopNavigation from "./top_navigation";
import SideNavigation from "./side_navigation";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <main className="min-h-screen overflow-x-hidden overflow-y-auto">
      <TopNavigation />
      <SideNavigation />
      <div className="p-6 mt-24 ml-72">{children}</div>
    </main>
  );
};

export default LayoutWrapper;
