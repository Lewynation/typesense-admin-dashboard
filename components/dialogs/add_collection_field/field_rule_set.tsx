import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import { useCreateCollectionFieldForm } from "./add_collection_field_dialog";

const FieldBoolRuleSet = () => {
  const { control } = useCreateCollectionFieldForm();

  return (
    <div>
      <Label className="font-mono">Rules</Label>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 my-4 gap-3">
        <Controller
          name="optional"
          control={control}
          render={({ field }) => (
            <SingleRuleSet
              title="Optional"
              checked={field.value}
              description="Field can have empty, null or missing values"
              onCheckedChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name="facet"
          control={control}
          render={({ field }) => (
            <SingleRuleSet
              title="Facet"
              checked={field.value}
              description="Enables faceting on this field"
              onCheckedChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name="index"
          control={control}
          render={({ field }) => (
            <SingleRuleSet
              title="Index"
              checked={field.value}
              description="Field will be in in-memory index"
              onCheckedChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name="sort"
          control={control}
          render={({ field }) => (
            <SingleRuleSet
              title="Sort"
              checked={field.value}
              description="You can enable or disable notifications at any time."
              onCheckedChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name="infix"
          control={control}
          render={({ field }) => (
            <SingleRuleSet
              title="Infix"
              checked={field.value}
              description="You can enable or disable notifications at any time."
              onCheckedChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name="stem"
          control={control}
          render={({ field }) => (
            <SingleRuleSet
              title="Stem"
              checked={field.value}
              description="You can enable or disable notifications at any time."
              onCheckedChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

const SingleRuleSet = ({
  checked,
  description,
  title,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked?: boolean;
  onCheckedChange: (newValue: boolean | string) => void;
}) => {
  return (
    <Label className="font-mono hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
      <Checkbox
        id={title}
        // defaultChecked={false}
        checked={checked}
        onCheckedChange={(e) => {
          onCheckedChange(e.valueOf());
        }}
        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">{description} </p>
      </div>
    </Label>
  );
};

export default FieldBoolRuleSet;
