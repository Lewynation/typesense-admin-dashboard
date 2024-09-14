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
  Button,
} from "@/components/ui";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import TableActionNavigation from "@/components/shared/table_action_navigation/table_action_navigation";

interface CollectionTableRowActionsProps {
  row: Row<CollectionSchema>;
}

const CollectionTableRowActions: React.FC<CollectionTableRowActionsProps> = ({
  row,
}) => {
  const collections = row.original;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Icons.MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="font-oswald">Actions</p>
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(collections.name)}
        >
          <p className="font-oswald"> Copy Collection Name</p>
        </DropdownMenuItem>
        <TableActionNavigation
          baseUrl="/collections"
          dynamicUrlSection={row.original.name}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center gap-3 justify-between w-full">
            <p className="font-oswald">Import</p>
            <Icons.Upload size={20} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-3 justify-between w-full">
            <p className="font-oswald">Export</p>
            <Icons.Download size={20} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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

export default CollectionTableRowActions;
