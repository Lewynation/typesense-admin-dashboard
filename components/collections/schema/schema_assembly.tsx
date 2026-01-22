"use client";

import CollectionCreateAssembly from "@/components/collection_create/collection_create_assembly";
import { CircularSpinner } from "@/components/ui/circular_spinner";
import { useCollection } from "@/swr/use_collection";
import { useParams } from "next/navigation";
import { generateZodModelFromCollectionSchema } from "@/lib/collection_create_utils";

const SchemaContentAssembly = () => {
  const params = useParams<{ name: string; id: string }>();
  const { collection, isLoading } = useCollection(params.name);

  return (
    <div>
      {isLoading && <CircularSpinner />}
      {collection && (
        <CollectionCreateAssembly
          collectionToEdit={generateZodModelFromCollectionSchema(collection)}
        />
      )}
    </div>
  );
};

export default SchemaContentAssembly;
