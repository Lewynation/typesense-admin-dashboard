import { useDependencies } from "@/contexts/dependency_provider";
import { useEffect, useState } from "react";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { TypesenseError } from "typesense/lib/Typesense/Errors";

export const useSchema = (collectionName: string) => {
  const [schema, setSchema] = useState<CollectionSchema>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TypesenseError | null>(null);
  const dependencies = useDependencies();

  useEffect(() => {
    setLoading(true);
    dependencies?.typesense
      ?.getCollectionSchema(collectionName)
      .then((response) => {
        setSchema(response);
      })
      .catch((err) => {
        setError(err as TypesenseError);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [collectionName, dependencies?.typesense]);

  return { schema, loading, error };
};
