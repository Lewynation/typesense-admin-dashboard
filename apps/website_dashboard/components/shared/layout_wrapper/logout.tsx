"use client";

import { LOCAL_STORAGE_KEY } from "@/constants";
import { useDependencies } from "@/contexts/dependency_provider";
import { useRouter } from "next/navigation";
import React from "react";
import { Icons } from "ui";

const Logout = () => {
  const router = useRouter();
  const dependencies = useDependencies();
  const host = dependencies?.typesense?.AuthData.host;

  return (
    <div className="flex items-center justify-center gap-5">
      <div className="flex flex-col items-end justify-center">
        <p className="font-light font-oswald">{host}</p>
        <p className="font-light text-green-500 font-oswald">connected</p>
      </div>
      <div>
        <Icons.LogOut
          size={24}
          className="cursor-pointer"
          onClick={() => {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            router.replace("/login");
          }}
        />
      </div>
    </div>
  );
};

export default Logout;
