import { useDependencies } from "@/contexts/dependency_provider";
import { useEffect, useState } from "react";
import { TypesenseError } from "typesense/lib/Typesense/Errors";
import { KeySchema } from "typesense/lib/Typesense/Key";

export const useAPIKeys = () => {
  const [apiKeys, setAPIKeys] = useState<KeySchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TypesenseError | null>(null);
  const dependencies = useDependencies();

  useEffect(() => {
    setLoading(true);
    dependencies?.typesense
      ?.getAPIKeys()
      .then((response) => {
        setAPIKeys(response.keys);
      })
      .catch((err) => {
        const error = err as TypesenseError;
        setError(error);
        console.log(error.cause);
        console.log(error.httpStatus);
        console.log(error.message);
        console.log(error.name);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dependencies?.typesense]);
  return { apiKeys, loading, error };
};
