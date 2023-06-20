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
    <div className="z-0">
      {!authenticated ? (
        <div className="flex items-center justify-center h-screen">
          {" "}
          <CircularSpinner />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default AuthenticationCheckWrapper;
