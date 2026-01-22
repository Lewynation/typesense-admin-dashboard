"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollectionFromScratch from "./collection_from_scratch";
import TemplateCollections from "./template_collections";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  CreateCollection,
  CreateCollectionSchema,
} from "@/zod/create_collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import z from "zod";
import { Button } from "../ui/button";
import { flattenReactFormErrors } from "@/lib/flatter_react_form_errors";
import { createCollection } from "@/actions";
import { useParams } from "next/navigation";
import { generateCollectionCreateSchemaFromZodModel } from "@/lib/collection_create_utils";
import { toast } from "sonner";
import { BarLoaderFullScreenWidth } from "../ui/bar_loader";
import {
  detectSchemaChanges,
  generatePatchRequestBody,
} from "@/lib/collection_diff";
import { useShowReadonlyCollectionEditEditorModal } from "../dialogs/show_collection_patch_confirmation_dialog";

const CollectionCreationMethodSchema = z.enum(["scratch", "template"]);
export type CollectionCreationMethod = z.infer<
  typeof CollectionCreationMethodSchema
>;

const CollectionCreateAssembly = ({
  collectionToEdit,
}: {
  collectionToEdit?: CreateCollection;
}) => {
  const preModCollection = { ...collectionToEdit };
  const isCollectionEdit = !!collectionToEdit;
  const methods = useForm<CreateCollection>({
    defaultValues: collectionToEdit,
    resolver: zodResolver(CreateCollectionSchema),
  });
  const params = useParams<{ id: string }>();

  const [creationMethod, setCreationMethod] =
    useState<CollectionCreationMethod>("scratch");

  useEffect(() => {
    if (creationMethod === "template") {
      methods.setValue("fields", []);
      methods.setValue("metadata", undefined);
    }
  }, [creationMethod]);

  const errors = methods.formState.errors;

  const {
    ReadonlyCollectionEditEditorDialog,
    setShowReadonltCollectionEditEditorDialog,
  } = useShowReadonlyCollectionEditEditorModal();

  const handleCreateSchemaSubmission: SubmitHandler<CreateCollection> = async (
    formData,
  ) => {
    try {
      if (isCollectionEdit) {
        const diff = detectSchemaChanges(
          preModCollection as CreateCollection,
          formData,
        );
        if (diff.hasChanges) {
          setShowReadonltCollectionEditEditorDialog(
            true,
            JSON.stringify(generatePatchRequestBody(diff, formData), null, 2),
          );
        } else {
          toast.success("No changes founnd", {
            description: "Your collection has no changes",
            className: "font-mono",
          });
        }
        return;
      }
      const collection = await createCollection(
        params.id,
        generateCollectionCreateSchemaFromZodModel(formData),
      );
      if (!collection.success) {
        toast.error("Error creating collection", {
          description: collection.error,
        });
        return;
      }
      if (collection.value) {
        toast.success("Collection Created", {
          description: `${collection?.value?.name} created successfully`,
        });
        methods.reset();
      }
    } catch (error) {
      toast.error("Error creating collection", {
        description: `There was an error creating your collection`,
      });
    }
  };

  return (
    <div className="mt-5">
      <ReadonlyCollectionEditEditorDialog />
      {methods.formState.isSubmitting && (
        <BarLoaderFullScreenWidth loading={methods.formState.isSubmitting} />
      )}
      {!isCollectionEdit && (
        <h2 className="font-mono font-bold">Collection creation method</h2>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleCreateSchemaSubmission)}>
          <Tabs
            defaultValue="scratch"
            className="mt-2"
            onValueChange={(e) => {
              setCreationMethod(
                CollectionCreationMethodSchema.catch("scratch").parse(e),
              );
            }}
          >
            {!isCollectionEdit && (
              <TabsList>
                <TabsTrigger value="scratch" className="font-mono">
                  Start from Scratch
                </TabsTrigger>
                <TabsTrigger value="template" className="font-mono">
                  Create Pre Defined Collection
                </TabsTrigger>
              </TabsList>
            )}
            <TabsContent value="scratch">
              <CollectionFromScratch isCollectionEdit={isCollectionEdit} />
            </TabsContent>
            <TabsContent value="template">
              <TemplateCollections />
            </TabsContent>
          </Tabs>
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
          <div className="flex justify-end">
            <Button type="submit" className="font-mono">
              {isCollectionEdit ? "Edit" : "Create"} Collection
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export const useCreateCollectionForm = () => useFormContext<CreateCollection>();

export default CollectionCreateAssembly;
