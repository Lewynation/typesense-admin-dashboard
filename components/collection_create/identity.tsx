import MultiValueInput from "../ui/multi_value_input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCollectionForm } from "./collection_create_assembly";
import LabelledInput from "../dialogs/add_collection_field/labelled_input";
import { Controller } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const CollectionIdentity = ({
  isCollectionEdit = false,
}: {
  isCollectionEdit?: boolean;
}) => {
  const { register, control, watch } = useCreateCollectionForm();

  const fields = watch("fields");

  return (
    <div>
      <LabelledInput
        id="name"
        disabled={isCollectionEdit}
        placeHolder="Enter Collection Name"
        title="Name"
        {...register("name")}
      />
      <p className="pb-2 text-sm font-semibold font-mono">
        Default Sort Field (optional)
      </p>
      <Controller
        name="defaultSortField"
        control={control}
        render={({ field }) => (
          <Select
            disabled={isCollectionEdit}
            value={field.value}
            onValueChange={(val) => {
              field.onChange(val);
            }}
          >
            <SelectTrigger className="w-full my-2 font-mono">
              <SelectValue placeholder="Select default sort field (optional but must be int32 or float)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fields && fields.length > 0 && (
                  <SelectLabel className="font-mono">
                    Default Sorting Field
                  </SelectLabel>
                )}
                {!fields ||
                  (fields.length === 0 && (
                    <SelectLabel className="font-mono">
                      Create Some Fields First
                    </SelectLabel>
                  ))}
                {fields &&
                  fields
                    .filter(
                      (field) =>
                        field.fieldType === "int32" ||
                        field.fieldType === "float",
                    )
                    .map((field, index) => (
                      <SelectItem
                        key={index}
                        className="font-mono"
                        value={field.name}
                      >
                        {field.name}
                      </SelectItem>
                    ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      <Controller
        name="symbolsToIndex"
        control={control}
        render={({ field }) => (
          <MultiValueInput
            disabled={isCollectionEdit}
            initialValue={field.value}
            label="Symbols to Index (optional)"
            onValueChange={(values) => {
              field.onChange(values);
            }}
          />
        )}
      />
      <Controller
        name="tokenSeparators"
        control={control}
        render={({ field }) => (
          <MultiValueInput
            disabled={isCollectionEdit}
            initialValue={field.value}
            label="Token Separators (optional)"
            onValueChange={(values) => {
              field.onChange(values);
            }}
          />
        )}
      />
      <Controller
        name="enableNestedFields"
        control={control}
        render={({ field }) => (
          <div className="flex items-start gap-3">
            <Checkbox
              disabled={isCollectionEdit}
              id="nested_fields"
              checked={field.value}
              onCheckedChange={(e) => {
                field.onChange(e.valueOf());
              }}
            />
            <div className="grid gap-2">
              <Label htmlFor="nested_fields" className="font-mono">
                Enable nested fields
              </Label>
              <p className="text-muted-foreground text-sm font-mono">
                Typesense supports indexing nested objects (and array of
                objects) from v0.24
              </p>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CollectionIdentity;
