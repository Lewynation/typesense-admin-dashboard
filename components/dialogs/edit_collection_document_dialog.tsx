"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Editor } from "@monaco-editor/react";
import { CircularSpinner } from "../ui/circular_spinner";
import { useTheme } from "next-themes";
import { useInstantSearch } from "react-instantsearch";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { importDocuments } from "@/actions";
import { useParams } from "next/navigation";
import { tryParse, tryStringify } from "@/lib/try_parse";
import { toast } from "sonner";
import { BarLoaderFullScreenWidth } from "../ui/bar_loader";
import { useDialog } from "./dialog_provider";

const EditCollectionDocumentSchema = z.object({
  document: z.unknown(),
});

type EditCollectionDocumentFormFields = z.infer<
  typeof EditCollectionDocumentSchema
>;

const ShowEditCollectionDocumentDialog = ({
  setShowDialog,
  showDialog,
  document,
  documentId,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  document: string | undefined;
  documentId: string | undefined;
}) => {
  const { theme } = useTheme();
  const params = useParams<{ id: string; name: string }>();
  const { refresh } = useInstantSearch();
  const { showApiResponseInEditorDialog } = useDialog();

  const {
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditCollectionDocumentFormFields>({
    defaultValues: {
      document: document,
    },
    resolver: zodResolver(EditCollectionDocumentSchema),
  });

  const editDocumentHandler: SubmitHandler<
    EditCollectionDocumentFormFields
  > = async (formData) => {
    const { document } = formData;
    try {
      const editedDocument = tryParse(document);
      const editedDoc = await importDocuments(
        params.id,
        params.name,
        Array.isArray(editedDocument) ? editedDocument : [editedDocument],
        {
          action: "upsert",
        },
      );
      if (!editedDoc.success) {
        setError("root", {
          message: editedDoc.error,
        });
        toast.error("Error", {
          description: editedDoc.error,
          className: "font-mono",
        });
        return;
      }
      toast.success("Success", {
        description: "Document edited successfully",
      });
      refresh();
      setShowDialog(false);
      showApiResponseInEditorDialog(true, JSON.stringify(editedDoc.value));
    } catch (error) {
      setError("root", {
        message: "Something went wrong",
      });
      toast("Error", {
        description: "Uh oh! Something went wrong.",
        className: "font-mono",
      });
    }
  };

  const doc = watch("document");

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
        {isSubmitting && <BarLoaderFullScreenWidth loading={isSubmitting} />}
        <form onSubmit={handleSubmit(editDocumentHandler)}>
          <DialogHeader>
            <DialogTitle className="font-mono">Edit Document</DialogTitle>
          </DialogHeader>
          <Editor
            onChange={(val) => {
              if (val) setValue("document", val);
            }}
            className="z-10"
            height="60vh"
            defaultLanguage="json"
            defaultValue={doc as string}
            loading={<CircularSpinner />}
            theme={theme === "light" ? "light" : "vs-dark"}
          />
          <div>
            {errors.document && (
              <p className="text-destructive text-sm font-mono">
                - (Document) {errors.document.message}
              </p>
            )}
            {errors.root && (
              <p className="text-destructive text-sm font-mono">
                - (Root) {errors.root.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="font-mono">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="font-mono">
              Edit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const useShowEditCollectionDocumentModal = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [document, setDocument] = useState<string | undefined>();
  const [documentId, setDocumentId] = useState<string | undefined>();

  const EditCollectionDocumentDialog = () => (
    <ShowEditCollectionDocumentDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      document={document}
      documentId={documentId}
    />
  );

  const setShowEditCollectionDocumentDialog = (
    show: boolean,
    document: string,
    documentId: string,
  ) => {
    setDocument(document);
    setShowDialog(show);
    setDocumentId(documentId);
  };

  return {
    EditCollectionDocumentDialog,
    setShowEditCollectionDocumentDialog,
  };
};
