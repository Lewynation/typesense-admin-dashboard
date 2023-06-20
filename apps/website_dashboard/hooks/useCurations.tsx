import React, { useEffect, useState } from "react";
import { useDependencies } from "@/contexts/dependency_provider";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import { TypesenseError } from "typesense/lib/Typesense/Errors";

export const useCurations = (collectionName: string) => {
  const dependencies = useDependencies();
  const [curations, setCurations] = useState<OverrideSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<TypesenseError | null>(null);

  useEffect(() => {
    setLoading(true);
    dependencies?.typesense
      ?.getCurations(collectionName)
      .then((response) => {
        setCurations(response.overrides);
      })
      .catch((err) => {
        setError(err as TypesenseError);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [collectionName, dependencies?.typesense]);

  return { curations, loading, error };
};
