import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  Button,
} from "@/components/ui";
import AdminKeyDropDownButton from "../../admin_api_keys/admin_key_dropdown_button";
import SearchKeyDropDownButton from "../../search_only_api_keys/search_key_drop_down_button";
import CreateAdminAPIKeySideSheet from "../../admin_api_keys/admin_key_side_sheet";
import { ViewApiKeyDetailsSideSheet } from "../view_api_key_details";

const ApiKeyHeaderSection = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-oswald text-xl font-bold">API Keys</h2>
        <CreateAdminAPIKeySideSheet />
        <ViewApiKeyDetailsSideSheet />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <div className="flex gap-2 items-center">
                <Icons.PlusCircle />
                <p className="font-oswald text-base">Create API Key</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <p className="font-oswald">Actions</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <AdminKeyDropDownButton />
            <SearchKeyDropDownButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ApiKeyHeaderSection;
