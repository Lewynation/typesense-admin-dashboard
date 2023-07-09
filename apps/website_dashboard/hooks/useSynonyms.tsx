import { useDependencies } from "@/contexts/dependency_provider";
import { useEffect, useState } from "react";
import { TypesenseError } from "typesense/lib/Typesense/Errors";
import { SynonymSchema } from "typesense/lib/Typesense/Synonym";

export const useSynonyms = (schemaName: string) => {
  const [synonyms, setSynonyms] = useState<SynonymSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TypesenseError | null>(null);
  const dependencies = useDependencies();

  useEffect(() => {
    setLoading(true);
    dependencies?.typesense
      ?.getSynonyms(schemaName)
      .then((response) => {
        setSynonyms(response.synonyms);
      })
      .catch((err) => {
        setError(err as TypesenseError);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [schemaName, dependencies]);

  return { synonyms, loading, error };
};
