import { LayoutWrapper } from "@/components/shared";
import React from "react";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => <LayoutWrapper serverId={params.id}>{children}</LayoutWrapper>;

export default Layout;
