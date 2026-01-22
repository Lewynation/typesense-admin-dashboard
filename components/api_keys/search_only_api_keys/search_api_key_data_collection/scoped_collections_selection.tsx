"use client";
import { CircularSpinner } from "@/components/ui/circular_spinner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCollections } from "@/swr/use_collections";
import { useCreateSearchApiKeyForm } from "../search_api_keys_home";

const ScopedCollectionsSelection = () => {
  const { collections, error, isLoading } = useCollections();
  const { setValue } = useCreateSearchApiKeyForm();

  return (
    <ToggleGroup
      type="multiple"
      className="flex-wrap"
      variant="outline"
      spacing={2}
      size="sm"
      onValueChange={(value) => {
        setValue("collections", value);
      }}
    >
      {collections && collections.length === 0 && (
        <p className="font-mono">
          No Collections Found (First create some collections)
        </p>
      )}
      {isLoading && <CircularSpinner />}
      {error && <p className="font-mono">Error Fetching Collections</p>}
      {collections && collections.length > 0 && (
        <>
          {collections.map((collection, index) => (
            <ToggleGroupItem
              key={collection.name}
              className="font-mono"
              value={collection.name}
            >
              {collection.name}
            </ToggleGroupItem>
          ))}
        </>
      )}
    </ToggleGroup>
  );
};

export default ScopedCollectionsSelection;
