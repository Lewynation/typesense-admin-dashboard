import { useDependencies } from "@/contexts/dependency_provider";
import { useEffect, useState } from "react";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { KeySchema } from "typesense/lib/Typesense/Key";

export const useCollections = () => {
  const [collections, setCollections] = useState<CollectionSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dependencies = useDependencies();

  useEffect(() => {
    setLoading(true);
    dependencies?.typesense
      ?.getCollections()
      .then((response) => {
        setCollections(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dependencies?.typesense]);
  return { collections, loading, error };
};
