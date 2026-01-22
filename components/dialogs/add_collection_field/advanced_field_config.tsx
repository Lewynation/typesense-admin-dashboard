import LabelledInput from "./labelled_input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MultiSelectDropdown } from "@/components/ui/multi_value_drop_down";
import { ModelProviderSelection } from "./selections";
import AutoEmbeddingFields from "./auto_embed_provider_input";
import { useCreateCollectionFieldForm } from "./add_collection_field_dialog";

const AdvancedFieldConfig = ({
  otherCollectionsFieldNames,
}: {
  otherCollectionsFieldNames: string[];
}) => {
  const { setValue, register, watch } = useCreateCollectionFieldForm();
  const embedFrom = watch("autoEmbeddingField.embedFrom");

  return (
    <div>
      <LabelledInput
        id="locale"
        placeHolder="Enter Locale"
        title="Locale"
        {...register("locale", {
          setValueAs: (v) => (v === "" ? undefined : v),
        })}
      />
      <LabelledInput
        id="stem_dictionary"
        placeHolder="Enter a Stem Dictionary"
        title="Stem Dictionary"
        {...register("stemDictionary", {
          setValueAs: (v) => (v === "" ? undefined : v),
        })}
      />
      <LabelledInput
        id="dimensions"
        placeHolder="Enter number of dimensions"
        title="Number of Dimensions"
        type="number"
        {...register("numberOfDimensions", {
          required: false,
          setValueAs: (v) => (v === "" ? undefined : Number(v)),
        })}
      />
      <LabelledInput
        id="vector_distance"
        placeHolder="Enter vector distance metric"
        title="Vector distance metric"
        {...register("vectorDistance", {
          setValueAs: (v) => (v === "" ? undefined : v),
        })}
      />
      <LabelledInput
        id="reference"
        placeHolder="Enter reference"
        title="Reference"
        {...register("reference", {
          setValueAs: (v) => (v === "" ? undefined : v),
        })}
      />
      {/*  */}
      <div className="my-3">
        <div className="flex justify-between">
          <Label className="font-mono">
            Auto Embedding Field
            <Badge variant="destructive">AI</Badge>
          </Label>
        </div>
        <div className="border rounded-xl p-4 my-3">
          <Label className="font-mono">Embed From</Label>
          <MultiSelectDropdown
            options={otherCollectionsFieldNames}
            initialSelected={embedFrom}
            placeholder="Select fields to auto embed from"
            onValueChange={(values) => {
              setValue("autoEmbeddingField.embedFrom", values);
            }}
          />
          <ModelProviderSelection />
          <AutoEmbeddingFields />
        </div>
      </div>
    </div>
  );
};

export default AdvancedFieldConfig;
