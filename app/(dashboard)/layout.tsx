import { auth } from "@/auth/server";
import DialogProvider from "@/components/dialogs/dialog_provider";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <>
      <DialogProvider>{children}</DialogProvider>
    </>
  );
};

export default Layout;
