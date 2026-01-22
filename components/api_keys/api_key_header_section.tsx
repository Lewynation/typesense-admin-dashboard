"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AdminKeyDropDownButton from "./admin_key_dropdown_button";
import SearchKeyDropDownButton from "./search_only_api_keys/search_key_drop_down_button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGenerateAdminApiKeyModal } from "@/components/dialogs/generate_admin_api_key_dialog";
import { DocumentationLinks } from "@/config/documentaion_links";
import ResourceReadmore from "../shared/resource_readmore";

type GetResourceByServerIdProps = {
  serverId: string;
};

const ApiKeyHeaderSection: React.FC<GetResourceByServerIdProps> = ({
  serverId,
}) => {
  const { AdminApiKeyDialog, setShowGenerateAdminApiKeyModal } =
    useGenerateAdminApiKeyModal();

  return (
    <>
      <AdminApiKeyDialog />
      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono">Your API Key</CardTitle>
          <CardDescription className="font-mono text-balance max-w-lg leading-relaxed">
            Typesense allows you to create API Keys with fine-grained access
            control.
            <ResourceReadmore link={DocumentationLinks.apiKeys} />
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="font-mono">Create API Key</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p className="font-mono">Actions</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <AdminKeyDropDownButton
                setShowGenerateAdminApiKeyModal={
                  setShowGenerateAdminApiKeyModal
                }
              />
              <SearchKeyDropDownButton serverId={serverId} />
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </>
  );
};

export default ApiKeyHeaderSection;
