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
import { deleteDocument } from "@/actions";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useInstantSearch } from "react-instantsearch";

const ShowCollectionDocumentDeletionConfirmationDialog = ({
  setShowDialog,
  showDialog,
  documentId,
}: {
  documentId: string | undefined;
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const params = useParams<{ id: string; name: string }>();
  const { refresh } = useInstantSearch();
  return (
    <AlertDialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-mono">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-mono">
            This action cannot be undone. This will delete this document
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-mono">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="font-mono"
            onClick={async () => {
              if (documentId)
                toast.promise(
                  deleteDocument(params.id, params.name, documentId),
                  {
                    loading: `Deleting document`,
                    error: (e) =>
                      e instanceof Error
                        ? e.message
                        : `Error deleting document`,
                    success: (result) => {
                      if (!result.success) {
                        return result.error;
                      }
                      refresh();
                      return `Succesfully deleted document`;
                    },
                    className: "font-mono",
                  },
                );
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const useShowCollectionDocumentDeletionConfirmationDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [documentId, setDocumentId] = useState<string | undefined>();

  const CollectionDocumentDeletionConfirmationDialog = () => (
    <ShowCollectionDocumentDeletionConfirmationDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      documentId={documentId}
    />
  );

  const setShowCollectionDocumentDeletionConfirmationDialog = (
    show: boolean,
    documentId: string,
  ) => {
    setShowDialog(show);
    setDocumentId(documentId);
  };

  return {
    setShowCollectionDocumentDeletionConfirmationDialog,
    CollectionDocumentDeletionConfirmationDialog,
  };
};
