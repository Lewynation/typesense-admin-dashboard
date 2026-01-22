"use client";

import { Button } from "@/components/ui/button";
import { CircularSpinner } from "@/components/ui/circular_spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Editor } from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCollection } from "@/swr/use_collection";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import z from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CollectionImportActionSchema } from "@/zod/enums/document_import_actions";
import { tryParse } from "@/lib/try_parse";
import { importDocuments } from "@/actions";
import { toast } from "sonner";
import { useDialog } from "@/components/dialogs/dialog_provider";

const AddCollectionDocumentSchema = z.object({
  action: CollectionImportActionSchema,
  document: z.unknown(),
});

type AddCollectionDocumentFormFields = z.infer<
  typeof AddCollectionDocumentSchema
>;

const AddDocAssembly = () => {
  const {
    handleSubmit,
    setError,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddCollectionDocumentFormFields>({
    defaultValues: {
      action: "upsert",
      document: "[{}]",
    },
    resolver: zodResolver(AddCollectionDocumentSchema),
  });

  const { showApiResponseInEditorDialog } = useDialog();
  const params = useParams<{ name: string; id: string }>();
  const { theme } = useTheme();

  // const collection = useCollection(params.name);
  const doc = watch("document");

  const addDocumentsHandler: SubmitHandler<
    AddCollectionDocumentFormFields
  > = async (formData) => {
    const { document, action } = formData;
    try {
      if (document === "[{}]") {
        setError("root", {
          message: "Add some docs",
        });
        return;
      }
      const editedDocument = tryParse(document);
      const createdSynonym = await importDocuments(
        params.id,
        params.name,
        Array.isArray(editedDocument) ? editedDocument : [editedDocument],
        {
          action: action,
        },
      );
      if (!createdSynonym.success) {
        setError("root", {
          message: createdSynonym.error,
        });
        toast.error("Error", {
          description: createdSynonym.error,
          className: "font-mono",
        });
        return;
      }
      toast.success("Success", {
        description: "Documents imported successfully",
      });
      showApiResponseInEditorDialog(true, JSON.stringify(createdSynonym.value));
    } catch (error) {
      setError("root", {
        message: "Something went wrong",
      });
      toast.error("Error", {
        description: "Uh oh! Something went wrong.",
        className: "font-mono",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(addDocumentsHandler)}
      className="flex flex-col h-[calc(100vh-160px)]"
    >
      <div className="grid gap-3 my-3">
        <Label className="font-mono">Select Import Action</Label>
        <Controller
          name="action"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(val) => {
                field.onChange(
                  CollectionImportActionSchema.catch("upsert").parse(val),
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
      <div className="font-mono text-destructive">
        Refer to your collection schema before adding documents
      </div>
      <div className="border rounded-lg p-4 flex-1 my-3">
        <Editor
          onChange={(val) => {
            if (val) setValue("document", val);
          }}
          className="z-10"
          // height="60vh"
          height="100%"
          defaultLanguage="json"
          defaultValue={doc as string}
          loading={<CircularSpinner />}
          theme={theme === "light" ? "light" : "vs-dark"}
        />
      </div>
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
      <div className="flex justify-end">
        <Button type="submit" className="font-mono">
          Import Documents
        </Button>
      </div>
    </form>
  );
};

export default AddDocAssembly;
