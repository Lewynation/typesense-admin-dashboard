import { LayoutWrapper } from "@/components/shared";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <LayoutWrapper>{children}</LayoutWrapper>
);

export default Layout;
