import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EmbedModelProviderTypeSchema,
  FIELD_TYPES,
  FieldTypeSchema,
} from "@/zod/create_collection";
import { useCreateCollectionFieldForm } from "./add_collection_field_dialog";
import { Controller } from "react-hook-form";

export const FieldTypeSelection = () => {
  const { control } = useCreateCollectionFieldForm();
  return (
    <div className="grid gap-3">
      <Label className="font-mono">Field Type</Label>
      <Controller
        name="fieldType"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(val) => {
              field.onChange(FieldTypeSchema.catch("auto").parse(val));
            }}
          >
            <SelectTrigger className="w-full font-mono">
              <SelectValue placeholder="Select field type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="font-mono">Field Type</SelectLabel>
                {FIELD_TYPES.map((type, index) => {
                  return (
                    <SelectItem key={index} className="font-mono" value={type}>
                      {type}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export const ModelProviderSelection = () => {
  const { control } = useCreateCollectionFieldForm();
  return (
    <div className="grid gap-3">
      <Label className="font-mono">Model Provider</Label>
      <Controller
        name="autoEmbeddingField.provider.type"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            defaultValue="_No Embedding_"
            onValueChange={(val) => {
              field.onChange(
                EmbedModelProviderTypeSchema.catch("openAI").parse(val)
              );
            }}
          >
            <SelectTrigger className="w-full font-mono">
              <SelectValue placeholder="Select field type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="font-mono">Embed Providers</SelectLabel>
                <SelectItem className="font-mono" value="_No Embedding_">
                  Auto Embedding Disabled
                </SelectItem>
                <SelectItem className="font-mono" value="openAI">
                  OpenAI
                </SelectItem>
                <SelectItem className="font-mono" value="azure">
                  Azure OpenAI
                </SelectItem>
                <SelectItem className="font-mono" value="openAICompatible">
                  OpenAI Compatible
                </SelectItem>
                <SelectItem className="font-mono" value="googlePalm">
                  Google Palm
                </SelectItem>
                <SelectItem className="font-mono" value="GCPVertexAI">
                  GCP Vertex AI
                </SelectItem>
                <SelectItem className="font-mono" value="ownModel">
                  Own Model
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};
