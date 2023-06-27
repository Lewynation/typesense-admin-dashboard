"use client";

import { Row } from "@tanstack/react-table";
import React from "react";

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
import { KeySchema } from "typesense/lib/Typesense/Key";
import { useDependencies } from "@/contexts/dependency_provider";
import { useSWRConfig } from "swr";
import { useAppDispatch } from "@/redux/store/store";
import {
  setKeyId,
  setOpenSideMenu,
} from "@/redux/slices/view_api_key_details/view_api_key_details";

interface APIKeyTableRowActionsProps {
  row: Row<KeySchema>;
}

const APIKeyTableRowActions: React.FC<APIKeyTableRowActionsProps> = ({
  row,
}) => {
  const APIkey = row.original;
  const dependencies = useDependencies();
  const { mutate } = useSWRConfig();
  const dispatch = useAppDispatch();

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
            onClick={() =>
              navigator.clipboard.writeText(APIkey.description || "")
            }
          >
            <p className="font-oswald"> Copy API Key Description</p>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              //set a search parameter with the id of the apikey and get the apikey details
              //then open the side sheet
              // const openviewApiKeySideSheetButton = document.querySelector(
              //   "#view_api_key_side_panel"
              // ) as HTMLElement;
              // if (openviewApiKeySideSheetButton) {
              //   openviewApiKeySideSheetButton.click();
              // }
              dispatch(setKeyId(APIkey.id));
              dispatch(setOpenSideMenu(true));
            }}
          >
            <div className="flex items-center justify-between w-full gap-3">
              <p className="font-oswald">View api Key</p>
              <Icons.View size={20} />
            </div>
          </DropdownMenuItem>
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
            This action cannot be undone. This will permanently delete this API
            Key.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-oswald">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="font-oswald"
            onClick={async () => {
              await dependencies?.typesense?.deleteAPIKey(APIkey.id);
              mutate("/api-keys");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default APIKeyTableRowActions;
