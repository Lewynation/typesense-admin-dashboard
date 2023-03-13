import { useEffect, useState } from "react";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import { useAppSelector } from "../../../../redux/store/store";
import TypesenseActions, {
  ITypesenseAuthData,
} from "../../../../utils/typesenseActions";

const fetchCurations = async (
  collectionName: string,
  { apiKey, host, path, port, protocol }: ITypesenseAuthData
) => {
  const typesense = new TypesenseActions({
    apiKey,
    host,
    path,
    port,
    protocol,
  });
  const curations = await typesense.getCurations(collectionName);
  return curations;
};

const useFetchCurations = (collectionName: string) => {
  const [curations, setCurations] = useState<OverrideSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  useEffect(() => {
    setLoading(true);
    fetchCurations(collectionName, { apiKey, host, path, port, protocol })
      .then((response) => {
        setCurations(response.overrides);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [collectionName, apiKey, host, path, port, protocol]);

  return { curations, loading, error };
};

export default useFetchCurations;
