"use client";

import { Braces, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CollectionFieldRowActions from "./collection_field_row_action";
import { Badge } from "../ui/badge";
import { useCreateCollectionFieldDialog } from "../dialogs/add_collection_field/add_collection_field_dialog";
import {
  CollectionCreationMethod,
  useCreateCollectionForm,
} from "./collection_create_assembly";
import { CreateCollectionField } from "@/zod/create_collection";
import { useFieldArray } from "react-hook-form";

const CollectionFields = ({
  collectionCreationMethod = "scratch",
}: {
  collectionCreationMethod?: CollectionCreationMethod;
}) => {
  const { getValues, control } = useCreateCollectionForm();

  const { append } = useFieldArray({
    name: "fields",
    control,
  });

  const { CreateCollectionFieldDialog, setShowCreateCollectionFieldDialog } =
    useCreateCollectionFieldDialog((f) => append(f));

  return (
    <div className="my-10">
      <CreateCollectionFieldDialog />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Braces />
          <h2 className="font-mono font-bold "> Schema Fields</h2>
        </div>
        <div>
          {collectionCreationMethod === "scratch" && (
            <Button
              className="font-mono"
              variant={"secondary"}
              type="button"
              onClick={() => {
                setShowCreateCollectionFieldDialog(
                  true,
                  undefined,
                  undefined,
                  getValues("fields").map((field) => field.name)
                );
              }}
            >
              <Plus />
              Add Field
            </Button>
          )}
        </div>
      </div>
      <Fields readonly={collectionCreationMethod === "template"} />
    </div>
  );
};

const Fields = ({ readonly }: { readonly: boolean }) => {
  const { watch } = useCreateCollectionForm();
  const fields = watch("fields");

  return (
    <div className="mt-3 px-5">
      {!fields ||
        (fields.length === 0 && (
          <div className="flex justify-center items-center font-mono my-4">
            There are no fields to show
          </div>
        ))}
      {fields && fields.length > 0 && (
        <Table className="border rounded-2xl">
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">Field Name</TableHead>
              <TableHead className="font-mono font-bold">Data Type</TableHead>
              <TableHead className="font-mono font-bold">Attributes</TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <SingleField
                field={field}
                index={index}
                key={index}
                readonly={readonly}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

const SingleField = ({
  field,
  index,
  readonly = false,
}: {
  field: CreateCollectionField;
  index: number;
  readonly: boolean;
}) => {
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-mono font-bold">{field.name}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{field.fieldType}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono flex gap-1">
          {field.index && (
            <Badge className="" variant={"destructive"}>
              Index
            </Badge>
          )}
          {field.facet && (
            <Badge className="" variant={"default"}>
              Facet
            </Badge>
          )}
          {field.sort && (
            <Badge className="" variant={"secondary"}>
              Sort
            </Badge>
          )}
          {field.optional && (
            <Badge className="" variant={"outline"}>
              Optional
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <CollectionFieldRowActions
          field={field}
          index={index}
          readonly={readonly}
        />
      </TableCell>
    </TableRow>
  );
};

export default CollectionFields;
