import { useEffect, useState } from "react";
import { KeySchema } from "typesense/lib/Typesense/Key";
import TypesenseActions from "../../../../utils/typesenseActions";

const fetchAPIKeys = async () => {
  const typesense = new TypesenseActions();
  const apiKeys = await typesense.getAPIKeys();
  return apiKeys.keys;
};

interface KeyShemaRefresh extends KeySchema {
  value_prefix: string;
}

const useAPIKeys = () => {
  const [apiKeys, setApiKeys] = useState<KeyShemaRefresh[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchAPIKeys()
      .then((keys) => {
        setApiKeys(keys as KeyShemaRefresh[]);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { apiKeys, loading, error };
};

export default useAPIKeys;
