import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
} from "@/components/ui";
import AdminKeyDropDownButton from "../../admin_api_keys/admin_key_dropdown_button";
import SearchKeyDropDownButton from "../../search_only_api_keys/search_key_drop_down_button";
import CreateAdminAPIKeySideSheet from "../../admin_api_keys/admin_key_side_sheet";
import { ViewApiKeyDetailsSideSheet } from "../view_api_key_details";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetResourceByServerIdProps } from "@/types";

const ApiKeyHeaderSection: React.FC<GetResourceByServerIdProps> = ({
  serverId,
}) => {
  return (
    <>
      <CreateAdminAPIKeySideSheet serverId={serverId} />
      <ViewApiKeyDetailsSideSheet />
      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Your API Key</CardTitle>
          <CardDescription className="text-balance max-w-lg leading-relaxed">
            Typesense allows you to create API Keys with fine-grained access
            control.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Create API Key</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p className="font-oswald">Actions</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <AdminKeyDropDownButton />
              <SearchKeyDropDownButton serverId={serverId} />
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </>
  );
};

export default ApiKeyHeaderSection;
