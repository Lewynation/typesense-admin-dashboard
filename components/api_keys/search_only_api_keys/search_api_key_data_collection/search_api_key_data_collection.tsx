"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ScopedCollectionsSelection from "./scoped_collections_selection";
import { useCreateSearchApiKeyForm } from "../search_api_keys_home";
import { ExpiryDurationSchema } from "@/zod/enums/expiry_duration";

const SearchAPIKeysDataCollection = () => {
  const { register, setValue } = useCreateSearchApiKeyForm();

  return (
    <div className="px-4 pt-4 pb-1">
      <p className="pb-2 text-lg font-bold font-mono">Search only API Key</p>
      <div className="grid gap-3 my-2">
        <Label htmlFor="description" className="font-mono font-bold">
          Description
        </Label>
        <Input
          {...register("description")}
          id="description"
          name="description"
          placeholder="Enter description"
          className="font-mono"
        />
      </div>

      <p className="pb-2 text-sm font-bold font-mono">Expiration</p>
      <div className="flex items-center gap-2 mb-4">
        <Select
          onValueChange={(val) => {
            setValue(
              "expiration",
              ExpiryDurationSchema.catch("7days").parse(val),
            );
          }}
        >
          <SelectTrigger className="w-full font-mono">
            <SelectValue
              className="font-mono"
              placeholder="Select expiry duration (Default 7 days)"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="font-mono">Durations</SelectLabel>
              <SelectItem className="font-mono" value="7days">
                7 Days
              </SelectItem>
              <SelectItem className="font-mono" value="30days">
                30 Days
              </SelectItem>
              <SelectItem className="font-mono" value="60days">
                60 days
              </SelectItem>
              <SelectItem className="font-mono" value="90days">
                90 days
              </SelectItem>
              <SelectItem className="font-mono" value="NoExpiration">
                No Expiration
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <p className="pb-2 text-sm font-bold font-mono">
        Select Collections that this key is scoped to
      </p>
      <p className="pb-2 text-sm text-accent-foreground font-mono">
        If no collection is selected, the key will be scoped to all collections,
        ie *
      </p>
      <div className="">
        <ScopedCollectionsSelection />
      </div>
      <p className="mt-3 text-sm font-bold font-mono ">Select Scopes</p>
      <p className="pb-2 text-sm font-mono text-accent-foreground">
        Scopes define the access for search only API Keys.
      </p>
    </div>
  );
};

export default SearchAPIKeysDataCollection;
