"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateCollectionField } from "@/zod/create_collection";
import { useCreateCollectionForm } from "./collection_create_assembly";
import { useFieldArray } from "react-hook-form";
import { useCreateCollectionFieldDialog } from "../dialogs/add_collection_field/add_collection_field_dialog";

const CollectionFieldRowActions = ({
  field,
  index,
  readonly,
}: {
  field: CreateCollectionField;
  index: number;
  readonly: boolean;
}) => {
  const { control, getValues } = useCreateCollectionForm();
  const { remove, update } = useFieldArray({
    name: "fields",
    control,
  });
  const { CreateCollectionFieldDialog, setShowCreateCollectionFieldDialog } =
    useCreateCollectionFieldDialog((f) => {
      update(index, f);
    });

  return (
    <div className="flex items-center justify-center gap-2">
      <CreateCollectionFieldDialog />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {
                setShowCreateCollectionFieldDialog(
                  true,
                  field,
                  readonly,
                  getValues("fields").map((field) => field.name),
                );
              }}
            >
              <div>
                {readonly ? (
                  <Eye className="h-5 w-5 " />
                ) : (
                  <Pencil className="h-5 w-5 " />
                )}
                <span className="sr-only">{readonly ? "View" : "Edit"}</span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {readonly ? "View" : "Edit"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {!readonly && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
                onClick={() => {
                  remove(index);
                }}
              >
                <div>
                  <Trash className="h-5 w-5 text-destructive" />
                  <span className="sr-only">Delete</span>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default CollectionFieldRowActions;
