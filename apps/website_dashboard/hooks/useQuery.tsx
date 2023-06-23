import { useDependencies } from "@/contexts/dependency_provider";
import { useSchema } from "./useSchema";
import { useEffect, useState } from "react";
import { CollectionSchemaFieldManipulator } from "@/utils/collection_schema_filed_manipulator";

export const useQuery = (collectionName: string) => {
  const dependencies = useDependencies();
  const { schema, error, loading } = useSchema(collectionName);
  const [typesenseSchemaManipulator, setTypesenseSchemaManipulator] =
    useState<CollectionSchemaFieldManipulator | null>(null);
  useEffect(() => {
    if (!schema || error) return;
    if (typesenseSchemaManipulator) return;

    const manipulator = new CollectionSchemaFieldManipulator(
      schema,
      dependencies.typesense.AuthData
    );
    setTypesenseSchemaManipulator(manipulator);
  }, [dependencies, schema, typesenseSchemaManipulator, error]);
  return { typesenseSchemaManipulator, error, loading };
};
