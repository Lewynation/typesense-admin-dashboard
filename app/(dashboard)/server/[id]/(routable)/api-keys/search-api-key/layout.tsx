import { SearchCheckBoxesProvider } from "@/contexts/react_context/check_box_context";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SearchCheckBoxesProvider>{children}</SearchCheckBoxesProvider>
    </>
  );
};

export default Layout;
