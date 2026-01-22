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
import { truncateCollection } from "@/actions";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const ShowCollectionTruncationConfirmationDialog = ({
  setShowDialog,
  showDialog,
  collectionId,
}: {
  collectionId: string | undefined;
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const params = useParams<{ id: string; name: string }>();

  return (
    <AlertDialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-mono">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-mono">
            This action cannot be undone. This will remove all documents from
            this collection while keeping the collection and schema intact.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-mono">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="font-mono"
            onClick={async () => {
              if (collectionId)
                toast.promise(truncateCollection(params.id, collectionId), {
                  loading: `Truncating collection`,
                  error: (e) =>
                    e instanceof Error
                      ? e.message
                      : `Error truncating collection`,
                  success: (val) => {
                    if (!val.success) {
                      return val.error;
                    }
                    return `Succesfully truncated collection`;
                  },
                  className: "font-mono",
                });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const useShowCollectionTruncationConfirmationDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [collectionId, setCollectionId] = useState<string | undefined>();

  const CollectionTruncationConfirmationDialog = () => (
    <ShowCollectionTruncationConfirmationDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      collectionId={collectionId}
    />
  );

  const setShowCollectionTruncationConfirmationDialog = (
    show: boolean,
    collectionId: string,
  ) => {
    setShowDialog(show);
    setCollectionId(collectionId);
  };

  return {
    setShowCollectionTruncationConfirmationDialog,
    CollectionTruncationConfirmationDialog,
  };
};
