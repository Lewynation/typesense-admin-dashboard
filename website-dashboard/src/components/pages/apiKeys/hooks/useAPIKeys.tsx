import { useEffect, useState } from "react";
import { KeySchema } from "typesense/lib/Typesense/Key";
import TypesenseActions from "../../../../utils/typesenseActions";

const fetchAPIKeys = async () => {
  const typesense = new TypesenseActions();
  const apiKeys = await typesense.getAPIKeys();
  return apiKeys.keys;
};

const useAPIKeys = () => {
  const [apiKeys, setApiKeys] = useState<KeySchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchAPIKeys()
      .then((keys) => {
        setApiKeys(keys);
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
