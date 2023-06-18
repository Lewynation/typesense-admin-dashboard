import { Column } from "@tanstack/react-table";
import React from "react";
import { KeySchema } from "typesense/lib/Typesense/Key";

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
import { cn } from "utility-functions";

interface APIKeyTableColumnHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<KeySchema, unknown>;
  title: string;
}

const APIKeyTableColumnHeader: React.FC<APIKeyTableColumnHeaderProps> = ({
  className,
  title,
  column,
}) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ShadCnButton.Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span className="font-oswald">{title}</span>
            {column.getIsSorted() === "desc" ? (
              <Icons.SortDesc className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <Icons.SortAsc className="ml-2 h-4 w-4" />
            ) : (
              <Icons.ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </ShadCnButton.Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <Icons.SortAsc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <Icons.SortDesc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <Icons.EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default APIKeyTableColumnHeader;
