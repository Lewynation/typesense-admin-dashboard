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
  return (
    <div className="z-0">{loading ? <CircularSpinner /> : <>{children}</>}</div>
  );
};

export default AuthenticationCheckWrapper;
