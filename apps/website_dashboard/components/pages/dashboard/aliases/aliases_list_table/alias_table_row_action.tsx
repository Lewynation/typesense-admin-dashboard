"use client";

import { useDependencies } from "@/contexts/dependency_provider";
import { Row } from "@tanstack/react-table";
import React from "react";
import { CollectionAliasSchema } from "typesense/lib/Typesense/Aliases";
import { useSWRConfig } from "swr";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  ShadCnButton,
} from "ui";

interface AliasTableRowActionsProps {
  row: Row<CollectionAliasSchema>;
}

const AliasTableRowActions: React.FC<AliasTableRowActionsProps> = ({ row }) => {
  const aliases = row.original;
  const dependencies = useDependencies();
  const { mutate } = useSWRConfig();

  return (
    <AlertDialog>
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
            onClick={() => navigator.clipboard.writeText(aliases.name)}
          >
            <p className="font-oswald"> Copy Alias Name</p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex items-center justify-between w-full gap-3">
              <p className="font-oswald">Edit</p>
              <Icons.Edit size={20} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <div className="flex items-center justify-between w-full gap-3">
                <p className="text-red-500 font-oswald">Delete</p>
                <Icons.Trash size={20} className="text-red-500" />
              </div>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-oswald">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-oswald">
            This action cannot be undone. This will permanently delete this
            alias.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-oswald">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="font-oswald"
            onClick={async () => {
              await dependencies?.typesense?.deleteAlias(aliases.name);
              mutate("/aliases");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AliasTableRowActions;
