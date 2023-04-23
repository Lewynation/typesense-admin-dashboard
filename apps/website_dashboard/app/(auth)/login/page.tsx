"use client";

import React, { useContext, useEffect } from "react";
import { LoginView } from "@/loginComponents/index";
import { useDependencies } from "@/contexts/dependency_provider";

const Login = () => {
  return (
    <div>
      <LoginView />
    </div>
  );
};

export default Login;
