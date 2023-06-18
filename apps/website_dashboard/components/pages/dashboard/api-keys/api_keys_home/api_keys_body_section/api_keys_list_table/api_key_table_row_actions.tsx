import { Row } from "@tanstack/react-table";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  ShadCnButton,
} from "ui";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import TableActionNavigation from "@/components/shared/table_action_navigation/table_action_navigation";
import { KeySchema } from "typesense/lib/Typesense/Key";

interface APIKeyTableRowActionsProps {
  row: Row<KeySchema>;
}

const APIKeyTableRowActions: React.FC<APIKeyTableRowActionsProps> = ({
  row,
}) => {
  const collections = row.original;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ShadCnButton.Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Icons.MoreHorizontal className="h-4 w-4" />
        </ShadCnButton.Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="font-oswald">Actions</p>
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(collections.description || "")
          }
        >
          <p className="font-oswald"> Copy API Key Description</p>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            //set a search parameter with the id of the apikey and get the apikey details
            //then open the side sheet
            const openviewApiKeySideSheetButton = document.querySelector(
              "#view_api_key_side_panel"
            ) as HTMLElement;
            if (openviewApiKeySideSheetButton) {
              openviewApiKeySideSheetButton.click();
            }
          }}
        >
          <div className="flex items-center gap-3 justify-between w-full">
            <p className="font-oswald">View api Key</p>
            <Icons.View size={20} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-3 justify-between w-full">
            <p className="font-oswald text-red-500">Delete</p>
            <Icons.Trash size={20} className="text-red-500" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default APIKeyTableRowActions;
