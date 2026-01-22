"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCollectionField,
  CreateCollectionFieldSchema,
} from "@/zod/create_collection";
import LabelledInput from "./labelled_input";
import { FieldTypeSelection } from "./selections";
import FieldBoolRuleSet from "./field_rule_set";
import AdvancedFieldConfig from "./advanced_field_config";
import { flattenReactFormErrors } from "@/lib/flatter_react_form_errors";

const ShowCreateCollectionFieldDialog = ({
  setShowDialog,
  showDialog,
  collectionField,
  readonly,
  onFieldCreated,
  otherCollectionsFieldNames,
}: {
  showDialog: boolean;
  readonly: boolean | undefined;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  collectionField: CreateCollectionField | undefined;
  onFieldCreated?: (field: CreateCollectionField) => void;
  otherCollectionsFieldNames: string[];
}) => {
  const methods = useForm<CreateCollectionField>({
    defaultValues: {
      optional: collectionField?.optional ?? false,
      facet: collectionField?.facet ?? false,
      index: collectionField?.index ?? true,
      infix: collectionField?.infix ?? false,
      stem: collectionField?.stem ?? false,
      rangeIndex: collectionField?.rangeIndex ?? false,
      store: collectionField?.store ?? true,
      autoEmbeddingField: collectionField?.autoEmbeddingField ?? {
        embedFrom: collectionField?.autoEmbeddingField?.embedFrom,
        provider: collectionField?.autoEmbeddingField?.provider ?? {
          type: "_No Embedding_",
        },
      },
      fieldType: collectionField?.fieldType,
      locale: collectionField?.locale,
      name: collectionField?.name,
      numberOfDimensions: collectionField?.numberOfDimensions,
      reference: collectionField?.reference,
      sort: collectionField?.sort,
      stemDictionary: collectionField?.stemDictionary,
      vectorDistance: collectionField?.vectorDistance,
    },
    resolver: zodResolver(CreateCollectionFieldSchema),
  });

  const [openItem, setOpenItem] = useState<string | undefined>(
    collectionField?.autoEmbeddingField?.embedFrom ||
      collectionField?.locale ||
      collectionField?.numberOfDimensions ||
      collectionField?.vectorDistance ||
      collectionField?.stemDictionary ||
      collectionField?.reference
      ? "item-1"
      : undefined,
  );

  const submitCollectionField: SubmitHandler<CreateCollectionField> = async (
    formData,
  ) => {
    if (onFieldCreated) {
      onFieldCreated(formData);
    }
    setShowDialog(false);
  };

  const errors = methods.formState.errors;

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl overflow-y-auto max-h-[95vh]">
        <FormProvider {...methods}>
          <form>
            <DialogHeader>
              <DialogTitle className="font-mono">Add New Field</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 my-3">
              <LabelledInput
                {...methods.register("name")}
                id="name"
                placeHolder="Enter Field Name"
                title="Name"
              />
              <FieldTypeSelection />
            </div>
            <FieldBoolRuleSet />
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={setOpenItem}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-mono font-semibold">
                  Advanced Field Configuration (All Optional)
                </AccordionTrigger>
                <AccordionContent className="px-4 border-l">
                  <AdvancedFieldConfig
                    otherCollectionsFieldNames={otherCollectionsFieldNames}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
              {!readonly && (
                <Button
                  type="button"
                  className="font-mono"
                  onClick={methods.handleSubmit(submitCollectionField)}
                >
                  {collectionField ? "Edit" : "Create"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export const useCreateCollectionFieldForm = () =>
  useFormContext<CreateCollectionField>();

export const useCreateCollectionFieldDialog = (
  onFieldCreated?: (field: CreateCollectionField) => void,
) => {
  const [showDialog, setShowDialog] = useState(false);
  const [readonly, setReadonly] = useState<boolean | undefined>(false);
  const [otherCollectionsFieldNames, setOtherCollectionsFieldNames] = useState<
    string[]
  >([]);
  const [collectionField, setCollectionField] = useState<
    CreateCollectionField | undefined
  >();

  const CreateCollectionFieldDialog = () => (
    <ShowCreateCollectionFieldDialog
      showDialog={showDialog}
      readonly={readonly}
      setShowDialog={setShowDialog}
      collectionField={collectionField}
      onFieldCreated={onFieldCreated}
      otherCollectionsFieldNames={otherCollectionsFieldNames}
    />
  );

  const setShowCreateCollectionFieldDialog = (
    show: boolean,
    collecitonField?: CreateCollectionField,
    readonly?: boolean,
    otherCollectionsFieldNames?: string[],
  ) => {
    setShowDialog(show);
    setCollectionField(collecitonField);
    setReadonly(readonly);
    setOtherCollectionsFieldNames(otherCollectionsFieldNames ?? []);
  };

  return {
    setShowCreateCollectionFieldDialog,
    CreateCollectionFieldDialog,
  };
};
