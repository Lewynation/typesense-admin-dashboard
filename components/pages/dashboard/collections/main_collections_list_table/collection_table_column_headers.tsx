import { Column } from "@tanstack/react-table";
import React from "react";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  Button,
} from "@/components/ui";
import { cn } from "@/lib";

interface CollectionTableColumnHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<CollectionSchema, unknown>;
  title: string;
}

const CollectionTableColumnHeader: React.FC<
  CollectionTableColumnHeaderProps
> = ({ className, title, column }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
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
          </Button>
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

export default CollectionTableColumnHeader;
