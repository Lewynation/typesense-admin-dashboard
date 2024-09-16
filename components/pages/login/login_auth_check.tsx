import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoginAuthenticationCheckWrapper: React.FC = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return <></>;
};

export default LoginAuthenticationCheckWrapper;
