import { useEffect, useState } from "react";
import { KeySchema } from "typesense/lib/Typesense/Key";
import { useAppSelector } from "../../../../redux/store/store";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../../utils/typesenseActions";

const fetchAPIKeys = async ({
  apiKey,
  host,
  path,
  port,
  protocol,
}: ITypesenseAuthData) => {
  const typesense = new TypesenseActions({
    apiKey,
    host,
    path,
    port,
    protocol,
  });
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
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  useEffect(() => {
    setLoading(true);
    fetchAPIKeys({ apiKey, host, path, port, protocol })
      .then((keys) => {
        setApiKeys(keys as KeyShemaRefresh[]);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiKey, host, path, port, protocol]);

  return { apiKeys, loading, error };
};

export default useAPIKeys;
