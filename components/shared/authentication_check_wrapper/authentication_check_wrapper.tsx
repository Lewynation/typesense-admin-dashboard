import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface AuthenticationCheckWrapperProps {
  children: React.ReactNode;
}

const AuthenticationCheckWrapper: React.FC<
  AuthenticationCheckWrapperProps
> = async ({ children }) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="z-0">
      <>{children}</>
    </div>
  );
};

export default AuthenticationCheckWrapper;
