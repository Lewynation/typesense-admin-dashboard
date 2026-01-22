import Link from "next/link";
import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";

type GetResourceByServerIdProps = {
  serverId: string;
};

const SearchKeyDropDownButton: React.FC<GetResourceByServerIdProps> = ({
  serverId,
}) => {
  return (
    <Link href={`/server/${serverId}/api-keys/search-api-key`}>
      <DropdownMenuItem className="cursor-pointer">
        <div className="flex items-center gap-3 justify-between w-full">
          <div>
            <p className="font-mono text-sm">Generate Search API Key</p>
            <p className="font-mono text-xs text-muted-foreground">
              Limits scope to only search
            </p>
          </div>
          <Search size={20} />
        </div>
      </DropdownMenuItem>
    </Link>
  );
};

export default SearchKeyDropDownButton;
