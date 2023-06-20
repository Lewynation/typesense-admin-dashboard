import React from "react";
import Image from "next/image";
import logo from "@/images/logo.png";

const LoginLogoSection = () => {
  return (
    <div className="relative flex items-center justify-center mx-10">
      <div className="flex flex-col items-center gap-0">
        <Image src={logo} alt="logo" className="mb-2" />
        <h1 className="text-2xl leading-tight uppercase font-oswald">
          t y p e s e n s e
        </h1>
        <h2 className="text-base leading-tight uppercase font-oswald">
          Admin Dashboard
        </h2>
        <p className="mt-10 text-sm font-oswald">v1.0.0</p>
      </div>
    </div>
  );
};

export default LoginLogoSection;
