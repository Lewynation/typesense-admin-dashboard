import { useCollections } from "@/swr/use_collections";
import { useCreateAnalyticsRuleForm } from "./analytics_rule_create_assembly";
import { Label } from "../ui/label";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LabelledInput from "../dialogs/add_collection_field/labelled_input";

const AnalyticsDestinationRules = () => {
  const { collections } = useCollections();
  const { control } = useCreateAnalyticsRuleForm();

  return (
    <div className="my-5">
      <h1 className="font-mono font-bold text-xl mb-4">Destination Rules</h1>
      <div className="md:pl-10 pl-5 border-l">
        <div className="grid gap-3 mb-3">
          <Label className="font-mono">Destination Collection</Label>
          <Controller
            name="destination.collection"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                }}
              >
                <SelectTrigger className="w-full font-mono">
                  <SelectValue placeholder="Select a collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {collections && (
                      <SelectLabel className="font-mono">
                        Collections
                      </SelectLabel>
                    )}
                    {!collections && (
                      <SelectLabel className="font-mono">
                        Your other collections will show up here
                      </SelectLabel>
                    )}
                    {collections &&
                      collections?.map((collection, index) => {
                        return (
                          <SelectItem
                            key={index}
                            className="font-mono"
                            value={collection.name}
                          >
                            {collection.name}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <Controller
          name="destination.counter_field"
          control={control}
          render={({ field }) => (
            <LabelledInput
              id="counter_field"
              placeHolder="Enter Counter Field"
              title="Counter Field (optional)"
              value={field.value}
              onChange={(e) => {
                const input = e.target.value;
                field.onChange(input.trim() === "" ? undefined : input);
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default AnalyticsDestinationRules;
