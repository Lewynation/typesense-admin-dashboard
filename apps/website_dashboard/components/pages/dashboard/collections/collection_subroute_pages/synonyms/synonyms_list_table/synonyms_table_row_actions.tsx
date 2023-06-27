import { Row } from "@tanstack/react-table";
import React from "react";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import { SynonymSchema } from "typesense/lib/Typesense/Synonym";
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

interface SynonymsTableRowActionsProps {
  row: Row<SynonymSchema>;
}

const SynonymsTableRowActions: React.FC<SynonymsTableRowActionsProps> = ({
  row,
}) => {
  const synonyms = row.original;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ShadCnButton.Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <Icons.MoreHorizontal className="w-4 h-4" />
        </ShadCnButton.Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="font-oswald">Actions</p>
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(synonyms.id)}
        >
          <p className="font-oswald"> Copy synonym Id</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center justify-between w-full gap-3">
            <p className="font-oswald">View synonym</p>
            <Icons.View size={20} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center justify-between w-full gap-3">
            <p className="font-oswald">Edit</p>
            <Icons.Edit size={20} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center justify-between w-full gap-3">
            <p className="text-red-500 font-oswald">Delete</p>
            <Icons.Trash size={20} className="text-red-500" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SynonymsTableRowActions;
