"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useParams } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSynonym } from "@/actions";
import { toast } from "sonner";
import { SynonymSchema } from "typesense/lib/Typesense/Synonym";
import {
  CreateSynonymFormFields,
  CreateSynonymSchema,
} from "@/zod/create_synonym";
import MultiValueInput from "../ui/multi_value_input";
import { SynonymCreateSchema } from "typesense/lib/Typesense/Synonyms";
import { BarLoaderFullScreenWidth } from "../ui/bar_loader";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import {
  ExportCollectionFormFields,
  ExportCollectionSchema,
} from "@/zod/export_collection";
import { MultiSelectDropdown } from "../ui/multi_value_drop_down";

const ShowExportCollectionDocumentsDialog = ({
  setShowDialog,
  showDialog,
  collection,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  collection: CollectionSchema | undefined;
}) => {
  const params = useParams() as { id: string };

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExportCollectionFormFields>({
    defaultValues: {},
    resolver: zodResolver(ExportCollectionSchema),
  });

  const handleExportCollectionDocuments: SubmitHandler<
    ExportCollectionFormFields
  > = async (formData) => {
    if (!collection) return;
    const { excludeFields, filterBy, includeFields } = formData;
    try {
      const downloadParams = new URLSearchParams();
      downloadParams.set("serverId", params.id);
      downloadParams.set("collectionName", collection.name);
      if (filterBy) {
        downloadParams.set("filterBy", filterBy);
      }
      if (includeFields?.length) {
        includeFields.forEach((field) =>
          downloadParams.append("includeFields", field),
        );
      }
      if (excludeFields?.length) {
        excludeFields.forEach((field) =>
          downloadParams.append("excludeFields", field),
        );
      }
      const a = document.createElement("a");
      a.href = `/api/typesense/documents/export?${downloadParams.toString()}`;
      a.style.display = "none";

      document.body.appendChild(a);
      a.click();
      a.remove();

      setShowDialog(false);
      toast("Success", {
        description: "File will begin download",
        className: "font-mono",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          message: error.message,
        });
        toast("Error", {
          description: error.message,
          className: "font-mono",
        });
      } else {
        setError("root", {
          message: "Something went wrong",
        });
        toast("Error", {
          description: "Uh oh! Something went wrong.",
          className: "font-mono",
        });
      }
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px]">
        {isSubmitting && <BarLoaderFullScreenWidth loading={isSubmitting} />}
        <form onSubmit={handleSubmit(handleExportCollectionDocuments)}>
          <DialogHeader>
            <DialogTitle className="font-mono">
              Export Collection Documents
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 my-3">
            <div className="grid gap-3">
              <Label htmlFor="filterBy" className="font-mono">
                Filter By (optional)
              </Label>
              <Input
                {...register("filterBy")}
                id="filterBy"
                name="filterBy"
                placeholder="Enter Filter By"
                className="font-mono"
              />
            </div>
          </div>
          <div className="rounded-xl my-3">
            <Controller
              name="includeFields"
              control={control}
              render={({ field }) => (
                <>
                  <Label className="font-mono">
                    Fields to include (optional)
                  </Label>
                  <MultiSelectDropdown
                    options={collection?.fields.map((f) => f.name) ?? []}
                    initialSelected={[]}
                    placeholder="Select fields to include"
                    onValueChange={(values) => {
                      field.onChange(values);
                    }}
                  />
                </>
              )}
            />
          </div>
          <div className="rounded-xl my-3">
            <Controller
              name="excludeFields"
              control={control}
              render={({ field }) => (
                <>
                  <Label className="font-mono">
                    Fields to exclude (optional)
                  </Label>
                  <MultiSelectDropdown
                    options={collection?.fields.map((f) => f.name) ?? []}
                    initialSelected={[]}
                    placeholder="Select fields to exclude"
                    onValueChange={(values) => {
                      field.onChange(values);
                    }}
                  />
                </>
              )}
            />
          </div>

          <div>
            {errors.root && (
              <p className="text-destructive text-sm font-mono">
                - (Root) {errors.root.message}
              </p>
            )}
            {errors.includeFields && (
              <p className="text-destructive text-sm font-mono">
                - (Include Fields) {errors.includeFields.message}
              </p>
            )}
            {errors.excludeFields && (
              <p className="text-destructive text-sm font-mono">
                - (Exclude Fields) {errors.excludeFields.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="font-mono">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="font-mono">
              Export
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const useExportCollectionDocumentsDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [collection, setCollection] = useState<CollectionSchema | undefined>();

  const ExportCollectionDocumentsDialog = () => (
    <ShowExportCollectionDocumentsDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      collection={collection}
    />
  );

  const setShowExportCollectionDocumentsDialog = (
    show: boolean,
    collection: CollectionSchema,
  ) => {
    setShowDialog(show);
    setCollection(collection);
  };

  return {
    setShowExportCollectionDocumentsDialog,
    ExportCollectionDocumentsDialog,
  };
};
