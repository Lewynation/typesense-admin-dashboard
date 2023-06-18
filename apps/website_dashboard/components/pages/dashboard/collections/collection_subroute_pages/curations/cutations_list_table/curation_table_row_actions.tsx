import { Row } from "@tanstack/react-table";
import React from "react";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
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

interface CurationsTableRowActionsProps {
  row: Row<OverrideSchema>;
}

const CurationTableRowActions: React.FC<CurationsTableRowActionsProps> = ({
  row,
}) => {
  const curations = row.original;
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
          onClick={() => navigator.clipboard.writeText(curations.id)}
        >
          <p className="font-oswald"> Copy curation Id</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center gap-3 justify-between w-full">
            <p className="font-oswald">View Curation</p>
            <Icons.View size={20} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-3 justify-between w-full">
            <p className="font-oswald">Edit</p>
            <Icons.Edit size={20} />
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

export default CurationTableRowActions;
