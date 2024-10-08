import Link from "next/link";
import React from "react";
import { DropdownMenuItem, Icons } from "@/components/ui";
import { GetResourceByServerIdProps } from "@/types";

const SearchKeyDropDownButton: React.FC<GetResourceByServerIdProps> = ({
  serverId,
}) => {
  return (
    <Link href={`/server/${serverId}/api-keys/search-api-key`}>
      <DropdownMenuItem className="cursor-pointer">
        <div className="flex items-center gap-3 justify-between w-full">
          <div>
            <p className="font-oswald text-sm">Generate Search API Key</p>
            <p className="font-oswald text-xs">Limits sope to only search</p>
          </div>
          <Icons.Search size={20} />
        </div>
      </DropdownMenuItem>
    </Link>
  );
};

export default SearchKeyDropDownButton;
