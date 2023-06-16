"use client";

import { useAuthenticated } from "@/hooks";
import React from "react";
import { CircularSpinner } from "ui";

interface AuthenticationCheckWrapperProps {
  children: React.ReactNode;
}

const AuthenticationCheckWrapper: React.FC<AuthenticationCheckWrapperProps> = ({
  children,
}) => {
  const { authenticated, loading } = useAuthenticated();
  return <>{loading ? <CircularSpinner /> : <>{children}</>}</>;
};

export default AuthenticationCheckWrapper;
