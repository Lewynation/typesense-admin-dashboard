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
  Button,
} from "@/components/ui";
import { KeySchema } from "typesense/lib/Typesense/Key";
import { useAppDispatch } from "@/redux/store/store";
import {
  setKeyId,
  setOpenSideMenu,
} from "@/redux/slices/view_api_key_details/view_api_key_details";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui";
import { Eye, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { deleteAPIKey } from "@/actions";

interface APIKeyTableRowActionsProps {
  row: Row<KeySchema>;
}

const APIKeyTableRowActions: React.FC<APIKeyTableRowActionsProps> = ({
  row,
}) => {
  const APIkey = row.original;
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  return (
    <div className="flex items-center justify-start gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {
                dispatch(setKeyId(APIkey.id));
                dispatch(setOpenSideMenu(true));
              }}
            >
              <div>
                <Eye className="h-5 w-5" />
                <span className="sr-only">View</span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">View</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
                >
                  <div>
                    <Trash className="h-5 w-5" />
                    <span className="sr-only">Delete</span>
                  </div>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-oswald">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="font-oswald">
                    This action cannot be undone. This will permanently delete
                    this API Key.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="font-oswald">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="font-oswald"
                    onClick={async () => {
                      await deleteAPIKey(params.id, APIkey.id);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TooltipTrigger>
          <TooltipContent side="right">Delete</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default APIKeyTableRowActions;
