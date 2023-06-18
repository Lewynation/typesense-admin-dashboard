import { useDependencies } from "@/contexts/dependency_provider";
import { useEffect, useState } from "react";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";

export const useSchema = (collectionName: string) => {
  const [schema, setSchema] = useState<CollectionSchema>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dependencies = useDependencies();

  useEffect(() => {
    setLoading(true);
    dependencies?.typesense
      ?.getCollectionSchema(collectionName)
      .then((response) => {
        setSchema(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [collectionName, dependencies?.typesense]);

  return { schema, loading, error };
};
