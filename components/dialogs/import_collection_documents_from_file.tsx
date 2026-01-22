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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarLoaderFullScreenWidth } from "../ui/bar_loader";
import { flattenReactFormErrors } from "@/lib/flatter_react_form_errors";
import z from "zod";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { useDialog } from "./dialog_provider";
import {
  CollectionImportActionSchema,
  CollectionImportDealingWithDirtyDataSchema,
} from "@/zod/enums/document_import_actions";

const CollectionDocumentsImportSchema = z.object({
  collectionName: z.string().nonempty(),
  action: CollectionImportActionSchema,
  dirtyValues: CollectionImportDealingWithDirtyDataSchema.optional(),
  file: z.instanceof(File),
});

type CollectionImport = z.infer<typeof CollectionDocumentsImportSchema>;

const ShowImportCollectionDocumentsFromFileDialog = ({
  setShowDialog,
  showDialog,
  collection,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  collection: CollectionSchema | undefined;
}) => {
  const params = useParams<{ id: string }>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CollectionImport>({
    defaultValues: {
      action: "create",
      collectionName: collection?.name,
    },
    resolver: zodResolver(CollectionDocumentsImportSchema),
  });

  const router = useRouter();
  const { showApiResponseInEditorDialog } = useDialog();

  const handleDocumentImportSubmission: SubmitHandler<
    CollectionImport
  > = async (formData) => {
    const { file, collectionName, action, dirtyValues } = formData;
    try {
      const docImportParams = new URLSearchParams();
      docImportParams.set("serverId", params.id);
      docImportParams.set("collectionName", collectionName);
      if (action) {
        docImportParams.set("action", action);
      }
      if (dirtyValues) {
        docImportParams.set("dirtyValues", dirtyValues);
      }
      const res = await fetch(
        `/api/typesense/documents/import?${docImportParams.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: file,
        },
      );
      if (res.ok) {
        const responseData = await res.text();
        toast.success("success", {
          description: "Collection documents imported successfuly",
          className: "font-mono",
        });
        reset();
        router.refresh();
        setShowDialog(false);
        showApiResponseInEditorDialog(true, responseData);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error", {
          description: error.message,
          className: "font-mono",
        });
      } else {
        toast.error("Error", {
          description: "Error importing collection documents",
          className: "font-mono",
        });
      }
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px]">
        {isSubmitting && <BarLoaderFullScreenWidth loading={isSubmitting} />}
        <form>
          <DialogHeader>
            <DialogTitle className="font-mono">
              Import Documents from file into {collection?.name} collection
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 my-3">
            <Label className="font-mono">Select Action</Label>
            <Controller
              name="action"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(
                      CollectionImportActionSchema.catch("create").parse(val),
                    );
                  }}
                >
                  <SelectTrigger className="w-full font-mono">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="font-mono">Actions</SelectLabel>
                      <SelectItem className="font-mono" value="create">
                        Create
                      </SelectItem>
                      <SelectItem className="font-mono" value="upsert">
                        Upsert
                      </SelectItem>
                      <SelectItem className="font-mono" value="update">
                        Update
                      </SelectItem>
                      <SelectItem className="font-mono" value="emplace">
                        Emplace
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid gap-3 my-3">
            <Label className="font-mono">
              How should Typesense deal with dirty Data? (optional)
            </Label>
            <Controller
              name="dirtyValues"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(
                      CollectionImportDealingWithDirtyDataSchema.catch(
                        "coerce_or_drop",
                      ).parse(val),
                    );
                  }}
                >
                  <SelectTrigger className="w-full font-mono">
                    <SelectValue placeholder="Select how to deal with dirty data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="font-mono">
                        Deal with dirty data
                      </SelectLabel>
                      <SelectItem
                        className="font-mono"
                        value="coerce_or_reject"
                      >
                        Coerce Or Reject
                      </SelectItem>
                      <SelectItem className="font-mono" value="coerce_or_drop">
                        Coerce Or Drop
                      </SelectItem>
                      <SelectItem className="font-mono" value="drop">
                        Drop
                      </SelectItem>
                      <SelectItem className="font-mono" value="reject">
                        Reject
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2 my-3">
            <Label htmlFor="file-1" className="font-mono">
              Upload file
            </Label>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <Input
                  className="font-mono"
                  id="file-1"
                  name="file-1"
                  type="file"
                  accept=".jsonl"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              )}
            />
            <p className="text-sm text-muted-foreground font-mono">
              You are only allowed to upload JSONL files.
            </p>
          </div>
          <div>
            {flattenReactFormErrors(errors).map((error, index) => (
              <p
                className="text-destructive text-sm font-mono w-full break-all"
                key={index}
              >
                {error}
              </p>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="font-mono">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="font-mono"
              onClick={handleSubmit(handleDocumentImportSubmission)}
            >
              Import
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const useShowImportCollectionDocumentsFromFileDialog = () => {
  const [showDialog, setImportCollectionDocumentsFromFileDialog] =
    useState(false);
  const [collection, setCollection] = useState<CollectionSchema | undefined>();

  const ImportCollectionDocumentsFromFileDialog = () => (
    <ShowImportCollectionDocumentsFromFileDialog
      showDialog={showDialog}
      setShowDialog={setImportCollectionDocumentsFromFileDialog}
      collection={collection}
    />
  );

  const setShowImportCollectionDocumentsDialog = (
    show: boolean,
    collection: CollectionSchema,
  ) => {
    setImportCollectionDocumentsFromFileDialog(show);
    setCollection(collection);
  };

  return {
    setShowImportCollectionDocumentsDialog,
    ImportCollectionDocumentsFromFileDialog,
  };
};
