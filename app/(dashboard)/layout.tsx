import React from "react";
import { AuthenticationCheckWrapper } from "@/components/shared";
import { Header } from "@/components/shared";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthenticationCheckWrapper>
      <Header />
      {children}
    </AuthenticationCheckWrapper>
  );
};

export default Layout;
