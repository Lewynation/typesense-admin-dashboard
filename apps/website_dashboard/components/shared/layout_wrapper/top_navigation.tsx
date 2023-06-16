import React from "react";

import logoImage from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import Logout from "./logout";

const TopNavigation = () => {
  return (
    <nav className="fixed left-0 flex items-center justify-between w-full h-24 px-10 border-b-[1px] border-gray-300 bg-white">
      <Logo />
      <Logout />
    </nav>
  );
};

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <Image src={logoImage} alt="Logo" className="w-12 h-12" />
        <h1 className="text-2xl font-semibold tracking-wider font-oswald">
          Typesense Dashboard
        </h1>
      </div>
    </Link>
  );
};

export default TopNavigation;
