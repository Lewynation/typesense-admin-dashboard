"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ShieldAlert } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const AdminKeyDropDownButton = ({
  setShowGenerateAdminApiKeyModal,
}: {
  setShowGenerateAdminApiKeyModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => {
          setShowGenerateAdminApiKeyModal(true);
        }}
      >
        <div className="flex items-center gap-3 justify-between w-full">
          <div>
            <p className="font-mono text-sm">Generate admin API Keys</p>
            <p className="font-mono text-xs text-muted-foreground">
              Does all operations
            </p>
          </div>
          <ShieldAlert size={20} />
        </div>
      </DropdownMenuItem>
    </>
  );
};

export default AdminKeyDropDownButton;
