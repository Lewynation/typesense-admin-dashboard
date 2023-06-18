"use client";

import React from "react";
import { DropdownMenuItem, Icons } from "ui";

const AdminKeyDropDownButton = () => {
  return (
    <>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => {
          const openCreateAdminApiKeySideSheetButton = document.querySelector(
            "#abmin_side_panel"
          ) as HTMLElement;
          if (openCreateAdminApiKeySideSheetButton) {
            openCreateAdminApiKeySideSheetButton.click();
          }
        }}
      >
        <div className="flex items-center gap-3 justify-between w-full">
          <div>
            <p className="font-oswald text-sm">Generate admin API Keys</p>
            <p className="font-oswald text-xs">Does all oerations</p>
          </div>
          <Icons.ShieldAlert size={20} />
        </div>
      </DropdownMenuItem>
    </>
  );
};

export default AdminKeyDropDownButton;
