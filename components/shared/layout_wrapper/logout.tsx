"use client";

import { LOCAL_STORAGE_KEY } from "@/constants";
import { useDependencies } from "@/contexts/dependency_provider";
import { useRouter } from "next/navigation";
import React from "react";
import { BarLoaderFullScreenWidth, Icons } from "@/components/ui";

const Logout = () => {
  const router = useRouter();
  const dependencies = useDependencies();
  const host = dependencies?.typesense?.AuthData.host;
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="flex items-center justify-center gap-5">
      <BarLoaderFullScreenWidth loading={loading} />
      <div className="flex flex-col items-end justify-center">
        <p className="font-light font-oswald">{host}</p>
        <p className="font-light text-green-500 font-oswald">connected</p>
      </div>
      <div>
        <Icons.LogOut
          size={24}
          className="cursor-pointer"
          onClick={async () => {
            setLoading(true);
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            dependencies?.setTypesense(null);
            router.replace("/login");
            setLoading(false);
          }}
        />
      </div>
    </div>
  );
};

export default Logout;
