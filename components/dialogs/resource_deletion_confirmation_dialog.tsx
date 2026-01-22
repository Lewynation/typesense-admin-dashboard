"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ServerActionResult } from "@/actions/create_server_action";

const ShowResourceDeletionConfirmationDialog = ({
  setShowDialog,
  showDialog,
  deleteHandler,
  resource,
}: {
  deleteHandler: () => Promise<ServerActionResult<unknown>>;
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  resource: string;
}) => {
  return (
    <AlertDialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-mono">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-mono">
            This action cannot be undone. This will permanently delete this{" "}
            {resource}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-mono">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="font-mono"
            onClick={() =>
              toast.promise(deleteHandler(), {
                loading: `Deleting ${resource}`,
                error: (e) =>
                  e instanceof Error ? e.message : `Error deleting ${resource}`,
                success: (val) => {
                  if (!val.success) {
                    return val.error;
                  }
                  return `Succesfully deleted ${resource}`;
                },
                className: "font-mono",
              })
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const useShowResourceDeletionConfirmationDialog = (
  deleteHandler: () => Promise<ServerActionResult<unknown>>,
  resource: string,
) => {
  const [showDialog, setShowResourceDeletionConfirmationDialog] =
    useState(false);

  const ResourceDeletionConfirmationDialog = () => (
    <ShowResourceDeletionConfirmationDialog
      showDialog={showDialog}
      setShowDialog={setShowResourceDeletionConfirmationDialog}
      deleteHandler={deleteHandler}
      resource={resource}
    />
  );

  return {
    setShowResourceDeletionConfirmationDialog,
    ResourceDeletionConfirmationDialog,
  };
};
