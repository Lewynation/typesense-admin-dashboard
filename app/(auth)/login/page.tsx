import React from "react";
import { LoginAuthenticationCheck, LoginView } from "@/components/pages/login";

const Login = () => {
  return (
    <>
      <LoginView>
        <LoginAuthenticationCheck />
      </LoginView>
    </>
  );
};

export default Login;
