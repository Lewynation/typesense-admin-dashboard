import { useDependencies } from "@/contexts/dependency_provider";
import { useEffect, useState } from "react";
import { KeySchema } from "typesense/lib/Typesense/Key";

export const useAPIKeys = () => {
  const [apiKeys, setAPIKeys] = useState<KeySchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dependencies = useDependencies();

  useEffect(() => {
    setLoading(true);
    dependencies?.typesense
      ?.getAPIKeys()
      .then((response) => {
        setAPIKeys(response.keys);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dependencies?.typesense]);
  return { apiKeys, loading, error };
};
